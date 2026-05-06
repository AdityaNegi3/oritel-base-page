"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
	{ label: "Home", href: "#top" },
	{ label: "Features", href: "#features" },
	{ label: "How It Works", href: "#how-it-works" },
	{ label: "Pricing", href: "#pricing" },
	
];

function NavHeader() {
	const [position, setPosition] = useState({
		left: 0,
		width: 0,
		opacity: 0,
	});

	const handleClick = (href: string) => {
		if (href === "#top") {
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}
		const el = document.querySelector(href);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<ul
			className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
			onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
		>
			{navLinks.map(({ label, href }) => (
				<React.Fragment key={label}>
					<Tab href={href} setPosition={setPosition} onClick={handleClick}>
						{label}
					</Tab>
				</React.Fragment>
			))}
			<Cursor position={position} />
		</ul>
	);
}

const Tab = ({
	children,
	href,
	setPosition,
	onClick,
}: {
	children: React.ReactNode;
	href: string;
	setPosition: (pos: { left: number; width: number; opacity: number }) => void;
	onClick: (href: string) => void;
}) => {
	const ref = useRef<HTMLLIElement>(null);
	return (
		<li
			ref={ref}
			onMouseEnter={() => {
				if (!ref.current) return;
				const { width } = ref.current.getBoundingClientRect();
				setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
			}}
			onClick={() => onClick(href)}
			className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base select-none"
		>
			{children}
		</li>
	);
};

const Cursor = ({
	position,
}: {
	position: { left: number; width: number; opacity: number };
}) => {
	return (
		<motion.li
			animate={position}
			className="absolute z-0 h-7 rounded-full bg-black md:h-12"
		/>
	);
};

export default NavHeader;
