import Link from "next/link";

type SimilarTool = {
  slug: string;
  title: string;
  sampleOutput?: string;
};

export default function SimilarTools({ tools }: { tools?: SimilarTool[] }) {
  if (!tools || tools.length === 0) return null;

  return (
    <div className="mx-auto mt-16 max-w-2xl border-t border-line pt-10">
      <h2 className="font-display text-xl font-semibold text-ink">
        Similar Tools
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {tools.slice(0, 3).map((st) => (
          <Link
            key={st.slug}
            href={`/${st.slug}`}
            className="focus-ring group flex flex-col border border-line p-5 transition hover:border-ink"
          >
            <h3 className="font-display text-sm font-semibold leading-snug text-ink group-hover:text-vermilion">
              {st.title}
            </h3>
            {st.sampleOutput && (
              <span className="mt-2 font-mono text-sm text-indigo">
                {st.sampleOutput}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
