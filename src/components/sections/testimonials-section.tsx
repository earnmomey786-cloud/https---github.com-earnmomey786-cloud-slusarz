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
  try {
    // Usar la API route para obtener las reseñas
    // En Server Components de Next.js, podemos hacer fetch a rutas relativas o absolutas
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
    
    // Construir URL de la API
    const apiUrl = baseUrl.startsWith('http') 
      ? `${baseUrl}/api/reviews`
      : `http://localhost:9002/api/reviews`;
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache por 1 hora en el servidor
      cache: 'default',
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching reviews from API:', response.status, response.statusText);
      }
      return null;
    }

    const data = await response.json();
    return data.reviews || null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching reviews from API:', error);
    }
    return null;
  }
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

  // GARANTIZAR que siempre haya reseñas (si todo falla, mostrar al menos las estáticas)
  const reviews: Review[] = allReviews.length > 0 ? allReviews : staticReviews;

  // DEBUG: Log para ver qué está pasando (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Testimonials Debug:', {
      googleReviewsCount: googleReviews?.length || 0,
      staticReviewsCount: staticReviews.length,
      allReviewsCount: allReviews.length,
      finalReviewsCount: reviews.length,
      hasGoogleReviews: !!googleReviews,
      reviews: reviews.map(r => ({ name: r.name, commentLength: r.comment?.length || 0 }))
    });
  }

  // Filtrar reseñas inválidas y asegurar que siempre haya contenido
  const validReviews = reviews.filter(review => review && review.name && review.comment && review.comment.trim().length > 0);
  const finalReviews = validReviews.length > 0 ? validReviews : staticReviews;

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.testimonials.title}
          </h2>
        </div>
        {finalReviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando reseñas...</p>
          </div>
        ) : (
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {finalReviews.map((review: Review, index: number) => (
                <CarouselItem key={`review-${review.name}-${index}`} className="basis-full sm:basis-1/2 md:basis-1/3">
                  <div className="testimonial-card-container">
                    <Card className="bg-background border-border/60 testimonial-card-3d">
                      <CardHeader>
                        <div className="flex items-center gap-4 card-content-3d">
                          <Avatar>
                            <AvatarImage src={review.photo || `https://i.pravatar.cc/40?u=${review.name}`} alt={review.name} />
                            <AvatarFallback>{review.initials || review.name.substring(0, 2).toUpperCase()}</AvatarFallback>
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
        )}
      </div>
    </section>
  );
}
