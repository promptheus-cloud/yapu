"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { loadContent } from "@/lib/content";

interface NavItem {
  label: string;
  href: string;
}

interface NavData {
  hauptmenu: NavItem[];
}

export default function Navigation() {
  const locale = useLocale() as "en" | "es" | "fr";
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationData = loadContent<NavData>("navigation", locale);

  const isAnchor = (href: string) => href.startsWith("#");

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: "#1a5c5a" }}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-white">
          YAPU
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 lg:flex">
          {navigationData.hauptmenu.map((item) =>
            isAnchor(item.href) ? (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium tracking-wider text-white/80 uppercase transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium tracking-wider text-white/80 uppercase transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="px-6 py-4 lg:hidden" style={{ backgroundColor: "#1a5c5a" }}>
          <div className="flex flex-col gap-4">
            {navigationData.hauptmenu.map((item) =>
              isAnchor(item.href) ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium tracking-wider text-white/80 uppercase transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium tracking-wider text-white/80 uppercase transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
