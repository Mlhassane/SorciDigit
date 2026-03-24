import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import EndSlider from "@/components/shared/comeagain";
import Footer from "@/components/shared/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: 'Sorci Digit | Agence Digitale en Afrique (Web, Mobile & Branding)',
  description: "L'agence digitale de référence en Afrique de l'Ouest. Création de sites web haute performance, applications mobiles (iOS/Android) sur mesure et stratégies de branding fortes pour startups et entreprises.",
  keywords: 'agence digitale afrique, developpement mobile, création site web, branding, marketing digital, abidjan, dakar, niamey, développeur application, agence web',
  authors: [{ name: 'Sorci Digit' }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.sorcidigit.com",
    siteName: "Sorci Digit",
    title: "Sorci Digit | Votre Agence Digitale sur mesure",
    description: "Nous transformons vos idées complexes en expériences digitales fluides et rentables.",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />

      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
          <EndSlider />
      <Footer />{' '}
      </body>
    </html>
  );
}
