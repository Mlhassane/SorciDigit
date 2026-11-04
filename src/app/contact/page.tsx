import { Metadata } from "next"
import ContactPageClient from "./page-client"

export const metadata: Metadata = {
  title: "Contact | Demandez un devis - Sorci Digit",
  description:
    "Contactez Sorci Digit pour votre projet digital. Email : contact@sorcidigit.com | Téléphone : +227 77042181 | WhatsApp disponible.",
  openGraph: {
    title: "Contact | Sorci Digit",
    description:
      "Parlez-nous de votre projet digital. Nous vous répondons sous 24 heures ouvrées.",
    type: "website",
    url: "https://www.sorcidigit.com/contact",
    images: [
      {
        url: "/1.png",
        width: 1200,
        height: 630,
        alt: "Sorci Digit - Contact",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sorcidigit.com/contact",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
