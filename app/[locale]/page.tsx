import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { loadContent } from "@/lib/content";
import ImpactNumbers from "@/components/ImpactNumbers";
import Solutions from "@/components/Solutions";
import Partners from "@/components/Partners";
import HowItWorks from "@/components/HowItWorks";
import Testimonial from "@/components/Testimonial";
import ContactCTA from "@/components/ContactCTA";

interface AboutData {
  team: { members: string[] };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const aboutData = loadContent<AboutData>("about", locale as "en" | "es" | "fr");

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-yapu px-6">
        <div className="relative z-10 mx-auto max-w-[800px] text-center">
          <div className="hero-yapu-badge mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/80">
            <span className="hero-badge-dot h-2 w-2 rounded-full bg-white/60" />
            {t("heroBadge")}
          </div>

          <h1 className="hero-yapu-title text-5xl font-bold leading-tight tracking-tight whitespace-pre-line md:text-7xl">
            {t("heroTitle")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 md:text-xl">
            {t("heroSubtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2 rounded-xl px-8 py-6 text-base">
              <a href="#contact">
                {t("heroCta")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 rounded-xl border-white/20 bg-white/5 px-8 py-6 text-base text-white hover:bg-white/10"
            >
              <a href="#solutions">
                {t("heroSecondaryCta")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Impact Numbers ── */}
      <ImpactNumbers locale={locale} title={t("impactTitle")} />

      {/* ── Solutions ── */}
      <Solutions
        locale={locale}
        title={t("solutionsTitle")}
        subtitle={t("solutionsSubtitle")}
      />

      {/* ── Partners ── */}
      <Partners
        title={t("partnersTitle")}
        clientsLabel={t("partnersClients")}
      />

      {/* ── How It Works ── */}
      <HowItWorks
        locale={locale}
        title={t("howTitle")}
        subtitle={t("howSubtitle")}
      />

      {/* ── Testimonial ── */}
      <Testimonial locale={locale} sectionTitle={t("testimonialTitle")} />

      {/* ── About / Team ── */}
      <section id="about" className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">{t("aboutTitle")}</h2>
          <p className="mb-8 text-lg text-muted-foreground">{t("aboutSubtitle")}</p>

          <div className="mb-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <div className="mb-2 text-2xl font-bold text-primary">HQ</div>
              <h3 className="text-lg font-semibold">{t("aboutBerlin")}</h3>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <div className="mb-2 text-2xl font-bold text-primary">LATAM</div>
              <h3 className="text-lg font-semibold">{t("aboutQuito")}</h3>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {aboutData.team.members.map((name) => (
              <span
                key={name}
                className="rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-sm"
              >
                {name}
              </span>
            ))}
          </div>

          <Button asChild variant="outline" className="gap-2">
            <Link href="/about">
              Learn more about us <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── CTA / Contact ── */}
      <ContactCTA
        title={t("contactTitle")}
        subtitle={t("contactSubtitle")}
        ctaText={t("contactCta")}
        emailText={t("contactEmail")}
      />
    </>
  );
}
