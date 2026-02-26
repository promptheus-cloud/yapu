import { loadContent } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Reference {
  title: string;
  subtitle: string;
  description: string;
}

interface ImpactData {
  references: {
    title: string;
    projects: Reference[];
  };
}

export default function ImpactReferences({
  locale,
  title,
}: {
  locale: string;
  title: string;
}) {
  const data = loadContent<ImpactData>(
    "impact-page",
    locale as "en" | "es" | "fr"
  );
  const projects = data.references.projects;

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-3xl font-bold">{title}</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.title}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <p className="text-sm font-medium text-primary">
                  {project.subtitle}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
