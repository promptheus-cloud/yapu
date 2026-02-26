import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadContent } from "@/lib/content";
import ServiceGrid from "@/components/ServiceGrid";
import DigitalToolsSections from "@/components/DigitalToolsSections";
import Testimonial from "@/components/Testimonial";
import ContactCTA from "@/components/ContactCTA";

interface Feature {
  title: string;
  icon: string;
}

interface DigitalToolsData {
  features: Feature[];
}

export default async function DigitalToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("digitalTools");
  const tHome = await getTranslations("home");
  const data = loadContent<DigitalToolsData>(
    "digital-tools",
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

      {/* ── Tool Sections ── */}
      <DigitalToolsSections locale={locale} />

      {/* ── Features Grid ── */}
      <ServiceGrid
        items={data.features}
        title={t("featuresTitle")}
        columns={3}
      />

      {/* ── Testimonial ── */}
      <Testimonial locale={locale} sectionTitle={tHome("testimonialTitle")} />

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
