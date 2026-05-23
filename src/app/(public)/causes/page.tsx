import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import CausesListClient from "./causes-list-client";

export const metadata: Metadata = {
  title: "Causes — Verified Medical Campaigns",
  description:
    "Browse verified medical fundraising campaigns on Surgery Care Foundation. Donate to patients raising funds for surgeries, cancer care, paediatric and cardiac treatment, and more.",
  alternates: { canonical: "/causes" },
  openGraph: {
    title: "Causes — Verified Medical Campaigns",
    description:
      "Browse verified medical fundraising campaigns and donate to patients in need.",
    url: `${SITE_URL}/causes`,
    type: "website",
  },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Causes — Verified Medical Campaigns",
  description:
    "All active medical fundraising campaigns verified by Surgery Care Foundation.",
  url: `${SITE_URL}/causes`,
  isPartOf: { "@type": "WebSite", url: SITE_URL },
};

export default function CausesListPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <CausesListClient />
    </>
  );
}
