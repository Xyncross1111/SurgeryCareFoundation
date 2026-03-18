import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ArrowRightIcon } from "@/components/ui/icons";

// Hardcoded posts until blog API is available
const POSTS = [
  { slug: "surgery-care-rural-india", title: "How Surgery Care is Changing Lives in Rural India", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSurgery Care Foundation has been working tirelessly in rural India to provide accessible surgical care to those who need it most. Through our network of partner hospitals and dedicated volunteers, we've been able to reach thousands of patients in remote areas.", date: "Mar 15, 2026", category: "Impact", image: "/images/hero-1.jpg" },
  { slug: "post-operative-care", title: "The Importance of Post-Operative Care for Patients", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nPost-operative care is a critical component of the surgical journey. Proper care after surgery can significantly improve recovery outcomes and reduce the risk of complications.", date: "Mar 10, 2026", category: "Medical", image: "/images/hero-3.jpg" },
  { slug: "100k-donors-milestone", title: "100K Donors: Celebrating a Milestone of Trust", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. We are proud to announce that Surgery Care Foundation has reached the incredible milestone of 100,000 donors.", date: "Mar 05, 2026", category: "Milestone", image: "/images/hero-4.jpg" },
  { slug: "mothers-journey-brain-tumor", title: "A Mother's Journey: Surviving Brain Tumor", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is the story of a mother who fought against all odds to survive a brain tumor, with the support of Surgery Care Foundation and generous donors like you.", date: "Feb 28, 2026", category: "Story", image: "/images/hero-2.jpg" },
];

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero title={post.title} subtitle={post.excerpt} />

      <article className="py-16 md:py-24">
        <Container className="max-w-3xl">
          {/* Meta */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <Badge>{post.category}</Badge>
            <div className="flex items-center gap-2 text-slate-light">
              <CalendarIcon className="size-4" />
              <Text as="span" variant="muted" size="label" className="normal-case tracking-normal">
                {post.date}
              </Text>
            </div>
          </div>

          {/* Featured image */}
          <div className="relative mb-10 h-64 overflow-hidden rounded-2xl md:h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <Text key={i} variant="secondary" size="body-lg" className="mb-6">
                {paragraph}
              </Text>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-12 border-t border-surface-border pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-btn font-bold text-primary transition-colors hover:text-accent"
            >
              <ArrowRightIcon className="size-4 rotate-180" />
              Back to All Articles
            </Link>
          </div>
        </Container>
      </article>
    </>
  );
}
