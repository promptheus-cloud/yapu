"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { loadContent } from "@/lib/content";

interface NavItem {
  label: string;
  href: string;
}

interface NavData {
  hauptmenu: NavItem[];
  cta: NavItem;
}

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const navigationData = loadContent<NavData>("navigation", locale as "en" | "es" | "fr");

  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="text-lg font-bold text-primary">
              YAPU Solutions
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("tagline")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("navigation")}</h3>
            <div className="flex flex-col gap-2">
              {navigationData.hauptmenu.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("contact")}</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>{t("company")}</span>
              <span>{t("berlin")}</span>
              <span>{t("quito")}</span>
              <a href={`mailto:${t("email")}`} className="hover:text-primary">
                {t("email")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>&copy; {new Date().getFullYear()} {t("copyright")}</span>
          <span>{t("builtBy")}</span>
        </div>
      </div>
    </footer>
  );
}
