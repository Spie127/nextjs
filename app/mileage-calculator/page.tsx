import { getToolBySlug } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import MileageCalculator from "@/components/MileageCalculator";
import SimilarTools from "@/components/SimilarTools";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://prabeshlamatamang.com.np";
const SLUG = "mileage-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolBySlug(SLUG);

  const title = tool?.seo?.metaTitle || tool?.title || "Mileage Calculator";
  const description =
    tool?.seo?.metaDescription ||
    tool?.description ||
    "Calculate your vehicle's fuel mileage and cost per kilometer.";
  const canonical = tool?.seo?.canonicalUrl || `${SITE_URL}/${SLUG}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

export default async function MileageCalculatorPage() {
  const tool = await getToolBySlug(SLUG);

  return (
    <section className="px-6 py-16">
      {tool?.seo?.customSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: tool.seo.customSchema }}
        />
      )}
      <div className="mx-auto max-w-wrap">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-vermilion">
          Tools
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {tool?.title || "Mileage Calculator"}
        </h1>
        {tool?.description && (
          <p className="mt-3 max-w-2xl font-body text-base text-ink/70">
            {tool.description}
          </p>
        )}

        <div className="mt-10">
          <MileageCalculator />
        </div>

        {tool?.content && (
          <div className="prose prose-neutral mx-auto mt-16 max-w-2xl font-body text-ink/80">
            <PortableText value={tool.content} />
          </div>
        )}

        <SimilarTools tools={tool?.similarTools} />
      </div>
    </section>
  );
}
