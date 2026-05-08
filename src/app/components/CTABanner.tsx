export function CTABanner() {
	return (
		<section
			id="contact"
			className="px-6 py-32 flex items-center justify-center"
		>
			<div className="relative max-w-4xl w-full mx-auto rounded-3xl border border-neutral-200/80 bg-neutral-50/60 backdrop-blur px-6 sm:px-10 py-14 sm:py-20 text-center overflow-hidden">
				{/* Decorative corner rings */}
				<span className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full border border-neutral-200/60" />
				<span className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full border border-neutral-200/60" />
				<span className="pointer-events-none absolute -top-8 -left-8 h-24 w-24 rounded-full border border-neutral-200/40" />

				<div className="inline-block rounded-full border border-neutral-200 bg-white px-4 py-1 text-xs uppercase tracking-[0.4em] text-neutral-500 mb-8">
					Get Started
				</div>

				<h2 className="font-playfair text-2xl sm:text-4xl md:text-6xl font-semibold text-neutral-950 mb-6 leading-tight">
					Ready to transform your hotel operations?
				</h2>

				<p className="text-base sm:text-lg text-neutral-500 mb-10 leading-relaxed max-w-xl mx-auto">
					Streamline bookings, automate workflows, and elevate guest
					experiences with a modern hotel management platform.
				</p>

				<div className="flex flex-wrap gap-4 justify-center items-center">
					<a
						href="#pricing"
						className="inline-flex items-center gap-2 bg-neutral-950 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors duration-300"
					>
						View Pricing
					</a>
					<a
						href="#features"
						className="border border-neutral-200 text-neutral-600 px-8 py-3.5 rounded-full text-sm font-medium hover:border-neutral-400 hover:text-neutral-900 transition-colors duration-300"
					>
						See Features
					</a>
				</div>
			</div>
		</section>
	);
}