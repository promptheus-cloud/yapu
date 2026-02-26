import { loadContent } from "@/lib/content";
import { iconMap } from "@/components/ServiceGrid";
import { CheckCircle } from "lucide-react";

interface ToolSection {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

interface DigitalToolsData {
  sections: ToolSection[];
}

export default function DigitalToolsSections({
  locale,
}: {
  locale: string;
}) {
  const data = loadContent<DigitalToolsData>(
    "digital-tools",
    locale as "en" | "es" | "fr"
  );

  return (
    <div className="space-y-0">
      {data.sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={`section-padding ${i % 2 === 1 ? "bg-muted/30" : ""}`}
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-8 md:grid-cols-2">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {iconMap[section.icon]}
                </div>
                <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
                <p className="text-muted-foreground">{section.description}</p>
              </div>

              <div className="space-y-3">
                {section.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-3"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
