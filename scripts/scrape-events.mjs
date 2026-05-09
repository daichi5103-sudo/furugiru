/**
 * 古着イベント自動更新スクリプト
 *
 * 機能:
 *   1. 定期開催イベントの nextDate を自動計算して更新
 *   2. fmfm.jp から九州の新着イベントを検出して lib/events.ts に追記
 *
 * 使い方:
 *   node scripts/scrape-events.mjs              # nextDate 更新のみ
 *   node scripts/scrape-events.mjs --discover   # 新着イベント検出＋追記
 *   node scripts/scrape-events.mjs --dry-run    # ファイルを変更せず出力のみ
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EVENTS_FILE = join(__dirname, "../lib/events.ts");

const DRY_RUN  = process.argv.includes("--dry-run");
const DISCOVER = process.argv.includes("--discover");

// ─── ユーティリティ ────────────────────────────────────────────────
function toDateString(date) {
  return date.toISOString().split("T")[0];
}

/** 名前を正規化（全角スペース→半角、複数スペース→1個、trim） */
function normalizeName(name) {
  return name
    .replace(/　/g, " ")
    .replace(/\s+/g, " ")
    .replace(/〜/g, "~")
    .trim()
    .toLowerCase();
}

/** 2つの名前が "十分に似ている" か判定 */
function isSimilarName(a, b) {
  const na = normalizeName(a);
  const nb = normalizeName(b);
  if (na === nb) return true;
  // スペースを除いた先頭6文字で比較（「風の市場〜」と「風の市場 〜 」などを同一視）
  const naC = na.replace(/\s/g, "");
  const nbC = nb.replace(/\s/g, "");
  if (naC.slice(0, 6) === nbC.slice(0, 6)) return true;
  // 片方がもう片方を含む（スペース除去後）
  if (naC.includes(nbC) || nbC.includes(naC)) return true;
  return false;
}

// ─── 定期開催の nextDate 更新ルール ────────────────────────────────
function nextOccurrence(dayOfWeek, weekOfMonth) {
  const today = new Date();
  for (let m = 0; m <= 1; m++) {
    const d = new Date(today.getFullYear(), today.getMonth() + m, 1);
    let count = 0;
    while (d.getMonth() === today.getMonth() + m) {
      if (d.getDay() === dayOfWeek) {
        count++;
        if (count === weekOfMonth && d >= today) return toDateString(d);
      }
      d.setDate(d.getDate() + 1);
    }
  }
  return null;
}

function nextMonthlyDate(day) {
  const today = new Date();
  const candidate = new Date(today.getFullYear(), today.getMonth(), day);
  if (candidate >= today) return toDateString(candidate);
  return toDateString(new Date(today.getFullYear(), today.getMonth() + 1, day));
}

const SCHEDULE_RULES = [
  { id: 1,  fn: () => nextOccurrence(0, 1) },  // 大江戸骨董市 — 第1日曜
  { id: 7,  fn: () => nextOccurrence(6, 2) },  // 東京フリマ — 第2土曜
  { id: 11, fn: () => nextOccurrence(0, 4) },  // 鶴見のみの市 — 第4日曜
  { id: 14, fn: () => nextOccurrence(6, 2) },  // 中崎町古道具市 — 第2土曜
  { id: 16, fn: () => nextOccurrence(6, 3) },  // 京都蚤の市 — 第3土曜
  { id: 18, fn: () => nextMonthlyDate(18) },   // 大須骨董市 — 毎月18日
  { id: 20, fn: () => nextOccurrence(0, 1) },  // 天神蚤の市 — 第1日曜
  { id: 24, fn: () => nextOccurrence(6, 3) },  // 下北沢レコード&古着 — 第3土曜
  { id: 25, fn: () => nextOccurrence(0, 2) },  // 原宿ヴィンテージ — 第2日曜
  { id: 26, fn: () => nextOccurrence(6, 3) },  // 護国神社蚤の市 — 第3土曜
  { id: 27, fn: () => nextOccurrence(0, 3) },  // 筥崎宮蚤の市 — 第3日曜
  { id: 35, fn: () => nextOccurrence(0, 2) },  // 霧島フリマ — 第2日曜
];

// ─── fmfm.jp スクレイパー ──────────────────────────────────────────
const KYUSHU_PAGES = [
  { area: "福岡",   url: "https://fmfm.jp/event/antique/fukuoka" },
  { area: "熊本",   url: "https://fmfm.jp/event/antique/kumamoto" },
  { area: "長崎",   url: "https://fmfm.jp/event/antique/nagasaki" },
  { area: "佐賀",   url: "https://fmfm.jp/event/antique/saga" },
  { area: "大分",   url: "https://fmfm.jp/event/antique/oita" },
  { area: "宮崎",   url: "https://fmfm.jp/event/antique/miyazaki" },
  { area: "鹿児島", url: "https://fmfm.jp/event/antique/kagoshima" },
  { area: "北九州", url: "https://fmfm.jp/event/antique/kitakyushu" },
];

// カテゴリのマッピング
const CATEGORY_MAP = {
  "蚤の市": "蚤の市",
  "フリマ": "フリマ",
  "フリーマーケット": "フリマ",
  "骨董市": "骨董市",
  "骨董": "骨董市",
  "アンティーク": "骨董市",
  "ヴィンテージ": "ヴィンテージフェア",
  "古着": "古着市",
};

function mapCategory(raw) {
  for (const [key, val] of Object.entries(CATEGORY_MAP)) {
    if (raw.includes(key)) return val;
  }
  return "蚤の市";
}

// 古着・アンティーク関連キーワード
const VINTAGE_KEYWORDS = [
  "古着", "ヴィンテージ", "蚤の市", "骨董", "アンティーク",
  "フリマ", "フリーマーケット", "バザー", "古物", "リサイクル",
];
function isVintageRelated(name) {
  const n = name.toLowerCase();
  return VINTAGE_KEYWORDS.some((kw) => n.includes(kw.toLowerCase()));
}

// アクセス情報から会場名を抽出（駅名・交通情報を除く）
function cleanVenue(access, area) {
  if (!access) return `${area}（会場詳細はURLで確認）`;
  // 改行・連続スペースを除去
  const clean = access.split(/[\n\r]/)[0].replace(/\s+/g, " ").trim();
  // 交通情報だけの場合はエリア名を返す
  if (/駅|バス|徒歩|分|号線/.test(clean) && clean.length > 30) {
    return `${area}（会場詳細はURLで確認）`;
  }
  return clean.slice(0, 40);
}

async function fetchFmfmPage(area, url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "ja,en;q=0.9",
      },
    });
    if (!res.ok) return [];
    const html = await res.text();

    const events = [];
    const seen = new Set();

    const linkPattern = /href="(https:\/\/fmfm\.jp\/event\/detail\/(\d+))" class="eventItem"/g;
    let m;
    while ((m = linkPattern.exec(html)) !== null) {
      const eventUrl = m[1];
      const eventId  = m[2];
      if (seen.has(eventId)) continue;
      seen.add(eventId);

      const chunk = html.slice(m.index, m.index + 1000);

      // イベント名
      const nameMatch = chunk.match(/class="eventItem__name">([^<]{2,80})<\/span>/);
      const name = nameMatch ? nameMatch[1].trim() : null;

      // カテゴリ
      const catMatch = chunk.match(/class="eventItem__category">([^<]+)<\/div>/);
      const category = catMatch ? mapCategory(catMatch[1].trim()) : "蚤の市";

      // 日付: "MM/DD (曜)"
      const calMatch = chunk.match(/class="eventItem__calendar">(\d{2})\/(\d{2})/);
      let nextDate = null;
      if (calMatch) {
        const now = new Date();
        const mm = parseInt(calMatch[1]);
        const dd = parseInt(calMatch[2]);
        let candidate = new Date(now.getFullYear(), mm - 1, dd);
        if (candidate < now) candidate = new Date(now.getFullYear() + 1, mm - 1, dd);
        nextDate = toDateString(candidate);
      }

      // 店舗数
      const boothMatch = chunk.match(/class="eventItem__booth">([^<]+)<\/div>/);
      const booth = boothMatch ? boothMatch[1].trim() : null;

      // アクセス（会場情報）
      const accessMatch = chunk.match(/class="eventItem__access">&nbsp;&nbsp;([^<]{2,120})/);
      const venue = cleanVenue(accessMatch ? accessMatch[1].trim() : null, area);

      if (name && nextDate) {
        events.push({
          fmfmId: eventId,
          name: name.replace(/　/g, " ").replace(/\s+/g, " ").trim(),
          area,
          nextDate,
          venue,
          category,
          booth,
          url: eventUrl,
          isVintage: isVintageRelated(name),
        });
      }
    }

    return events;
  } catch (e) {
    console.error(`  ✗ ${area}: ${e.message}`);
    return [];
  }
}

// ─── メイン処理 ────────────────────────────────────────────────────
async function main() {
  console.log("🔄 furugiru イベントアップデーター\n");

  const source = readFileSync(EVENTS_FILE, "utf-8");
  let updated = source;

  // ── Step 1: nextDate 更新 ──────────────────────────────────────
  console.log("📅 Step 1: 定期開催イベントの日程更新...");
  let dateUpdateCount = 0;

  for (const rule of SCHEDULE_RULES) {
    const newDate = rule.fn();
    if (!newDate) continue;
    const pattern = new RegExp(`(id: ${rule.id},[\\s\\S]*?nextDate: ")[^"]*(")`);
    const replaced = updated.replace(pattern, `$1${newDate}$2`);
    if (replaced !== updated) {
      updated = replaced;
      dateUpdateCount++;
      console.log(`  ✓ id:${rule.id} → ${newDate}`);
    }
  }
  console.log(`  → ${dateUpdateCount}件更新\n`);

  // ── Step 2: fmfm.jp 新着検出 ──────────────────────────────────
  if (!DISCOVER) {
    console.log("💡 --discover フラグがないため新着検出をスキップします");
  } else {
    console.log("🔍 Step 2: fmfm.jp 九州エリアの新着イベント検出...");

    // 既存イベント名を抽出
    const existingNames = [...source.matchAll(/\bname: "([^"]+)"/g)].map((m) => m[1]);
    // 既存の fmfmId を抽出（URL から）
    const existingUrls = [...source.matchAll(/url: "(https:\/\/fmfm\.jp\/event\/detail\/(\d+))"/g)].map((m) => m[2]);

    let allFound = [];
    for (const { area, url } of KYUSHU_PAGES) {
      process.stdout.write(`  フェッチ中: ${area}...`);
      const events = await fetchFmfmPage(area, url);
      console.log(` ${events.length}件`);
      allFound = allFound.concat(events);
      await new Promise((r) => setTimeout(r, 700));
    }

    // 重複フィルタリング（名前の類似性 + fmfmId 両方でチェック）
    const newEvents = allFound.filter((e) => {
      const idDup   = existingUrls.includes(e.fmfmId);
      const nameDup = existingNames.some((n) => isSimilarName(n, e.name));
      return !idDup && !nameDup;
    });

    const vintageNew = newEvents.filter((e) => e.isVintage);
    const otherNew   = newEvents.filter((e) => !e.isVintage);

    console.log(`\n📊 検出結果:`);
    console.log(`  合計取得:         ${allFound.length}件`);
    console.log(`  既存と重複:       ${allFound.length - newEvents.length}件`);
    console.log(`  新着（古着関連）: ${vintageNew.length}件 ← 自動追加`);
    console.log(`  新着（その他）:   ${otherNew.length}件（スキップ）`);

    if (vintageNew.length > 0) {
      console.log("\n✨ 自動追加対象:");
      for (const e of vintageNew) {
        console.log(`  + [${e.area}] ${e.name}`);
        console.log(`    日程: ${e.nextDate}  ${e.booth ? `出店: ${e.booth}  ` : ""}カテゴリ: ${e.category}`);
        console.log(`    URL: ${e.url}`);
      }

      if (!DRY_RUN) {
        // 現在の最大 id
        const idMatches = [...source.matchAll(/\bid: (\d+)/g)];
        let nextId = Math.max(...idMatches.map((m) => parseInt(m[1]))) + 1;

        const newEntries = vintageNew.map((e) => {
          const boothNote = e.booth ? `${e.booth}が集まる` : "";
          return `  {
    id: ${nextId++},
    name: "${e.name}",
    area: "${e.area}",
    venue: "${e.venue}",
    category: "${e.category}",
    schedule: "fmfm.jpより自動取得",
    nextDate: "${e.nextDate}",
    url: "${e.url}",
    description: "${boothNote}${e.area}で開催される${e.category}。詳細は公式URLをご確認ください。",
    admission: "要確認",
    tags: ["${e.area}", "九州", "自動取得"],
  }`;
        }).join(",\n");

        // ]; の直前に挿入
        updated = updated.replace(/\n\];\s*$/, `,\n${newEntries},\n];\n`);
        console.log(`\n  → ${vintageNew.length}件を追記します`);
      } else {
        console.log("\n  [DRY RUN] ファイルは変更されません");
      }
    } else {
      console.log("\n  新着なし（すべて既存と重複または古着キーワードなし）");
    }

    if (otherNew.length > 0) {
      console.log("\n📋 スキップした新着（古着キーワードなし）:");
      for (const e of otherNew) {
        console.log(`  - [${e.area}] ${e.name} (${e.nextDate})`);
      }
    }
  }

  // ── ファイル書き込み ───────────────────────────────────────────
  if (!DRY_RUN && updated !== source) {
    writeFileSync(EVENTS_FILE, updated, "utf-8");
    console.log(`\n✅ lib/events.ts を更新しました`);
  } else if (DRY_RUN) {
    console.log(`\n[DRY RUN] 完了（ファイル変更なし）`);
  } else {
    console.log("\n変更なし");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
