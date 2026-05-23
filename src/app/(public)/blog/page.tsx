import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import BlogListClient from "./blog-list-client";

export const metadata: Metadata = {
  title: "Blog & Awareness",
  description:
    "Surgery Care Foundation blog: medical awareness articles, donor stories, campaign updates, and resources for patients and contributors.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog & Awareness | Surgery Care Foundation",
    description:
      "Medical awareness, donor stories, and campaign updates from Surgery Care Foundation.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogListPage() {
  return <BlogListClient />;
}
