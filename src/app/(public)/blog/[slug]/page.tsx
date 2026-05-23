import type { Metadata } from "next";
import { backendGet } from "@/lib/server-fetch";
import { absoluteUrl, ORG_LOGO_URL, SITE_NAME, SITE_URL, truncate } from "@/lib/seo";
import type { BlogPost } from "@/types/content";
import BlogDetailClient from "./blog-detail-client";

interface PageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<BlogPost | null> {
  return backendGet<BlogPost>(`/public/blog-posts/${encodeURIComponent(slug)}`, {
    revalidate: 600,
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }

  const description = truncate(post.excerpt || post.content || "", 160);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.coverImageUrl
    ? absoluteUrl(post.coverImageUrl)
    : `${SITE_URL}/opengraph-image`;

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${post.title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt ?? post.createdAt,
      modifiedTime: post.updatedAt,
      authors: post.authorName ? [post.authorName] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${SITE_NAME}`,
      description,
      images: [imageUrl],
    },
  };
}

function buildArticleJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: truncate(post.excerpt || post.content || "", 300),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      image: post.coverImageUrl ? absoluteUrl(post.coverImageUrl) : `${SITE_URL}/opengraph-image`,
      datePublished: post.publishedAt ?? post.createdAt,
      dateModified: post.updatedAt,
      author: post.authorName
        ? { "@type": "Person", name: post.authorName }
        : { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: ORG_LOGO_URL },
      },
      articleSection: post.category ?? undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
}

export default async function BlogDetailPage({ params }: PageProps) {
  const post = await getPost(params.slug);
  return (
    <>
      {post
        ? buildArticleJsonLd(post).map((node, i) => (
            <script
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
            />
          ))
        : null}
      <BlogDetailClient slug={params.slug} />
    </>
  );
}
