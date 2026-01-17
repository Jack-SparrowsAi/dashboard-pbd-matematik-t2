import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  ScatterChart,
  Scatter,
  CartesianGrid,
} from "recharts";

type Jantina = "L" | "P";
type TP = "TP1" | "TP2" | "TP3" | "TP4" | "TP5" | "TP6";
type Usaha = "RENDAH" | "SEDERHANA" | "TINGGI" | "SANGAT TINGGI";

type Row = {
  bil: number;
  nama: string;
  kelas: string;
  jantina: Jantina;
  tp: TP;
  tpLabel: string;
  ulasan: string;
  usaha: Usaha;
};

const LOGO_SKBC = `${import.meta.env.BASE_URL}logo-skbc.png`;

// ✅ DATA 25 MURID (2 MELOR)
const RAW: Row[] = [
  {
    bil: 1,
    nama: "AIRA ALEESYA BINTI MOHAMAD KAMARUL AMRI",
    kelas: "2 Melor",
    jantina: "P",
    tp: "TP3",
    tpLabel: "TAHAP PENGUASAAN 3",
    ulasan:
      "MURID BERPOTENSI MENINGKATKAN KEYAKINAN DIRI UNTUK MELIBATKAN DIRI DENGAN LEBIH AKTIF DALAM AKTIVITI PEMBELAJARAN.",
    usaha: "SEDERHANA",
  },
  {
    bil: 2,
    nama: "ALFAN HAQQI BIN MOHD AZRUL",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP5",
    tpLabel: "TAHAP PENGUASAAN 5",
    ulasan:
      "MURID TELAH MENCAPAI OBJEKTIF PEMBELAJARAN DAN SECARA KONSISTEN BOLEH MENGHUBUNGKAITKAN IDEA DAN KONSEP YANG DIPELAJARI DALAM KELAS DENGAN SITUASI YANG SEBENAR.",
    usaha: "TINGGI",
  },
  {
    bil: 3,
    nama: "AYDEAN MUKHLEEF BIN MOHD SYAFIQ",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP6",
    tpLabel: "TAHAP PENGUASAAN 6",
    ulasan:
      "MURID TELAH MENCAPAI OBJEKTIF PEMBELAJARAN DAN SECARA KONSISTEN BOLEH MENGHUBUNGKAITKAN IDEA DAN KONSEP YANG DIPELAJARI DALAM KELAS DENGAN SITUASI YANG SEBENAR.",
    usaha: "SANGAT TINGGI",
  },
  {
    bil: 4,
    nama: "MUHAMMAD ADAM MIKAIL BIN MUHAMMAD FIRDAUS",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP3",
    tpLabel: "TAHAP PENGUASAAN 3",
    ulasan: "MURID DAPAT MENGINTEGRASIKAN DAN MENGAPLIKASI PENGETAHUAN BAHARU YANG DIPELAJARI.",
    usaha: "SEDERHANA",
  },
  {
    bil: 5,
    nama: "MUHAMMAD AFIF FAHIM BIN ABD AZIZ",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP3",
    tpLabel: "TAHAP PENGUASAAN 3",
    ulasan:
      "MURID BERPOTENSI MENINGKATKAN KEYAKINAN DIRI UNTUK MELIBATKAN DIRI DENGAN LEBIH AKTIF DALAM AKTIVITI PEMBELAJARAN.",
    usaha: "SEDERHANA",
  },
  {
    bil: 6,
    nama: "MUHAMMAD AIMAN ASYRAN BIN ABDUL MU'IZ",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP4",
    tpLabel: "TAHAP PENGUASAAN 4",
    ulasan:
      "MURID DAPAT MENGINGAT KEMBALI, MENTAKRIF DAN MENGENAL PASTI ASPEK UTAMA YANG DIPELAJARI.",
    usaha: "TINGGI",
  },
  {
    bil: 7,
    nama: "MUHAMMAD ANAS NAWFAL BIN NOOR AFFANDI",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP4",
    tpLabel: "TAHAP PENGUASAAN 4",
    ulasan:
      "MURID BERPOTENSI MENINGKATKAN KEYAKINAN DIRI UNTUK MELIBATKAN DIRI DENGAN LEBIH AKTIF DALAM AKTIVITI PEMBELAJARAN.",
    usaha: "SEDERHANA",
  },
  {
    bil: 8,
    nama: "MUHAMMAD FATHIR AZKA BIN SALEHAN",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP4",
    tpLabel: "TAHAP PENGUASAAN 4",
    ulasan:
      "MURID RAJIN DAN MENUNJUKKAN PERKEMBANGAN POSITIF KE ARAH PENINGKATAN PRESTASI SECARA KONSISTEN.",
    usaha: "TINGGI",
  },
  {
    bil: 9,
    nama: "MUHAMMAD IFFAT BIN MOHD ZAIDI",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP3",
    tpLabel: "TAHAP PENGUASAAN 3",
    ulasan:
      "MURID BERPOTENSI LEBIH TELITI DAN BERSEDIA MEMINTA BANTUAN APABILA DIPERLUKAN UNTUK MENINGKATKAN PEMBELAJARANNYA.",
    usaha: "SEDERHANA",
  },
  {
    bil: 10,
    nama: "MUHAMMAD IMAN FALIQ BIN ABDUL FATTAH",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP4",
    tpLabel: "TAHAP PENGUASAAN 4",
    ulasan: "MURID DAPAT MENGINTEGRASIKAN DAN MENGAPLIKASI PENGETAHUAN BAHARU YANG DIPELAJARI.",
    usaha: "SEDERHANA",
  },
  {
    bil: 11,
    nama: "MUHAMMAD MUBASYIR BIN MOKHTAR",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP3",
    tpLabel: "TAHAP PENGUASAAN 3",
    ulasan:
      "MURID DAPAT MENGINGAT KEMBALI, MENTAKRIF DAN MENGENAL PASTI ASPEK UTAMA YANG DIPELAJARI.",
    usaha: "SEDERHANA",
  },
  {
    bil: 12,
    nama: "MUHAMMAD QURAISY BIN MOHD SHAFIE'E",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP4",
    tpLabel: "TAHAP PENGUASAAN 4",
    ulasan:
      "MURID RAJIN DAN MENUNJUKKAN PERKEMBANGAN POSITIF KE ARAH PENINGKATAN PRESTASI SECARA KONSISTEN.",
    usaha: "TINGGI",
  },
  {
    bil: 13,
    nama: "MUHAMMAD RAYYAN BIN MOHD RASHIDI",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP5",
    tpLabel: "TAHAP PENGUASAAN 5",
    ulasan:
      "MURID TELAH MENCAPAI OBJEKTIF PEMBELAJARAN DAN SECARA KONSISTEN BOLEH MENGHUBUNGKAITKAN IDEA DAN KONSEP YANG DIPELAJARI DALAM KELAS DENGAN SITUASI YANG SEBENAR.",
    usaha: "TINGGI",
  },
  {
    bil: 14,
    nama: "MUHAMMAD RIZQI BIN RAZAK",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP3",
    tpLabel: "TAHAP PENGUASAAN 3",
    ulasan:
      "MURID BERPOTENSI MENINGKATKAN KEYAKAKINAN DIRI UNTUK MELIBATKAN DIRI DENGAN LEBIH AKTIF DALAM AKTIVITI PEMBELAJARAN.",
    usaha: "SEDERHANA",
  },
  {
    bil: 15,
    nama: "NOOR SOFEA MARYAM BINTI PUTRA MUHAMMAD HAFIZ RIDZUAN",
    kelas: "2 Melor",
    jantina: "P",
    tp: "TP6",
    tpLabel: "TAHAP PENGUASAAN 6",
    ulasan:
      "MURID ADALAH SEORANG YANG CEMERLANG DARI ASPEK PENGETAHUAN, KEMAHIRAN DAN NILAI.",
    usaha: "SANGAT TINGGI",
  },
  {
    bil: 16,
    nama: "NUR ALYA AFINA BINTI ABDUL FATTAH",
    kelas: "2 Melor",
    jantina: "P",
    tp: "TP2",
    tpLabel: "TAHAP PENGUASAAN 2",
    ulasan:
      "MURID BOLEH MENCAPAI PRESTASI YANG LEBIH BAIK DENGAN MEMBUAT LATIHAN DAN ULANGKAJI SECARA KONSISTEN.",
    usaha: "RENDAH",
  },
  {
    bil: 17,
    nama: "NUR QISYA BINTI MUHAMMAD RAIMI",
    kelas: "2 Melor",
    jantina: "P",
    tp: "TP4",
    tpLabel: "TAHAP PENGUASAAN 4",
    ulasan: "MURID DAPAT MENGINTEGRASIKAN DAN MENGAPLIKASI PENGETAHUAN BAHARU YANG DIPELAJARI.",
    usaha: "SEDERHANA",
  },
  {
    bil: 18,
    nama: "NUR QISYA QAISARA BINTI IZHARI",
    kelas: "2 Melor",
    jantina: "P",
    tp: "TP3",
    tpLabel: "TAHAP PENGUASAAN 3",
    ulasan: "MURID DAPAT MENGINTEGRASIKAN DAN MENGAPLIKASI PENGETAHUAN BAHARU YANG DIPELAJARI.",
    usaha: "SEDERHANA",
  },
  {
    bil: 19,
    nama: "NUR ZULAIKHA KHALISHA BINTI MOHAMAD SALEHIN",
    kelas: "2 Melor",
    jantina: "P",
    tp: "TP5",
    tpLabel: "TAHAP PENGUASAAN 5",
    ulasan:
      "MURID MEMPUNYAI KEYAKINAN DIRI YANG SANGAT TINGGI DAN MENUNJUKKAN USAHA YANG AMAT BAIK UNTUK MENYELESAIKAN AKTIVITI PEMBELAJARAN.",
    usaha: "SANGAT TINGGI",
  },
  {
    bil: 20,
    nama: "NURUL AMISYA BINTI SAPIAN",
    kelas: "2 Melor",
    jantina: "P",
    tp: "TP4",
    tpLabel: "TAHAP PENGUASAAN 4",
    ulasan:
      "MURID BERPOTENSI MENINGKATKAN KEYAKINAN DIRI UNTUK MELIBATKAN DIRI DENGAN LEBIH AKTIF DALAM AKTIVITI PEMBELAJARAN.",
    usaha: "TINGGI",
  },
  {
    bil: 21,
    nama: "PUTRY AURA AZ ZAHRA BINTI MOHD NADZRI",
    kelas: "2 Melor",
    jantina: "P",
    tp: "TP4",
    tpLabel: "TAHAP PENGUASAAN 4",
    ulasan:
      "MURID DAPAT MENGINGAT KEMBALI, MENTAKRIF DAN MENGENAL PASTI ASPEK UTAMA YANG DIPELAJARI.",
    usaha: "TINGGI",
  },
  {
    bil: 22,
    nama: "RAISYA KAMELIA BINTI MOHD HAIREE",
    kelas: "2 Melor",
    jantina: "P",
    tp: "TP5",
    tpLabel: "TAHAP PENGUASAAN 5",
    ulasan:
      "MURID MENUNJUKKAN KEFAHAMAN YANG AMAT JELAS MENGENAI KONSEP DAN KEMAHIRAN YANG DIPELAJARI.",
    usaha: "TINGGI",
  },
  {
    bil: 23,
    nama: "SITI HAJAR BINTI ABDULLAH",
    kelas: "2 Melor",
    jantina: "P",
    tp: "TP4",
    tpLabel: "TAHAP PENGUASAAN 4",
    ulasan:
      "MURID BERPOTENSI LEBIH TELITI DAN BERSEDIA MEMINTA BANTUAN APABILA DIPERLUKAN UNTUK MENINGKATKAN PEMBELAJARANNYA.",
    usaha: "SEDERHANA",
  },
  {
    bil: 24,
    nama: "WAN NUR RAISYA BINTI WAN HAIZAL AZUAN",
    kelas: "2 Melor",
    jantina: "P",
    tp: "TP4",
    tpLabel: "TAHAP PENGUASAAN 4",
    ulasan:
      "MURID DAPAT MENGINGAT KEMBALI, MENTAKRIF DAN MENGENAL PASTI ASPEK UTAMA YANG DIPELAJARI.",
    usaha: "TINGGI",
  },
  {
    bil: 25,
    nama: "ZIYAD AMSYAR BIN MUHAMMAD NURSYAM",
    kelas: "2 Melor",
    jantina: "L",
    tp: "TP6",
    tpLabel: "TAHAP PENGUASAAN 6",
    ulasan:
      "MURID ADALAH SEORANG YANG CEMERLANG DARI ASPEK PENGETAHUAN, KEMAHIRAN DAN NILAI.",
    usaha: "SANGAT TINGGI",
  },
];

const TP_ORDER: TP[] = ["TP1", "TP2", "TP3", "TP4", "TP5", "TP6"];
const USAHA_ORDER: Usaha[] = ["RENDAH", "SEDERHANA", "TINGGI", "SANGAT TINGGI"];

const COLORS = {
  TP2: "#f87171",
  TP3: "#fb923c",
  TP4: "#60a5fa",
  TP5: "#34d399",
  TP6: "#22c55e",
} as const;

const toNumTP = (tp: TP) => {
  const m = String(tp).match(/TP(\d)/);
  return m ? Number(m[1]) : 0;
};

const pct = (n: number, total: number) =>
  total ? ((n / total) * 100).toFixed(0) : "0";

const shortName = (full: string) => {
  const banned = new Set(["BIN", "BINTI", "A/L", "A/P", "ANAK", "AL"]);

  const parts = full
    .toUpperCase()
    .replace(/[^A-Z\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => !banned.has(w));

  if (parts.length >= 2) return `${parts[0]} ${parts[1][0]}.`;
  if (parts.length === 1) return parts[0];
  return full;
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="tt">
      <div style={{ fontWeight: 800, marginBottom: 6 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div
          key={i}
          style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
        >
          <span style={{ opacity: 0.75 }}>{p.name}</span>
          <span style={{ fontWeight: 800 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

function pickKeyInsights({
  tpCounts,
  usahaCounts,
  genderCounts,
  filtered,
}: {
  tpCounts: Record<string, number>;
  usahaCounts: Record<string, number>;
  genderCounts: Record<string, number>;
  filtered: Row[];
}) {
  const tpMode = Object.entries(tpCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const lowTP = (tpCounts.TP2 || 0) + (tpCounts.TP3 || 0);
  const highTP = (tpCounts.TP5 || 0) + (tpCounts.TP6 || 0);
  const usahaMode = Object.entries(usahaCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  const avgTP =
    filtered.reduce((s, r) => s + toNumTP(r.tp), 0) / (filtered.length || 1);

  const lelaki = genderCounts.L || 0;
  const perempuan = genderCounts.P || 0;

  return [
    `Taburan TP: majoriti murid berada pada ${tpMode || "(tiada)"}.`,
    `Keutamaan intervensi: ${lowTP} murid (TP2–TP3) perlukan bimbingan berfokus; ${highTP} murid (TP5–TP6) sesuai untuk pengayaan.`,
    `Usaha dominan: ${usahaMode || "(tiada)"}. Nisbah jantina: L ${lelaki} / P ${perempuan}. Purata TP (penapis semasa): ${avgTP.toFixed(2)}.`,
  ];
}

export default function App() {
  const [printMode, setPrintMode] = useState(false);
  const [namaGuru, setNamaGuru] = useState("");
  const [tarikhLaporan, setTarikhLaporan] = useState("");

  const [gender, setGender] = useState<"SEMUA" | Jantina>("SEMUA");
  const [tpFilter, setTpFilter] = useState<"SEMUA" | TP>("SEMUA");
  const [usahaFilter, setUsahaFilter] = useState<"SEMUA" | Usaha>("SEMUA");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();

  return RAW.filter((r) => {
    const okGender = gender === "SEMUA" ? true : r.jantina === gender;
    const okTP = tpFilter === "SEMUA" ? true : r.tp === tpFilter;
    const okUsaha = usahaFilter === "SEMUA" ? true : r.usaha === usahaFilter;

    const okQ =
      !q ||
      r.nama.toLowerCase().includes(q) ||
      shortName(r.nama).toLowerCase().includes(q) ||
      r.ulasan.toLowerCase().includes(q);

    return okGender && okTP && okUsaha && okQ;
  });
}, [gender, tpFilter, usahaFilter, query]);

  const stats = useMemo(() => {
    const total = filtered.length;

    const genderCounts = filtered.reduce(
      (acc, r) => {
        acc[r.jantina] = (acc[r.jantina] || 0) + 1;
        return acc;
      },
      { L: 0, P: 0 } as Record<string, number>
    );

    const tpCounts = filtered.reduce((acc, r) => {
      acc[r.tp] = (acc[r.tp] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const usahaCounts = filtered.reduce((acc, r) => {
      acc[r.usaha] = (acc[r.usaha] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgTP = total
      ? filtered.reduce((s, r) => s + toNumTP(r.tp), 0) / total
      : 0;

    const tpBar = TP_ORDER.filter((x) => x !== "TP1").map((tp) => ({
      name: tp,
      bil: tpCounts[tp] || 0,
    }));

    const usahaBar = USAHA_ORDER.map((u) => ({
      name: u,
      bil: usahaCounts[u] || 0,
    }));

    const genderTp = TP_ORDER.filter((x) => x !== "TP1").map((tp) => {
      const L = filtered.filter((r) => r.tp === tp && r.jantina === "L").length;
      const P = filtered.filter((r) => r.tp === tp && r.jantina === "P").length;
      return { name: tp, Lelaki: L, Perempuan: P };
    });

    const scatter = filtered.map((r) => ({
      nama: r.nama,
      tp: toNumTP(r.tp),
      usaha:
        r.usaha === "RENDAH"
          ? 1
          : r.usaha === "SEDERHANA"
          ? 2
          : r.usaha === "TINGGI"
          ? 3
          : 4,
      tpText: r.tp,
      usahaText: r.usaha,
      jantina: r.jantina,
    }));

    const low = (tpCounts.TP2 || 0) + (tpCounts.TP3 || 0);
    const mid = tpCounts.TP4 || 0;
    const high = (tpCounts.TP5 || 0) + (tpCounts.TP6 || 0);

    const pie = [
      { name: "TP2–TP3 (Intervensi)", value: low },
      { name: "TP4 (Mantap)", value: mid },
      { name: "TP5–TP6 (Pengayaan)", value: high },
    ];

    return {
      total,
      genderCounts,
      tpCounts,
      usahaCounts,
      avgTP,
      tpBar,
      usahaBar,
      genderTp,
      scatter,
      pie,
    };
  }, [filtered]);

  const insights = useMemo(
    () =>
      pickKeyInsights({
        tpCounts: stats.tpCounts,
        usahaCounts: stats.usahaCounts,
        genderCounts: stats.genderCounts,
        filtered,
      }),
    [stats, filtered]
  );

  const downloadCSV = (
    rows: Row[],
    filename = "dashboard_pbd_matematik_tahun2_2melor.csv"
  ) => {
    const headers = [
      "Bil",
      "Nama",
      "Kelas",
      "Jantina",
      "Tahap Penguasaan",
      "Usaha Murid",
      "Ulasan Guru",
    ];

    const esc = (v: any) => {
      const s = String(v ?? "");
      const needs = /[",\n]/.test(s);
      const out = s.replace(/"/g, '""');
      return needs ? `"${out}"` : out;
    };

    const lines = [headers.join(",")].concat(
      rows.map((r) =>
        [r.bil, r.nama, r.kelas, r.jantina, r.tp, r.usaha, r.ulasan]
          .map(esc)
          .join(",")
      )
    );

    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setGender("SEMUA");
    setTpFilter("SEMUA");
    setUsahaFilter("SEMUA");
    setQuery("");
  };

  const tp2to6 = TP_ORDER.filter((x) => x !== "TP1");

  return (
    <div className={"wrap" + (printMode ? " print" : "")}>
      <style>{`
        :root { font-family: system-ui, Arial; }
        .wrap { min-height: 100vh; padding: 18px; background: linear-gradient(135deg,#eaf2ff,#ffffff,#eafff1); }
        .print { background: #fff; }
        .container { max-width: 1180px; margin: 0 auto; }
        .card { background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:16px; box-shadow: 0 8px 18px rgba(0,0,0,.04); }
        .row { display:flex; gap:10px; flex-wrap:wrap; }
        .hstack { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
        .title { font-size: 22px; font-weight: 900; margin: 0; }
        .muted { color:#6b7280; font-size: 12px; }
        .btn { padding:10px 12px; border-radius:12px; border:1px solid #e5e7eb; background:#fff; cursor:pointer; font-weight:800; }
        .btnPrimary { background:#111827; color:#fff; border-color:#111827; }
        .input { padding:10px 12px; border-radius:12px; border:1px solid #e5e7eb; min-width: 200px; }
        .chip { padding:7px 10px; border-radius:999px; border:1px solid #e5e7eb; background:#fff; cursor:pointer; font-size:12px; font-weight:800; }
        .chipA { background:#111827; border-color:#111827; color:#fff; }
        .grid4 { display:grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .grid12 { display:grid; grid-template-columns: repeat(12, 1fr); gap: 12px; }
        .span7 { grid-column: span 7; } .span5 { grid-column: span 5; } .span6 { grid-column: span 6; } .span12 { grid-column: span 12; } .span4 { grid-column: span 4; }
        .chart { height: 320px; }
        .tt { background:#fff; border:1px solid #e5e7eb; padding:10px; border-radius:12px; box-shadow: 0 10px 20px rgba(0,0,0,.08); }
        table { width:100%; border-collapse: collapse; }
        th, td { border-top:1px solid #e5e7eb; padding:10px; vertical-align: top; }
        thead th { background:#f3f4f6; text-align:left; font-size:12px; color:#6b7280; border-top:0; }
        .tag { display:inline-block; padding:3px 8px; border:1px solid #e5e7eb; border-radius:999px; font-size:12px; font-weight:800; }
        .tagRed { border-color:#fecaca; background:#fee2e2; color:#b91c1c; }
        @media (max-width: 980px) {
          .grid4 { grid-template-columns: repeat(2, 1fr); }
          .grid12 { grid-template-columns: repeat(1, 1fr); }
          .span7, .span5, .span6, .span12, .span4 { grid-column: span 1; }
        }
        @media print {
          .noPrint { display:none !important; }
          .wrap { background:#fff !important; }
          .card { box-shadow:none !important; }
        }
      `}</style>

      <div className="container">
        <div className="hstack" style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
  src={LOGO_SKBC}
  alt="Logo SK Bukit China"
  className="h-14 w-14 object-contain shrink-0"
/>
            <div>
              <div className="muted">Analisis & Paparan Interaktif</div>
              <h1 className="title">Dashboard PBD Matematik Tahun 2 Melor - Sesi 2025/2026</h1>
              <div className="muted">
                Data: {RAW.length} murid • Penapis semasa: {filtered.length} murid
              </div>
            </div>
          </div>

          <div className="row noPrint">
            <button
              className={"btn " + (printMode ? "btnPrimary" : "")}
              onClick={() => setPrintMode((v) => !v)}
            >
              {printMode ? "Mod Cetak: ON" : "Mod Cetak (PDF)"}
            </button>

            {printMode ? (
              <>
                <input
                  className="input"
                  value={tarikhLaporan}
                  onChange={(e) => setTarikhLaporan(e.target.value)}
                  placeholder="Tarikh (cth: 17/01/2026)"
                />
                <input
                  className="input"
                  value={namaGuru}
                  onChange={(e) => setNamaGuru(e.target.value)}
                  placeholder="Nama Guru"
                />
                <button className="btn btnPrimary" onClick={() => window.print()}>
                  Cetak / Simpan PDF
                </button>
              </>
            ) : null}

            <button className="btn" onClick={() => downloadCSV(filtered)}>
              Eksport CSV (Penapis)
            </button>
            <button
              className="btn"
              onClick={() =>
                downloadCSV(RAW, "dashboard_pbd_matematik_tahun2_2melor_semua.csv")
              }
            >
              Eksport CSV (Semua)
            </button>
            <button className="btn" onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 12 }}>
          <div className="grid12">
            <div className="span5">
              <div className="muted">Carian Murid / Ulasan</div>
              <input
                className="input"
                style={{ width: "100%", marginTop: 8 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama atau kata kunci dalam ulasan…"
              />
            </div>

            <div className="span7">
              <div className="grid12" style={{ alignItems: "start" }}>
                <div className="span4">
                  <div className="muted">Jantina</div>
                  <div className="row" style={{ marginTop: 8 }}>
                    {[
                      { k: "SEMUA" as const, t: "Semua" },
                      { k: "L" as const, t: "Lelaki" },
                      { k: "P" as const, t: "Perempuan" },
                    ].map((x) => (
                      <button
                        key={x.k}
                        className={"chip " + (gender === x.k ? "chipA" : "")}
                        onClick={() => setGender(x.k)}
                      >
                        {x.t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="span4">
                  <div className="muted">Tahap Penguasaan</div>
                  <div className="row" style={{ marginTop: 8 }}>
                    <button
                      className={"chip " + (tpFilter === "SEMUA" ? "chipA" : "")}
                      onClick={() => setTpFilter("SEMUA")}
                    >
                      Semua
                    </button>
                    {tp2to6.map((tp) => (
                      <button
                        key={tp}
                        className={"chip " + (tpFilter === tp ? "chipA" : "")}
                        onClick={() => setTpFilter(tp)}
                      >
                        {tp}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="span4">
                  <div className="muted">Usaha Murid</div>
                  <div className="row" style={{ marginTop: 8 }}>
                    <button
                      className={"chip " + (usahaFilter === "SEMUA" ? "chipA" : "")}
                      onClick={() => setUsahaFilter("SEMUA")}
                    >
                      Semua
                    </button>
                    {USAHA_ORDER.map((u) => (
                      <button
                        key={u}
                        className={"chip " + (usahaFilter === u ? "chipA" : "")}
                        onClick={() => setUsahaFilter(u)}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid4" style={{ marginBottom: 12 }}>
          <div className="card">
            <div className="muted">Bilangan Murid (Penapis)</div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 6 }}>
              {stats.total}
            </div>
          </div>

          <div className="card">
            <div className="muted">Jantina</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>
              L {stats.genderCounts.L || 0} • P {stats.genderCounts.P || 0}
            </div>
            <div className="muted" style={{ marginTop: 6 }}>
              L {pct(stats.genderCounts.L || 0, stats.total)}% • P{" "}
              {pct(stats.genderCounts.P || 0, stats.total)}%
            </div>
          </div>

          <div className="card">
            <div className="muted">Purata Tahap Penguasaan</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>
              {stats.avgTP.toFixed(2)}
            </div>
            <div className="muted" style={{ marginTop: 6 }}>
              Purata dikira berdasarkan TP (2–6)
            </div>
          </div>

          <div className="card">
            <div className="muted">Fokus Intervensi</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>
              {(stats.tpCounts.TP2 || 0) + (stats.tpCounts.TP3 || 0)} murid
            </div>
            <div className="muted" style={{ marginTop: 6 }}>
              Jumlah murid TP2–TP3
            </div>
          </div>
        </div>

        <div className="grid12" style={{ marginBottom: 12 }}>
          <div className="card span7">
            <div style={{ fontWeight: 900 }}>Taburan TP (TP2–TP6)</div>
            <div className="muted">Bilangan murid mengikut Tahap Penguasaan</div>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.tpBar} margin={{ left: 8, right: 8 }}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="bil"
                    name="Bil. Murid"
                    radius={[10, 10, 0, 0]}
                    fill={COLORS.TP4}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card span5">
            <div style={{ fontWeight: 900 }}>Ringkasan Pencapaian</div>
            <div className="muted">Intervensi vs Mantap vs Pengayaan</div>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.pie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                  >
                    {stats.pie.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={
                          idx === 0 ? COLORS.TP3 : idx === 1 ? COLORS.TP4 : COLORS.TP6
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={72} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card span6">
            <div style={{ fontWeight: 900 }}>Usaha Murid</div>
            <div className="muted">Bilangan murid mengikut tahap usaha</div>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.usahaBar} margin={{ left: 10, right: 10 }}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="bil"
                    name="Bil. Murid"
                    radius={[10, 10, 0, 0]}
                    fill={COLORS.TP5}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card span6">
            <div style={{ fontWeight: 900 }}>Jantina vs TP</div>
            <div className="muted">
              Perbandingan bilangan murid lelaki & perempuan pada setiap TP
            </div>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.genderTp} margin={{ left: 10, right: 10 }}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Lelaki" stackId="a" radius={[10, 10, 0, 0]} fill={COLORS.TP4} />
                  <Bar dataKey="Perempuan" stackId="a" radius={[10, 10, 0, 0]} fill="#f472b6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card span12">
            <div style={{ fontWeight: 900 }}>Hubungan TP dan Usaha (Scatter)</div>
            <div className="muted">
              Usaha (1=Rendah, 2=Sederhana, 3=Tinggi, 4=Sangat Tinggi)
            </div>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="tp"
                    domain={[2, 6]}
                    ticks={[2, 3, 4, 5, 6]}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="number"
                    dataKey="usaha"
                    domain={[1, 4]}
                    ticks={[1, 2, 3, 4]}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ active, payload }: any) => {
                      if (!active || !payload?.length) return null;
                      const p = payload[0].payload;
                      return (
                        <div className="tt" style={{ maxWidth: 320 }}>
                          <div style={{ fontWeight: 900, marginBottom: 6 }}>{shortName(p.nama)}</div>
                          <div className="muted">
                            Jantina: {p.jantina} • TP: {p.tpText} • Usaha: {p.usahaText}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Scatter name="Murid" data={stats.scatter} fill={COLORS.TP6} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 900 }}>Analisis Keseluruhan (Auto)</div>
          <div className="grid12" style={{ marginTop: 10 }}>
            {insights.map((t, i) => (
              <div
                key={i}
                className="card span4"
                style={{ boxShadow: "none", background: "#f9fafb" }}
              >
                {t}
              </div>
            ))}
          </div>
          <div className="muted" style={{ marginTop: 8 }}>
            Nota: Analisis ini berubah mengikut penapis (jantina/TP/usaha/carian).
          </div>
        </div>

        <div className="card">
          <div className="hstack" style={{ marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 900 }}>Jadual Murid (Dinamik)</div>
              <div className="muted">Gunakan penapis untuk tapis data</div>
            </div>
            <div className="muted">
              Dipaparkan: {filtered.length} / {RAW.length}
            </div>
          </div>

          <div style={{ overflowX: "auto", border: "1px solid #e5e7eb", borderRadius: 14 }}>
            <table>
              <thead>
                <tr>
                  <th>Bil</th>
                  <th>Nama</th>
                  <th>Jantina</th>
                  <th>TP</th>
                  <th>Usaha</th>
                  <th>Ulasan Guru</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const isIntervensi = r.tp === "TP2" || r.tp === "TP3";
                  return (
                    <tr key={r.bil} style={isIntervensi ? { background: "#fff1f2" } : undefined}>
                      <td className="muted">{r.bil}</td>
                      <td>
                        <div style={{ fontWeight: 900 }}>{shortName(r.nama)}</div>
                        <div className="muted">{r.kelas}</div>
                        {isIntervensi ? <span className="tag tagRed">INTERVENSI (TP2–TP3)</span> : null}
                      </td>
                      <td>{r.jantina}</td>
                      <td>
                        <span className={"tag " + (isIntervensi ? "tagRed" : "")}>{r.tp}</span>
                      </td>
                      <td>
                        <span className="tag">{r.usaha}</span>
                      </td>
                      <td style={{ fontSize: 12, lineHeight: 1.4 }}>{r.ulasan}</td>
                    </tr>
                  );
                })}
                {!filtered.length ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 18, textAlign: "center" }} className="muted">
                      Tiada data dipadankan. Cuba tukar penapis atau kata kunci carian.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 14 }} className="muted">
            Cetakan: Tarikh <b>{tarikhLaporan || "____________"}</b> • Guru{" "}
            <b>{namaGuru || "____________________"}</b>
          </div>
        </div>
      </div>
    </div>
  );
}
