import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

type Dictionary = {
  site: { phoneE164: string };
  contact: { title: string; description: string; phone: string; cta: string };
};

export function ContactSection({ dictionary }: { dictionary: Dictionary }) {
  const whatsappUrl = `https://wa.me/${dictionary.site.phoneE164}?text=${encodeURIComponent(`Hello, I'm interested in your locksmith services.`)}`;
  const telUrl = `tel:${dictionary.site.phoneE164}`;

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          {dictionary.contact.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {dictionary.contact.description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-primary/90">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Phone className="mr-2 h-5 w-5" />
              {dictionary.contact.cta}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={telUrl}>
              <Phone className="mr-2 h-5 w-5" />
              {dictionary.contact.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
