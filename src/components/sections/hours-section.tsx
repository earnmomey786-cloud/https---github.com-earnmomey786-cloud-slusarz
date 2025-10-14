import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

type Dictionary = {
  site: { address: string };
  hours: {
    title: string;
    addressTitle: string;
    emergency: string;
  };
};

export function HoursSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="hours" className="py-16 md:py-24 bg-card">
      <div className="container grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.hours.title}
          </h2>
          <p className="mt-4 text-9xl font-bold text-primary">24/7</p>
          <p className="mt-4 text-lg text-muted-foreground">{dictionary.hours.emergency}</p>
        </div>
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                {dictionary.hours.addressTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">{dictionary.site.address}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
