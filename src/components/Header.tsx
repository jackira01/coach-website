"use client";

export default function Header() {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between"
            style={{
                height: "68px",
                padding: "0 52px",
                background: "linear-gradient(180deg, rgba(3,6,15,.9) 0%, transparent 100%)",
                backdropFilter: "blur(8px)",
                borderBottom: "1px solid rgba(100,140,255,.07)",
            }}
        >
            {/* Logo */}
            <a
                href="#"
                className="flex items-center gap-3 no-underline"
                style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    letterSpacing: "3px",
                    color: "#c8d8f0",
                    textTransform: "uppercase",
                    textDecoration: "none",
                }}
            >
                <div className="nav-logo-hex">C</div>
                Coaching
            </a>

            {/* Nav links */}
            <ul className="flex gap-[44px] list-none">
                {["Servicios", "Precios", "Sobre Nosotros"].map((label) => (
                    <li key={label}>
                        <a
                            href="#"
                            style={{
                                color: "rgba(255,255,255,.65)",
                                fontFamily: "'Rajdhani', sans-serif",
                                fontSize: ".9rem",
                                fontWeight: 600,
                                letterSpacing: "2px",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                transition: "color .25s",
                            }}
                            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#fff")}
                            onMouseLeave={(e) =>
                                ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,.65)")
                            }
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
