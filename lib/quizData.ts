// 古着コラボ鑑定クイズ 10問
export type QuizQuestion = {
  id: number;
  question: string;
  imageUrl?: string;
  correct: "real" | "fake"; // 本物(○)=real / 偽物(×)=fake
  explanation: string;
};

export const QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "Travis Scott × Air Jordan 1 の Swoosh は「正方向」に付いている。",
    imageUrl: "https://sneakerbardetroit.com/wp-content/uploads/2019/04/Travis-Scott-Air-Jordan-1-High-OG-CD4487-100-Release-Date-Price.jpg",
    correct: "fake",
    explanation: "正解は「逆向き」。逆向きSwooshこそがTravis Scottコラボ最大の特徴で、正方向のものは偽物の可能性が極めて高いです。",
  },
  {
    id: 2,
    question: "Supreme × Louis Vuitton Box Logo Tee は、Supreme公式オンラインストアで販売された。",
    correct: "fake",
    explanation: "販売は世界9都市のLouis Vuitton一部店舗（ポップアップ）のみ。Supremeオンラインでは扱われていません。レシート・証明書がない個体は要注意。",
  },
  {
    id: 3,
    question: "Nike × Sacai LDWaffle の特徴は「ダブルスウッシュ・二重ソール」である。",
    imageUrl: "https://sneakerbardetroit.com/wp-content/uploads/2019/07/sacai-Nike-LDWaffle-BV0073-301-BV0073-100-BV0073-001-Release-Date-Price.jpg",
    correct: "real",
    explanation: "正解。阿部千登勢のSacaiによるNike LDWaffleは、2本のSwooshと2枚重ねのソールが象徴的ディテールです。",
  },
  {
    id: 4,
    question: "Off-White × Nike Air Max 97 の外部エアユニットは「半透明の成形品」で、内部が透けて見える。",
    correct: "real",
    explanation: "正解。外部に露出した半透明のエアユニットはOff-Whiteシリーズ共通の特徴。ここが不透明なら偽物の疑い。",
  },
  {
    id: 5,
    question: "Nike × CLOT Air Max 1 Kiss of Death の透明アウトソールには「鍼灸の経絡ポイント」が描かれている。",
    correct: "real",
    explanation: "正解。Edison ChenのCLOTによる鍼灸インスパイアデザイン。透明ソールに経絡の図が精密にプリントされているかが見極めポイント。",
  },
  {
    id: 6,
    question: "Levi's × Human Made 506 Trucker Jacket のダックアイコンは、左右とも白い。",
    correct: "fake",
    explanation: "正解は「右翼が赤」。NIGOのHuman Madeが通常使うダックは両翼白ですが、Levi'sコラボでは右翼が赤に変更されています。Levi'sのRed Tabへのオマージュ。",
  },
  {
    id: 7,
    question: "Nike × Tom Sachs Mars Yard は、シュータングに「Nike」ロゴが大きく入っている。",
    correct: "fake",
    explanation: "正解は「NikeCraft」表記。本作はNike本体ではなく、Tom Sachsのプロジェクト「NikeCraft」のタグが付きます。シンプルなNikeロゴ主体ならコピー品の可能性大。",
  },
  {
    id: 8,
    question: "Supreme × The North Face のタグには「TNF × Supreme」の織りラベルが入る。",
    correct: "real",
    explanation: "正解。両ブランドの共同Wovenラベルが基本仕様。片方しかない・印刷タグのみのものは偽物を疑ってください。",
  },
  {
    id: 9,
    question: "Adidas × Yeezy Boost 350 V2 のソールは通常の発泡EVAで、Boost素材ではない。",
    correct: "fake",
    explanation: "正解は「Boostフルソール」。粒子状のBoost素材が使われているかが最重要判別ポイント。踏み心地と見た目のツブツブ感を確認。",
  },
  {
    id: 10,
    question: "Nike × Dior Air Jordan 1 High には、シリアルナンバー入りのインソールが付属する。",
    correct: "real",
    explanation: "正解。8,500足限定のため、個体ごとのシリアルナンバーと証明書が付属。これが無い個体は本物ではありません。",
  },
];

export function getRank(score: number): { title: string; emoji: string; comment: string } {
  if (score === 10) return { title: "レジェンド鑑定士", emoji: "👑", comment: "完璧！ あなたは古着の神。" };
  if (score >= 8)   return { title: "プロ鑑定士",       emoji: "🎖️", comment: "偽物は即見抜けるレベル。" };
  if (score >= 6)   return { title: "中級鑑定士",       emoji: "🕵️", comment: "基礎は完璧。次はディテール攻略を。" };
  if (score >= 4)   return { title: "古着見習い",       emoji: "👕", comment: "知識不足。タグ図鑑で勉強しよう。" };
  return              { title: "古着ビギナー",           emoji: "🔰", comment: "これからだ！ まずは定番から。" };
}
