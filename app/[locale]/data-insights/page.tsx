import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadContent } from "@/lib/content";
import ServiceGrid from "@/components/ServiceGrid";
import DataInsightsSections from "@/components/DataInsightsSections";
import ContactCTA from "@/components/ContactCTA";

interface Offering {
  title: string;
  icon: string;
}

interface DataInsightsData {
  offerings: Offering[];
}

export default async function DataInsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as "en" | "es" | "fr");
  const t = await getTranslations("dataInsights");
  const tHome = await getTranslations("home");
  const data = loadContent<DataInsightsData>(
    "data-insights",
    locale as "en" | "es" | "fr"
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-yapu px-6">
        <div className="relative z-10 mx-auto max-w-[800px] text-center">
          <h1 className="hero-yapu-title text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 md:text-xl">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* ── Offerings Overview ── */}
      <ServiceGrid
        items={data.offerings}
        title={t("offeringsTitle")}
        columns={3}
      />

      {/* ── Detailed Sections ── */}
      <DataInsightsSections locale={locale} />

      {/* ── Contact ── */}
      <ContactCTA
        title={tHome("contactTitle")}
        subtitle={tHome("contactSubtitle")}
        ctaText={tHome("contactCta")}
        emailText={tHome("contactEmail")}
      />
    </>
  );
}
