import { loadSharedContent } from "@/lib/content";

interface PartnerTier {
  label: string;
  partners: string[];
}

interface PartnersData {
  tiers: PartnerTier[];
  clients: string[];
}

export default function Partners({
  title,
  clientsTitle,
  clientsLabel,
}: {
  title: string;
  clientsTitle: string;
  clientsLabel: string;
}) {
  const data = loadSharedContent<PartnersData>("partners");

  return (
    <>
      {/* Trusted By — white background, logo-style badges */}
      <section className="section-padding bg-white dark:bg-background">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {title}
          </h2>

          {data.tiers.map((tier, i) => (
            <div key={tier.label} className="mb-12">
              <h3 className="mb-6 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                {tier.label}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                {tier.partners.map((name) => (
                  <span
                    key={name}
                    className={`font-bold tracking-wide transition-colors hover:text-foreground/80 ${
                      i === 0
                        ? "text-lg text-foreground/55"
                        : "text-sm text-foreground/40"
                    }`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Clients — teal background */}
      <section className="clients-section py-16 px-6">
        <div className="mx-auto max-w-6xl text-center">
          <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-white/60">
            {clientsTitle}
          </h3>
          <p className="mb-8 text-sm text-white/50">
            {clientsLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {data.clients.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold text-white/70 transition-colors hover:text-white/90"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
