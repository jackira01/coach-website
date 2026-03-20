import Image from "next/image";

export default function HeroChart() {
    return (
        <div
            className="chart-reveal"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Ambient glow behind image */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(ellipse 60% 50% at 60% 55%, rgba(90,100,220,.18) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 40% 40%, rgba(50,30,120,.14) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />
            <Image
                src="/grafics.png"
                alt="Gráfico de rangos de League of Legends — de Iron a Challenger"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    filter: "drop-shadow(0 0 40px rgba(0,180,255,.18)) drop-shadow(0 0 80px rgba(100,60,200,.15))",
                }}
                priority
            />
        </div>
    );
}
