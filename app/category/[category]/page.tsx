import { getPostsByCategory } from "@/lib/sanity";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-wrap">
        <h1 className="font-display text-3xl font-semibold capitalize text-ink">
          {category.replace(/-/g, " ")}
        </h1>

        {posts.length === 0 ? (
          <p className="mt-8 font-body text-sm text-ink/60">
            No posts in this category yet.
          </p>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {posts.map((post: any) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="focus-ring group flex flex-col border border-line p-6 transition hover:border-ink"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide text-marigold">
                  {post.category} ·{" "}
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink group-hover:text-vermilion">
                  {post.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
