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
