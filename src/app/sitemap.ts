import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { backendGet } from "@/lib/server-fetch";

export const revalidate = 3600;

type SitemapItem = MetadataRoute.Sitemap[number];

interface CampaignSitemapEntry {
  slug: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

interface BlogSitemapEntry {
  slug: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

interface PaginatedShape<T> {
  items?: T[];
  data?: T[];
  totalPages?: number;
}

const STATIC_ROUTES: Array<{ path: string; changeFrequency: SitemapItem["changeFrequency"]; priority: number }> = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/causes", changeFrequency: "daily", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-use", changeFrequency: "yearly", priority: 0.3 },
  { path: "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/donation-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/aml-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
];

async function fetchAllCampaigns(): Promise<CampaignSitemapEntry[]> {
  const all: CampaignSitemapEntry[] = [];
  const limit = 100;
  let page = 1;
  while (page <= 20) {
    const data = await backendGet<PaginatedShape<CampaignSitemapEntry>>("/public/campaigns", {
      params: { page, limit },
      revalidate: 1800,
    });
    if (!data) break;
    const batch = data.items ?? data.data ?? [];
    all.push(...batch.filter((c) => !!c.slug));
    if (batch.length < limit) break;
    if (data.totalPages && page >= data.totalPages) break;
    page += 1;
  }
  return all;
}

async function fetchAllBlogPosts(): Promise<BlogSitemapEntry[]> {
  const data = await backendGet<BlogSitemapEntry[] | PaginatedShape<BlogSitemapEntry>>(
    "/public/blog-posts",
    { revalidate: 1800 },
  );
  if (!data) return [];
  if (Array.isArray(data)) return data.filter((p) => !!p.slug);
  const items = data.items ?? data.data ?? [];
  return items.filter((p) => !!p.slug);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: SitemapItem[] = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [campaigns, blogPosts] = await Promise.all([fetchAllCampaigns(), fetchAllBlogPosts()]);

  const campaignEntries: SitemapItem[] = campaigns.map((c) => ({
    url: `${SITE_URL}/causes/${c.slug}`,
    lastModified: c.updatedAt ? new Date(c.updatedAt) : c.publishedAt ? new Date(c.publishedAt) : now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const blogEntries: SitemapItem[] = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : p.publishedAt ? new Date(p.publishedAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...campaignEntries, ...blogEntries];
}
