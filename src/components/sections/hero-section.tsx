import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Phone } from 'lucide-react';

type Dictionary = {
  site: { phoneE164: string };
  hero: { title: string; subtitle: string; cta: string };
};

export function HeroSection({ dictionary }: { dictionary: Dictionary }) {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');
  const whatsappUrl = `https://wa.me/${dictionary.site.phoneE164}?text=${encodeURIComponent(`Hello, I'm interested in your locksmith services.`)}`;

  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative container z-10 flex flex-col items-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {dictionary.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300 md:text-xl">
          {dictionary.hero.subtitle}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Phone className="mr-2 h-5 w-5" />
              {dictionary.hero.cta}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
