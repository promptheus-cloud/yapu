import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import ServiceSections from "@/components/ServiceSections";
import Partners from "@/components/Partners";
import Testimonial from "@/components/Testimonial";
import Newsletter from "@/components/Newsletter";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as "en" | "es" | "fr");
  const t = await getTranslations("home");

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-yapu px-6">
        <div className="relative z-10 mx-auto max-w-[800px] text-center">
          <h1 className="hero-yapu-title text-4xl font-bold leading-tight tracking-tight uppercase md:text-6xl">
            {t("heroTitlePre")}{" "}
            <span className="hero-yapu-highlight">{t("heroTitleHighlight")}</span>{" "}
            {t("heroTitlePost")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/70 md:text-lg">
            {t("heroSubtitle")}
          </p>

          <div className="mt-10">
            <a
              href="#contact"
              className="hero-cta-button inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-white transition-colors hover:opacity-90"
            >
              {t("heroCta")}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Service Sections (Investor Services, Data Insights, Digital Tools, Impact) ── */}
      <ServiceSections locale={locale} />

      {/* ── Testimonial (Client Voices) ── */}
      <Testimonial locale={locale} sectionTitle={t("testimonialTitle")} />

      {/* ── Partners (Trusted By + Our Clients) ── */}
      <Partners
        title={t("partnersTitle")}
        clientsTitle={t("clientsTitle")}
        clientsLabel={t("partnersClients")}
      />

      {/* ── Newsletter ── */}
      <Newsletter />
    </>
  );
}
