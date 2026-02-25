import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import ContentCard from "@/components/ContentCard";
import { loadContent } from "@/lib/content";

interface Beispiel {
  datum: string;
  datumFormatted: string;
  titel: string;
  inhalt: string;
}

export default async function BeispielPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("beispiel");

  const data = loadContent<{ eintraege: Beispiel[] }>("beispiel", locale as "de" | "en");

  return (
    <>
      <Hero
        titel={t("heroTitel")}
        untertitel={t("heroUntertitel")}
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex flex-col gap-4">
          {data.eintraege.map((e, i) => (
            <ContentCard
              key={i}
              datum={e.datum}
              datumFormatted={e.datumFormatted}
              titel={e.titel}
              inhalt={e.inhalt}
            />
          ))}
        </div>
      </section>
    </>
  );
}
