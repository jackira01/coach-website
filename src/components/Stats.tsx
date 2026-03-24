"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
    { target: 500, suffix: "+", label: "Estudiantes Coached" },
    { target: 92, suffix: "%", label: "Tasa de Mejora" },
    { target: 15, suffix: "+", label: "Coaches Challenger" },
    { target: 3500, suffix: "+", label: "Horas de Sesión" },
];

function formatNum(target: number, current: number): string {
    if (target >= 1000 && current >= 1000) {
        const k = (current / 1000).toFixed(1);
        return (k.endsWith(".0") ? k.slice(0, -2) : k) + "K";
    }
    return String(current);
}

function StatCard({
    stat,
    started,
    index,
}: {
    stat: (typeof STATS)[number];
    started: boolean;
    index: number;
}) {
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!started) return;
        const t = setTimeout(() => {
            setShow(true);
            const duration = 1800;
            let startTime: number | null = null;
            const raf = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.round(eased * stat.target));
                if (progress < 1) requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);
        }, index * 150);
        return () => clearTimeout(t);
    }, [started, stat.target, index]);

    return (
        <div
            className={`flex-1 max-w-65 py-10 px-11 text-center transition-[opacity,transform] duration-650 ease-[ease] ${index < STATS.length - 1 ? "border-r border-violet-700/12" : ""
                }`}
            style={{
                opacity: show ? 1 : 0,
                transform: show ? "translateY(0)" : "translateY(20px)",
            }}
        >
            <div className="font-primary text-[3rem] font-black bg-linear-to-br from-violet-700 to-blue-500 bg-clip-text text-transparent mb-2 leading-none">
                {formatNum(stat.target, count)}
                {stat.suffix}
            </div>
            <div className="font-primary text-[.78rem] tracking-[2.5px] text-[rgba(60,30,100,.5)] uppercase font-semibold">
                {stat.label}
            </div>
        </div>
    );
}

export default function Stats() {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.25 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            className="relative z-10 flex justify-center border-t border-violet-700/10 bg-white/55 backdrop-blur-[6px]"
        >
            {STATS.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} started={visible} index={i} />
            ))}
        </section>
    );
}

