const STATS = [
    { number: "500+", label: "Estudiantes Coached", delay: "3.2s" },
    { number: "92%", label: "Tasa de Mejora", delay: "3.4s" },
    { number: "15+", label: "Coaches Challenger", delay: "3.6s" },
    { number: "3.5K+", label: "Horas de Sesión", delay: "3.8s" },
];

export default function Stats() {
    return (
        <section
            style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                justifyContent: "center",
                borderTop: "1px solid rgba(80,110,200,.1)",
            }}
        >
            {STATS.map((stat, i) => (
                <div
                    key={stat.label}
                    className="stat-fade-up"
                    style={{
                        flex: 1,
                        maxWidth: "240px",
                        padding: "32px 36px",
                        textAlign: "center",
                        borderRight: i < STATS.length - 1 ? "1px solid rgba(80,110,200,.1)" : "none",
                        animationDelay: stat.delay,
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "2.8rem",
                            fontWeight: 900,
                            background: "linear-gradient(135deg, #7db8ff, #b48af7)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            marginBottom: "6px",
                        }}
                    >
                        {stat.number}
                    </div>
                    <div
                        style={{
                            fontFamily: "'Rajdhani', sans-serif",
                            fontSize: ".78rem",
                            letterSpacing: "2px",
                            color: "rgba(160,190,240,.5)",
                            textTransform: "uppercase",
                        }}
                    >
                        {stat.label}
                    </div>
                </div>
            ))}
        </section>
    );
}
