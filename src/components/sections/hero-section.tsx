import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

type Dictionary = {
  site: { phoneE164: string };
  hero: { title: string; subtitle: string; cta: string };
};

export function HeroSection({ dictionary }: { dictionary: Dictionary }) {
  const whatsappUrl = `https://wa.me/${dictionary.site.phoneE164}?text=${encodeURIComponent(`Hello, I'm interested in your locksmith services.`)}`;

  return (
    <section className="py-24 md:py-32">
      <div className="container grid items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col items-start text-left">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {dictionary.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {dictionary.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" />
                {dictionary.hero.cta}
              </a>
            </Button>
          </div>
        </div>
        <div className="flex h-full min-h-[300px] items-center justify-center">
          <img
            src="http://localhost:9002/superheroe.gif?v=1"
            alt="Superhéroe"
            className="max-w-full max-h-full border-4 border-blue-200 rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
