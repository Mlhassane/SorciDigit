import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
    title: 'Sorci Digit - Agence de Marketing Digital et SEO',
    description: 'Sorci Digit, votre agence de marketing digital à Paris. Boostez votre présence en ligne avec nos services SEO, branding et réseaux sociaux.',
    keywords: 'marketing digital, SEO, branding, réseaux sociaux, agence communication, Paris',
    authors: [{ name: 'Sorci Digit' }],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
