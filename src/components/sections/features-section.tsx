import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Dictionary = {
  features: { title: string; list: string[] };
};

export function FeaturesSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.features.title}
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {dictionary.features.list.map((feature, index) => (
            <div key={index} className="relative">
              <Card 
                className={`bg-card border-border/60 ${index === 0 ? 'feature-card-glow' : ''}`}
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                  <CardTitle className="text-lg font-semibold">{feature.split(':')[0]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.split(':')[1]}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
