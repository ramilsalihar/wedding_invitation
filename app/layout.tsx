import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Искендер & Айдай · Wedding Invitation",
  description: "You are warmly invited to celebrate our wedding with us.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${cormorant.variable} ${greatVibes.variable}`}>{children}</body>
    </html>
  );
}
