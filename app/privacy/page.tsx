import Link from "next/link";
import { type Metadata } from "next";
import { RAKUTEN_ROOM_URL } from "@/lib/rakuten";

export const metadata: Metadata = {
  title: "プライバシーポリシー | FURUGIRU",
  description: "FURUGIRU のプライバシーポリシー。Cookie・アクセス解析・広告配信に関する情報を掲載しています。",
};

const GOLD = "#B8974A";
const CREAM = "#F5F0E8";
const NAVY = "#0E1B2E";
const MUTED = "#5A6E85";

const SECTIONS = [
  {
    title: "1. 個人情報の収集について",
    body: "当サイト（FURUGIRU）は、ユーザーが自発的に入力した情報以外の個人情報を収集しません。お問い合わせフォームなどから送信いただいた情報は、お問い合わせへの回答のみに使用します。",
  },
  {
    title: "2. アクセス解析ツールについて",
    body: "当サイトでは、Google が提供するアクセス解析ツール「Google アナリティクス」を使用しています。Google アナリティクスは Cookie を使用し、匿名のトラフィックデータを収集します。収集されるデータは個人を特定するものではありません。Cookie を無効にすることで収集を拒否できます。詳しくは Google のプライバシーポリシーをご確認ください。",
  },
  {
    title: "3. 広告配信について（Google AdSense）",
    body: "当サイトは、Google が提供する広告配信サービス「Google AdSense」を使用しています。Google AdSense は Cookie を使用して、ユーザーの興味に基づいた広告を表示します。広告のカスタマイズは Google の広告設定ページで無効にできます。また、第三者配信事業者が Cookie を使用して広告を配信することがあります。",
  },
  {
    title: "4. Cookie について",
    body: "当サイトでは以下の目的で Cookie を使用します。①ウィッシュリスト機能（localStorage）の保存。②Google アナリティクスによるアクセス解析。③Google AdSense による広告配信。ブラウザの設定から Cookie を無効にすることができますが、一部の機能が正常に動作しない場合があります。",
  },
  {
    title: "5. 免責事項",
    body: "当サイトに掲載している商品の相場価格・鑑定情報はあくまで参考情報です。情報の正確性・最新性については保証しかねます。掲載情報に基づく購入・売却の判断はご自身の責任のもとで行ってください。当サイトは外部リンク先の内容について責任を負いません。",
  },
  {
    title: "6. 著作権について",
    body: "当サイトのテキスト・画像・構成などの著作権は FURUGIRU に帰属します。無断転載・複製は禁止します。ただし、個人的な利用や引用（出典を明記した場合）については許可します。",
  },
  {
    title: "7. プライバシーポリシーの変更",
    body: "当サイトは、法令の変更やサービスの変更に応じて本プライバシーポリシーを予告なく変更することがあります。変更後のポリシーは本ページに掲載した時点で効力を生じます。",
  },
  {
    title: "8. お問い合わせ",
    body: "本ポリシーに関するご質問・ご意見は、サイト内のお問い合わせフォームよりご連絡ください。",
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Helvetica Neue', sans-serif" }}>
      <header style={{
        borderBottom: `1px solid rgba(184,151,74,.2)`, padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: NAVY, position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ fontSize: 18, letterSpacing: "0.2em", color: CREAM, textDecoration: "none", fontFamily: "Georgia, serif" }}>
          FURU<span style={{ color: GOLD }}>GIRU</span>
        </Link>
        <Link href="/" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, textDecoration: "none" }}>
          ← トップへ
        </Link>
      </header>

      <section style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
        <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
          Legal
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 300, color: CREAM, fontFamily: "Georgia, serif", marginBottom: 8 }}>
          プライバシーポリシー
        </h1>
        <p style={{ fontSize: 11, color: MUTED, marginBottom: 48 }}>
          最終更新日：2026年4月26日
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {SECTIONS.map((sec) => (
            <div key={sec.title} style={{ borderTop: `1px solid rgba(184,151,74,.1)`, paddingTop: 24 }}>
              <h2 style={{ fontSize: 15, color: CREAM, fontFamily: "Georgia, serif", fontWeight: 400, marginBottom: 12 }}>
                {sec.title}
              </h2>
              <p style={{ fontSize: 13, color: "rgba(245,240,232,.6)", lineHeight: 1.9 }}>
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: `1px solid rgba(184,151,74,.1)`, padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: 10, color: "rgba(245,240,232,.2)", letterSpacing: "0.05em" }}>
          © 2026 FURUGIRU
        </p>
        <a href={RAKUTEN_ROOM_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 9, color: "rgba(245,240,232,.25)", letterSpacing: "0.1em", textDecoration: "none" }}>
          楽天ROOM →
        </a>
      </footer>
    </div>
  );
}
