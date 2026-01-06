import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Roboto_Mono } from "next/font/google"; // Replaced Geist with Inter and Roboto_Mono
import "./globals.css";
import { Navbar } from "@/components/navbar";
import EndSlider from "@/components/shared/comeagain";
import Footer from "@/components/shared/footer";
import JsonLd from "@/components/seo/json-ld";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { FloatingSettings } from "@/components/shared/floating-settings";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: 'Sorci Digit - Agence de Marketing Digital & Transformation Numérique',
    template: '%s | Sorci Digit',
  },
  description: 'Sorci Digit, votre partenaire stratégique en marketing digital au Niger et à l\'international. Branding, développement web, SEO et communication digitale pour propulser votre entreprise.',
  applicationName: 'Sorci Digit',
  authors: [{ name: 'Sorci Digit', url: 'https://sorcidigit.com' }],
  generator: 'Next.js',
  keywords: ['marketing digital', 'agence web', 'SEO', 'branding', 'développement web', 'Niger', 'Afrique', 'communication digitale', 'site internet', 'logo design'],
  referrer: 'origin-when-cross-origin',
  creator: 'Sorci Digit',
  publisher: 'Sorci Digit',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Sorci Digit - Agence de Marketing Digital & Transformation Numérique',
    description: 'Transformez votre présence en ligne avec Sorci Digit. Experts en solutions digitales innovantes : web, mobile, et branding.',
    url: 'https://sorcidigit.com',
    siteName: 'Sorci Digit',
    images: [
      {
        url: '/og-image.jpg', // Ensure this image exists eventually
        width: 1200,
        height: 630,
        alt: 'Sorci Digit Agency',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sorci Digit - Agence Web & Marketing',
    description: 'Votre partenaire pour une transformation digitale réussie.',
    creator: '@sorci_digit',
    images: ['/og-image.jpg'], // Ensure this image exists eventually
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />

      </head>

      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <AnalyticsProvider />
            <Script
              src="https://datafa.st/js/script.js"
              data-website-id="dfid_3KT1VBy2ZbtLGZElgWeDQ"
              data-domain="www.sorcidigit.com"
              data-allow-localhost="true"
              strategy="afterInteractive"
            />
            <JsonLd />
            <Navbar />
            {children}
            <FloatingSettings />
            <EndSlider />
            <Footer />{' '}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
