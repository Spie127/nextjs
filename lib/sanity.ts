import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // fast, cached reads - fine for a blog
});

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      body,
      publishedAt,
      import { getPostBySlug } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
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

  if (!post) return {};

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const canonical = post.seo?.canonicalUrl || `${SITE_URL}/${slug}`;

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
      images: post.mainImageUrl ? [post.mainImageUrl] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

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
          {post.category} ·{" "}
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
      </div>
    </article>
  );
}
      "category": category->title,
      "mainImageUrl": mainImage.asset->url
    }`,
    { slug }
  );
}

export async function getPostsByCategory(categorySlug: string) {
  return client.fetch(
    `*[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc){
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      "category": category->title
    }`,
    { categorySlug }
  );
}

export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc){
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      "category": category->title
    }`
  );
}
