import Link from "next/link";

const CATEGORIES = [
  { label: "Civic Guide", href: "/category/civic-guide" },
  { label: "Blogs", href: "/category/blogs" },
  { label: "How To", href: "/category/guides" },
  { label: "Travel", href: "/category/travel" },
];

const POSTS = [
  {
    title: "eSewa vs Khalti: Which Digital Wallet is Better in Nepal?",
    date: "June 25, 2026",
    category: "Blogs",
    excerpt:
      "If you've ever needed to pay a bill, recharge your mobile, transfer money, or scan a QR code, chances are you've reached for one of these two wallets.",
    href: "/esewa-vs-khalti",
  },
  {
    title: "How to Download eNID (National ID) in Nepal: Complete Guide 2026",
    date: "June 19, 2026",
    category: "Civic Guide",
    excerpt:
      "The Government of Nepal has introduced the eNID download feature — here's the full step-by-step walkthrough.",
    href: "/how-to-download-enid",
  },
  {
    title: "Nepal EV Import Statistics (FY 2078/79–2082/83)",
    date: "June 18, 2026",
    category: "Blogs",
    excerpt:
      "Nepal imported 28,222 electric vehicles in the first 10 months of FY 2082/83 — a quick look at the numbers.",
    href: "/nepal-ev-import",
  },
];

const TOOLS = [
  { label: "Date Converter", sample: "2082.04.08 → 2026.07.23", href: "/date-converter" },
  { label: "SIP Calculator", sample: "Rs 5,000/mo → Rs 10.3L", href: "/sip-calculator" },
  { label: "Mileage Calculator", sample: "38.4 km/l", href: "/mileage-calculator" },
  { label: "EMI Calculator", sample: "Rs 8,432 / month", href: "/emi-calculator" },
  { label: "Grade Converter", sample: "3.6 GPA → 84%", href: "/grade-converter-gpa-percentage" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line px-6 py-20 md:py-28">
        <div className="mx-auto max-w-wrap">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-vermilion">
            Kathmandu · Nepal
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
            Practical guides, tips &amp; everyday life in Nepal.
          </h1>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-ink/70">
            Simple, honest content about life in Nepal — civic how-tos, travel
            notes, and free tools that actually help.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/category/blogs"
              className="focus-ring bg-ink px-6 py-3 font-display text-sm font-medium text-paper transition hover:bg-vermilion"
            >
              Read the latest
            </Link>
            <Link
              href="/emi-calculator"
              className="focus-ring border border-ink px-6 py-3 font-display text-sm font-medium text-ink transition hover:border-vermilion hover:text-vermilion"
            >
              Try a calculator
            </Link>
          </div>
        </div>

        {/* Signature: ledger strip of live tool readouts */}
        <div className="mx-auto mt-16 max-w-wrap overflow-x-auto">
          <div className="flex min-w-max border border-line">
            {TOOLS.map((tool, i) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="focus-ring group flex w-44 shrink-0 flex-col justify-between border-r border-line px-4 py-4 last:border-r-0 hover:bg-marigold/10"
              >
                <span className="font-mono text-[11px] text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 font-display text-xs font-medium text-ink/80 group-hover:text-vermilion">
                  {tool.label}
                </span>
                <span className="mt-2 font-mono text-sm text-indigo">
                  {tool.sample}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-b border-line px-6 py-6">
        <div className="mx-auto flex max-w-wrap flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="focus-ring border border-line px-4 py-1.5 font-mono text-xs text-ink/70 transition hover:border-vermilion hover:text-vermilion"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest posts */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-wrap">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Latest posts
            </h2>
            <Link
              href="/category/blogs"
              className="focus-ring font-mono text-xs text-vermilion hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {POSTS.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="focus-ring group flex flex-col border border-line p-6 transition hover:border-ink"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide text-marigold">
                  {post.category} · {post.date}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink group-hover:text-vermilion">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink/65">
                  {post.excerpt}
                </p>
                <span className="mt-5 font-mono text-xs text-ink/50 group-hover:text-vermilion">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
