"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";

// ─── DATOS ──────────────────────────────────────────────────────────────

const RANKS = [
    { name: "Sin Clasificar", img: "/ranks/Unranked.webp", glow: "#bdbdbd", hasTiers: false },
    { name: "Hierro", img: "/ranks/iron.png", glow: "#c26e55", hasTiers: true },
    { name: "Bronce", img: "/ranks/bronce.png", glow: "#d4944d", hasTiers: true },
    { name: "Plata", img: "/ranks/silver.webp", glow: "#90a4ae", hasTiers: true },
    { name: "Oro", img: "/ranks/gold.webp", glow: "#d4af37", hasTiers: true },
    { name: "Platino", img: "/ranks/platimun.png", glow: "#4dd0d0", hasTiers: true },
    { name: "Esmeralda", img: "/ranks/emerald.png", glow: "#3dba6a", hasTiers: true },
    { name: "Diamante", img: "/ranks/diamond.png", glow: "#4a9ee0", hasTiers: true },
    { name: "Maestro", img: "/ranks/master.webp", glow: "#ab47bc", hasTiers: false },
    { name: "Gran Maestro", img: "/ranks/grandmaster.png", glow: "#ef5350", hasTiers: false },
    { name: "Retador", img: "/ranks/challenger.png", glow: "#ffd600", hasTiers: false },
];

// Divisiones del rango en numerales romanos (de peor a mejor)
const ROMAN_TIERS = ["IV", "III", "II", "I"] as const;

const SKILLS = [
    "Oleadas",
    "Esquiva y kiteo",
    "Macro game",
    "Micro game",
    "Objetivos",
    "Farmeo",
    "Gankeos",
];

const SERVERS = [
    "LAN", "LAS", "NA", "EUW", "EUNE",
    "KR", "BR", "JP", "TR", "RU", "OCE",
];

const ROLES = [
    { id: "top", label: "Top" },
    { id: "jungle", label: "Jungla" },
    { id: "mid", label: "Medio" },
    { id: "adc", label: "Bot / ADC" },
    { id: "support", label: "Soporte" },
];

const HOUR_OPTIONS = [
    { value: 0.5, label: "30 min", display: "30 min / mes" },
    { value: 1, label: "1 hora", display: "1 hora / mes" },
    { value: 1.5, label: "1.5 horas", display: "1.5 horas / mes" },
    { value: 2, label: "2 horas", display: "2 horas / mes" },
];

// Tarifa base por hora según rango
const RANK_RATE = [8, 10, 12, 15, 18, 20, 22, 25, 27, 35, 45, 60];

const TABS = ["Coach", "Boost de Liga"] as const;
type Tab = (typeof TABS)[number];

interface ServiceState {
    rankIndex: number;
    rankTier: number;        // índice en ROMAN_TIERS
    rankTargetIndex: number; // rango deseado (Boost)
    rankTargetTier: number;  // tier del rango deseado
    skills: string[];
    server: string;
    roles: string[];
    hours: number;
    discount: string;
}

const defaultState = (): ServiceState => ({
    rankIndex: 0,
    rankTier: 0,
    rankTargetIndex: 1,
    rankTargetTier: 0,
    skills: [],
    server: "LAN",
    roles: [],
    hours: 1,
    discount: "",
});

const SERVICE_CONTENT: Record<Tab, { title: string; desc: string; emoji: string }> = {
    Coach: {
        title: "Sesiones de Coaching Personalizado",
        desc: "Aprende junto a coaches Challenger con sesiones 1 a 1 adaptadas a tu estilo de juego. Mejora tus mecánicas, visión de mapa y toma de decisiones.",
        emoji: "🎓",
    },
    "Boost de Liga": {
        title: "Boost de Liga Profesional",
        desc: "Mejora tu ranking con nuestros boosters profesionales de élite. Proceso seguro, discreto y garantizado. Llega al rango que mereces.",
        emoji: "🚀",
    },
};

// ─── COMPONENTES AUXILIARES ──────────────────────────────────────────────

function Card({
    title,
    subtitle,
    accentColor,
    children,
}: {
    title: string;
    subtitle?: string;
    accentColor?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className="rounded-xl border border-violet-700/15 overflow-hidden"
            style={{
                background: accentColor
                    ? `linear-gradient(to bottom, ${accentColor}80 0%, transparent 50%), rgba(255,255,255,0.68)`
                    : "rgba(255,255,255,0.68)",
                backdropFilter: "blur(10px)",
            }}
        >
            <div className="px-5 py-4 border-b border-violet-700/10 flex items-center justify-between">
                <div className="font-primary font-bold text-sm tracking-[2px] uppercase text-[#0d0820]">
                    {title}
                </div>
                {subtitle && (
                    <div className="font-primary text-xs text-[rgba(30,20,70,.4)]">{subtitle}</div>
                )}
            </div>
            <div className="p-5">{children}</div>
        </div>
    );
}

function InvoiceLine({
    label,
    value,
    small,
}: {
    label: string;
    value: string;
    small?: boolean;
}) {
    return (
        <div className="flex items-start justify-between gap-3">
            <div className={`font-primary ${small ? "text-xs" : "text-sm"} text-[rgba(30,20,70,.5)]`}>
                {label}
            </div>
            <div
                className={`font-primary ${small ? "text-xs" : "text-sm"} font-medium text-[#0d0820] text-right max-w-[58%] leading-snug`}
            >
                {value}
            </div>
        </div>
    );
}

/** Carrusel de emblemas de rango reutilizable */
function RankCarouselContent({
    rankIndex,
    rankTier,
    showTiers,
    large,
    onRankChange,
    onTierChange,
}: {
    rankIndex: number;
    rankTier: number;
    showTiers: boolean;
    large?: boolean;
    onRankChange: (i: number) => void;
    onTierChange: (t: number) => void;
}) {
    const rank = RANKS[rankIndex];
    const hasTiers = rank.hasTiers;

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={() => onRankChange((rankIndex - 1 + RANKS.length) % RANKS.length)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-violet-700/25 text-violet-700 font-black text-xl transition-colors hover:bg-violet-700/10 shrink-0"
            >
                ‹
            </button>

            <div className="flex-1 flex flex-col items-center gap-3 py-2">
                {/* Emblema */}
                <div
                    className={`relative select-none ${large ? "w-36 h-36" : "w-24 h-24"}`}
                    style={{
                        filter: `drop-shadow(0 0 ${large ? "22px" : "16px"} ${rank.glow}99)`,
                        transition: "filter 0.3s ease",
                    }}
                >
                    <Image
                        key={rank.img}
                        src={rank.img}
                        alt={rank.name}
                        fill
                        sizes={large ? "144px" : "96px"}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Nombre + división */}
                <div className="font-primary font-bold tracking-[2px] text-sm uppercase text-[#0d0820] text-center leading-tight">
                    {rank.name}
                    {showTiers && hasTiers && (
                        <span className="ml-1.5 text-violet-600">{ROMAN_TIERS[rankTier]}</span>
                    )}
                </div>

                {/* Selector de tier */}
                {showTiers && hasTiers && (
                    <div className="flex gap-1.5">
                        {ROMAN_TIERS.map((tier, ti) => (
                            <button
                                key={tier}
                                onClick={() => onTierChange(ti)}
                                className={`w-9 h-7 font-primary text-[.7rem] font-bold tracking-[1px] transition-all duration-200 border ${ti === rankTier
                                    ? "bg-violet-600 text-white border-violet-600 shadow-[0_0_10px_rgba(124,58,237,.35)]"
                                    : "bg-transparent text-[rgba(30,20,70,.55)] border-violet-700/25 hover:border-violet-600 hover:text-violet-700"
                                    }`}
                                style={{ clipPath: "polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)" }}
                            >
                                {tier}
                            </button>
                        ))}
                    </div>
                )}

                {/* Dots de posición */}
                <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
                    {RANKS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => onRankChange(i)}
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{
                                width: i === rankIndex ? "16px" : "6px",
                                background: i === rankIndex ? rank.glow : "rgba(124,58,237,.22)",
                            }}
                        />
                    ))}
                </div>
            </div>

            <button
                onClick={() => onRankChange((rankIndex + 1) % RANKS.length)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-violet-700/25 text-violet-700 font-black text-xl transition-colors hover:bg-violet-700/10 shrink-0"
            >
                ›
            </button>
        </div>
    );
}

// ─── PÁGINA PRINCIPAL ────────────────────────────────────────────────────

export default function PreciosPage() {
    const [activeTab, setActiveTab] = useState<Tab>("Coach");
    const [states, setStates] = useState<Record<Tab, ServiceState>>({
        Coach: defaultState(),
        "Boost de Liga": defaultState(),
    });

    const s = states[activeTab];

    function update(patch: Partial<ServiceState>) {
        setStates((prev) => ({
            ...prev,
            [activeTab]: { ...prev[activeTab], ...patch },
        }));
    }

    function toggleSkill(skill: string) {
        update({
            skills: s.skills.includes(skill)
                ? s.skills.filter((x) => x !== skill)
                : [...s.skills, skill],
        });
    }

    function toggleRole(roleId: string) {
        if (s.roles.includes(roleId)) {
            update({ roles: s.roles.filter((x) => x !== roleId) });
        } else if (s.roles.length < 2) {
            update({ roles: [...s.roles, roleId] });
        }
    }

    const baseRate = RANK_RATE[s.rankIndex] ?? 10;
    const subtotal = Math.round(baseRate * s.hours * 100) / 100;
    const discountValid = s.discount.trim().toLowerCase() === "coach10";
    const discountAmt = discountValid ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
    const total = Math.max(0, subtotal - discountAmt);

    const content = SERVICE_CONTENT[activeTab];
    const isBoost = activeTab === "Boost de Liga";

    const rankDisplayName = (idx: number, tier: number) => {
        const r = RANKS[idx];
        return r.hasTiers ? `${r.name} ${ROMAN_TIERS[tier]}` : r.name;
    };

    return (
        <>
            {/* Fondo fijo */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 55% 55% at 75% 35%, rgba(60,30,120,.36) 0%, transparent 70%)," +
                        "radial-gradient(ellipse 45% 65% at 20% 75%, rgba(10,30,90,.38) 0%, transparent 70%)," +
                        "radial-gradient(ellipse 35% 40% at 85% 85%, rgba(20,8,60,.28) 0%, transparent 70%)",
                }}
            />

            <Header />

            <main className="relative z-10 min-h-screen pt-17">

                {/* ── TABS ── */}
                <div className="sticky top-17 z-50 flex justify-center border-b border-violet-700/15 bg-white/70 backdrop-blur-[10px]">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-12 py-4 font-primary text-sm font-bold tracking-[2.5px] uppercase transition-all duration-250 border-b-2 ${activeTab === tab
                                ? "border-violet-600 text-violet-700"
                                : "border-transparent text-[rgba(30,20,70,.45)] hover:text-violet-600"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-8 py-12">

                    {/* ── ENCABEZADO DEL SERVICIO ── */}
                    <div className="flex items-center justify-between gap-12 mb-14">
                        {/* Título izquierda */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 font-primary text-[.75rem] tracking-[4px] uppercase text-violet-600 mb-4">
                                <span className="w-6 h-px bg-violet-600 inline-block" />
                                {activeTab}
                            </div>
                            <h2 className="font-primary text-[clamp(1.9rem,3.2vw,3rem)] font-black leading-none uppercase mb-5 text-[#0d0820]">
                                {content.title}
                            </h2>
                            <p className="font-primary text-[1rem] leading-[1.8] text-[rgba(45,25,80,.65)] max-w-lg">
                                {content.desc}
                            </p>
                        </div>

                        {/* Imagen derecha */}
                        <div className="w-72 h-52 shrink-0">
                            <div
                                className="w-full h-full rounded-2xl border border-violet-700/20 flex items-center justify-center"
                                style={{
                                    background:
                                        "linear-gradient(135deg, rgba(90,58,214,.1) 0%, rgba(37,99,235,.07) 100%)",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                <div className="flex flex-col items-center gap-3 opacity-60">
                                    <div className="text-7xl select-none">{content.emoji}</div>
                                    <div className="font-primary text-xs tracking-[3px] uppercase text-[rgba(60,30,100,.65)]">
                                        {activeTab}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── CONTENIDO PRINCIPAL: 2 COLUMNAS ── */}
                    <div className="grid grid-cols-[1fr_380px] gap-8 items-start">

                        {/* ── COLUMNA IZQUIERDA: DATOS ── */}
                        <div className="flex flex-col gap-6">

                            {/* ═══ COACH ═══ */}
                            {!isBoost && (
                                <>
                                    {/* Rango + Habilidades en 2 columnas */}
                                    <div className="grid grid-cols-2 gap-6 items-start">
                                        <Card title="Rango Actual" accentColor={RANKS[s.rankIndex].glow}>
                                            <RankCarouselContent
                                                rankIndex={s.rankIndex}
                                                rankTier={s.rankTier}
                                                showTiers={false}
                                                large={true}
                                                onRankChange={(i) => update({ rankIndex: i })}
                                                onTierChange={(t) => update({ rankTier: t })}
                                            />
                                        </Card>

                                        <Card title="Habilidades" subtitle="Selecciona las que te interesan">
                                            <div className="flex flex-wrap gap-2.5">
                                                {SKILLS.map((skill) => {
                                                    const active = s.skills.includes(skill);
                                                    return (
                                                        <button
                                                            key={skill}
                                                            onClick={() => toggleSkill(skill)}
                                                            className={`px-4 py-2 font-primary text-xs font-semibold tracking-[1.5px] uppercase transition-all duration-200 border ${active
                                                                ? "bg-violet-600 text-white border-violet-600 shadow-[0_0_14px_rgba(124,58,237,.35)]"
                                                                : "bg-transparent text-[rgba(30,20,70,.6)] border-violet-700/25 hover:border-violet-600 hover:text-violet-700"
                                                                }`}
                                                            style={{ clipPath: "polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)" }}
                                                        >
                                                            {skill}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Servidor */}
                                    <Card title="Servidor">
                                        <div className="relative">
                                            <select
                                                value={s.server}
                                                onChange={(e) => update({ server: e.target.value })}
                                                className="w-full appearance-none px-4 py-3 bg-white/60 border border-violet-700/20 text-[#0d0820] font-primary text-sm rounded-lg focus:outline-none focus:border-violet-500 cursor-pointer pr-10 transition-colors"
                                            >
                                                {SERVERS.map((srv) => (
                                                    <option key={srv} value={srv}>{srv}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-violet-600 text-sm">▾</div>
                                        </div>
                                    </Card>

                                    {/* Roles */}
                                    <Card title="Roles a Entrenar" subtitle="Máximo 2 roles">
                                        <div className="flex flex-wrap gap-3">
                                            {ROLES.map((role) => {
                                                const active = s.roles.includes(role.id);
                                                const disabled = !active && s.roles.length >= 2;
                                                return (
                                                    <button
                                                        key={role.id}
                                                        onClick={() => toggleRole(role.id)}
                                                        disabled={disabled}
                                                        className={`px-6 py-2.5 font-primary text-xs font-bold tracking-[1.5px] uppercase transition-all duration-200 border ${active
                                                            ? "bg-violet-600 text-white border-violet-600 shadow-[0_0_14px_rgba(124,58,237,.35)]"
                                                            : disabled
                                                                ? "opacity-30 cursor-not-allowed border-violet-700/15 text-[rgba(30,20,70,.4)]"
                                                                : "bg-transparent text-[rgba(30,20,70,.6)] border-violet-700/25 hover:border-violet-600 hover:text-violet-700"
                                                            }`}
                                                        style={{ clipPath: "polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)" }}
                                                    >
                                                        {role.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {s.roles.length >= 2 && (
                                            <p className="mt-3 text-xs font-primary text-[rgba(30,20,70,.4)]">
                                                Límite alcanzado. Deselecciona un rol para cambiar.
                                            </p>
                                        )}
                                    </Card>

                                    {/* Duración */}
                                    <Card title="Duración de Sesiones" subtitle="Horas al mes">
                                        <div className="grid grid-cols-4 gap-3">
                                            {HOUR_OPTIONS.map((opt) => {
                                                const active = s.hours === opt.value;
                                                return (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => update({ hours: opt.value })}
                                                        className={`py-3 px-2 text-center font-primary text-sm font-bold tracking-[1px] uppercase transition-all duration-200 border ${active
                                                            ? "bg-violet-600 text-white border-violet-600 shadow-[0_0_14px_rgba(124,58,237,.35)]"
                                                            : "bg-transparent text-[rgba(30,20,70,.6)] border-violet-700/25 hover:border-violet-600 hover:text-violet-700"
                                                            }`}
                                                        style={{ clipPath: "polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)" }}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </Card>
                                </>
                            )}

                            {/* ═══ BOOST DE LIGA ═══ */}
                            {isBoost && (
                                <>
                                    {/* Rango Actual + Rango Deseado en 2 columnas */}
                                    <div className="grid grid-cols-2 gap-6 items-start">
                                        <Card title="Rango Actual" accentColor={RANKS[s.rankIndex].glow}>
                                            <RankCarouselContent
                                                rankIndex={s.rankIndex}
                                                rankTier={s.rankTier}
                                                showTiers={true}
                                                onRankChange={(i) => update({ rankIndex: i })}
                                                onTierChange={(t) => update({ rankTier: t })}
                                            />
                                        </Card>

                                        <Card title="Rango Deseado" accentColor={RANKS[s.rankTargetIndex].glow}>
                                            <RankCarouselContent
                                                rankIndex={s.rankTargetIndex}
                                                rankTier={s.rankTargetTier}
                                                showTiers={true}
                                                onRankChange={(i) => update({ rankTargetIndex: i })}
                                                onTierChange={(t) => update({ rankTargetTier: t })}
                                            />
                                        </Card>
                                    </div>

                                    {/* Servidor */}
                                    <Card title="Servidor">
                                        <div className="relative">
                                            <select
                                                value={s.server}
                                                onChange={(e) => update({ server: e.target.value })}
                                                className="w-full appearance-none px-4 py-3 bg-white/60 border border-violet-700/20 text-[#0d0820] font-primary text-sm rounded-lg focus:outline-none focus:border-violet-500 cursor-pointer pr-10 transition-colors"
                                            >
                                                {SERVERS.map((srv) => (
                                                    <option key={srv} value={srv}>{srv}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-violet-600 text-sm">▾</div>
                                        </div>
                                    </Card>
                                </>
                            )}
                        </div>

                        {/* ── COLUMNA DERECHA: PAGO ── */}
                        <div className="sticky top-32.5">
                            <div
                                className="rounded-2xl border border-violet-700/18 overflow-hidden"
                                style={{
                                    background: "rgba(255,255,255,0.75)",
                                    backdropFilter: "blur(14px)",
                                }}
                            >
                                {/* Cabecera de la factura */}
                                <div
                                    className="px-6 py-5 border-b border-violet-700/12"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(90,58,214,.09) 0%, rgba(37,99,235,.05) 100%)",
                                    }}
                                >
                                    <div className="font-primary text-xs tracking-[3px] uppercase text-violet-600 mb-1">
                                        Resumen del Pedido
                                    </div>
                                    <div className="font-primary font-black text-xl uppercase text-[#0d0820]">
                                        {activeTab}
                                    </div>
                                </div>

                                {/* Ítems de la factura */}
                                <div className="px-6 py-5 flex flex-col gap-4">
                                    <InvoiceLine label="Servicio" value={activeTab} />
                                    {!isBoost ? (
                                        <InvoiceLine label="Rango" value={rankDisplayName(s.rankIndex, s.rankTier)} />
                                    ) : (
                                        <>
                                            <InvoiceLine label="Rango Actual" value={rankDisplayName(s.rankIndex, s.rankTier)} />
                                            <InvoiceLine label="Rango Deseado" value={rankDisplayName(s.rankTargetIndex, s.rankTargetTier)} />
                                        </>
                                    )}
                                    <InvoiceLine label="Servidor" value={s.server} />
                                    {!isBoost && (
                                        <>
                                            <InvoiceLine
                                                label="Duración"
                                                value={HOUR_OPTIONS.find((h) => h.value === s.hours)?.display ?? "—"}
                                            />
                                            <InvoiceLine
                                                label="Roles"
                                                value={
                                                    s.roles.length > 0
                                                        ? s.roles.map((r) => ROLES.find((x) => x.id === r)?.label ?? r).join(", ")
                                                        : "Sin seleccionar"
                                                }
                                            />
                                            {s.skills.length > 0 && (
                                                <InvoiceLine label="Habilidades" value={s.skills.join(", ")} small />
                                            )}
                                        </>
                                    )}

                                    {/* Separador subtotal */}
                                    <div className="border-t border-violet-700/12 pt-4">
                                        <div className="flex justify-between items-center">
                                            <div className="font-primary text-sm text-[rgba(30,20,70,.5)]">Subtotal</div>
                                            <div className="font-primary text-lg font-black text-[#0d0820]">
                                                ${subtotal.toFixed(2)} USD
                                            </div>
                                        </div>
                                    </div>

                                    {/* Código de descuento */}
                                    <div className="border-t border-violet-700/12 pt-4">
                                        <div className="font-primary text-xs tracking-[1.5px] uppercase text-[rgba(30,20,70,.45)] mb-2.5">
                                            Código de Descuento
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={s.discount}
                                                onChange={(e) => update({ discount: e.target.value })}
                                                placeholder="ej. COACH10"
                                                className="flex-1 px-3 py-2.5 bg-white/70 border border-violet-700/20 text-[#0d0820] font-primary text-sm rounded-lg focus:outline-none focus:border-violet-500 placeholder-[rgba(30,20,70,.3)] uppercase tracking-widest transition-colors"
                                                style={{ letterSpacing: "0.08em" }}
                                            />
                                            <button className="px-4 py-2 bg-violet-600 text-white font-primary text-xs font-bold tracking-[1.5px] uppercase rounded-lg hover:bg-violet-700 transition-colors shrink-0">
                                                Aplicar
                                            </button>
                                        </div>
                                        {discountValid && discountAmt > 0 && (
                                            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-primary text-emerald-600">
                                                <span>✓</span>
                                                <span>
                                                    Descuento aplicado —{" "}
                                                    <span className="font-semibold">−${discountAmt.toFixed(2)} USD</span>
                                                </span>
                                            </div>
                                        )}
                                        {s.discount.length > 0 && !discountValid && (
                                            <div className="mt-2.5 text-xs font-primary text-red-500">
                                                Código no válido.
                                            </div>
                                        )}
                                    </div>

                                    {/* Total */}
                                    <div className="border-t border-violet-700/15 pt-4">
                                        <div className="flex items-end justify-between mb-1">
                                            <div className="font-primary text-xs tracking-[2px] uppercase text-[rgba(30,20,70,.45)]">
                                                Total
                                            </div>
                                            {discountAmt > 0 && (
                                                <div className="font-primary text-sm text-[rgba(30,20,70,.35)] line-through">
                                                    ${subtotal.toFixed(2)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="font-primary text-4xl font-black bg-linear-to-br from-violet-700 to-blue-500 bg-clip-text text-transparent leading-none mb-1">
                                            ${total.toFixed(2)}
                                            <span className="text-xl ml-1 font-bold">USD</span>
                                        </div>
                                        <div className="font-primary text-[.68rem] text-[rgba(30,20,70,.38)] mt-1">
                                            * Precio en dólares estadounidenses · IVA no incluido
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <button className="mt-1 w-full py-3.5 bg-linear-to-br from-[#3a68c0] to-violet-600 text-white font-primary text-sm font-bold tracking-[2.5px] uppercase cursor-pointer [clip-path:polygon(8px_0%,100%_0%,calc(100%-8px)_100%,0%_100%)] shadow-[0_0_28px_rgba(124,58,237,.45)] transition-[filter,transform] duration-250 hover:brightness-125 hover:-translate-y-0.5">
                                        Contratar Ahora
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}

