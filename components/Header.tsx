import Link from "next/link";
import { getSiteNavigation } from "@/lib/sanity";
import HeaderNav from "./HeaderNav";

export default async function Header() {
  const nav = await getSiteNavigation();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-wrap items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="focus-ring font-display text-lg font-semibold tracking-tight text-ink"
        >
          Prabesh Tamang
        </Link>

        <HeaderNav links={nav?.headerLinks} />
      </div>
    </header>
  );
}
