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

const siteUrl = "https://www.sorcidigit.com";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sorcidigit.com"),
  title: 'Sorci Digit | Agence Digitale en Afrique (Web, Mobile & Branding)',
  description: "L'agence digitale de référence en Afrique de l'Ouest. Création de sites web haute performance, applications mobiles (iOS/Android) sur mesure et stratégies de branding fortes pour startups et entreprises.",
  keywords: 'agence digitale afrique, developpement mobile, création site web, branding, marketing digital, abidjan, dakar, niamey, développeur application, agence web',
  authors: [{ name: 'Sorci Digit' }],
  creator: "Sorci Digit",
  publisher: "Sorci Digit",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Sorci Digit",
    title: "Sorci Digit | Votre Agence Digitale sur mesure",
    description: "Nous transformons vos idées complexes en expériences digitales fluides et rentables.",
    images: [
      {
        url: "/1.png",
        width: 1200,
        height: 630,
        alt: "Sorci Digit - Agence Digitale en Afrique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sorci Digit | Votre Agence Digitale sur mesure",
    description: "Nous transformons vos idées complexes en expériences digitales fluides et rentables.",
    images: ["/1.png"],
    creator: "@sorcidigit",
  },
  alternates: {
    canonical: siteUrl,
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
        <link rel="canonical" href={siteUrl} />
        {/* Structured data: Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}#organization`,
                  name: "Sorci Digit",
                  url: siteUrl,
                  logo: `${siteUrl}/1.png`,
                  description: "L'agence digitale de référence en Afrique de l'Ouest. Création de sites web haute performance, applications mobiles (iOS/Android) sur mesure et stratégies de branding fortes pour startups et entreprises.",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "NE",
                    addressRegion: "Niamey",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+22777042181",
                    contactType: "customer service",
                    availableLanguage: ["fr", "en"],
                  },
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}#website`,
                  url: siteUrl,
                  name: "Sorci Digit",
                  description: "L'agence digitale de référence en Afrique de l'Ouest.",
                  inLanguage: "fr-FR",
                  publisher: { "@id": `${siteUrl}#organization` },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${siteUrl}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "LocalBusiness",
                  "@id": `${siteUrl}#localbusiness`,
                  name: "Sorci Digit",
                  image: `${siteUrl}/1.png`,
                  url: siteUrl,
                  telephone: "+22777042181",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "NE",
                    addressRegion: "Niamey",
                  },
                  description: "Agence digitale spécialisée dans le développement web, mobile, branding et stratégie digitale en Afrique de l'Ouest.",
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                      opens: "09:00",
                      closes: "18:00",
                    },
                  ],
                },
              ],
            }),
          }}
        />
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
