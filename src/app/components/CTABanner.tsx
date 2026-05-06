import { ArrowRight } from "lucide-react";

interface CTABannerProps {
	onGetStarted?: () => void;
}

export function CTABanner({ onGetStarted }: CTABannerProps) {
	return (
		<section
			id="contact"
			className="min-h-[80vh] px-6 flex items-center justify-center -mt-12"
		>
			<div className="max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center">
				<div className="inline-block rounded-full border border-neutral-200 bg-neutral-100/60 px-4 py-1 text-xs uppercase tracking-[0.4em] text-neutral-500 mb-8">
					Get Started
				</div>

				<h2 className="font-playfair text-5xl md:text-6xl font-semibold text-neutral-950 mb-6 leading-tight text-center">
					Ready to transform your hotel operations?
				</h2>

				<p className="text-xl text-neutral-500 mb-10 leading-relaxed text-center max-w-2xl">
					Streamline bookings, automate workflows, and elevate guest
					experiences with a modern hotel management platform.
				</p>

				<div className="flex flex-wrap gap-4 justify-center items-center">
					<a
						href="#pricing"
						className="border border-neutral-200 text-neutral-700 px-8 py-4 rounded-full hover:border-neutral-400 transition-colors text-sm"
					>
						View Pricing
					</a>
				</div>
			</div>
		</section>
	);
}