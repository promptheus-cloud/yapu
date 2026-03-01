import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadContent } from "@/lib/content";
import ImpactReferences from "@/components/ImpactReferences";
import ContactCTA from "@/components/ContactCTA";

interface ImpactData {
  intro: { text: string };
  digitalResilience: { title: string; paragraphs: string[] };
  scaleForResilience: { title: string; text: string; partners: string[] };
  references: { title: string };
}

export default async function ImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as "en" | "es" | "fr");
  const t = await getTranslations("impactPage");
  const tHome = await getTranslations("home");
  const data = loadContent<ImpactData>(
    "impact-page",
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

      {/* ── Digital Resilience Finance ── */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">
            {data.digitalResilience.title}
          </h2>
          <div className="space-y-4">
            {data.digitalResilience.paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scale for Resilience ── */}
      <section className="section-padding bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">
            {data.scaleForResilience.title}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            {data.scaleForResilience.text}
          </p>
          <div className="flex flex-wrap gap-3">
            {data.scaleForResilience.partners.map((partner) => (
              <span
                key={partner}
                className="rounded-full border border-border/50 bg-card px-4 py-2 text-sm font-medium"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact References ── */}
      <ImpactReferences locale={locale} title={data.references.title} />

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
