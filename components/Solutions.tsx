import { loadContent } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Leaf, BarChart3 } from "lucide-react";

interface Solution {
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  "shield-check": <ShieldCheck className="h-6 w-6" />,
  leaf: <Leaf className="h-6 w-6" />,
  "bar-chart-3": <BarChart3 className="h-6 w-6" />,
};

export default function Solutions({
  locale,
  title,
  subtitle,
}: {
  locale: string;
  title: string;
  subtitle: string;
}) {
  const { solutions } = loadContent<{ solutions: Solution[] }>("solutions", locale as "en" | "es" | "fr");

  return (
    <section id="solutions" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        <p className="mb-12 text-lg text-muted-foreground">{subtitle}</p>

        <div className="grid gap-6 md:grid-cols-3">
          {solutions.map((s) => (
            <Card key={s.title}>
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {iconMap[s.icon]}
                </div>
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
