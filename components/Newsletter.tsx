"use client";

import { useTranslations } from "next-intl";

export default function Newsletter() {
  const t = useTranslations("newsletter");

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="mx-auto max-w-xl text-center">
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="h-1.5" style={{ background: "#e63312" }} />
          <div className="p-8 md:p-10">
            <h2 className="mb-2 text-2xl font-bold">{t("title")}</h2>
            <p className="mb-6 text-muted-foreground">{t("subtitle")}</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder={t("placeholder")}
                className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ background: "#e63312" }}
              >
                {t("button")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
