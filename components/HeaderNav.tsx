"use client";

import Link from "next/link";
import { useState } from "react";

type MenuLink = {
  _type: "menuLink";
  label: string;
  url: string;
  openInNewTab?: boolean;
  isButton?: boolean;
};

type MenuLinkGroup = {
  _type: "menuLinkGroup";
  label: string;
  links: MenuLink[];
};

type HeaderItem = MenuLink | MenuLinkGroup;

// Fallback used only if no siteNavigation document exists yet in Sanity,
// so the header never renders empty.
const DEFAULT_LINKS: HeaderItem[] = [
  { _type: "menuLink", label: "Civic Guide", url: "/category/civic-guide" },
  { _type: "menuLink", label: "Blogs", url: "/category/blogs" },
  { _type: "menuLink", label: "How To", url: "/category/guides" },
  { _type: "menuLink", label: "Travel", url: "/category/travel" },
  {
    _type: "menuLinkGroup",
    label: "Tools",
    links: [
      { _type: "menuLink", label: "Date Converter", url: "/date-converter" },
      { _type: "menuLink", label: "SIP Calculator", url: "/sip-calculator" },
      {
        _type: "menuLink",
        label: "Mileage Calculator",
        url: "/mileage-calculator",
      },
      { _type: "menuLink", label: "EMI Calculator", url: "/emi-calculator" },
      {
        _type: "menuLink",
        label: "Grade Converter",
        url: "/grade-converter-gpa-percentage",
      },
    ],
  },
  { _type: "menuLink", label: "Contact", url: "/contact", isButton: true },
];

export default function HeaderNav({ links }: { links?: HeaderItem[] }) {
  const items = links && links.length > 0 ? links : DEFAULT_LINKS;
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden items-center gap-8 md:flex">
        {items.map((item, i) =>
          item._type === "menuLinkGroup" ? (
            <div
              key={`${item.label}-${i}`}
              className="relative"
              onMouseEnter={() => setOpenGroup(item.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <button
                type="button"
                className="focus-ring flex items-center gap-1 font-display text-sm font-medium text-ink/80 transition hover:text-vermilion"
                aria-expanded={openGroup === item.label}
                onClick={() =>
                  setOpenGroup((v) => (v === item.label ? null : item.label))
                }
              >
                {item.label}
                <span className="font-mono text-xs text-marigold">▾</span>
              </button>
              {openGroup === item.label && (
                <div className="absolute right-0 top-full w-56 border border-line bg-paper shadow-[4px_4px_0_0_#2B3A55]">
                  {item.links?.map((link, j) => (
                    <Link
                      key={link.url}
                      href={link.url}
                      target={link.openInNewTab ? "_blank" : undefined}
                      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                      className="focus-ring flex items-center gap-3 border-b border-line px-4 py-3 text-sm text-ink/80 last:border-b-0 hover:bg-marigold/10 hover:text-ink"
                    >
                      <span className="font-mono text-xs text-vermilion">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : item.isButton ? (
            <Link
              key={item.url}
              href={item.url}
              target={item.openInNewTab ? "_blank" : undefined}
              rel={item.openInNewTab ? "noopener noreferrer" : undefined}
              className="focus-ring border border-ink bg-ink px-4 py-2 font-display text-sm font-medium text-paper transition hover:bg-vermilion hover:border-vermilion"
            >
              {item.label}
            </Link>
          ) : (
            <Link
              key={item.url}
              href={item.url}
              target={item.openInNewTab ? "_blank" : undefined}
              rel={item.openInNewTab ? "noopener noreferrer" : undefined}
              className="focus-ring font-display text-sm font-medium text-ink/80 transition hover:text-vermilion"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>

      {/* Mobile toggle */}
      <button
        type="button"
        className="focus-ring font-mono text-sm md:hidden"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        aria-label="Toggle menu"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="absolute left-0 right-0 top-full border-t border-line bg-paper px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {items.flatMap((item, i) =>
              item._type === "menuLinkGroup"
                ? [
                    <li key={`group-${i}`} className="pt-2">
                      <span className="font-mono text-[11px] uppercase tracking-wide text-ink/40">
                        {item.label}
                      </span>
                    </li>,
                    ...(item.links || []).map((link) => (
                      <li key={link.url} className="pl-2">
                        <Link
                          href={link.url}
                          target={link.openInNewTab ? "_blank" : undefined}
                          rel={
                            link.openInNewTab
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="focus-ring block py-1 font-display text-sm text-ink/80"
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    )),
                  ]
                : [
                    <li key={item.url}>
                      <Link
                        href={item.url}
                        target={item.openInNewTab ? "_blank" : undefined}
                        rel={
                          item.openInNewTab ? "noopener noreferrer" : undefined
                        }
                        className="focus-ring block py-1 font-display text-sm text-ink/80"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>,
                  ]
            )}
          </ul>
        </nav>
      )}
    </>
  );
}
