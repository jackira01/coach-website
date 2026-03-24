import type { Metadata } from "next";
import { fontPrimary, fontSecondary } from "@/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coaching LoL — Tu Camino a Challenger",
  description:
    "Mejora tus mecánicas, visión de juego y mentalidad con planes de entrenamiento personalizados de League of Legends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fontPrimary.variable} ${fontSecondary.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow+Condensed:wght@400;700;800;900&family=Barlow:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#faf8ff] text-[#0d0820] font-primary">{children}</body>
    </html>
  );
}
