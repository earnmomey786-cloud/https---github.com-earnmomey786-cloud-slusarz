'use client';

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

type Dictionary = {
  map: { title: string; description: string };
};

export function MapSection({ dictionary }: { dictionary: Dictionary }) {
  const position = { lat: 37.9792, lng: -0.6823 }; // Torrevieja coordinates
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <section id="map" className="py-16 md:py-24 bg-card">
        <div className="container text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">{dictionary.map.title}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{dictionary.map.description}</p>
          <div className="mt-8 bg-background rounded-lg p-8">
            <p className="text-destructive">
              Google Maps API key is not configured. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="map" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.map.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {dictionary.map.description}
          </p>
        </div>
        <div className="aspect-video w-full rounded-lg overflow-hidden">
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={position}
              defaultZoom={12}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              mapId={'locksmith-map'}
            >
              <Marker position={position} />
            </Map>
          </APIProvider>
        </div>
      </div>
    </section>
  );
}
