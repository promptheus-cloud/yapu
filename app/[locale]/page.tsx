import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadContent } from "@/lib/content";

interface Feature {
  titel: string;
  beschreibung: string;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const features = loadContent<{ features: Feature[] }>("features", locale as "de" | "en");

  return (
    <>
      <Hero
        titel={t("heroTitel")}
        untertitel={t("heroUntertitel")}
        ctaText={t("heroCta")}
        ctaHref={`/${locale}/beispiel`}
        badge={t("heroBadge")}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-4 text-3xl font-bold">{t("featuresTitel")}</h2>
        <p className="mb-12 text-lg text-muted-foreground">{t("featuresText")}</p>

        <div className="grid gap-6 md:grid-cols-3">
          {features.features.map((f, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>{f.titel}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{f.beschreibung}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
