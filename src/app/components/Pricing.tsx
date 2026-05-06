// import { Check, Zap } from "lucide-react";
// import { useMemo, useState } from "react";
// import { motion } from "motion/react";
// import NumberFlow from "@number-flow/react";
// import { cn } from "./ui/utils";

// // ── Razorpay type declarations ────────────────────────────────────────────────
// declare global {
// 	interface Window {
// 		Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
// 	}
// }

// interface RazorpayOptions {
// 	key: string;
// 	subscription_id?: string;
// 	order_id?: string;
// 	amount?: number;
// 	currency?: string;
// 	name: string;
// 	description: string;
// 	prefill?: { name?: string; email?: string };
// 	theme?: { color?: string };
// 	handler: (response: RazorpaySubscriptionResponse) => void;
// }

// interface RazorpaySubscriptionResponse {
// 	razorpay_payment_id: string;
// 	razorpay_subscription_id: string;
// 	razorpay_signature: string;
// }

// interface RazorpayInstance {
// 	open: () => void;
// }

// // ── Plan definitions ──────────────────────────────────────────────────────────
// const plans = [
// 	{
// 		name: "Starter",
// 		monthlyPrice: 4999,
// 		yearlyPrice: 4999 * 10,
// 		popular: false,
// 		description: "Perfect for small hotels & guesthouses",
// 		badge: null,
// 		features: [
// 			"Up to 20 rooms",
// 			"Booking management",
// 			"Receptionist dashboard",
// 			"Housekeeping dashboard",
// 			"Email support",
// 			"Basic analytics",
// 		],
// 	},
// 	{
// 		name: "Pro",
// 		monthlyPrice: 9999,
// 		yearlyPrice: 9999 * 10,
// 		popular: true,
// 		description: "Best for growing hotels & resorts",
// 		badge: "Most Popular",
// 		features: [
// 			"Up to 100 rooms",
// 			"Everything in Starter",
// 			"Admin dashboard",
// 			"Guest booking portal",
// 			"Staff management",
// 			"WhatsApp notifications",
// 			"Advanced analytics",
// 			"Priority support",
// 		],
// 	},
// 	{
// 		name: "Enterprise",
// 		monthlyPrice: null,
// 		yearlyPrice: null,
// 		popular: false,
// 		description: "For hotel chains & large properties",
// 		badge: null,
// 		features: [
// 			"Unlimited rooms",
// 			"Everything in Pro",
// 			"Custom guest portal design",
// 			"OTA sync (Booking.com / Airbnb)",
// 			"Dynamic pricing engine",
// 			"Dedicated account manager",
// 			"SLA guarantee",
// 			"Custom integrations",
// 		],
// 	},
// ] as const;

// type Period = "monthly" | "yearly";
// type PlanName = (typeof plans)[number]["name"];

// interface PricingProps {
// 	authToken: string | null;
// 	onAuthRequired: (callback: () => void) => void;
// }

// // ── Billing toggle ────────────────────────────────────────────────────────────
// function PricingSwitch({ value, onChange }: { value: Period; onChange: (v: Period) => void }) {
// 	return (
// 		<div className="flex justify-center">
// 			<div className="flex w-fit rounded-full bg-neutral-50 border border-neutral-200 p-1">
// 				{(["monthly", "yearly"] as Period[]).map((p) => (
// 					<button
// 						key={p}
// 						type="button"
// 						onClick={() => onChange(p)}
// 						className={cn(
// 							"relative h-10 rounded-full px-5 py-2 text-sm font-medium transition-colors",
// 							value === p ? "text-black" : "text-neutral-400 hover:text-black",
// 						)}
// 					>
// 						{value === p && (
// 							<motion.span
// 								layoutId="pricing-switch"
// 								className="absolute inset-0 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-200 to-neutral-100 shadow-sm"
// 								transition={{ type: "spring", stiffness: 500, damping: 30 }}
// 							/>
// 						)}
// 						<span className="relative flex items-center gap-2">
// 							{p === "monthly" ? "Monthly" : (
// 								<>
// 									Yearly
// 									<span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-semibold text-emerald-700">
// 										Save 20%
// 									</span>
// 								</>
// 							)}
// 						</span>
// 					</button>
// 				))}
// 			</div>
// 		</div>
// 	);
// }

// // ── Razorpay subscription checkout ───────────────────────────────────────────
// async function startSubscription(plan: PlanName, period: Period, authToken: string) {
// 	const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
// 	if (!key) {
// 		alert("Razorpay key not configured. Add VITE_RAZORPAY_KEY_ID to your .env file.");
// 		return;
// 	}

// 	let subscriptionId: string | undefined;

// 	// Ask backend to create the Razorpay subscription
// 	try {
// 		const res = await fetch("/api/subscriptions/create", {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
// 			body: JSON.stringify({ plan, period }),
// 		});
// 		if (res.ok) {
// 			const data = await res.json();
// 			subscriptionId = data.subscriptionId;
// 		} else {
// 			const err = await res.json();
// 			alert(err.error || "Failed to create subscription. Is the backend running?");
// 			return;
// 		}
// 	} catch {
// 		alert("Cannot connect to the server. Make sure the backend is running on port 3001.");
// 		return;
// 	}

// 	if (!subscriptionId) return;

// 	const options: RazorpayOptions = {
// 		key,
// 		subscription_id: subscriptionId,
// 		name: "Oritel Hotel OS",
// 		description: `${plan} Plan — ${period === "yearly" ? "Annual" : "Monthly"} subscription`,
// 		theme: { color: "#171717" },
// 		handler: async (response) => {
// 			// Verify the first payment with the backend
// 			try {
// 				await fetch("/api/subscriptions/verify", {
// 					method: "POST",
// 					headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
// 					body: JSON.stringify({ ...response, plan }),
// 				});
// 			} catch {
// 				// Continue even if verify call fails — webhook handles it too
// 			}
// 			alert("Subscription activated! Razorpay will auto-charge you every month. Welcome to Oritel 🎉");
// 			window.location.href = import.meta.env.VITE_SAAS_URL || "#";
// 		},
// 	};

// 	const rzp = new window.Razorpay(options);
// 	rzp.open();
// }

// // ── Main component ────────────────────────────────────────────────────────────
// export function Pricing({ authToken, onAuthRequired }: PricingProps) {
// 	const [period, setPeriod] = useState<Period>("monthly");

// 	const handleBuy = (planName: PlanName) => {
// 		if (planName === "Enterprise") {
// 			window.location.href = "#contact";
// 			return;
// 		}
// 		onAuthRequired(() => {
// 			if (!authToken) return;
// 			startSubscription(planName, period, authToken);
// 		});
// 	};

// 	const displayPlans = useMemo(
// 		() =>
// 			plans.map((p) => ({
// 				...p,
// 				price:
// 					p.name === "Enterprise" || p.monthlyPrice == null
// 						? null
// 						: period === "yearly"
// 							? (p.monthlyPrice as number) * 10
// 							: (p.monthlyPrice as number),
// 				perLabel: p.name === "Enterprise" ? "" : period === "yearly" ? "/yr" : "/mo",
// 				ctaText: p.name === "Enterprise" ? "Contact Sales" : "COMING SOON",
// 			})),
// 		[period],
// 	);

// 	return (
// 		<section id="pricing" className="px-4 py-24 md:py-32">
// 			<div className="max-w-6xl mx-auto">
// 				{/* Header */}
// 				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
// 					<div>
// 						<p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">Pricing</p>
// 						<h2 className="text-4xl md:text-5xl font-semibold text-neutral-950 leading-tight">
// 							Simple, transparent pricing
// 						</h2>
// 						<p className="text-neutral-500 mt-3 text-lg">
// 							Start free for 14 days. Auto-renews monthly. Cancel anytime.
// 						</p>
// 					</div>
// 					<PricingSwitch value={period} onChange={setPeriod} />
// 				</div>

// 				{/* Cards */}
// 				<div className="grid md:grid-cols-3 gap-5">
// 					{displayPlans.map((plan) => (
// 						<div
// 							key={plan.name}
// 							className={cn(
// 								"relative flex flex-col rounded-2xl border p-8 transition-all",
// 								plan.popular
// 									? "bg-neutral-950 border-neutral-800 text-white shadow-2xl md:-translate-y-3"
// 									: "bg-white border-neutral-200 text-neutral-950 shadow-sm",
// 							)}
// 						>
// 							{plan.badge && (
// 								<div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
// 									<span className="inline-flex items-center gap-1 rounded-full bg-white border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
// 										<Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
// 										{plan.badge}
// 									</span>
// 								</div>
// 							)}

// 							<div className="mb-6">
// 								<h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
// 								<p className={cn("text-sm", plan.popular ? "text-neutral-400" : "text-neutral-500")}>
// 									{plan.description}
// 								</p>
// 							</div>

// 							<div className="mb-8 pb-8 border-b border-current/10">
// 								{plan.name === "Enterprise" ? (
// 									<div className="text-4xl font-semibold">Custom</div>
// 								) : (
// 									<div className="flex items-baseline gap-1">
// 										<span className="text-4xl font-semibold">
// 											₹<NumberFlow
// 												value={plan.price ?? 0}
// 												format={{ useGrouping: true, maximumFractionDigits: 0 }}
// 												className="text-4xl font-semibold"
// 											/>
// 										</span>
// 										<span className={cn("text-sm", plan.popular ? "text-neutral-400" : "text-neutral-500")}>
// 											{plan.perLabel}
// 										</span>
// 									</div>
// 								)}
// 								{plan.name !== "Enterprise" && (
// 									<p className={cn("text-xs mt-1.5", plan.popular ? "text-neutral-500" : "text-neutral-400")}>
// 										Billed {period === "yearly" ? "annually" : "monthly"} · Auto-renews
// 									</p>
// 								)}
// 							</div>

// 							<ul className="space-y-3 mb-8 flex-1">
// 								{plan.features.map((feature) => (
// 									<li key={feature} className="flex items-start gap-3">
// 										<span
// 											className={cn(
// 												"mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
// 												plan.popular
// 													? "bg-neutral-700 text-white"
// 													: "bg-neutral-100 border border-neutral-200 text-neutral-900",
// 											)}
// 										>
// 											<Check className="h-3 w-3" strokeWidth={3} />
// 										</span>
// 										<span className={cn("text-sm", plan.popular ? "text-neutral-300" : "text-neutral-600")}>
// 											{feature}
// 										</span>
// 									</li>
// 								))}
// 							</ul>

// 							<button
// 								onClick={() => handleBuy(plan.name)}
// 								className={cn(
// 									"w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-200",
// 									plan.popular
// 										? "bg-white text-neutral-900 hover:bg-neutral-100 shadow-lg"
// 										: "bg-neutral-950 text-white hover:bg-neutral-800",
// 								)}
// 							>
// 								{plan.ctaText}
// 							</button>
// 						</div>
// 					))}
// 				</div>

// 				<p className="text-center text-sm text-neutral-400 mt-8">
// 					All plans include 14-day free trial · Automatic monthly billing via Razorpay · Cancel anytime
// 				</p>
// 			</div>
// 		</section>
// 	);
// }
import { Check, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { cn } from "./ui/utils";

// ── Plan definitions ──────────────────────────────────────────────────────────
const plans = [
	{
		name: "Starter",
		monthlyPrice: 4999,
		yearlyPrice: 4999 * 10,
		popular: false,
		description: "Perfect for small hotels & guesthouses",
		badge: null,
		features: [
			"Up to 20 rooms",
			"Booking management",
			"Receptionist dashboard",
			"Housekeeping dashboard",
			"Email support",
			"Basic analytics",
		],
	},
	{
		name: "Pro",
		monthlyPrice: 9999,
		yearlyPrice: 9999 * 10,
		popular: true,
		description: "Best for growing hotels & resorts",
		badge: "Most Popular",
		features: [
			"Up to 100 rooms",
			"Everything in Starter",
			"Admin dashboard",
			"Guest booking portal",
			"Staff management",
			"WhatsApp notifications",
			"Advanced analytics",
			"Priority support",
		],
	},
	{
		name: "Enterprise",
		monthlyPrice: null,
		yearlyPrice: null,
		popular: false,
		description: "For hotel chains & large properties",
		badge: null,
		features: [
			"Unlimited rooms",
			"Everything in Pro",
			"Custom guest portal design",
			"OTA sync (Booking.com / Airbnb)",
			"Dynamic pricing engine",
			"Dedicated account manager",
			"SLA guarantee",
			"Custom integrations",
		],
	},
] as const;

type Period = "monthly" | "yearly";

// ── Billing toggle ────────────────────────────────────────────────────────────
function PricingSwitch({
	value,
	onChange,
}: {
	value: Period;
	onChange: (v: Period) => void;
}) {
	return (
		<div className="flex justify-center">
			<div className="flex w-fit rounded-full bg-neutral-50 border border-neutral-200 p-1">
				{(["monthly", "yearly"] as Period[]).map((p) => (
					<button
						key={p}
						type="button"
						onClick={() => onChange(p)}
						className={cn(
							"relative h-10 rounded-full px-5 py-2 text-sm font-medium transition-colors",
							value === p
								? "text-black"
								: "text-neutral-400 hover:text-black",
						)}
					>
						{value === p && (
							<motion.span
								layoutId="pricing-switch"
								className="absolute inset-0 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-200 to-neutral-100 shadow-sm"
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 30,
								}}
							/>
						)}

						<span className="relative flex items-center gap-2">
							{p === "monthly" ? (
								"Monthly"
							) : (
								<>
									Yearly
									<span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-semibold text-emerald-700">
										Save 20%
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

// ── Main component ────────────────────────────────────────────────────────────
export function Pricing() {
	const [period, setPeriod] = useState<Period>("monthly");

	const displayPlans = useMemo(
		() =>
			plans.map((p) => ({
				...p,
				price:
					p.name === "Enterprise" || p.monthlyPrice == null
						? null
						: period === "yearly"
							? (p.monthlyPrice as number) * 10
							: (p.monthlyPrice as number),
				perLabel:
					p.name === "Enterprise"
						? ""
						: period === "yearly"
							? "/yr"
							: "/mo",
				ctaText: "COMING SOON",
			})),
		[period],
	);

	return (
		<section id="pricing" className="px-4 py-24 md:py-32">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
					<div>
						<p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
							Pricing
						</p>

						<h2 className="text-4xl md:text-5xl font-semibold text-neutral-950 leading-tight">
							Simple, transparent pricing
						</h2>

						<p className="text-neutral-500 mt-3 text-lg">
							Start free for 14 days. Auto-renews monthly. Cancel anytime.
						</p>
					</div>

					<PricingSwitch value={period} onChange={setPeriod} />
				</div>

				{/* Cards */}
				<div className="grid md:grid-cols-3 gap-5">
					{displayPlans.map((plan) => (
						<div
							key={plan.name}
							className={cn(
								"relative flex flex-col rounded-2xl border p-8 transition-all",
								plan.popular
									? "bg-neutral-950 border-neutral-800 text-white shadow-2xl md:-translate-y-3"
									: "bg-white border-neutral-200 text-neutral-950 shadow-sm",
							)}
						>
							{plan.badge && (
								<div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
									<span className="inline-flex items-center gap-1 rounded-full bg-white border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
										<Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
										{plan.badge}
									</span>
								</div>
							)}

							<div className="mb-6">
								<h3 className="text-lg font-semibold mb-1">
									{plan.name}
								</h3>

								<p
									className={cn(
										"text-sm",
										plan.popular
											? "text-neutral-400"
											: "text-neutral-500",
									)}
								>
									{plan.description}
								</p>
							</div>

							<div className="mb-8 pb-8 border-b border-current/10">
								{plan.name === "Enterprise" ? (
									<div className="text-4xl font-semibold">
										Custom
									</div>
								) : (
									<div className="flex items-baseline gap-1">
										<span className="text-4xl font-semibold">
											₹
											<NumberFlow
												value={plan.price ?? 0}
												format={{
													useGrouping: true,
													maximumFractionDigits: 0,
												}}
												className="text-4xl font-semibold"
											/>
										</span>

										<span
											className={cn(
												"text-sm",
												plan.popular
													? "text-neutral-400"
													: "text-neutral-500",
											)}
										>
											{plan.perLabel}
										</span>
									</div>
								)}

								{plan.name !== "Enterprise" && (
									<p
										className={cn(
											"text-xs mt-1.5",
											plan.popular
												? "text-neutral-500"
												: "text-neutral-400",
										)}
									>
										Billed{" "}
										{period === "yearly"
											? "annually"
											: "monthly"}{" "}
										· Auto-renews
									</p>
								)}
							</div>

							<ul className="space-y-3 mb-8 flex-1">
								{plan.features.map((feature) => (
									<li
										key={feature}
										className="flex items-start gap-3"
									>
										<span
											className={cn(
												"mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
												plan.popular
													? "bg-neutral-700 text-white"
													: "bg-neutral-100 border border-neutral-200 text-neutral-900",
											)}
										>
											<Check
												className="h-3 w-3"
												strokeWidth={3}
											/>
										</span>

										<span
											className={cn(
												"text-sm",
												plan.popular
													? "text-neutral-300"
													: "text-neutral-600",
											)}
										>
											{feature}
										</span>
									</li>
								))}
							</ul>

							<button
								disabled
								className={cn(
									"w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 cursor-not-allowed opacity-60",
									plan.popular
										? "bg-white text-neutral-900"
										: "bg-neutral-950 text-white",
								)}
							>
								{plan.ctaText}
							</button>
						</div>
					))}
				</div>

				<p className="text-center text-sm text-neutral-400 mt-8">
					Launching soon · Pricing plans are currently unavailable
				</p>
			</div>
		</section>
	);
}