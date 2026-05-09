import React from "react";

// ── Shared base ──────────────────────────────────────────────────────────────
function Tag({ bg = "#F0EDE8", stroke = "#C8C0B0", children }: {
  bg?: string; stroke?: string; children: React.ReactNode;
}) {
  return (
    <svg viewBox="0 0 160 100" width="160" height="100" style={{ display: "block" }}>
      <rect x="2" y="2" width="156" height="96" rx="4" fill={bg} stroke={stroke} strokeWidth="1.5"/>
      {children}
    </svg>
  );
}

function YearBar({ label, color }: { label: string; color: string }) {
  return (
    <>
      <rect x="20" y="86" width="120" height="10" rx="2" fill={color}/>
      <text x="80" y="94" textAnchor="middle" fontSize="7" fill="white" letterSpacing="1">{label}</text>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Levi's
// ════════════════════════════════════════════════════════════════════════════

export function LevisXX() {
  return (
    <Tag bg="#F0EDE8" stroke="#C8C0B0">
      <circle cx="20" cy="50" r="5" fill="none" stroke="#A89880" strokeWidth="1.5"/>
      <text x="80" y="44" textAnchor="middle" fontSize="30" fontFamily="Georgia, serif" fontWeight="700" fill="#1B3A6B" letterSpacing="6">XX</text>
      <text x="80" y="60" textAnchor="middle" fontSize="10" fontFamily="Georgia, serif" fill="#1B3A6B" letterSpacing="2">LEVI STRAUSS &amp; CO.</text>
      <text x="80" y="74" textAnchor="middle" fontSize="8" fill="#7A6A58" letterSpacing="1">MADE IN USA  ·  〜1954</text>
      <YearBar label="XX タグ  ·  超希少" color="#1B3A6B"/>
    </Tag>
  );
}

export function LevisBigE() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      {/* red tab */}
      <rect x="2" y="28" width="34" height="42" rx="2" fill="#CC0000"/>
      <text x="19" y="49" textAnchor="middle" fontSize="7" fontWeight="900" fill="white" letterSpacing="0.5">LEVI'S</text>
      <rect x="8" y="55" width="22" height="8" rx="1" fill="#FF4444"/>
      <text x="19" y="62" textAnchor="middle" fontSize="6" fill="white">← Big E</text>
      {/* main */}
      <text x="99" y="36" textAnchor="middle" fontSize="13" fontFamily="Georgia, serif" fontWeight="700" fill="#222" letterSpacing="1">LEVI'S®</text>
      <line x1="44" y1="43" x2="155" y2="43" stroke="#DDD" strokeWidth="0.8"/>
      <text x="99" y="56" textAnchor="middle" fontSize="9" fill="#555">MADE IN USA</text>
      <text x="99" y="69" textAnchor="middle" fontSize="8" fill="#888">501® JEANS</text>
      <YearBar label="Big E  ·  1955–1971  ·  希少" color="#1B3A6B"/>
    </Tag>
  );
}

export function LevisSmallE() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      {/* red tab */}
      <rect x="2" y="28" width="34" height="42" rx="2" fill="#CC0000"/>
      <text x="19" y="46" textAnchor="middle" fontSize="7" fontWeight="900" fill="white">Le</text>
      <text x="19" y="55" textAnchor="middle" fontSize="7" fontWeight="900" fill="white">VI'S</text>
      <rect x="8" y="58" width="22" height="8" rx="1" fill="#FF6666"/>
      <text x="19" y="65" textAnchor="middle" fontSize="6" fill="white">small e</text>
      {/* main */}
      <text x="99" y="36" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="700" fill="#222">Levi's®</text>
      <line x1="44" y1="43" x2="155" y2="43" stroke="#DDD" strokeWidth="0.8"/>
      <text x="99" y="56" textAnchor="middle" fontSize="9" fill="#555">MADE IN USA</text>
      <text x="99" y="69" textAnchor="middle" fontSize="8" fill="#888">紙パッチ</text>
      <YearBar label="Small e  ·  1971–1983  ·  やや希少" color="#1B3A6B"/>
    </Tag>
  );
}

export function LevisOrangeTab() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      {/* orange tab */}
      <rect x="2" y="28" width="34" height="42" rx="2" fill="#FF6600"/>
      <text x="19" y="49" textAnchor="middle" fontSize="6" fontWeight="900" fill="white" letterSpacing="0.3">ORANGE</text>
      <text x="19" y="60" textAnchor="middle" fontSize="6" fill="#FFD090">TAB</text>
      {/* main */}
      <text x="99" y="36" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="700" fill="#222">Levi's®</text>
      <line x1="44" y1="43" x2="155" y2="43" stroke="#DDD" strokeWidth="0.8"/>
      <text x="99" y="56" textAnchor="middle" fontSize="9" fill="#555">MADE IN [country]</text>
      <text x="99" y="69" textAnchor="middle" fontSize="8" fill="#888">海外生産移行期</text>
      <YearBar label="移行期  ·  1983–1999  ·  普通" color="#888"/>
    </Tag>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Champion
// ════════════════════════════════════════════════════════════════════════════

export function ChampionEarly() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      {/* running man (simplified silhouette) */}
      <g transform="translate(28,18)">
        <circle cx="0" cy="0" r="6" fill="#333"/>
        <line x1="0" y1="6" x2="-2" y2="20" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
        <line x1="-2" y1="20" x2="-10" y2="30" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="-2" y1="20" x2="6" y2="28" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="-1" y1="10" x2="-10" y2="16" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        <line x1="-1" y1="10" x2="7" y2="14" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <text x="62" y="3" fontSize="7" fill="#999">← 走る向きに注目</text>
      <line x1="50" y1="8" x2="155" y2="8" stroke="#EEE" strokeWidth="1"/>
      <text x="103" y="30" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="900" fill="#CC0000" letterSpacing="1">CHAMPION</text>
      <text x="103" y="44" textAnchor="middle" fontSize="9" fill="#555">KNITWEAR</text>
      <text x="103" y="58" textAnchor="middle" fontSize="8" fill="#888">MADE IN USA</text>
      <text x="103" y="71" textAnchor="middle" fontSize="8" fill="#888">ヘビーコットン</text>
      <YearBar label="初期タグ  ·  1952–1969  ·  超希少" color="#CC0000"/>
    </Tag>
  );
}

export function ChampionTrico() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      {/* tricolor stripes */}
      <rect x="2" y="2" width="156" height="24" rx="4" fill="#003087"/>
      <rect x="2" y="26" width="156" height="18" fill="#CC0000"/>
      <rect x="2" y="44" width="156" height="14" fill="#B8974A"/>
      <text x="80" y="20" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="900" fill="white" letterSpacing="1.5">CHAMPION</text>
      <text x="80" y="39" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="white">KNITWEAR</text>
      {/* body */}
      <text x="80" y="67" textAnchor="middle" fontSize="9" fill="#444">REVERSE WEAVE®</text>
      <text x="80" y="79" textAnchor="middle" fontSize="8" fill="#888">MADE IN USA</text>
      <YearBar label="トリコタグ  ·  1970–1975  ·  希少" color="#CC0000"/>
    </Tag>
  );
}

export function ChampionBar() {
  return (
    <Tag bg="#F5F5F5" stroke="#CCCCCC">
      {/* horizontal bar */}
      <rect x="10" y="26" width="140" height="46" rx="3" fill="white" stroke="#222" strokeWidth="2"/>
      <text x="38" y="56" textAnchor="middle" fontSize="26" fontFamily="Georgia, serif" fontWeight="900" fill="#CC0000">C</text>
      <line x1="58" y1="28" x2="58" y2="70" stroke="#EEE" strokeWidth="1"/>
      <text x="108" y="44" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="900" fill="#1B1B1B" letterSpacing="1">CHAMPION</text>
      <text x="108" y="57" textAnchor="middle" fontSize="8" fill="#555">REVERSE WEAVE</text>
      <text x="108" y="68" textAnchor="middle" fontSize="7" fill="#888">MADE IN USA</text>
      <YearBar label="バータグ  ·  1975–1985  ·  やや希少" color="#333"/>
    </Tag>
  );
}

export function ChampionNidan() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      {/* two-row layout */}
      <rect x="10" y="12" width="140" height="32" rx="2" fill="white" stroke="#CC0000" strokeWidth="1.5"/>
      <text x="80" y="32" textAnchor="middle" fontSize="14" fontFamily="sans-serif" fontWeight="900" fill="#CC0000" letterSpacing="1">Champion</text>
      <line x1="10" y1="44" x2="150" y2="44" stroke="#EEE" strokeWidth="1"/>
      <rect x="10" y="46" width="140" height="24" rx="2" fill="white" stroke="#CCC" strokeWidth="1"/>
      <text x="80" y="62" textAnchor="middle" fontSize="11" fill="#555">SIZE: L  |  MADE IN USA</text>
      <text x="80" y="78" textAnchor="middle" fontSize="7" fill="#AAA">↑ 上下2段構成タグ</text>
      <YearBar label="二段タグ  ·  1986–1999  ·  普通" color="#888"/>
    </Tag>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Nike
// ════════════════════════════════════════════════════════════════════════════

export function NikeEarly() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      {/* thick simple swoosh */}
      <path d="M 20 62 Q 80 28 148 44 Q 100 46 72 64 Z" fill="#222"/>
      <text x="80" y="20" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontStyle="italic" fontWeight="700" fill="#333">Nike</text>
      <text x="80" y="76" textAnchor="middle" fontSize="8" fill="#666">MADE IN JAPAN / KOREA</text>
      <text x="80" y="85" textAnchor="middle" fontSize="7" fill="#AAA">← 手書き風フォント・太いスウッシュ</text>
      <YearBar label="初期スウッシュ  ·  1972–1979  ·  超希少" color="#111"/>
    </Tag>
  );
}

export function NikeGray() {
  return (
    <Tag bg="#DDDDDD" stroke="#BBBBBB">
      {/* cursive Nike + swoosh */}
      <text x="80" y="32" textAnchor="middle" fontSize="14" fontFamily="sans-serif" fontStyle="italic" fontWeight="700" fill="#111" letterSpacing="1">Nike</text>
      <path d="M 30 52 Q 80 34 138 44 Q 96 46 72 58 Z" fill="#111"/>
      <text x="80" y="72" textAnchor="middle" fontSize="8" fill="#444">MADE IN USA / KOREA</text>
      <text x="80" y="82" textAnchor="middle" fontSize="7" fill="#666">← グレー地タグ</text>
      <YearBar label="グレー/オレンジタグ  ·  1980–1989  ·  希少" color="#444"/>
    </Tag>
  );
}

export function NikeCenter() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      {/* center swoosh — large */}
      <path d="M 18 60 Q 80 16 148 36 Q 94 40 66 62 Z" fill="#111"/>
      <text x="80" y="78" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="900" fill="#111" letterSpacing="4">NIKE</text>
      <text x="80" y="8" textAnchor="middle" fontSize="7" fill="#AAA">↑ センターに大きなスウッシュ</text>
      <YearBar label="センタースウッシュ  ·  1990–1995  ·  やや希少" color="#111"/>
    </Tag>
  );
}

export function NikeCurrent() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      <path d="M 30 56 Q 80 26 140 40 Q 96 42 72 58 Z" fill="#111"/>
      <text x="80" y="72" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="900" fill="#111" letterSpacing="3">NIKE</text>
      <text x="80" y="82" textAnchor="middle" fontSize="7" fill="#AAA">Dri-FIT / VIETNAM製</text>
      <YearBar label="現行移行期  ·  1996–2009  ·  普通" color="#888"/>
    </Tag>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Carhartt
// ════════════════════════════════════════════════════════════════════════════

export function CarharttEarly() {
  return (
    <Tag bg="#F5EDD5" stroke="#C8A840">
      <text x="80" y="38" textAnchor="middle" fontSize="16" fontFamily="sans-serif" fontWeight="900" fill="#1A1A1A" letterSpacing="2">CARHARTT</text>
      <line x1="20" y1="46" x2="140" y2="46" stroke="#C8A840" strokeWidth="0.8"/>
      <text x="80" y="58" textAnchor="middle" fontSize="8" fill="#5A4A2A" letterSpacing="0.5">QUALITY CLOTHING SINCE 1889</text>
      <text x="80" y="70" textAnchor="middle" fontSize="9" fill="#888">MADE IN USA</text>
      <text x="80" y="82" textAnchor="middle" fontSize="7" fill="#AAA">← Cロゴなし・文字のみ</text>
      <YearBar label="初期ワークタグ  ·  〜1979  ·  超希少" color="#8B6914"/>
    </Tag>
  );
}

export function CarharttC() {
  return (
    <Tag bg="#F5EDD5" stroke="#C8A840">
      {/* large C logo */}
      <text x="46" y="64" textAnchor="middle" fontSize="48" fontFamily="Georgia, serif" fontWeight="900" fill="#D4A017">C</text>
      <line x1="74" y1="14" x2="74" y2="82" stroke="#C8A84040" strokeWidth="1"/>
      <text x="116" y="36" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="900" fill="#1A1A1A" letterSpacing="1">CARHARTT</text>
      <text x="116" y="50" textAnchor="middle" fontSize="7" fill="#5A4A2A">QUALITY CLOTHING</text>
      <text x="116" y="62" textAnchor="middle" fontSize="7" fill="#5A4A2A">SINCE 1889</text>
      <text x="116" y="74" textAnchor="middle" fontSize="8" fill="#888">MADE IN USA</text>
      <YearBar label="Cロゴタグ  ·  1980–1999  ·  やや希少" color="#8B6914"/>
    </Tag>
  );
}

export function CarharttWip() {
  return (
    <Tag bg="#F5EDD5" stroke="#C8A840">
      <text x="80" y="34" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="900" fill="#1A1A1A" letterSpacing="1">Carhartt</text>
      <rect x="52" y="38" width="56" height="16" rx="2" fill="#D4A017"/>
      <text x="80" y="50" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="white" letterSpacing="1">WIP</text>
      <text x="80" y="66" textAnchor="middle" fontSize="7" fill="#5A4A2A">Work In Progress</text>
      <text x="80" y="78" textAnchor="middle" fontSize="8" fill="#888">欧州ライン · スリムシルエット</text>
      <YearBar label="WIPタグ  ·  1994–現在  ·  普通" color="#888"/>
    </Tag>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Barbour
// ════════════════════════════════════════════════════════════════════════════

export function BarbourGold() {
  return (
    <Tag bg="#F0E8C8" stroke="#C8A840">
      <text x="80" y="26" textAnchor="middle" fontSize="16" fontFamily="Georgia, serif" fontWeight="700" fill="#2C4A2E" letterSpacing="2">Barbour</text>
      <text x="80" y="38" textAnchor="middle" fontSize="7" fill="#5A4A2A" letterSpacing="1">J. BARBOUR &amp; SONS</text>
      <line x1="20" y1="44" x2="140" y2="44" stroke="#8B7D6B" strokeWidth="0.5"/>
      <text x="80" y="56" textAnchor="middle" fontSize="8" fill="#5A4A2A">SOUTH SHIELDS, ENGLAND</text>
      <text x="80" y="68" textAnchor="middle" fontSize="8" fill="#888">ゴールド地 · 初期タグ</text>
      <text x="80" y="79" textAnchor="middle" fontSize="7" fill="#AAA">ワラントなし（初期）</text>
      <YearBar label="初期ゴールドタグ  ·  〜1969  ·  超希少" color="#8B6914"/>
    </Tag>
  );
}

export function Barbour3Warrant() {
  return (
    <Tag bg="#F0EDE6" stroke="#8B7D6B">
      <text x="80" y="18" textAnchor="middle" fontSize="14" fontFamily="Georgia, serif" fontWeight="700" fill="#2C4A2E" letterSpacing="2">Barbour</text>
      <text x="80" y="28" textAnchor="middle" fontSize="6" fill="#5A4A2A" letterSpacing="0.5">BY APPOINTMENT TO</text>
      {/* 3 warrant shields */}
      {([28, 80, 132] as number[]).map((x) => (
        <g key={x}>
          <polygon points={`${x},33 ${x-11},41 ${x-11},54 ${x},58 ${x+11},54 ${x+11},41`} fill="none" stroke="#8B7D6B" strokeWidth="1.2"/>
          <text x={x} y="50" textAnchor="middle" fontSize="10" fill="#2C4A2E">♛</text>
        </g>
      ))}
      <text x="80" y="70" textAnchor="middle" fontSize="7" fill="#5A4A2A" letterSpacing="0.5">↑ 3つのロイヤルワラント</text>
      <text x="80" y="80" textAnchor="middle" fontSize="8" fill="#888">MADE IN ENGLAND</text>
      <YearBar label="3ワラントタグ  ·  1970–1989  ·  希少" color="#2C4A2E"/>
    </Tag>
  );
}

export function BarbourCurrent() {
  return (
    <Tag bg="#F0EDE6" stroke="#8B7D6B">
      <text x="80" y="38" textAnchor="middle" fontSize="15" fontFamily="Georgia, serif" fontWeight="700" fill="#2C4A2E" letterSpacing="2">Barbour</text>
      <line x1="30" y1="46" x2="130" y2="46" stroke="#8B7D6B" strokeWidth="0.5"/>
      <text x="80" y="60" textAnchor="middle" fontSize="8" fill="#5A4A2A">簡略化デザイン</text>
      <text x="80" y="72" textAnchor="middle" fontSize="8" fill="#888">海外生産移行 · リワックス対応</text>
      <text x="80" y="82" textAnchor="middle" fontSize="7" fill="#AAA">ワラント数が減少</text>
      <YearBar label="現行移行タグ  ·  1990–2009  ·  やや希少" color="#888"/>
    </Tag>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Patagonia
// ════════════════════════════════════════════════════════════════════════════

export function PatagoniaGray() {
  return (
    <Tag bg="#CCCCCC" stroke="#AAAAAA">
      <text x="80" y="36" textAnchor="middle" fontSize="16" fontFamily="sans-serif" fill="#1A1A1A" letterSpacing="1">patagonia</text>
      <text x="80" y="50" textAnchor="middle" fontSize="7" fill="#333" letterSpacing="1">← 小文字ロゴ</text>
      <line x1="30" y1="56" x2="130" y2="56" stroke="#AAAAAA" strokeWidth="0.5"/>
      <text x="80" y="68" textAnchor="middle" fontSize="8" fill="#444">VENTURA, CALIFORNIA</text>
      <text x="80" y="79" textAnchor="middle" fontSize="8" fill="#555">MADE IN USA</text>
      <YearBar label="グレータグ  ·  1973–1984  ·  超希少" color="#444"/>
    </Tag>
  );
}

export function PatagoniaColor() {
  return (
    <Tag bg="#E85A2A" stroke="#C04010">
      <text x="80" y="28" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="700" fill="white" letterSpacing="1">patagonia</text>
      <line x1="20" y1="34" x2="140" y2="34" stroke="rgba(255,255,255,.4)" strokeWidth="0.5"/>
      <text x="80" y="48" textAnchor="middle" fontSize="12" fontFamily="sans-serif" fontWeight="900" fill="white" letterSpacing="2">SYNCHILLA™</text>
      <text x="80" y="62" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,.8)">← カラータグが年代で変化</text>
      <text x="80" y="74" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,.7)">オレンジ・赤・青など</text>
      <YearBar label="カラータグ  ·  1985–1999  ·  やや希少" color="#C04010"/>
    </Tag>
  );
}

export function PatagoniaCurrent() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      <text x="80" y="36" textAnchor="middle" fontSize="14" fontFamily="sans-serif" fill="#2A2A2A" letterSpacing="1">patagonia</text>
      <line x1="30" y1="44" x2="130" y2="44" stroke="#DDD" strokeWidth="0.5"/>
      <text x="80" y="56" textAnchor="middle" fontSize="8" fill="#555">FAIR TRADE CERTIFIED™</text>
      <text x="80" y="68" textAnchor="middle" fontSize="8" fill="#888">リサイクル素材 / 現行フォーマット</text>
      <YearBar label="現行タグ  ·  2000–現在  ·  普通" color="#888"/>
    </Tag>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// The North Face
// ════════════════════════════════════════════════════════════════════════════

export function TnfEarly() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      {/* half dome */}
      <path d="M 24 66 Q 80 18 136 66 Z" fill="#CC0000"/>
      <text x="80" y="78" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="700" fill="#111" letterSpacing="1">THE NORTH FACE</text>
      <text x="80" y="9" textAnchor="middle" fontSize="7" fill="#AAA">SAN FRANCISCO, CA</text>
      <text x="80" y="87" textAnchor="middle" fontSize="7" fill="#AAA">← 初期フォント · 太め</text>
      <YearBar label="初期ハーフドーム  ·  1966–1979  ·  超希少" color="#CC0000"/>
    </Tag>
  );
}

export function TnfUsa() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      {/* half dome */}
      <path d="M 28 60 Q 80 16 132 60 Z" fill="#CC0000"/>
      <text x="80" y="70" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="700" fill="#111" letterSpacing="0.8">THE NORTH FACE</text>
      <text x="80" y="80" textAnchor="middle" fontSize="8" fill="#555">MADE IN USA</text>
      {/* vintage color swatch hint */}
      <rect x="52" y="4" width="12" height="8" rx="1" fill="#7B3EA8"/>
      <rect x="66" y="4" width="12" height="8" rx="1" fill="#008B8B"/>
      <rect x="80" y="4" width="12" height="8" rx="1" fill="#B8860B"/>
      <text x="106" y="11" fontSize="6" fill="#AAA">廃番カラー</text>
      <YearBar label="旧ロゴUSA製  ·  1980–1999  ·  やや希少" color="#CC0000"/>
    </Tag>
  );
}

export function TnfCurrent() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      <path d="M 32 56 Q 80 18 128 56 Z" fill="#CC0000"/>
      <text x="80" y="68" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="700" fill="#111" letterSpacing="0.8">THE NORTH FACE</text>
      <text x="80" y="79" textAnchor="middle" fontSize="8" fill="#888">アジア生産 / 現行デザイン</text>
      <YearBar label="現行タグ  ·  2000–現在  ·  普通" color="#888"/>
    </Tag>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Lee
// ════════════════════════════════════════════════════════════════════════════

export function LeeEarly() {
  return (
    <Tag bg="#F0EDE8" stroke="#C8C0B0">
      <text x="80" y="36" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="900" fill="#1A1A1A" letterSpacing="2">H.D. LEE</text>
      <text x="80" y="50" textAnchor="middle" fontSize="9" fill="#5A4A3A">MERCANTILE COMPANY</text>
      <line x1="20" y1="58" x2="140" y2="58" stroke="#C8C0B0" strokeWidth="0.5"/>
      <text x="80" y="70" textAnchor="middle" fontSize="8" fill="#888">KANSAS / MISSOURI</text>
      <text x="80" y="81" textAnchor="middle" fontSize="7" fill="#AAA">← 正式社名 · ロゴなし</text>
      <YearBar label="初期タグ  ·  1910–1949  ·  超希少" color="#8B6914"/>
    </Tag>
  );
}

export function LeeBluLabel() {
  return (
    <Tag bg="#2255AA" stroke="#1A4488">
      {/* diagonal LEE */}
      <text
        x="80" y="56"
        textAnchor="middle"
        fontSize="38"
        fontFamily="sans-serif"
        fontWeight="900"
        fill="white"
        letterSpacing="4"
        transform="rotate(-12, 80, 56)"
      >LEE</text>
      <text x="80" y="12" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,.6)">← 斜め書きLEEロゴ</text>
      <text x="80" y="78" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,.7)">MADE IN USA</text>
      <YearBar label="ブルーラベル  ·  1950–1969  ·  希少" color="#1A4488"/>
    </Tag>
  );
}

export function LeeCurrent() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      <text x="80" y="48" textAnchor="middle" fontSize="28" fontFamily="sans-serif" fontWeight="900" fill="#B8860B" letterSpacing="4">LEE</text>
      <text x="80" y="62" textAnchor="middle" fontSize="8" fill="#888">← 横書き · 現行フォント</text>
      <text x="80" y="74" textAnchor="middle" fontSize="8" fill="#888">海外生産移行期</text>
      <YearBar label="現行移行タグ  ·  1970–1999  ·  普通" color="#888"/>
    </Tag>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Supreme
// ════════════════════════════════════════════════════════════════════════════

export function SupremeEarly() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      <rect x="20" y="14" width="120" height="46" rx="3" fill="white" stroke="#FF0000" strokeWidth="2"/>
      <text x="80" y="44" textAnchor="middle" fontSize="20" fontFamily="sans-serif" fontWeight="900" fill="#FF0000" fontStyle="italic" letterSpacing="1">Supreme</text>
      <text x="80" y="70" textAnchor="middle" fontSize="8" fill="#555">NEW YORK  ·  MADE IN USA</text>
      <text x="80" y="80" textAnchor="middle" fontSize="7" fill="#AAA">Futura Heavy Oblique フォント</text>
      <YearBar label="初期白タグ  ·  1994–2004  ·  超希少" color="#FF0000"/>
    </Tag>
  );
}

export function SupremeCurrent() {
  return (
    <Tag bg="#F8F8F8" stroke="#CCCCCC">
      <rect x="20" y="16" width="120" height="44" rx="2" fill="#FF0000"/>
      <text x="80" y="44" textAnchor="middle" fontSize="18" fontFamily="sans-serif" fontWeight="900" fill="white" fontStyle="italic" letterSpacing="1">Supreme</text>
      <text x="80" y="70" textAnchor="middle" fontSize="8" fill="#555">Box Logo / YKKジッパー</text>
      <text x="80" y="80" textAnchor="middle" fontSize="7" fill="#AAA">← 赤地 · 白文字が現行主流</text>
      <YearBar label="現行移行期  ·  2005–2019  ·  希少" color="#CC0000"/>
    </Tag>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Stone Island
// ════════════════════════════════════════════════════════════════════════════

export function SiEarly() {
  return (
    <Tag bg="#E8E4DC" stroke="#8B8070">
      {/* compass badge rough */}
      <circle cx="80" cy="44" r="26" fill="none" stroke="#333" strokeWidth="2"/>
      <circle cx="80" cy="44" r="20" fill="#2C3A4A"/>
      <text x="80" y="38" textAnchor="middle" fontSize="7" fill="white" letterSpacing="1">STONE</text>
      <text x="80" y="48" textAnchor="middle" fontSize="7" fill="white" letterSpacing="1">ISLAND</text>
      {/* compass directions */}
      <text x="80" y="22" textAnchor="middle" fontSize="7" fill="#555">N</text>
      <text x="80" y="72" textAnchor="middle" fontSize="7" fill="#555">S</text>
      <text x="56" y="48" textAnchor="middle" fontSize="7" fill="#555">W</text>
      <text x="104" y="48" textAnchor="middle" fontSize="7" fill="#555">E</text>
      <text x="80" y="81" textAnchor="middle" fontSize="7" fill="#AAA">← 初期・荒いコンパス</text>
      <YearBar label="初期コンパスバッジ  ·  1982–1989  ·  超希少" color="#2C3A4A"/>
    </Tag>
  );
}

export function Si90s() {
  return (
    <Tag bg="#E8E4DC" stroke="#8B8070">
      {/* refined compass badge */}
      <circle cx="80" cy="44" r="26" fill="none" stroke="#B8974A" strokeWidth="1.5"/>
      <circle cx="80" cy="44" r="22" fill="#1C4E80"/>
      {/* compass rose simplified */}
      <polygon points="80,24 84,40 80,44 76,40" fill="white"/>
      <polygon points="80,64 84,48 80,44 76,48" fill="rgba(255,255,255,.4)"/>
      <polygon points="60,44 76,40 80,44 76,48" fill="rgba(255,255,255,.4)"/>
      <polygon points="100,44 84,40 80,44 84,48" fill="rgba(255,255,255,.7)"/>
      <text x="80" y="48" textAnchor="middle" fontSize="5" fill="white" letterSpacing="0.5">STONE ISLAND</text>
      <text x="80" y="22" textAnchor="middle" fontSize="7" fill="#666">N</text>
      <text x="80" y="72" textAnchor="middle" fontSize="7" fill="#666">S</text>
      <text x="56" y="48" textAnchor="middle" fontSize="7" fill="#666">W</text>
      <text x="104" y="48" textAnchor="middle" fontSize="7" fill="#666">E</text>
      <text x="80" y="81" textAnchor="middle" fontSize="7" fill="#AAA">← 精密なコンパスローズ</text>
      <YearBar label="ワッペンタグ  ·  1990–1999  ·  希少" color="#1C4E80"/>
    </Tag>
  );
}

export function SiCurrent() {
  return (
    <Tag bg="#E8E4DC" stroke="#8B8070">
      <circle cx="80" cy="42" r="26" fill="none" stroke="#B8974A" strokeWidth="1"/>
      <circle cx="80" cy="42" r="22" fill="#1C4E80"/>
      <polygon points="80,22 84,38 80,42 76,38" fill="white"/>
      <polygon points="80,62 84,46 80,42 76,46" fill="rgba(255,255,255,.4)"/>
      <polygon points="60,42 76,38 80,42 76,46" fill="rgba(255,255,255,.4)"/>
      <polygon points="100,42 84,38 80,42 84,46" fill="rgba(255,255,255,.7)"/>
      <text x="80" y="46" textAnchor="middle" fontSize="5" fill="white" letterSpacing="0.5">STONE ISLAND</text>
      {/* NFC indicator */}
      <rect x="62" y="70" width="36" height="10" rx="2" fill="#333"/>
      <text x="80" y="79" textAnchor="middle" fontSize="6" fill="white" letterSpacing="0.5">NFC / QR認証</text>
      <YearBar label="現行バッジ  ·  2000–現在  ·  やや希少" color="#1C4E80"/>
    </Tag>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Brand → Era SVG map
// ════════════════════════════════════════════════════════════════════════════

export const TAG_SVG_MAP: Record<string, React.FC[]> = {
  levis:           [LevisXX, LevisBigE, LevisSmallE, LevisOrangeTab],
  champion:        [ChampionEarly, ChampionTrico, ChampionBar, ChampionNidan],
  nike:            [NikeEarly, NikeGray, NikeCenter, NikeCurrent],
  carhartt:        [CarharttEarly, CarharttC, CarharttWip],
  barbour:         [BarbourGold, Barbour3Warrant, BarbourCurrent],
  patagonia:       [PatagoniaGray, PatagoniaColor, PatagoniaCurrent],
  "the-north-face":[TnfEarly, TnfUsa, TnfCurrent],
  lee:             [LeeEarly, LeeBluLabel, LeeCurrent],
  supreme:         [SupremeEarly, SupremeCurrent],
  "stone-island":  [SiEarly, Si90s, SiCurrent],
};
