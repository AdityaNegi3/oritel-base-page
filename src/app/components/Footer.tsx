// import React from 'react';
// import type { ComponentProps, ReactNode } from 'react';
// import { motion, useReducedMotion } from 'motion/react';
// import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';

// interface FooterLink {
// 	title: string;
// 	href: string;
// 	icon?: React.ComponentType<{ className?: string }>;
// }

// interface FooterSection {
// 	label: string;
// 	links: FooterLink[];
// }

// const footerLinks: FooterSection[] = [
// 	{
// 		label: 'Product',
// 		links: [
// 			{ title: 'Features', href: '#features' },
// 			{ title: 'Pricing', href: '#pricing' },
// 			{ title: 'How It Works', href: '#how-it-works' },
// 		],
// 	},
// 	{
// 		label: 'Company',
// 		links: [
// 			{ title: 'About Us', href: '#about' },
// 			{ title: 'Contact', href: '#contact' },
// 			{ title: 'Privacy Policy', href: '/privacy' },
// 			{ title: 'Terms of Service', href: '/terms' },
// 		],
// 	},
// 	{
// 		label: 'Resources',
// 		links: [
// 			{ title: 'Blog', href: '/blog' },
// 			{ title: 'Changelog', href: '/changelog' },
// 			{ title: 'Help Center', href: '/help' },
// 			{ title: 'API Docs', href: '/docs' },
// 		],
// 	},
// 	{
// 		label: 'Social Links',
// 		links: [
// 			{ title: 'Facebook', href: '#', icon: FacebookIcon },
// 			{ title: 'Instagram', href: '#', icon: InstagramIcon },
// 			{ title: 'Youtube', href: '#', icon: YoutubeIcon },
// 			{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
// 		],
// 	},
// ];

// export function Footer() {
// 	return (
// 		<footer className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t border-neutral-200 px-6 py-12 lg:py-16">
// 			<div className="absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-px rounded-full bg-neutral-400/30 blur-sm" />

// 			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
// 				<AnimatedContainer className="space-y-4">
// 					<div className="flex items-center gap-2.5">
// 						<div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center">
// 							<img src="/logo.png" alt="Oritel" className="w-full h-full object-contain" />
// 						</div>
// 						<span className="text-xl font-semibold tracking-wide text-neutral-900">ORITEL</span>
// 					</div>
// 					<p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
// 						Modern hotel management software built for Indian properties. Simplify operations, delight guests.
// 					</p>
// 					<p className="text-neutral-400 text-sm">
// 						© {new Date().getFullYear()} Oritel. All rights reserved.
// 					</p>
// 				</AnimatedContainer>

// 				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
// 					{footerLinks.map((section, index) => (
// 						<React.Fragment key={section.label}>
// 							<AnimatedContainer delay={0.1 + index * 0.1}>
// 								<div className="mb-10 md:mb-0">
// 									<h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
// 										{section.label}
// 									</h3>
// 									<ul className="mt-4 space-y-2.5 text-sm">
// 										{section.links.map((link) => (
// 											<li key={link.title}>
// 												<a
// 													href={link.href}
// 													className="text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-1.5 transition-colors duration-200"
// 												>
// 													{link.icon && <link.icon className="size-4" />}
// 													{link.title}
// 												</a>
// 											</li>
// 										))}
// 									</ul>
// 								</div>
// 							</AnimatedContainer>
// 						</React.Fragment>
// 					))}
// 				</div>
// 			</div>
// 		</footer>
// 	);
// }

// type ViewAnimationProps = {
// 	delay?: number;
// 	className?: ComponentProps<typeof motion.div>['className'];
// 	children: ReactNode;
// };

// function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
// 	const shouldReduceMotion = useReducedMotion();

// 	if (shouldReduceMotion) {
// 		return <>{children}</>;
// 	}

// 	return (
// 		<motion.div
// 			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
// 			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
// 			viewport={{ once: true }}
// 			transition={{ delay, duration: 0.8 }}
// 			className={className}
// 		>
// 			{children}
// 		</motion.div>
// 	);
// }
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function Footer() {
	return (
		<footer className="relative w-full border-t border-neutral-200 px-6 py-16">
			<div className="flex flex-col items-center justify-center text-center">
				<AnimatedContainer className="flex flex-col items-center space-y-5">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
							<img
								src="/logo.png"
								alt="Oritel"
								className="w-full h-full object-contain"
							/>
						</div>

						<span className="text-3xl font-semibold tracking-wide text-neutral-900">
							ORITEL
						</span>
					</div>

					<p className="max-w-md text-base leading-relaxed text-neutral-500">
						Modern hotel management software built for Indian properties.
						Simplify operations, delight guests.
					</p>

					<p className="text-sm text-neutral-400">
						© {new Date().getFullYear()} Oritel. All rights reserved.
					</p>
				</AnimatedContainer>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({
	className,
	delay = 0.1,
	children,
}: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <>{children}</>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}