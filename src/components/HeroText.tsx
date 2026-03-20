"use client";

export default function HeroText() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        padding: "0 0 0 52px",
        opacity: 0,
        animation: "textReveal 1s cubic-bezier(.22,1,.36,1) .3s forwards",
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontFamily: "var(--font-rajdhani), Rajdhani, sans-serif",
          fontSize: ".78rem",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "#5a9ef0",
          marginBottom: "22px",
        }}
      >
        <span style={{ width: "28px", height: "1px", background: "#5a9ef0", display: "inline-block" }} />
        League of Legends Coaching
      </div>

      {/* H1 */}
      <h1
        style={{
          fontFamily: "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
          fontSize: "clamp(2.6rem, 4.5vw, 4.2rem)",
          fontWeight: 900,
          lineHeight: 1.0,
          textTransform: "uppercase",
          marginBottom: "26px",
        }}
      >
        <span style={{ color: "#dce8ff" }}>
          Tu Camino a<br />Challenger Con El
        </span>
        <br />
        <span
          style={{
            background: "linear-gradient(90deg, #7db8ff, #b48af7, #e879f9)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Mejor Coaching
        </span>
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: "1.02rem",
          lineHeight: 1.8,
          color: "rgba(180,200,240,.72)",
          maxWidth: "430px",
          marginBottom: "42px",
          fontFamily: "var(--font-barlow), Barlow, sans-serif",
        }}
      >
        Mejora tus mec&aacute;nicas, visi&oacute;n de juego y mentalidad con planes de
        entrenamiento personalizados. Lleva tu juego al siguiente nivel y deja
        de estar estancado.
      </p>

      {/* CTAs */}
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
        <button
          style={{
            padding: "13px 32px",
            background: "linear-gradient(135deg, #3a68c0, #7c3aed)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-rajdhani), Rajdhani, sans-serif",
            fontSize: ".95rem",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            boxShadow: "0 0 28px rgba(124,58,237,.45)",
            transition: "filter .25s, transform .2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.filter = "brightness(1.2)";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.filter = "";
            el.style.transform = "";
          }}
        >
          Comenzar Ahora
        </button>
        <button
          style={{
            padding: "13px 28px",
            background: "transparent",
            color: "rgba(190,210,255,.8)",
            border: "1px solid rgba(130,170,255,.3)",
            cursor: "pointer",
            fontFamily: "var(--font-rajdhani), Rajdhani, sans-serif",
            fontSize: ".95rem",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            transition: "border-color .25s, color .25s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "#8ab4f8";
            el.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(130,170,255,.3)";
            el.style.color = "rgba(190,210,255,.8)";
          }}
        >
          Ver Servicios
        </button>
      </div>
    </div>
  );
}
