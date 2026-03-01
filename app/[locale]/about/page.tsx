import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadContent } from "@/lib/content";
import TeamGrid from "@/components/TeamGrid";
import SDGList from "@/components/SDGList";
import ContactCTA from "@/components/ContactCTA";

interface AboutData {
  origin: { title: string; text: string };
  mission: { title: string; text: string };
  team: { title: string };
  sdgs: { title: string };
  partnership: { text: string };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as "en" | "es" | "fr");
  const t = await getTranslations("aboutPage");
  const tHome = await getTranslations("home");
  const data = loadContent<AboutData>(
    "about",
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

      {/* ── Origin Story ── */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">{data.origin.title}</h2>
          <div className="space-y-4">
            {data.origin.text.split("\n\n").map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <div className="bg-muted/30">
        <TeamGrid locale={locale} title={data.team.title} />

        {/* ── Offices ── */}
        <section className="section-padding pt-0">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm">
                <div className="mb-2 text-2xl font-bold text-primary">HQ</div>
                <h3 className="text-lg font-semibold">{tHome("aboutBerlin")}</h3>
              </div>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm">
                <div className="mb-2 text-2xl font-bold text-primary">LATAM</div>
                <h3 className="text-lg font-semibold">{tHome("aboutQuito")}</h3>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Mission ── */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">{data.mission.title}</h2>
          <div className="space-y-4">
            {data.mission.text.split("\n\n").map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDGs ── */}
      <SDGList locale={locale} title={data.sdgs.title} />

      {/* ── Partnership ── */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-lg leading-relaxed text-muted-foreground italic">
            {data.partnership.text}
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
