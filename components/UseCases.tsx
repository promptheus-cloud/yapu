import { loadContent } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UseCase {
  title: string;
  description: string;
  social: number;
  environmental: number;
  sdgs: number[];
}

interface UseCaseData {
  useCases: {
    cases: UseCase[];
  };
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-primary transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function UseCases({
  locale,
  title,
}: {
  locale: string;
  title: string;
}) {
  const data = loadContent<UseCaseData>(
    "investor-services",
    locale as "en" | "es" | "fr"
  );
  const cases = data.useCases.cases;

  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-3xl font-bold">{title}</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((uc) => (
            <Card key={uc.title}>
              <CardHeader>
                <CardTitle>{uc.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {uc.description}
                </p>

                <div className="space-y-3">
                  <ProgressBar label="Social" value={uc.social} />
                  <ProgressBar
                    label="Environmental"
                    value={uc.environmental}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {uc.sdgs.map((sdg) => (
                    <span
                      key={sdg}
                      className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      SDG {sdg}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
