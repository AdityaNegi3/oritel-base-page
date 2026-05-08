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
  occupied: "bg-[#4ade80] text-[#14532d]",
  available: "bg-[#2a2a2a] text-[#888]",
  reserved: "bg-[#fb923c] text-[#7c2d12]",
};

const arrivals = [
  { initials: "R", name: "R. Sharma", room: "Room 103", time: "14:00" },
  { initials: "A", name: "A. Patel",  room: "Room 206", time: "15:30" },
  { initials: "S", name: "S. Kumar",  room: "Room 301", time: "16:00" },
  { initials: "P", name: "P. Mehta",  room: "Room 306", time: "18:00" },
  { initials: "N", name: "N. Singh",  room: "Room 212", time: "19:30" },
  { initials: "G", name: "G. Verma",  room: "Room 108", time: "20:00" },
];

const barHeights = [30, 45, 35, 55, 40, 60, 50, 75, 55, 80, 65, 100];

function DashboardMockup() {
  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_60px_rgba(0,0,0,0.08)] overflow-hidden text-left select-none">
      {/* grid layout */}
      <div className="grid grid-cols-[200px_1fr_1fr] grid-rows-[auto_auto] divide-x divide-y divide-neutral-100">

        {/* Room Status — spans 2 rows */}
        <div className="bg-[#111] text-white row-span-2 p-4 flex flex-col gap-3">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#666] mb-1">Room Status</p>
          <div className="grid grid-cols-4 gap-1">
            {rooms.map((r) => (
              <div
                key={r.num}
                className={`rounded-md text-[10px] font-semibold text-center py-1.5 leading-none ${roomColor[r.status]}`}
              >
                {r.num}
              </div>
            ))}
          </div>
          <div className="mt-auto pt-3 border-t border-[#222] space-y-1">
            {[["Occupied", "14"], ["Available", "6"], ["Reserved", "4"]].map(([label, val]) => (
              <div key={label} className="flex justify-between text-[10px]">
                <span className="text-[#666]">{label}</span>
                <span className="text-white font-semibold">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Arrivals */}
        <div className="p-4 col-span-1">
          <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-2">Today's Arrivals</p>
          <p className="text-2xl font-bold text-neutral-900 mb-3">
            12 <span className="text-sm font-normal text-neutral-400">guests</span>
          </p>
          <div className="space-y-2">
            {arrivals.map((a) => (
              <div key={a.name} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-600 text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                  {a.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-800 leading-none">{a.name}</p>
                  <p className="text-[9px] text-neutral-400">{a.room}</p>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avg Daily Rate */}
        <div className="p-4 col-span-1">
          <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-2">Avg Daily Rate</p>
          <p className="text-2xl font-bold text-neutral-900">₹4,218</p>
          <p className="text-[10px] text-emerald-500 flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-3 h-3" /> ₹120 vs last week
          </p>
          <div className="mt-3 flex items-end gap-0.5 h-12">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm ${i === barHeights.length - 1 ? "bg-neutral-900" : "bg-neutral-200"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="p-4 col-span-1">
          <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-2">Occupancy Rate</p>
          <p className="text-4xl font-bold text-neutral-900">78<span className="text-2xl">%</span></p>
          <p className="text-[10px] text-emerald-500 flex items-center gap-0.5 mt-1">
            <TrendingUp className="w-3 h-3" /> 3.2% vs last week
          </p>
        </div>

        {/* Revenue + Departures */}
        <div className="col-span-1 grid grid-cols-2 divide-x divide-neutral-100">
          <div className="bg-neutral-900 p-4">
            <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Revenue Today</p>
            <p className="text-2xl font-bold text-white">₹1.24L</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" /> 8.3% vs yesterday
            </p>
          </div>
          <div className="p-4">
            <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-2">Departures Today</p>
            <p className="text-4xl font-bold text-neutral-900">8</p>
            <p className="text-[10px] text-neutral-400 mt-1">2 pending checkout</p>
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
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } });
    }, { threshold: 0.1 });
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

      {/* Dashboard Mockup */}
      <div className="w-full mt-2">
        <DashboardMockup />
      </div>

      {/* Stats */}
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
