import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: 'Sorci Digit - Agence de Marketing Digital et Communication',
  description: 'Sorci Digit, votre agence de marketing digital. Boostez votre présence en ligne avec nos services SEO, branding et réseaux sociaux.',
  keywords: 'marketing digital, SEO, branding, réseaux sociaux, agence communication,Niger, Afrique',
  authors: [{ name: 'Sorci Digit' }],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />

      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
