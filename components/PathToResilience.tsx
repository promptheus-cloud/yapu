import { loadContent } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stage {
  name: string;
  subtitle: string;
  description: string;
}

interface PathData {
  pathToResilience: {
    title: string;
    description: string;
    stages: Stage[];
  };
}

export default function PathToResilience({
  locale,
  title,
}: {
  locale: string;
  title: string;
}) {
  const data = loadContent<PathData>(
    "investor-services",
    locale as "en" | "es" | "fr"
  );
  const path = data.pathToResilience;

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        <p className="mb-12 text-lg text-muted-foreground">
          {path.description}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {path.stages.map((stage, i) => (
            <Card key={stage.name} className="relative overflow-hidden">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary/30 via-primary to-primary/30" style={{ opacity: (i + 1) / 3 }} />
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <CardTitle>{stage.name}</CardTitle>
                <p className="text-sm font-medium text-primary">
                  {stage.subtitle}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {stage.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
