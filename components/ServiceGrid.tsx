import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Brain,
  CloudRain,
  HeartHandshake,
  Tags,
  Users,
  ShieldCheck,
  CloudLightning,
  Leaf,
  BarChart3,
  GraduationCap,
  Monitor,
  Scale,
  Plug,
  Lightbulb,
  GitBranch,
  Wifi,
  WifiOff,
  Target,
  MapPin,
  Lock,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "trending-up": <TrendingUp className="h-6 w-6" />,
  brain: <Brain className="h-6 w-6" />,
  "cloud-rain": <CloudRain className="h-6 w-6" />,
  "heart-handshake": <HeartHandshake className="h-6 w-6" />,
  tags: <Tags className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
  "shield-check": <ShieldCheck className="h-6 w-6" />,
  "cloud-lightning": <CloudLightning className="h-6 w-6" />,
  leaf: <Leaf className="h-6 w-6" />,
  "bar-chart-3": <BarChart3 className="h-6 w-6" />,
  "graduation-cap": <GraduationCap className="h-6 w-6" />,
  monitor: <Monitor className="h-6 w-6" />,
  scale: <Scale className="h-6 w-6" />,
  plug: <Plug className="h-6 w-6" />,
  lightbulb: <Lightbulb className="h-6 w-6" />,
  "git-branch": <GitBranch className="h-6 w-6" />,
  wifi: <Wifi className="h-6 w-6" />,
  "wifi-off": <WifiOff className="h-6 w-6" />,
  target: <Target className="h-6 w-6" />,
  "map-pin": <MapPin className="h-6 w-6" />,
  lock: <Lock className="h-6 w-6" />,
};

interface ServiceItem {
  title: string;
  description?: string;
  icon: string;
}

export default function ServiceGrid({
  items,
  title,
  subtitle,
  columns = 3,
}: {
  items: ServiceItem[];
  title: string;
  subtitle?: string;
  columns?: 2 | 3 | 6;
}) {
  const gridClass =
    columns === 6
      ? "grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
      : columns === 2
        ? "grid gap-6 md:grid-cols-2"
        : "grid gap-6 md:grid-cols-3";

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        {subtitle && (
          <p className="mb-12 text-lg text-muted-foreground">{subtitle}</p>
        )}

        <div className={gridClass}>
          {items.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {iconMap[item.icon]}
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              {item.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { iconMap };
