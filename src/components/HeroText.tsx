"use client";

export default function HeroText({ className = "" }) {
  return (
    <div className={`relative z-10 opacity-0 animate-[textReveal_1s_cubic-bezier(.22,1,.36,1)_.3s_forwards] ${className}`}>
      {/* Eyebrow */}
      <div className="flex items-center gap-3 font-primary text-[.78rem] tracking-[4px] uppercase text-violet-600 mb-5.5">
        <span className="w-7 h-px bg-violet-600 inline-block" />
        League of Legends Coaching
      </div>

      {/* H1 */}
      <h1 className="font-primary text-[clamp(2.6rem,4.5vw,4.2rem)] font-black leading-none uppercase mb-6.5">
        <span className="text-[#0d0820]">
          Tu Camino a<br />Challenger Con El
        </span>
        <br />
        <span className="bg-linear-to-r from-violet-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Mejor Coaching
        </span>
      </h1>

      {/* Description */}
      <p className="font-primary text-[1.02rem] leading-[1.8] text-[rgba(45,25,80,.65)] max-w-107.5 mb-10.5">
        Mejora tus mec&aacute;nicas, visi&oacute;n de juego y mentalidad con planes de
        entrenamiento personalizados. Lleva tu juego al siguiente nivel y deja
        de estar estancado.
      </p>

      {/* CTAs */}
      <div className="flex gap-3.5 flex-wrap">
        <button className="px-8 py-3.25 bg-linear-to-br from-[#3a68c0] to-violet-600 text-white border-none cursor-pointer font-primary text-[.95rem] font-bold tracking-[2px] uppercase [clip-path:polygon(8px_0%,100%_0%,calc(100%-8px)_100%,0%_100%)] shadow-[0_0_28px_rgba(124,58,237,.45)] transition-[filter,transform] duration-250 hover:brightness-125 hover:-translate-y-0.5">
          Comenzar Ahora
        </button>
        <button className="px-7 py-3.25 bg-transparent text-[#3b0f8c] border border-violet-700/35 cursor-pointer font-primary text-[.95rem] font-semibold tracking-[2px] uppercase [clip-path:polygon(8px_0%,100%_0%,calc(100%-8px)_100%,0%_100%)] transition-[border-color,color,background-color] duration-250 hover:border-violet-700 hover:text-violet-700 hover:bg-violet-700/8">
          Ver Servicios
        </button>
      </div>
    </div>
  );
}
