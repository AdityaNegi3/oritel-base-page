import { useEffect, useRef, useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";

const STYLE_ID = "hero-dashboard-animations";

type RoomStatus = "occupied" | "available" | "reserved";
const rooms: { num: string; status: RoomStatus }[] = [
  { num: "101", status: "available" }, { num: "102", status: "available" }, { num: "103", status: "occupied" },  { num: "104", status: "available" },
  { num: "105", status: "available" }, { num: "106", status: "available" }, { num: "107", status: "occupied" },  { num: "108", status: "available" },
  { num: "201", status: "available" }, { num: "202", status: "available" }, { num: "203", status: "occupied" },  { num: "204", status: "available" },
  { num: "205", status: "available" }, { num: "206", status: "reserved" },  { num: "207", status: "available" }, { num: "208", status: "occupied" },
  { num: "301", status: "available" }, { num: "302", status: "available" }, { num: "303", status: "available" }, { num: "304", status: "occupied" },
  { num: "305", status: "available" }, { num: "306", status: "available" }, { num: "307", status: "available" }, { num: "308", status: "available" },
];

const roomColor: Record<RoomStatus, string> = {
  occupied:  "bg-[#4ade80] text-[#14532d]",
  available: "bg-[#262626] text-[#666]",
  reserved:  "bg-[#fb923c] text-[#7c2d12]",
};

const arrivals = [
  { initials: "R", name: "R. Sharma", room: "Room 103", time: "14:00" },
  { initials: "A", name: "A. Patel",  room: "Room 206", time: "15:30" },
  { initials: "S", name: "S. Kumar",  room: "Room 301", time: "16:00" },
  { initials: "P", name: "P. Mehta",  room: "Room 306", time: "18:00" },
  { initials: "N", name: "N. Singh",  room: "Room 212", time: "19:30" },
  { initials: "G", name: "G. Verma",  room: "Room 108", time: "20:00" },
];

const barHeights = [28, 42, 33, 52, 38, 58, 48, 72, 53, 78, 63, 100];

function DashboardMockup() {
  return (
    /* outer wrapper — subtle shadow + bg to sell the "card" feel */
    <div className="w-full rounded-2xl bg-neutral-100 p-2.5 shadow-[0_16px_64px_rgba(0,0,0,0.10)] select-none text-left">
      {/* bento grid: 4 cols, 2 rows, all children are individually rounded cards */}
      <div className="grid grid-cols-[180px_1fr_120px_140px] grid-rows-2 gap-2">

        {/* ── Room Status ─── col 1, row 1-2 */}
        <div className="row-span-2 rounded-xl bg-[#0f0f0f] p-4 flex flex-col gap-3">
          <p className="text-[8px] uppercase tracking-[0.35em] text-neutral-600">Room Status</p>
          <div className="grid grid-cols-4 gap-[5px]">
            {rooms.map((r) => (
              <div
                key={r.num}
                className={`rounded-[5px] text-[9px] font-semibold text-center py-1.5 leading-none ${roomColor[r.status]}`}
              >
                {r.num}
              </div>
            ))}
          </div>
          <div className="mt-auto pt-3 border-t border-neutral-800 space-y-1.5">
            {([["Occupied","14"],["Available","6"],["Reserved","4"]] as const).map(([label, val]) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-[9px] text-neutral-500">{label}</span>
                <span className="text-[9px] font-bold text-white">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Today's Arrivals ─── col 2, row 1 */}
        <div className="rounded-xl bg-white border border-neutral-200/70 p-4 flex flex-col gap-2.5">
          <p className="text-[8px] uppercase tracking-[0.35em] text-neutral-400">Today's Arrivals</p>
          <p className="text-xl font-bold text-neutral-900 leading-none">
            12 <span className="text-xs font-normal text-neutral-400">guests</span>
          </p>
          <div className="space-y-2 mt-1">
            {arrivals.map((a) => (
              <div key={a.name} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-500 text-[8px] font-bold flex items-center justify-center flex-shrink-0">
                  {a.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-neutral-800 leading-none">{a.name}</p>
                  <p className="text-[8px] text-neutral-400">{a.room}</p>
                </div>
                <span className="text-[9px] text-neutral-400 font-mono tabular-nums">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Occupancy Rate ─── col 3, row 1 */}
        <div className="rounded-xl bg-white border border-neutral-200/70 p-4 flex flex-col justify-between">
          <p className="text-[8px] uppercase tracking-[0.35em] text-neutral-400">Occupancy Rate</p>
          <div>
            <p className="text-3xl font-bold text-neutral-900 leading-none">
              78<span className="text-lg">%</span>
            </p>
            <p className="text-[9px] text-emerald-500 flex items-center gap-0.5 mt-1.5">
              <TrendingUp className="w-2.5 h-2.5" /> 3.2% vs last week
            </p>
          </div>
        </div>

        {/* ── Avg Daily Rate ─── col 4, row 1 */}
        <div className="rounded-xl bg-white border border-neutral-200/70 p-4 flex flex-col justify-between">
          <p className="text-[8px] uppercase tracking-[0.35em] text-neutral-400">Avg Daily Rate</p>
          <div>
            <p className="text-xl font-bold text-neutral-900 leading-none">₹4,218</p>
            <p className="text-[9px] text-emerald-500 flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-2.5 h-2.5" /> ₹120 vs last week
            </p>
          </div>
          {/* mini bar chart */}
          <div className="flex items-end gap-[2px] h-9 mt-2">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-[2px] ${i === barHeights.length - 1 ? "bg-neutral-900" : "bg-neutral-200"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* ── Revenue Today ─── col 2, row 2 */}
        <div className="rounded-xl bg-neutral-900 p-4 flex flex-col justify-between">
          <p className="text-[8px] uppercase tracking-[0.35em] text-neutral-500">Revenue Today</p>
          <div>
            <p className="text-2xl font-bold text-white leading-none">₹1.24L</p>
            <p className="text-[9px] text-emerald-400 flex items-center gap-0.5 mt-1.5">
              <TrendingUp className="w-2.5 h-2.5" /> 8.3% vs yesterday
            </p>
          </div>
        </div>

        {/* ── Departures Today ─── col 3-4, row 2 */}
        <div className="col-span-2 rounded-xl bg-white border border-neutral-200/70 p-4 flex flex-col justify-between">
          <p className="text-[8px] uppercase tracking-[0.35em] text-neutral-400">Departures Today</p>
          <div>
            <p className="text-4xl font-bold text-neutral-900 leading-none">8</p>
            <p className="text-[9px] text-neutral-400 mt-1.5">2 pending checkout</p>
          </div>
        </div>

      </div>
    </div>
  );
}

const stats = [
  { value: "2 min",  label: "Setup Time" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24 / 7", label: "Support" },
];

export function HeroMonochromeLaunch() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.innerHTML = `
      @keyframes hero-fade-up {
        from { opacity: 0; transform: translateY(32px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") { setVisible(true); return; }
    const node = sectionRef.current;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }); },
      { threshold: 0.1 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative mx-auto flex w-full max-w-6xl flex-col items-center text-center gap-10 px-6 pb-24 pt-28 lg:pt-36 lg:px-12 transition-opacity duration-700 ${
        visible ? "motion-safe:animate-[hero-fade-up_0.9s_cubic-bezier(.25,.9,.3,1)_forwards]" : "opacity-0"
      }`}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-neutral-500">
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-pulse" />
        Center of All Operations
      </div>

      {/* Headline */}
      <div className="space-y-1 max-w-3xl">
        <h1 className="text-[clamp(2.8rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-neutral-950">
          Every module.
        </h1>
        <h1 className="text-[clamp(2.8rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-neutral-400">
          One platform.
        </h1>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 bg-neutral-950 text-white px-7 py-3 rounded-lg text-sm font-semibold hover:bg-neutral-800 transition-colors duration-200"
        >
          Book a Demo <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-700 px-7 py-3 rounded-lg text-sm font-medium hover:border-neutral-500 hover:text-neutral-900 transition-colors duration-200"
        >
          View Pricing
        </a>
      </div>

      {/* Dashboard bento */}
      <div className="w-full mt-2">
        <DashboardMockup />
      </div>

      {/* Stats row */}
      <div className="w-full border-t border-neutral-200/60 pt-8 grid grid-cols-3 gap-6">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span className="text-2xl md:text-3xl font-bold text-neutral-950 tracking-tight">{value}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Powered by */}
      <p className="text-xs text-neutral-400 tracking-widest uppercase">powered by osiris marketing</p>
    </section>
  );
}

export default HeroMonochromeLaunch;
