import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

type Dictionary = {
  site: { phoneE164: string };
  hero: { 
    title: string; 
    subtitle: string; 
    rotatingWords: string[];
    cta: string;
  };
};

export function HeroSection({ dictionary }: { dictionary: Dictionary }) {
  const whatsappUrl = `https://wa.me/${dictionary.site.phoneE164}?text=${encodeURIComponent(`Hello, I'm interested in your locksmith services.`)}`;

  return (
    <section className="py-24 md:py-32">
      <div className="container grid items-center gap-8 md:grid-cols-2">
        <div className="flex h-full min-h-[300px] items-center justify-center">
          <img
            src="/superheroe.gif"
            alt="Superhéroe"
            className="max-w-full max-h-full border-4 border-blue-200 rounded-lg"
          />
        </div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {dictionary.hero.title}
          </h1>
          <div className="mt-4 max-w-2xl text-xl md:text-2xl">
            <div className="rotating-text-container">
              <span className="text-muted-foreground">{dictionary.hero.subtitle} </span>
              <div className="rotating-words">
                {dictionary.hero.rotatingWords.map((word, index) => (
                  <span key={index} className="rotating-word">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" />
                {dictionary.hero.cta}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
