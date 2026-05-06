import { useEffect, useRef, useState } from "react";
import NavHeader from "./NavHeader";
import { LogOut, ChevronDown } from "lucide-react";
import type { UserInfo } from "./AuthModal";

interface NavbarProps {
	user: UserInfo | null;
	onSignIn: () => void;
	onSignOut: () => void;
}

export function Navbar({ user, onSignIn, onSignOut }: NavbarProps) {
	const [hidden, setHidden] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onScroll = () => setHidden((window.scrollY || 0) > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const initial = user
		? (user.hotelName || user.email || "U")[0].toUpperCase()
		: "?";

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 border-b border-transparent bg-transparent transition-transform duration-300 ${
				hidden ? "-translate-y-full" : "translate-y-0"
			}`}
		>
			<div className="mx-auto max-w-6xl px-6 md:px-8 lg:px-12">
				<div className="flex h-16 md:h-20 items-center justify-between">

					{/* Logo */}
					<a
						href="#top"
						onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
						className="flex items-center gap-2 shrink-0"
					>
						<div className="w-7 h-7 rounded-md overflow-hidden flex items-center justify-center">
							<img src="/logo.png" alt="Oritel" className="w-full h-full object-contain" />
						</div>
						<span className="text-base font-semibold uppercase tracking-[0.2em] text-black">ORITEL</span>
					</a>

					{/* Center nav */}
					<div className="hidden md:block px-6">
						<NavHeader />
					</div>

					{/* Right side */}
					<div className="flex items-center gap-3 shrink-0">
						{user ? (
							/* ── User profile dropdown ── */
							<div className="relative" ref={dropdownRef}>
								<button
									onClick={() => setDropdownOpen((v) => !v)}
									className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-neutral-100 transition-colors"
								>
									<div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold select-none">
										{initial}
									</div>
									<span className="hidden md:block text-sm font-medium text-neutral-700 max-w-[120px] truncate">
										{user.hotelName || user.email}
									</span>
									<ChevronDown
										className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
									/>
								</button>

								{dropdownOpen && (
									<div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-neutral-200 bg-white shadow-lg overflow-hidden">
										{/* User info */}
										<div className="px-4 py-3 border-b border-neutral-100">
											<p className="text-xs font-medium text-neutral-900 truncate">
												{user.hotelName || "My Hotel"}
											</p>
											<p className="text-xs text-neutral-500 truncate mt-0.5">{user.email}</p>
											{user.plan && user.plan !== "none" && (
												<span className="inline-block mt-1.5 rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-semibold text-white">
													{user.plan} Plan
												</span>
											)}
										</div>

										{/* Actions */}
										<div className="p-1">
											<button
												onClick={() => { setDropdownOpen(false); onSignOut(); }}
												className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
											>
												<LogOut className="w-4 h-4" />
												Sign Out
											</button>
										</div>
									</div>
								)}
							</div>
						) : (
							/* ── Get Started (unauthenticated) ── */
							<button
								onClick={onSignIn}
								className="text-sm font-semibold bg-neutral-950 text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
							>
								Get Started
							</button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
