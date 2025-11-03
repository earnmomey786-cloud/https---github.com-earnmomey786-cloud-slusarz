import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type Review = {
  name: string;
  initials: string;
  comment: string;
  rating?: number;
  photo?: string;
};

type Dictionary = {
  testimonials: {
    title: string;
    reviews: {
      name: string;
      initials: string;
      comment: string;
    }[];
  };
};

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  original_text?: string;
  profile_photo_url?: string;
  relative_time_description: string;
};

async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.log('No API key');
    return null;
  }
  try {
    // 1. Buscar el place_id
    const searchResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=cerrajero24torrevieja+Torrevieja+Alicante&key=${apiKey}`
    );
    const searchData = await searchResponse.json();
    if (!searchData.results || searchData.results.length === 0) {
      return null;
    }
    const placeId = searchData.results[0].place_id;
    // 2. Pedir reseñas en varios idiomas
    // Primero, obtener las reseñas base para leer original_language y metadatos (author_name, time)
    const detailsResponseBase = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );
    const detailsDataBase = await detailsResponseBase.json();
    if (!detailsDataBase.result?.reviews) return null;
    const baseReviews: any[] = detailsDataBase.result.reviews;
    // Debug: volcar estructura completa de reseñas base (sólo en server.log)
    try {
      console.log('Base reviews raw JSON:', JSON.stringify(baseReviews, null, 2));
    } catch (e) {
      console.log('Could not stringify baseReviews', e);
    }
    // Obtener todos los idiomas originales presentes
    const originalLangs = Array.from(new Set(baseReviews.map((r: any) => r.original_language).filter(Boolean)));

    // Para cada idioma original, pedir la versión en ese idioma y mapear por author_name+time
    const langResponses: Record<string, any[]> = {};
    for (const lang of originalLangs) {
      try {
        const resp = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=${lang}`
        );
        const data = await resp.json();
        if (data.result?.reviews) {
          langResponses[lang] = data.result.reviews;
        } else {
          langResponses[lang] = [];
        }
      } catch (e) {
        console.error('Error fetching reviews for lang', lang, e);
        langResponses[lang] = [];
      }
    }

    // Debug: log summary of per-language responses so we can inspect if Google returned original texts
    try {
      console.log('Lang responses keys:', Object.keys(langResponses));
      for (const l of Object.keys(langResponses)) {
        const summary = (langResponses[l] || []).map((rv: any) => ({
          author_name: rv.author_name,
          time: rv.time,
          language: rv.language,
          original_language: rv.original_language,
          translated: rv.translated,
          text_preview: typeof rv.text === 'string' ? rv.text.slice(0, 120) : undefined,
        }));
        console.log(`langResponses[${l}] summary:`, JSON.stringify(summary, null, 2));
      }
    } catch (e) {
      console.log('Could not stringify langResponses', e);
    }

    // Ahora, por cada review base, intentar encontrar su texto original en la respuesta del idioma original
    const originals = baseReviews.map((r: any) => {
      const origLang = r.original_language || r.language || null;
      let originalText = r.text;
      let fetchedLanguage: string | undefined = undefined;
      if (origLang && langResponses[origLang]) {
        const candidates = langResponses[origLang].filter((lr: any) => lr.author_name === r.author_name && lr.time === r.time);
        if (candidates.length > 0) {
          // Prefer a candidate that is not marked as translated or explicitly matches the original_language
          let preferred = candidates.find((c: any) => c.translated === false || c.language === c.original_language) || candidates[0];
          if (preferred && preferred.text) {
            originalText = preferred.text;
            fetchedLanguage = origLang;
            // Log when we replaced the base text with a per-language fetch result
            console.log(`Replaced text for ${r.author_name} (time=${r.time}) with text from lang ${origLang}; translated=${preferred.translated}`);
          }
        }
      }
      return {
        ...r,
        text: originalText,
        language: origLang || r.language,
        _fetched_language: fetchedLanguage,
      };
    });

    // Unificar por author_name + time (para evitar duplicados)
    const uniqueOriginals = Object.values(
      originals.reduce((acc, r) => {
        const key = r.author_name + '_' + r.time;
        if (!acc[key]) acc[key] = r;
        return acc;
      }, {} as Record<string, any>)
    );
    return uniqueOriginals;
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
  }
  return null;
}

export async function TestimonialsSection({ dictionary }: { dictionary: Dictionary }) {
  const googleReviews = await getGoogleReviews();

  // Convertir reseñas de Google a formato Review
  const googleReviewsFormatted: Review[] = googleReviews
    ? googleReviews.map((review: any) => {
        return {
          name: review.author_name,
          initials: review.author_name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
          comment: review.text || '',
          rating: review.rating || 5,
          photo: review.profile_photo_url,
        };
      })
    : [];

  // Convertir reseñas estáticas del diccionario a formato Review
  const staticReviews: Review[] = dictionary.testimonials.reviews.map((review) => ({
    ...review,
    rating: 5,
  }));

  // Combinar ambas listas, poniendo primero las de Google y luego las estáticas
  // Usar un Set para evitar duplicados basados en el nombre
  const allReviews: Review[] = [...googleReviewsFormatted];
  const existingNames = new Set(googleReviewsFormatted.map(r => r.name.toLowerCase()));
  
  // Agregar reseñas estáticas que no estén duplicadas
  for (const staticReview of staticReviews) {
    if (!existingNames.has(staticReview.name.toLowerCase())) {
      allReviews.push(staticReview);
      existingNames.add(staticReview.name.toLowerCase());
    }
  }

  const reviews: Review[] = allReviews;

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.testimonials.title}
          </h2>
        </div>
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {reviews.map((review: Review, index: number) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
                <div className="testimonial-card-container">
                  <Card className="bg-background border-border/60 testimonial-card-3d">
                    <CardHeader>
                      <div className="flex items-center gap-4 card-content-3d">
                        <Avatar>
                          <AvatarImage src={review.photo || `https://i.pravatar.cc/40?u=${review.name}`} alt={review.name} />
                          <AvatarFallback>{review.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg font-semibold">{review.name}</CardTitle>
                          <div className="flex text-primary gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < (review.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="card-content-3d">
                      <p className="text-muted-foreground italic">&quot;{review.comment}&quot;</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:-left-12" />
          <CarouselNext className="right-2 md:-right-12" />
        </Carousel>
      </div>
    </section>
  );
}
