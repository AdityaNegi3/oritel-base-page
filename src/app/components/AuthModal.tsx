import { useState, useEffect, useRef } from "react";
import { X, Hotel, Loader2 } from "lucide-react";

declare global {
	interface Window {
		google?: {
			accounts: {
				id: {
					initialize: (cfg: { client_id: string; callback: (r: { credential: string }) => void }) => void;
					renderButton: (el: HTMLElement, cfg: object) => void;
				};
			};
		};
	}
}

interface AuthModalProps {
	open: boolean;
	onClose: () => void;
	onSuccess: (token: string, user: UserInfo) => void;
}

export interface UserInfo {
	id: number;
	email: string;
	hotelName: string;
	plan: string;
	planStatus: string;
}

type Tab = "signin" | "signup";

const API = import.meta.env.VITE_API_URL || "";

export function AuthModal({ open, onClose, onSuccess }: AuthModalProps) {
	const [tab, setTab] = useState<Tab>("signin");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [hotelName, setHotelName] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const googleBtnRef = useRef<HTMLDivElement>(null);

	const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

	// Mount Google Sign-In button when modal opens. The Google script can arrive
	// after the modal renders on production CDNs, so retry briefly instead of
	// leaving an empty button slot.
	useEffect(() => {
		if (!open || !googleClientId) return;

		let cancelled = false;
		let attempts = 0;
		let retry: ReturnType<typeof setTimeout> | undefined;

		const ensureGoogleScript = () => {
			if (
				document.querySelector<HTMLScriptElement>(
					'script[src="https://accounts.google.com/gsi/client"]'
				)
			) {
				return;
			}

			const script = document.createElement("script");
			script.src = "https://accounts.google.com/gsi/client";
			script.async = true;
			script.defer = true;
			document.head.appendChild(script);
		};

		const init = () => {
			if (cancelled) return;
			if (!googleBtnRef.current || !window.google?.accounts?.id) return;
			googleBtnRef.current.innerHTML = "";
			window.google.accounts.id.initialize({
				client_id: googleClientId,
				callback: handleGoogleCredential,
			});
			window.google.accounts.id.renderButton(googleBtnRef.current, {
				theme: "outline",
				size: "large",
				width: googleBtnRef.current.offsetWidth || 360,
				text: "continue_with",
				shape: "rectangular",
			});
		};

		const initWhenReady = () => {
			if (window.google?.accounts?.id) {
				init();
				return;
			}
			if (attempts < 25) {
				attempts += 1;
				retry = setTimeout(initWhenReady, 200);
			}
		};

		ensureGoogleScript();
		initWhenReady();

		return () => {
			cancelled = true;
			if (retry) clearTimeout(retry);
		};
	}, [open, googleClientId]);

	const handleGoogleCredential = async (response: { credential: string }) => {
		setLoading(true);
		setError("");
		try {
			const res = await fetch(`${API}/api/auth/google`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ credential: response.credential }),
			});
			const data = await res.json();
			if (!res.ok) { setError(data.error || "Google sign-in failed"); return; }
			localStorage.setItem("oritel_token", data.token);
			onSuccess(data.token, data.user);
			onClose();
		} catch {
			setError("Cannot connect to server. Make sure the backend is running.");
		} finally {
			setLoading(false);
		}
	};

	if (!open) return null;

	const reset = () => { setEmail(""); setPassword(""); setHotelName(""); setError(""); };
	const switchTab = (t: Tab) => { setTab(t); reset(); };

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		const endpoint = tab === "signin" ? "/api/auth/login" : "/api/auth/register";
		const body = tab === "signin" ? { email, password } : { email, password, hotelName };
		try {
			const res = await fetch(`${API}${endpoint}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const data = await res.json();
			if (!res.ok) { setError(data.error || "Something went wrong"); return; }
			localStorage.setItem("oritel_token", data.token);
			onSuccess(data.token, data.user);
			onClose();
			reset();
		} catch {
			setError("Cannot connect to server. Make sure the backend is running.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

			<div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
				>
					<X className="w-4 h-4" />
				</button>

				{/* Brand */}
				<div className="flex items-center gap-2.5 mb-6">
					<div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
						<Hotel className="w-4 h-4 text-white" />
					</div>
					<span className="font-semibold text-neutral-900 tracking-wide">ORITEL</span>
				</div>

				<h2 className="text-2xl font-semibold text-neutral-950 mb-1">
					{tab === "signin" ? "Welcome back" : "Create your account"}
				</h2>
				<p className="text-sm text-neutral-500 mb-6">
					{tab === "signin" ? "Sign in to manage your subscription." : "Start your 14-day free trial today."}
				</p>

				{/* Google Sign-In */}
				{googleClientId && (
					<>
						<div ref={googleBtnRef} className="w-full mb-4 min-h-[44px]" />
						<div className="flex items-center gap-3 mb-4">
							<div className="flex-1 h-px bg-neutral-200" />
							<span className="text-xs text-neutral-400 font-medium">or continue with email</span>
							<div className="flex-1 h-px bg-neutral-200" />
						</div>
					</>
				)}

				{/* Tabs */}
				<div className="flex gap-1 bg-neutral-100 rounded-lg p-1 mb-5">
					{(["signin", "signup"] as Tab[]).map((t) => (
						<button
							key={t}
							onClick={() => switchTab(t)}
							className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
								tab === t ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
							}`}
						>
							{t === "signin" ? "Sign In" : "Sign Up"}
						</button>
					))}
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{tab === "signup" && (
						<div>
							<label className="block text-sm font-medium text-neutral-700 mb-1.5">Hotel / Property Name</label>
							<input
								type="text"
								value={hotelName}
								onChange={(e) => setHotelName(e.target.value)}
								placeholder="Sunrise Resort & Spa"
								className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
							/>
						</div>
					)}
					<div>
						<label className="block text-sm font-medium text-neutral-700 mb-1.5">Email address</label>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@hotel.com"
							className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-neutral-700 mb-1.5">Password</label>
						<input
							type="password"
							required
							minLength={6}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
						/>
					</div>

					{error && (
						<p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
							{error}
						</p>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-neutral-950 text-white rounded-lg py-3 text-sm font-semibold hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
					>
						{loading && <Loader2 className="w-4 h-4 animate-spin" />}
						{tab === "signin" ? "Sign In" : "Create Account"}
					</button>
				</form>

				<p className="text-xs text-neutral-400 text-center mt-4">
					By continuing, you agree to our{" "}
					<a href="/terms" className="underline hover:text-neutral-700">Terms</a>
					{" "}and{" "}
					<a href="/privacy" className="underline hover:text-neutral-700">Privacy Policy</a>.
				</p>
			</div>
		</div>
	);
}
