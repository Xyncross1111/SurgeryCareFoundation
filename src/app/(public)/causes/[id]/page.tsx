import type { Metadata } from "next";
import { backendGet } from "@/lib/server-fetch";
import { absoluteUrl, SITE_NAME, SITE_URL, truncate } from "@/lib/seo";
import { categoryLabel } from "@/lib/categories";
import type { Campaign } from "@/types/campaign";
import CauseDetailClient from "./cause-detail-client";

interface PageProps {
  params: { id: string };
}

async function getCampaign(slug: string): Promise<Campaign | null> {
  return backendGet<Campaign>(`/public/campaigns/${encodeURIComponent(slug)}`, {
    revalidate: 300,
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.id;
  const campaign = await getCampaign(slug);

  if (!campaign) {
    return {
      title: "Campaign not found",
      description: "This medical fundraising campaign is no longer available.",
      robots: { index: false, follow: false },
    };
  }

  const title = campaign.title;
  const rawSummary = campaign.summary || campaign.description || "";
  const description = truncate(
    rawSummary ||
      `Help raise funds for ${campaign.title}. Donate to support life-saving medical treatment via Surgery Care Foundation.`,
    160,
  );
  const url = `${SITE_URL}/causes/${campaign.slug}`;
  const imageUrl = campaign.coverImageUrl
    ? absoluteUrl(campaign.coverImageUrl)
    : `${SITE_URL}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical: `/causes/${campaign.slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      publishedTime: campaign.publishedAt ?? campaign.createdAt,
      modifiedTime: campaign.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [imageUrl],
    },
  };
}

function buildCampaignJsonLd(campaign: Campaign) {
  const url = `${SITE_URL}/causes/${campaign.slug}`;
  const goal = Number(campaign.goalAmount ?? 0);
  const raised = Number(campaign.raisedAmount ?? 0);
  const condition = campaign.medicalDetails?.diagnosis || campaign.condition || undefined;
  const treatment = campaign.medicalDetails?.treatmentType;

  const monetaryGrant: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MonetaryGrant",
    "@id": url,
    name: campaign.title,
    description: truncate(campaign.summary || campaign.description || "", 500),
    url,
    funder: {
      "@type": "NGO",
      name: SITE_NAME,
      url: SITE_URL,
    },
    amount: {
      "@type": "MonetaryAmount",
      currency: campaign.currency || "INR",
      value: goal,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Amount raised",
        value: raised,
        unitText: campaign.currency || "INR",
      },
      {
        "@type": "PropertyValue",
        name: "Goal amount",
        value: goal,
        unitText: campaign.currency || "INR",
      },
      {
        "@type": "PropertyValue",
        name: "Category",
        value: categoryLabel(campaign.category),
      },
      {
        "@type": "PropertyValue",
        name: "Urgency",
        value: campaign.urgencyLevel,
      },
    ],
    image: campaign.coverImageUrl ? absoluteUrl(campaign.coverImageUrl) : undefined,
    datePublished: campaign.publishedAt ?? campaign.createdAt,
    dateModified: campaign.updatedAt,
  };

  const graph: Array<Record<string, unknown>> = [monetaryGrant];

  if (condition) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "MedicalCondition",
      name: condition,
      ...(treatment
        ? {
            possibleTreatment: {
              "@type": "MedicalTherapy",
              name: treatment,
            },
          }
        : {}),
    });
  }

  graph.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Causes",
        item: `${SITE_URL}/causes`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: campaign.title,
        item: url,
      },
    ],
  });

  return graph;
}

export default async function CauseDetailPage({ params }: PageProps) {
  const slug = params.id;
  const campaign = await getCampaign(slug);

  return (
    <>
      {campaign
        ? buildCampaignJsonLd(campaign).map((node, i) => (
            <script
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
            />
          ))
        : null}
      <CauseDetailClient slug={slug} />
    </>
  );
}
