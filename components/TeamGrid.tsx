import { loadContent } from "@/lib/content";
import { User } from "lucide-react";

interface AboutData {
  team: {
    title: string;
    members: string[];
  };
}

export default function TeamGrid({
  locale,
  title,
}: {
  locale: string;
  title: string;
}) {
  const data = loadContent<AboutData>("about", locale as "en" | "es" | "fr");
  const members = data.team.members;

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-3xl font-bold">{title}</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {members.map((name) => (
            <div key={name} className="flex flex-col items-center gap-3 rounded-xl p-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-7 w-7" />
              </div>
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
