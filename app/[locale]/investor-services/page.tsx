import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadContent } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import PathToResilience from "@/components/PathToResilience";
import UseCases from "@/components/UseCases";
import ContactCTA from "@/components/ContactCTA";

interface InvestorData {
  approach: { title: string; text: string };
  services: string[];
  impactMeasurement: {
    title: string;
    dimensions: { name: string; description: string }[];
  };
  sdgs: { title: string; description: string; goals: number[] };
}

export default async function InvestorServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("investorServices");
  const tHome = await getTranslations("home");
  const data = loadContent<InvestorData>(
    "investor-services",
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

      {/* ── Our Approach ── */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">{t("approachTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {data.approach.text}
          </p>
        </div>
      </section>

      {/* ── Our Services ── */}
      <section className="section-padding bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold">{t("servicesTitle")}</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {data.services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4"
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Path to Resilience ── */}
      <PathToResilience locale={locale} title={t("pathTitle")} />

      {/* ── Impact Measurement ── */}
      <section className="section-padding bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold">{t("impactTitle")}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {data.impactMeasurement.dimensions.map((dim) => (
              <Card key={dim.name}>
                <CardHeader>
                  <CardTitle>{dim.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {dim.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDGs ── */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold">{t("sdgsTitle")}</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            {data.sdgs.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {data.sdgs.goals.map((sdg) => (
              <span
                key={sdg}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary"
              >
                {sdg}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <UseCases locale={locale} title={t("useCasesTitle")} />

      {/* ── Green Finance Radar ── */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            {t("greenRadarTitle")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("greenRadarText")}
          </p>
        </div>
      </section>

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
