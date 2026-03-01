import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ContactCTA({
  title,
  subtitle,
  ctaText,
  emailText,
}: {
  title: string;
  subtitle: string;
  ctaText: string;
  emailText: string;
}) {
  return (
    <section id="contact" className="section-padding">
      <div className="glass-gold mx-auto max-w-2xl p-10 text-center">
        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        <p className="mb-10 text-lg text-muted-foreground">{subtitle}</p>

        <Button asChild size="lg" className="gap-2 rounded-xl px-8 py-6 text-base">
          <a href="mailto:info@yapu.solutions">
            {ctaText}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>

        <p className="mt-4 text-sm text-muted-foreground">{emailText}</p>
      </div>
    </section>
  );
}
