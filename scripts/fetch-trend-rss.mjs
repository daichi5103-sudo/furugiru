/**
 * scripts/fetch-trend-rss.mjs
 * Hypebeast / Highsnobiety の RSS から古着・ヴィンテージ関連記事を抽出して
 * lib/trend-rss.json を更新する
 *
 * 使い方:
 *   node scripts/fetch-trend-rss.mjs              # 通常実行
 *   node scripts/fetch-trend-rss.mjs --dry-run    # ファイルを変更せず結果を出力
 */

import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = join(__dirname, "../lib/trend-rss.json");
const DRY_RUN = process.argv.includes("--dry-run");
const MAX_ITEMS = 20;

const RSS_FEEDS = [
  { url: "https://hypebeast.com/feed",            label: "Hypebeast" },
  { url: "https://www.highsnobiety.com/feed/",    label: "Highsnobiety" },
];

// 古着・ヴィンテージ・トレンド関連キーワード
const VINTAGE_KEYWORDS = [
  "vintage", "ヴィンテージ", "古着", "secondhand", "second-hand",
  "levi", "champion", "carhartt", "barbour", "patagonia", "north face",
  "thrift", "retro", "archive", "deadstock", "workwear",
  "denim", "fleece", "puffer", "waxed", "trucker",
];

// ── XML パーサー（依存ゼロ）──────────────────────────────────────────────

function stripCdata(str) {
  const m = str.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return m ? m[1].trim() : str.trim();
}

function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function parseRss(xml, sourceLabel) {
  const itemBlocks = [];
  const re = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) itemBlocks.push(m[1]);

  return itemBlocks.map((block) => {
    const titleMatch = block.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const linkMatch  = block.match(/<link[^>]*>([\s\S]*?)<\/link>/i)
      || block.match(/<guid[^>]*isPermaLink="true"[^>]*>([\s\S]*?)<\/guid>/i);
    const dateMatch  = block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);

    return {
      title:  titleMatch ? decodeEntities(stripCdata(titleMatch[1])) : null,
      link:   linkMatch  ? stripCdata(linkMatch[1]).trim()            : null,
      date:   dateMatch  ? dateMatch[1].trim()                       : new Date().toISOString(),
      source: sourceLabel,
    };
  }).filter((item) => item.title && item.link);
}

function isVintageRelated(title) {
  const t = title.toLowerCase();
  return VINTAGE_KEYWORDS.some((kw) => t.includes(kw.toLowerCase()));
}

// ── フェッチ ──────────────────────────────────────────────────────────────

async function fetchFeed(url, label) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) { console.warn(`  ⚠ ${label}: HTTP ${res.status}`); return []; }
    const xml = await res.text();
    const all = parseRss(xml, label);
    const filtered = all.filter((item) => isVintageRelated(item.title));
    console.log(`  ✓ ${label}: ${all.length}件取得 → 古着関連 ${filtered.length}件`);
    return filtered;
  } catch (e) {
    console.warn(`  ✗ ${label}: ${e.message}`);
    return [];
  }
}

// ── メイン ────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔄 furugiru トレンドRSSアップデーター\n");

  const allItems = [];
  for (const feed of RSS_FEEDS) {
    const items = await fetchFeed(feed.url, feed.label);
    allItems.push(...items);
    await new Promise((r) => setTimeout(r, 700));
  }

  allItems.sort((a, b) => {
    const ta = new Date(a.date).getTime();
    const tb = new Date(b.date).getTime();
    return isNaN(ta) || isNaN(tb) ? 0 : tb - ta;
  });

  const seen = new Set();
  const items = allItems.filter((item) => {
    if (seen.has(item.link)) return false;
    seen.add(item.link);
    return true;
  }).slice(0, MAX_ITEMS);

  const output = { updatedAt: new Date().toISOString(), items };

  console.log(`\n📊 結果: 古着関連 ${allItems.length}件 → 保存 ${items.length}件`);

  if (DRY_RUN) {
    console.log("\n[DRY RUN] プレビュー（先頭3件）:");
    items.slice(0, 3).forEach((item) => console.log(`  [${item.source}] ${item.title.slice(0, 60)}...`));
    console.log("\n[DRY RUN] ファイルは変更されません");
  } else {
    writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), "utf-8");
    console.log(`\n✅ lib/trend-rss.json を更新しました（${items.length}件）`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
