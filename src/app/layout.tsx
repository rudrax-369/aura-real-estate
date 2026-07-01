import type { Metadata } from "next";
import { Inter, Outfit, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURA | Luxury Real Estate & Architectural Masterpieces",
  description: "Experience virtual luxury walkthroughs of the world's most exclusive estates. Procedural 3D showcases, immersive motion, and high-end aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-black text-brand-white selection:bg-brand-gold selection:text-brand-black">
        {children}
      </body>
    </html>
  );
}
