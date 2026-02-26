import { loadContent } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { iconMap } from "@/components/ServiceGrid";
import { CheckCircle } from "lucide-react";

interface Section {
  id: string;
  title: string;
  description: string;
  capabilities?: string[];
  benefits?: string[];
  metrics?: string[];
  highlight?: { title: string; text: string };
  services?: { title: string; description: string }[];
  icon: string;
}

interface DataInsightsData {
  sections: Section[];
}

export default function DataInsightsSections({
  locale,
}: {
  locale: string;
}) {
  const data = loadContent<DataInsightsData>(
    "data-insights",
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
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {iconMap[section.icon]}
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
                <p className="mb-6 text-muted-foreground">
                  {section.description}
                </p>
              </div>
            </div>

            {section.capabilities && (
              <div className="mt-6">
                <ul className="space-y-2">
                  {section.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.metrics && (
              <div className="mt-6">
                <ul className="space-y-2">
                  {section.metrics.map((metric) => (
                    <li
                      key={metric}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.benefits && (
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {section.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.highlight && (
              <Card className="mt-6 border-primary/30">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {section.highlight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {section.highlight.text}
                  </p>
                </CardContent>
              </Card>
            )}

            {section.services && (
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {section.services.map((service) => (
                  <Card key={service.title}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
