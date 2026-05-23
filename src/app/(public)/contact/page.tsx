import type { Metadata } from "next";
import {
  ORG_CONTACT_EMAIL,
  ORG_CONTACT_PHONE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Surgery Care Foundation. Reach our team for donor support, campaign questions, partnership enquiries, or general feedback.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Surgery Care Foundation",
    description: "Reach the Surgery Care Foundation team for support and enquiries.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/contact`,
  name: `Contact ${SITE_NAME}`,
  mainEntity: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: ORG_CONTACT_PHONE,
      email: ORG_CONTACT_EMAIL,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
