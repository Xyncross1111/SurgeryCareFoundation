import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "@/components/ui/icons";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

const POSTS: BlogPost[] = [
  { slug: "surgery-care-rural-india", title: "How Surgery Care is Changing Lives in Rural India", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...", date: "Mar 15, 2026", category: "Impact", image: "/images/hero-1.jpg" },
  { slug: "post-operative-care", title: "The Importance of Post-Operative Care for Patients", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...", date: "Mar 10, 2026", category: "Medical", image: "/images/hero-3.jpg" },
  { slug: "100k-donors-milestone", title: "100K Donors: Celebrating a Milestone of Trust", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...", date: "Mar 05, 2026", category: "Milestone", image: "/images/hero-4.jpg" },
  { slug: "mothers-journey-brain-tumor", title: "A Mother's Journey: Surviving Brain Tumor", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...", date: "Feb 28, 2026", category: "Story", image: "/images/hero-2.jpg" },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Latest"
        highlight="News & Updates"
        subtitle="Read about our recent impact, medical insights, and inspiring patient stories."
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <Card key={post.slug} className="flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  />
                  <Badge className="absolute left-4 top-4">{post.category}</Badge>
                </div>
                <CardContent className="flex flex-1 flex-col">
                  <div className="mb-3 flex items-center gap-2 text-slate-light">
                    <CalendarIcon className="size-4" />
                    <Text as="span" variant="muted" size="label" className="normal-case tracking-normal">
                      {post.date}
                    </Text>
                  </div>

                  <Heading level="h4" as="h2" className="mb-3 text-accent">
                    <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-accent-green">
                      {post.title}
                    </Link>
                  </Heading>

                  <Text variant="secondary" className="mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </Text>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-label font-black uppercase tracking-wider text-primary transition-colors hover:text-accent"
                  >
                    Read Article
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
