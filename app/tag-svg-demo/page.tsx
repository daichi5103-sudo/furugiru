// SVG tag illustration demo page — temporary, for review only

const NAVY  = "#0E1B2E";
const GOLD  = "#B8974A";
const CREAM = "#F5F0E8";
const MUTED = "#5A6E85";

// ── Levi's: XX tag ──────────────────────────────────────────────────────────
function TagLevisXX() {
  return (
    <svg viewBox="0 0 160 100" width="160" height="100" style={{ display: "block" }}>
      {/* tag body */}
      <rect x="2" y="2" width="156" height="96" rx="4" fill="#F0EDE8" stroke="#C8C0B0" strokeWidth="1.5"/>
      {/* hole */}
      <circle cx="20" cy="50" r="5" fill="none" stroke="#A89880" strokeWidth="1.5"/>
      {/* XX mark — center */}
      <text x="80" y="42" textAnchor="middle" fontSize="28" fontFamily="Georgia, serif" fontWeight="700" fill="#1B3A6B" letterSpacing="4">XX</text>
      {/* brand name */}
      <text x="80" y="62" textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fill="#1B3A6B" letterSpacing="2">LEVI STRAUSS &amp; CO.</text>
      {/* MADE IN USA */}
      <text x="80" y="78" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fill="#7A6A58" letterSpacing="1">MADE IN USA</text>
      {/* label at bottom */}
      <rect x="40" y="86" width="80" height="10" rx="2" fill="#1B3A6B"/>
      <text x="80" y="94" textAnchor="middle" fontSize="7" fill="#F0EDE8" letterSpacing="1.5">〜1954  ·  超希少</text>
    </svg>
  );
}

// ── Levi's: Big E ────────────────────────────────────────────────────────────
function TagLevisBigE() {
  return (
    <svg viewBox="0 0 160 100" width="160" height="100" style={{ display: "block" }}>
      {/* tag body */}
      <rect x="2" y="2" width="156" height="96" rx="4" fill="#F8F8F8" stroke="#CCCCCC" strokeWidth="1.5"/>
      {/* red tab */}
      <rect x="2" y="30" width="36" height="40" rx="2" fill="#CC0000"/>
      <text x="20" y="52" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="900" fill="white" letterSpacing="0.5">LEVI'S</text>
      {/* ↑ Big E highlight */}
      <text x="20" y="65" textAnchor="middle" fontSize="6" fill="#FFB0B0">Big E ↑</text>
      {/* main tag */}
      <text x="100" y="38" textAnchor="middle" fontSize="13" fontFamily="Georgia, serif" fontWeight="700" fill="#333" letterSpacing="1">LEVI'S®</text>
      <line x1="50" y1="45" x2="155" y2="45" stroke="#DDD" strokeWidth="1"/>
      <text x="100" y="57" textAnchor="middle" fontSize="9" fill="#555" letterSpacing="0.5">MADE IN USA</text>
      <text x="100" y="70" textAnchor="middle" fontSize="8" fill="#888">501® JEANS</text>
      {/* label */}
      <rect x="40" y="86" width="80" height="10" rx="2" fill="#1B3A6B"/>
      <text x="80" y="94" textAnchor="middle" fontSize="7" fill="#F0EDE8" letterSpacing="1.5">1955–1971  ·  希少</text>
    </svg>
  );
}

// ── Levi's: Small e ──────────────────────────────────────────────────────────
function TagLevisSmallE() {
  return (
    <svg viewBox="0 0 160 100" width="160" height="100" style={{ display: "block" }}>
      <rect x="2" y="2" width="156" height="96" rx="4" fill="#F8F8F8" stroke="#CCCCCC" strokeWidth="1.5"/>
      {/* red tab */}
      <rect x="2" y="30" width="36" height="40" rx="2" fill="#CC0000"/>
      {/* Small e — mixed case */}
      <text x="20" y="50" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="900" fill="white">Le</text>
      <text x="20" y="59" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fontWeight="900" fill="white">VI'S</text>
      <text x="20" y="70" textAnchor="middle" fontSize="6" fill="#FFB0B0">Small e</text>
      {/* main tag */}
      <text x="100" y="38" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="700" fill="#333">Levi's®</text>
      <line x1="50" y1="45" x2="155" y2="45" stroke="#DDD" strokeWidth="1"/>
      <text x="100" y="57" textAnchor="middle" fontSize="9" fill="#555">MADE IN USA</text>
      <text x="100" y="70" textAnchor="middle" fontSize="8" fill="#888">紙パッチに変更</text>
      <rect x="40" y="86" width="80" height="10" rx="2" fill="#1B3A6B"/>
      <text x="80" y="94" textAnchor="middle" fontSize="7" fill="#F0EDE8" letterSpacing="1.5">1971–1983  ·  やや希少</text>
    </svg>
  );
}

// ── Champion: トリコタグ ──────────────────────────────────────────────────────
function TagChampionTrico() {
  return (
    <svg viewBox="0 0 160 100" width="160" height="100" style={{ display: "block" }}>
      <rect x="2" y="2" width="156" height="96" rx="4" fill="#F8F8F8" stroke="#CCCCCC" strokeWidth="1.5"/>
      {/* tricolor stripes */}
      <rect x="2" y="2" width="156" height="22" rx="4" fill="#003087"/>
      <rect x="2" y="24" width="156" height="16" fill="#CC0000"/>
      <rect x="2" y="40" width="156" height="14" fill="#B8974A"/>
      {/* Champion C */}
      <text x="80" y="20" textAnchor="middle" fontSize="14" fontFamily="sans-serif" fontWeight="900" fill="white" letterSpacing="2">CHAMPION</text>
      <text x="80" y="36" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="700" fill="white">KNITWEAR</text>
      {/* body */}
      <text x="80" y="64" textAnchor="middle" fontSize="9" fill="#444">REVERSE WEAVE®</text>
      <text x="80" y="76" textAnchor="middle" fontSize="8" fill="#888">MADE IN USA</text>
      <rect x="40" y="86" width="80" height="10" rx="2" fill="#CC0000"/>
      <text x="80" y="94" textAnchor="middle" fontSize="7" fill="white" letterSpacing="1.5">1970–1975  ·  希少</text>
    </svg>
  );
}

// ── Champion: バータグ ────────────────────────────────────────────────────────
function TagChampionBar() {
  return (
    <svg viewBox="0 0 160 100" width="160" height="100" style={{ display: "block" }}>
      <rect x="2" y="2" width="156" height="96" rx="4" fill="#F5F5F5" stroke="#CCCCCC" strokeWidth="1.5"/>
      {/* bar shape */}
      <rect x="10" y="28" width="140" height="44" rx="3" fill="white" stroke="#1B1B1B" strokeWidth="2"/>
      {/* C logo */}
      <text x="35" y="57" textAnchor="middle" fontSize="24" fontFamily="Georgia, serif" fontWeight="900" fill="#CC0000">C</text>
      <line x1="55" y1="30" x2="55" y2="70" stroke="#DDD" strokeWidth="1"/>
      {/* text */}
      <text x="108" y="47" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill="#1B1B1B" letterSpacing="1">CHAMPION</text>
      <text x="108" y="60" textAnchor="middle" fontSize="8" fill="#555">REVERSE WEAVE</text>
      <rect x="40" y="86" width="80" height="10" rx="2" fill="#333"/>
      <text x="80" y="94" textAnchor="middle" fontSize="7" fill="#F0EDE8" letterSpacing="1.5">1975–1985  ·  やや希少</text>
    </svg>
  );
}

// ── Barbour: 3ワラント ────────────────────────────────────────────────────────
function TagBarbour3Warrant() {
  return (
    <svg viewBox="0 0 160 100" width="160" height="100" style={{ display: "block" }}>
      <rect x="2" y="2" width="156" height="96" rx="4" fill="#F0EDE6" stroke="#8B7D6B" strokeWidth="1.5"/>
      {/* brand */}
      <text x="80" y="20" textAnchor="middle" fontSize="15" fontFamily="Georgia, serif" fontWeight="700" fill="#2C4A2E" letterSpacing="2">Barbour</text>
      <line x1="15" y1="26" x2="145" y2="26" stroke="#8B7D6B" strokeWidth="0.5"/>
      {/* by appointment */}
      <text x="80" y="37" textAnchor="middle" fontSize="7" fill="#5A4A3A" letterSpacing="0.5">BY APPOINTMENT TO</text>
      {/* 3 warrants as shields */}
      {[30, 80, 130].map((x, i) => (
        <g key={i}>
          <polygon points={`${x},42 ${x-12},52 ${x-12},64 ${x},68 ${x+12},64 ${x+12},52`} fill="none" stroke="#8B7D6B" strokeWidth="1.2"/>
          <text x={x} y="59" textAnchor="middle" fontSize="9" fill="#2C4A2E">♛</text>
        </g>
      ))}
      <text x="80" y="80" textAnchor="middle" fontSize="7" fill="#5A4A3A" letterSpacing="0.5">MADE IN ENGLAND</text>
      <rect x="40" y="86" width="80" height="10" rx="2" fill="#2C4A2E"/>
      <text x="80" y="94" textAnchor="middle" fontSize="7" fill="#F0EDE8" letterSpacing="1.5">1970–1989  ·  希少</text>
    </svg>
  );
}

// ── Nike: センタースウッシュ ──────────────────────────────────────────────────
function TagNikeCenter() {
  return (
    <svg viewBox="0 0 160 100" width="160" height="100" style={{ display: "block" }}>
      <rect x="2" y="2" width="156" height="96" rx="4" fill="#F8F8F8" stroke="#CCCCCC" strokeWidth="1.5"/>
      {/* center swoosh — simplified */}
      <path d="M 35 55 Q 80 20 130 42 Q 90 42 70 58 Z" fill="#111111"/>
      {/* NIKE text */}
      <text x="80" y="75" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="900" fill="#111" letterSpacing="3">NIKE</text>
      <text x="80" y="86" textAnchor="middle" fontSize="7" fill="#888">MADE IN USA</text>
      <rect x="40" y="88" width="80" height="10" rx="2" fill="#111"/>
      <text x="80" y="96" textAnchor="middle" fontSize="7" fill="#F0EDE8" letterSpacing="1.5">1990–1995  ·  やや希少</text>
    </svg>
  );
}

// ── Carhartt: Cロゴ ───────────────────────────────────────────────────────────
function TagCarharttC() {
  return (
    <svg viewBox="0 0 160 100" width="160" height="100" style={{ display: "block" }}>
      <rect x="2" y="2" width="156" height="96" rx="4" fill="#F5EDD5" stroke="#C8A840" strokeWidth="1.5"/>
      {/* C logo */}
      <text x="45" y="62" textAnchor="middle" fontSize="44" fontFamily="Georgia, serif" fontWeight="900" fill="#D4A017">C</text>
      <line x1="72" y1="15" x2="72" y2="85" stroke="#C8A84040" strokeWidth="1"/>
      {/* brand */}
      <text x="115" y="38" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="900" fill="#1A1A1A" letterSpacing="1">CARHARTT</text>
      <text x="115" y="52" textAnchor="middle" fontSize="7" fill="#5A4A2A" letterSpacing="0.5">QUALITY CLOTHING</text>
      <text x="115" y="64" textAnchor="middle" fontSize="7" fill="#5A4A2A">SINCE 1889</text>
      <text x="115" y="76" textAnchor="middle" fontSize="8" fill="#888">MADE IN USA</text>
      <rect x="40" y="86" width="80" height="10" rx="2" fill="#8B6914"/>
      <text x="80" y="94" textAnchor="middle" fontSize="7" fill="#F5EDD5" letterSpacing="1.5">1980–1999  ·  やや希少</text>
    </svg>
  );
}

const SAMPLES = [
  { label: "Levi's — XX タグ",            component: TagLevisXX },
  { label: "Levi's — Big E",              component: TagLevisBigE },
  { label: "Levi's — Small e",            component: TagLevisSmallE },
  { label: "Champion — トリコタグ",         component: TagChampionTrico },
  { label: "Champion — バータグ",          component: TagChampionBar },
  { label: "Barbour — 3ワラントタグ",      component: TagBarbour3Warrant },
  { label: "Nike — センタースウッシュ",     component: TagNikeCenter },
  { label: "Carhartt — Cロゴタグ",         component: TagCarharttC },
];

export default function TagSvgDemo() {
  return (
    <div style={{ background: NAVY, minHeight: "100vh", padding: "40px 24px", fontFamily: "'Helvetica Neue', sans-serif" }}>
      <p style={{ fontSize: 9, letterSpacing: "0.2em", color: MUTED, marginBottom: 8, textTransform: "uppercase" }}>SVG Tag Illustration — Demo</p>
      <h1 style={{ fontSize: 28, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 8 }}>タグSVGサンプル</h1>
      <p style={{ fontSize: 13, color: MUTED, marginBottom: 40 }}>チェッカーの質問カードに添付するイラスト案</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
        {SAMPLES.map(({ label, component: Comp }) => (
          <div key={label} style={{ border: "1px solid rgba(184,151,74,.2)", background: "rgba(255,255,255,.03)", padding: 20 }}>
            <div style={{ background: "#E8E4DC", borderRadius: 4, padding: 12, marginBottom: 12, display: "flex", justifyContent: "center" }}>
              <Comp />
            </div>
            <p style={{ fontSize: 12, color: CREAM, textAlign: "center" }}>{label}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, border: "1px solid rgba(184,151,74,.2)", padding: "24px", maxWidth: 600 }}>
        <p style={{ fontSize: 9, letterSpacing: "0.15em", color: GOLD, marginBottom: 12, textTransform: "uppercase" }}>質問カードへの組み込みイメージ</p>
        <div style={{ border: "1px solid rgba(184,151,74,.3)", padding: "20px 24px" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.15em", color: GOLD, marginBottom: 12, display: "inline-block", border: "1px solid #B8974A55", padding: "3px 10px" }}>
            タグの特徴
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <div style={{ background: "#E8E4DC", borderRadius: 4, padding: 8, flexShrink: 0 }}>
              <TagLevisBigE />
            </div>
            <p style={{ fontSize: 16, color: CREAM, lineHeight: 1.7 }}>
              赤タブの「LEVI&apos;S」が全て大文字（Big E）になっていますか？
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 20 }}>
            {["ある", "ない", "わからない"].map((label) => (
              <div key={label} style={{ padding: "12px 8px", border: "1px solid rgba(184,151,74,.3)", color: MUTED, fontSize: 14, textAlign: "center" }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
