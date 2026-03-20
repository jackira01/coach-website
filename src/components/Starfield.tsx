"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        const stars: { x: number; y: number; r: number; a: number; da: number }[] = [];
        let W = 0;
        let H = 0;

        const resize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        for (let i = 0; i < 260; i++) {
            stars.push({
                x: Math.random(),
                y: Math.random(),
                r: Math.random() * 1.4 + 0.3,
                a: Math.random(),
                da: (Math.random() - 0.5) * 0.007,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            stars.forEach((s) => {
                s.a = Math.max(0.04, Math.min(1, s.a + s.da));
                if (s.a <= 0.04 || s.a >= 1) s.da *= -1;
                ctx.beginPath();
                ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200,220,255,${s.a * 0.75})`;
                ctx.fill();
            });
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    );
}
