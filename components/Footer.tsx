import Link from "next/link";
import { getSiteNavigation } from "@/lib/sanity";

export default async function Footer() {
  const nav = await getSiteNavigation();
  const columns =
    nav?.footerColumns && nav.footerColumns.length > 0
      ? nav.footerColumns
      : DEFAULT_COLUMNS;

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-wrap gap-10 px-6 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-lg font-semibold">Prabesh Tamang</p>
          <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-paper/70">
            Practical guides, civic how-tos, and free tools for everyday life
            in Nepal.
          </p>
          <div className="mt-5 flex gap-4 font-mono text-xs text-paper/60">
            <a href="https://www.facebook.com/prabeshlamatamangofficial/" className="focus-ring hover:text-marigold">
              Facebook
            </a>
            <a href="https://www.instagram.com/prabeshlamatamang/" className="focus-ring hover:text-marigold">
              Instagram
            </a>
            <a href="https://www.pinterest.com/prabeshlamatamang/" className="focus-ring hover:text-marigold">
              Pinterest
            </a>
          </div>
        </div>

        {columns.map((col: any, i: number) => (
          <div key={`${col.title}-${i}`}>
            <p className="font-display text-xs font-medium uppercase tracking-wide text-marigold">
              {col.title}
            </p>
            <ul className="mt-4 flex flex-col gap-2 font-body text-sm text-paper/75">
              {col.links?.map((link: any) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                    className="focus-ring hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="font-display text-xs font-medium uppercase tracking-wide text-marigold">
            Stay Updated
          </p>
          <p className="mt-4 font-body text-sm text-paper/70">
            New posts and tools, straight to your inbox. No spam.
          </p>
          <form className="mt-4 flex border border-paper/30">
            <input
              type="email"
              placeholder="you@email.com"
              className="focus-ring w-full bg-transparent px-3 py-2 font-body text-sm text-paper placeholder:text-paper/40"
            />
            <button
              type="submit"
              className="focus-ring shrink-0 bg-marigold px-4 py-2 font-display text-sm font-medium text-ink hover:bg-vermilion hover:text-paper"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-paper/10 px-6 py-5">
        <p className="mx-auto max-w-wrap font-mono text-xs text-paper/50">
          © {new Date().getFullYear()} Made by Prabesh
        </p>
      </div>
    </footer>
  );
}

// Fallback used only if no siteNavigation document exists yet in Sanity,
// so the footer never renders empty.
const DEFAULT_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Blogs", url: "/category/blogs" },
      { label: "Guides", url: "/category/guides" },
      { label: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Date Converter", url: "/date-converter" },
      { label: "SIP Calculator", url: "/sip-calculator" },
      { label: "Mileage Calculator", url: "/mileage-calculator" },
    ],
  },
];
