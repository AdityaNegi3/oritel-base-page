import { Check, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { cn } from "./ui/utils";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 5999,
    wasPrice: null,
    popular: false,
    badge: null as string | null,
    description: "Perfect for small hotels & guesthouses",
    features: [
      "Up to 20 rooms",
      "Up to 100 bookings / month",
      "Email notifications (all guest + staff alerts)",
      "Receptionist dashboard",
      "Basic admin dashboard",
      "Default guest booking portal",
      "In-app notifications with sound",
      "Email support (48hr response)",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 11999,
    wasPrice: null,
    popular: false,
    badge: null as string | null,
    description: "Best for growing hotels & resorts",
    features: [
      "Up to 75 rooms",
      "Unlimited bookings",
      "Email + WhatsApp notifications",
      "All dashboards + staff management",
      "Custom guest portal design",
      "Inventory + damage management",
      "Daily + weekly email reports",
      "In-app notifications with sound",
      "Priority support (24hr response)",
    ],
  },
  {
    name: "Business",
    monthlyPrice: 22999,
    wasPrice: null,
    popular: true,
    badge: "Most Popular" as string | null,
    description: "For large properties & multi-site chains",
    features: [
      "Up to 200 rooms",
      "Unlimited everything",
      "Email + WhatsApp notifications",
      "Fully custom branded hotel website",
      "Up to 3 properties",
      "OTA sync (Booking.com / Airbnb)",
      "Dynamic pricing engine",
      "Dedicated account manager",
      "Monthly strategy call",
      "SLA: 99.9% uptime",
      "12hr priority support",
    ],
  },
  {
    name: "Enterprise",
    monthlyPrice: 49999,
    wasPrice: null,
    popular: false,
    badge: null as string | null,
    description: "Unlimited rooms, white-label & custom everything",
    features: [
      "Unlimited rooms + properties",
      "White-label option",
      "Custom integrations",
      "AI chatbot for guests",
      "Loyalty points system",
      "On-premise deployment option",
      "Custom SLA",
      "Dedicated engineer support",
      "Custom contract",
    ],
  },
] as const;

type Period = "monthly" | "yearly";

function PricingSwitch({ value, onChange }: { value: Period; onChange: (v: Period) => void }) {
  return (
    <div className="flex justify-center">
      <div className="flex w-fit rounded-full bg-neutral-50 border border-neutral-200 p-1">
        {(["monthly", "yearly"] as Period[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={cn(
              "relative h-9 rounded-full px-5 text-sm font-medium transition-colors",
              value === p ? "text-black" : "text-neutral-400 hover:text-black",
            )}
          >
            {value === p && (
              <motion.span
                layoutId="pricing-switch"
                className="absolute inset-0 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-200 to-neutral-100 shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {p === "monthly" ? (
                "Monthly"
              ) : (
                <>
                  Yearly
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Save 2 months
                  </span>
                </>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Pricing() {
  const [period, setPeriod] = useState<Period>("monthly");

  const displayPlans = useMemo(
    () =>
      plans.map((p) => ({
        ...p,
        price:
          p.monthlyPrice == null
            ? null
            : period === "yearly"
              ? p.monthlyPrice * 10
              : p.monthlyPrice,
        perLabel: p.monthlyPrice == null ? "" : period === "yearly" ? "/yr" : "/mo",
      })),
    [period],
  );

  return (
    <section id="pricing" className="px-4 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14">
          <div>
            <div className="inline-block rounded-full border border-neutral-200/80 bg-neutral-100/60 px-4 py-1 text-xs uppercase tracking-[0.4em] text-neutral-500 mb-5">
              Pricing
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-neutral-950 leading-tight mb-3">
              Simple, transparent pricing
            </h2>
            <p className="text-neutral-500 text-base">
              All plans launch soon · Powered by Razorpay
            </p>
          </div>
          <PricingSwitch value={period} onChange={setPeriod} />
        </div>

        {/* Cards — 2 col on md, 4 col on xl */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
          {displayPlans.map((plan) => {
            const isEnterprise = plan.name === "Enterprise";
            const isPro = plan.popular;

            return (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-7 transition-all",
                  isPro
                    ? "bg-neutral-950 border-neutral-800 text-white shadow-2xl xl:-translate-y-4"
                    : isEnterprise
                      ? "bg-neutral-50 border-neutral-200 border-dashed text-neutral-950"
                      : "bg-white border-neutral-200 text-neutral-950 shadow-sm",
                )}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
                      <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name + description */}
                <div className="mb-5">
                  <h3 className="text-base font-semibold mb-1 uppercase tracking-[0.15em]">
                    {plan.name}
                  </h3>
                  <p className={cn("text-xs leading-relaxed", isPro ? "text-neutral-400" : "text-neutral-500")}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-current/10">
                  {isEnterprise ? (
                    <>
                      <div className="text-sm text-neutral-500 mb-1">Starting at</div>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-semibold">
                          ₹
                          <NumberFlow
                            value={period === "yearly" ? 49999 * 10 : 49999}
                            format={{ useGrouping: true, maximumFractionDigits: 0 }}
                            className="text-3xl font-semibold"
                          />
                        </span>
                        <span className="text-sm text-neutral-500">{period === "yearly" ? "/yr" : "/mo"}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-semibold">
                          ₹
                          <NumberFlow
                            value={plan.price ?? 0}
                            format={{ useGrouping: true, maximumFractionDigits: 0 }}
                            className="text-3xl font-semibold"
                          />
                        </span>
                        <span className={cn("text-sm", isPro ? "text-neutral-400" : "text-neutral-500")}>
                          {plan.perLabel}
                        </span>
                      </div>
                      {period === "yearly" && (
                        <p className={cn("text-xs", isPro ? "text-neutral-500" : "text-neutral-400")}>
                          Billed annually · 2 months free
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                          isPro
                            ? "bg-neutral-700 text-white"
                            : isEnterprise
                              ? "bg-neutral-200 text-neutral-700"
                              : "bg-neutral-100 border border-neutral-200 text-neutral-700",
                        )}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span className={cn("text-xs leading-relaxed", isPro ? "text-neutral-300" : "text-neutral-600")}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  disabled
                  className={cn(
                    "w-full rounded-xl py-3 text-sm font-semibold cursor-not-allowed opacity-50 transition-all duration-200",
                    isPro ? "bg-white text-neutral-900" : "bg-neutral-950 text-white",
                  )}
                >
                  Coming Soon
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-neutral-400 mt-10">
          Launching soon · All plans include 14-day free trial · Auto-renews via Razorpay · Cancel anytime
        </p>
      </div>
    </section>
  );
}
