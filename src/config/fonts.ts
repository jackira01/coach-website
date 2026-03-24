/**
 * ─── CONFIGURACIÓN DE FUENTES ──────────────────────────────────────────────
 *
 * Cambia `fontPrimary` o `fontSecondary` por cualquier fuente de Google Fonts
 * y se actualizará automáticamente en toda la aplicación.
 *
 * - fontPrimary  → títulos, descripciones, etiquetas, botones (clase Tailwind: font-primary)
 * - fontSecondary → datos cortos, valores numéricos, palabras destacadas (clase Tailwind: font-secondary)
 *
 * Ejemplo para cambiar la fuente primaria a "Inter":
 *   import { Inter } from "next/font/google";
 *   export const fontPrimary = Inter({ subsets: ["latin"], variable: "--font-primary-face" });
 */

import { Atkinson_Hyperlegible, Nanum_Pen_Script } from "next/font/google";

// ── FUENTE PRINCIPAL ────────────────────────────────────────────────────────
export const fontPrimary = Atkinson_Hyperlegible({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-primary-face",
});

// ── FUENTE SECUNDARIA ───────────────────────────────────────────────────────
export const fontSecondary = Nanum_Pen_Script({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-secondary-face",
});
