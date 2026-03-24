"use client";

import Link from "next/link";

const NAV_LINKS: { label: string; href: string }[] = [
    { label: "Servicios", href: "#" },
    { label: "Precios", href: "/precios" },
    { label: "Sobre Nosotros", href: "#" },
];

export default function Header() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-200 flex items-center justify-between h-17 px-13 bg-white/85 backdrop-blur-[10px] border-b border-violet-700/10">
            {/* Logo */}
            <Link
                href="/"
                className="flex items-center gap-3 no-underline font-primary text-[1.2rem] font-bold tracking-[3px] text-[#1a0f35] uppercase"
            >
                <div className="w-9 h-9 flex items-center justify-center font-black text-[1.1rem] text-white bg-linear-to-br from-[#5a8fd6] to-[#3a5fa0] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] shadow-[0_0_18px_rgba(90,143,214,.6)]">
                    C
                </div>
                Coaching
            </Link>

            {/* Nav links */}
            <ul className="flex gap-11 list-none">
                {NAV_LINKS.map(({ label, href }) => (
                    <li key={label}>
                        <Link
                            href={href}
                            className="text-[rgba(30,20,70,.55)] font-primary text-[.9rem] font-semibold tracking-[2px] uppercase no-underline transition-colors duration-250 hover:text-violet-700"
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
