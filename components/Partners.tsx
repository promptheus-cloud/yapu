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
  clientsLabel,
}: {
  title: string;
  clientsLabel: string;
}) {
  const data = loadSharedContent<PartnersData>("partners");

  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold">{title}</h2>

        {data.tiers.map((tier) => (
          <div key={tier.label} className="mb-8">
            <h3 className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {tier.label}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {tier.partners.map((name) => (
                <span
                  key={name}
                  className="text-sm font-semibold text-foreground/70"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {clientsLabel}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {data.clients.map((name) => (
            <span
              key={name}
              className="text-xs text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
