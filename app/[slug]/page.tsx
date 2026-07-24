import { getPostBySlug, getPageBySlug } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://prabeshlamatamang.com.np";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const doc = post || (await getPageBySlug(slug));

  if (!doc) return {};

  const title = doc.seo?.metaTitle || doc.title;
  const description = doc.seo?.metaDescription || doc.excerpt;
  const canonical = doc.seo?.canonicalUrl || `${SITE_URL}/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: doc.mainImageUrl ? [doc.mainImageUrl] : undefined,
    },
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try a blog post first, then fall back to a generic static page
  // (e.g. /privacy-policy, /terms) created in Sanity's "Page" type.
  const post = await getPostBySlug(slug);
  if (post) return <PostView post={post} />;

  const page = await getPageBySlug(slug);
  if (page) return <StaticPageView page={page} />;

  return notFound();
}

function PostView({ post }: { post: any }) {
  return (
    <article className="px-6 py-16">
      {post.seo?.customSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: post.seo.customSchema }}
        />
      )}
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-wide text-marigold">
          {post.categories?.join(" / ")} ·{" "}
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
          {post.title}
        </h1>

        {post.mainImageUrl && (
          <Image
            src={post.mainImageUrl}
            alt={post.title}
            width={800}
            height={450}
            className="mt-8 w-full border border-line object-cover"
          />
        )}

        <div className="prose prose-neutral mt-8 max-w-none font-body text-ink/80">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>

        {post.similarPosts?.length > 0 && (
          <div className="mt-16 border-t border-line pt-10">
            <h2 className="font-display text-xl font-semibold text-ink">
              Similar Posts
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {post.similarPosts.slice(0, 3).map((sp: any) => (
                <Link
                  key={sp.slug}
                  href={`/${sp.slug}`}
                  className="focus-ring group flex flex-col border border-line p-5 transition hover:border-ink"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wide text-marigold">
                    {sp.categories?.join(" / ")}
                  </span>
                  <h3 className="mt-2 font-display text-sm font-semibold leading-snug text-ink group-hover:text-vermilion">
                    {sp.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function StaticPageView({ page }: { page: any }) {
  return (
    <article className="px-6 py-16">
      {page.seo?.customSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: page.seo.customSchema }}
        />
      )}
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
          {page.title}
        </h1>
        <div className="prose prose-neutral mt-8 max-w-none font-body text-ink/80">
          {page.body && <PortableText value={page.body} />}
        </div>
      </div>
    </article>
  );
}
