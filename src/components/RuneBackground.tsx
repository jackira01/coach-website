"use client";

import { useEffect, useRef } from "react";

const RUNE_PATHS = [
    "M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z",
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10S22 17.52 22 12 17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
    "M12 2L2 19h20L12 2zm0 3l7 13H5z",
    "M4 4l16 8-16 8V4zm2 3v10l10-5z",
    "M8 2h8l4 4v12l-4 4H8l-4-4V6z",
    "M2 12Q12 2 22 12Q12 22 2 12z",
];

export default function RuneBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        for (let i = 0; i < 38; i++) {
            const div = document.createElement("div");
            div.className = "rune";
            const path = RUNE_PATHS[i % RUNE_PATHS.length];
            div.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24"><path d="${path}"/></svg>`;
            const size = Math.random() * 16 + 13;
            div.style.cssText = `
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        width:${size}px;
        animation-duration:${Math.random() * 9 + 5}s;
        animation-delay:${Math.random() * 7}s;
      `;
            container.appendChild(div);
        }

        return () => {
            container.innerHTML = "";
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        />
    );
}
