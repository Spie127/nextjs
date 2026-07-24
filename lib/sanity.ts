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
      seo,
      "categories": categories[]->title,
      "mainImageUrl": mainImage.asset->url,
      "similarPosts": similarPosts[]->{
        title,
        excerpt,
        publishedAt,
        "slug": slug.current,
        "categories": categories[]->title
      }
    }`,
    { slug }
  );
}

export async function getPostsByCategory(categorySlug: string) {
  return client.fetch(
    `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc){
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      "categories": categories[]->title
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
      "categories": categories[]->title
    }`
  );
}

export async function getFeaturedPosts() {
  return client.fetch(
    `*[_type == "post" && featuredOnHomepage == true] | order(publishedAt desc) [0...3]{
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      "categories": categories[]->title
    }`
  );
}

export async function getToolBySlug(slug: string) {
  return client.fetch(
    `*[_type == "tool" && slug.current == $slug][0]{
      title,
      description,
      content,
      seo,
      "similarTools": similarTools[]->{
        title,
        description,
        sampleOutput,
        "slug": slug.current
      }
    }`,
    { slug }
  );
}

export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      body,
      seo
    }`,
    { slug }
  );
}

export async function getSiteNavigation() {
  return client.fetch(
    `*[_type == "siteNavigation"][0]{
      headerLinks[]{
        _type,
        label,
        url,
        openInNewTab,
        isButton,
        links[]{ label, url, openInNewTab, isButton }
      },
      footerColumns[]{
        title,
        links[]{ label, url, openInNewTab }
      }
    }`
  );
}

export async function getFeaturedTools() {
  return client.fetch(
    `*[_type == "tool" && featuredOnHomepage == true] | order(order asc) [0...3]{
      title,
      description,
      sampleOutput,
      "slug": slug.current
    }`
  );
}
