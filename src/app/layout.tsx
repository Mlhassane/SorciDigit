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
  title: 'Sorci Digit | Agence web, mobile et branding en Afrique',
  description: "Agence de développement spécialisée dans la création de sites internet, d'applications mobiles (iOS/Android) et branding stratégique pour les entreprises et startups d'Afrique de l'Ouest.",
  keywords: 'agence web afrique, developpement mobile, création site web, branding, marketing digital, abidjan, dakar, niamey, développeur application mobile',
  authors: [{ name: 'Sorci Digit' }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.sorcidigit.com",
    siteName: "Sorci Digit",
    title: "Sorci Digit | Vos solutions digitales sur mesure",
    description: "Nous transformons vos idées complexes en expériences fluides et rentables.",
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
