"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Civic Guide", href: "/category/civic-guide" },
  { label: "Blogs", href: "/category/blogs" },
  { label: "How To", href: "/category/guides" },
  { label: "Travel", href: "/category/travel" },
];

const TOOLS = [
  { label: "Date Converter", href: "/date-converter" },
  { label: "SIP Calculator", href: "/sip-calculator" },
  { label: "Mileage Calculator", href: "/mileage-calculator" },
  { label: "EMI Calculator", href: "/emi-calculator" },
  { label: "Grade Converter", href: "/grade-converter-gpa-percentage" },
];

export default function Header() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-wrap items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="focus-ring font-display text-lg font-semibold tracking-tight text-ink"
        >
          Prabesh Tamang
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring font-display text-sm font-medium text-ink/80 transition hover:text-vermilion"
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              type="button"
              className="focus-ring flex items-center gap-1 font-display text-sm font-medium text-ink/80 transition hover:text-vermilion"
              aria-expanded={toolsOpen}
              onClick={() => setToolsOpen((v) => !v)}
            >
              Tools
              <span className="font-mono text-xs text-marigold">▾</span>
            </button>
            {toolsOpen && (
              <div className="absolute right-0 top-full w-56 border border-line bg-paper shadow-[4px_4px_0_0_#2B3A55]">
                {TOOLS.map((tool, i) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="focus-ring flex items-center gap-3 border-b border-line px-4 py-3 text-sm text-ink/80 last:border-b-0 hover:bg-marigold/10 hover:text-ink"
                  >
                    <span className="font-mono text-xs text-vermilion">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {tool.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="focus-ring border border-ink bg-ink px-4 py-2 font-display text-sm font-medium text-paper transition hover:bg-vermilion hover:border-vermilion"
          >
            Contact
          </Link>
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
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-line bg-paper px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {[...NAV_LINKS, ...TOOLS, { label: "Contact", href: "/contact" }].map(
              (link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring block py-1 font-display text-sm text-ink/80"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
