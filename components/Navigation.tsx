"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadContent } from "@/lib/content";

interface NavItem {
  label: string;
  href: string;
}

interface NavData {
  hauptmenu: NavItem[];
  cta: NavItem;
}

const localeLabels = { en: "EN", es: "ES", fr: "FR" } as const;
type Locale = keyof typeof localeLabels;

export default function Navigation() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const navigationData = loadContent<NavData>("navigation", locale as "en" | "es" | "fr");

  const isAnchor = (href: string) => href.startsWith("#");

  const switchLocale = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.replace(pathWithoutLocale, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-primary">
          YAPU
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-4 lg:flex">
          {navigationData.hauptmenu.map((item) =>
            isAnchor(item.href) ? (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}

          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={t("themeToggle")}
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <div className="flex items-center gap-1 text-xs">
            {(Object.keys(localeLabels) as Locale[]).map((loc, i) => (
              <span key={loc} className="flex items-center">
                {i > 0 && <span className="text-muted-foreground/50 mx-0.5">|</span>}
                <button
                  onClick={() => switchLocale(loc)}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    locale === loc ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {localeLabels[loc]}
                </button>
              </span>
            ))}
          </div>

          {isAnchor(navigationData.cta.href) ? (
            <Button asChild size="sm">
              <a href={navigationData.cta.href}>
                {navigationData.cta.label}
              </a>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href={navigationData.cta.href}>
                {navigationData.cta.label}
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={t("themeToggle")}
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <div className="flex items-center gap-1 text-xs">
            {(Object.keys(localeLabels) as Locale[]).map((loc, i) => (
              <span key={loc} className="flex items-center">
                {i > 0 && <span className="text-muted-foreground/50 mx-0.5">|</span>}
                <button
                  onClick={() => switchLocale(loc)}
                  className={locale === loc ? "font-bold text-primary" : "text-muted-foreground"}
                >
                  {localeLabels[loc]}
                </button>
              </span>
            ))}
          </div>
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("menuLabel")}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navigationData.hauptmenu.map((item) =>
              isAnchor(item.href) ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              )
            )}
            {isAnchor(navigationData.cta.href) ? (
              <Button asChild size="sm" className="w-fit">
                <a href={navigationData.cta.href} onClick={() => setMobileOpen(false)}>
                  {navigationData.cta.label}
                </a>
              </Button>
            ) : (
              <Button asChild size="sm" className="w-fit">
                <Link href={navigationData.cta.href} onClick={() => setMobileOpen(false)}>
                  {navigationData.cta.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
