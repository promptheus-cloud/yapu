import { loadContent } from "@/lib/content";

interface SDG {
  number: number;
  title: string;
  description: string;
}

interface AboutData {
  sdgs: {
    title: string;
    goals: SDG[];
  };
}

const sdgColors: Record<number, string> = {
  1: "bg-red-500",
  2: "bg-amber-600",
  5: "bg-orange-500",
  7: "bg-yellow-500",
  8: "bg-rose-700",
  10: "bg-pink-600",
  11: "bg-amber-500",
  12: "bg-amber-700",
  13: "bg-green-700",
  15: "bg-lime-600",
};

export default function SDGList({
  locale,
  title,
}: {
  locale: string;
  title: string;
}) {
  const data = loadContent<AboutData>("about", locale as "en" | "es" | "fr");
  const goals = data.sdgs.goals;

  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-3xl font-bold">{title}</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((sdg) => (
            <div
              key={sdg.number}
              className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4"
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${sdgColors[sdg.number] || "bg-primary"}`}
              >
                {sdg.number}
              </div>
              <div>
                <h3 className="font-semibold">{sdg.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {sdg.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
