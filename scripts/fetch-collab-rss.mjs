/**
 * scripts/fetch-collab-rss.mjs
 * Hypebeast / Highsnobiety / SneakerNews の RSS を取得して
 * lib/collab-rss.json を更新する
 *
 * 使い方:
 *   node scripts/fetch-collab-rss.mjs              # 通常実行
 *   node scripts/fetch-collab-rss.mjs --dry-run    # ファイルを変更せず結果を出力
 */

import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = join(__dirname, "../lib/collab-rss.json");
const DRY_RUN = process.argv.includes("--dry-run");
const MAX_ITEMS = 30;

const RSS_FEEDS = [
  { url: "https://hypebeast.com/feed",            label: "Hypebeast" },
  { url: "https://www.highsnobiety.com/feed/",    label: "Highsnobiety" },
  { url: "https://sneakernews.com/feed/",         label: "SneakerNews" },
];

// ── XML 正規表現パーサー（依存ゼロ） ─────────────────────────────────────

/** XMLの特定タグの内容を全件抽出 */
function extractTags(xml, tag) {
  const results = [];
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  let m;
  while ((m = re.exec(xml)) !== null) {
    results.push(m[1].trim());
  }
  return results;
}

/** CDATA を除去して内容を取り出す */
function stripCdata(str) {
  const m = str.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return m ? m[1].trim() : str.trim();
}

/** HTMLエンティティを簡易デコード */
function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/** RSS XML から item[] を解析して返す */
function parseRss(xml, sourceLabel) {
  // <item>〜</item> を全件抽出
  const itemBlocks = extractTags(xml, "item");
  const items = [];

  for (const block of itemBlocks) {
    // title
    const titleMatch = block.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? decodeEntities(stripCdata(titleMatch[1])) : null;

    // link（<link> または <guid isPermaLink="true">）
    const linkMatch = block.match(/<link[^>]*>([\s\S]*?)<\/link>/i)
      || block.match(/<guid[^>]*isPermaLink="true"[^>]*>([\s\S]*?)<\/guid>/i);
    const link = linkMatch ? stripCdata(linkMatch[1]).trim() : null;

    // pubDate
    const dateMatch = block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
    const date = dateMatch ? dateMatch[1].trim() : new Date().toISOString();

    if (title && link) {
      items.push({ title, link, date, source: sourceLabel });
    }
  }

  return items;
}

// ── フェッチ ──────────────────────────────────────────────────────────────

async function fetchFeed(url, label) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.warn(`  ⚠ ${label}: HTTP ${res.status}`);
      return [];
    }

    const xml = await res.text();
    const items = parseRss(xml, label);
    console.log(`  ✓ ${label}: ${items.length}件取得`);
    return items;
  } catch (e) {
    console.warn(`  ✗ ${label}: ${e.message}`);
    return [];
  }
}

// ── メイン ────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔄 furugiru コラボRSSアップデーター\n");

  const allItems = [];

  for (const feed of RSS_FEEDS) {
    const items = await fetchFeed(feed.url, feed.label);
    allItems.push(...items);
    // レート制限対策
    await new Promise((r) => setTimeout(r, 700));
  }

  if (allItems.length === 0) {
    console.error("\n❌ 全フィードの取得に失敗しました。ネットワーク接続を確認してください。");
    process.exit(1);
  }

  // 日付降順ソート → 重複URLを除去 → MAX_ITEMS件
  allItems.sort((a, b) => {
    const ta = new Date(a.date).getTime();
    const tb = new Date(b.date).getTime();
    return isNaN(tb) || isNaN(ta) ? 0 : tb - ta;
  });

  const seen = new Set();
  const deduplicated = allItems.filter((item) => {
    if (seen.has(item.link)) return false;
    seen.add(item.link);
    return true;
  });

  const items = deduplicated.slice(0, MAX_ITEMS);

  const output = {
    updatedAt: new Date().toISOString(),
    items,
  };

  console.log(`\n📊 結果: 合計 ${allItems.length}件 → 重複除去後 ${deduplicated.length}件 → 保存 ${items.length}件`);

  if (DRY_RUN) {
    console.log("\n[DRY RUN] 出力プレビュー（先頭3件）:");
    items.slice(0, 3).forEach((item) => {
      console.log(`  [${item.source}] ${item.title.slice(0, 60)}...`);
    });
    console.log("\n[DRY RUN] ファイルは変更されません");
  } else {
    writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), "utf-8");
    console.log(`\n✅ lib/collab-rss.json を更新しました（${items.length}件）`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
