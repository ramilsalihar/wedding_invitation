import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Искендер & Айдай · Wedding Invitation",
  description: "You are warmly invited to celebrate our wedding with us.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
