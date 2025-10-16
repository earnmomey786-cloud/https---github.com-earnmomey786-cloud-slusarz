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
    // First, search for the place to get the current place_id
    console.log('Searching for place: Cerrajero24 Torrevieja');
    const searchResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Cerrajero24%20Torrevieja&key=${apiKey}&language=es`
    );
    const searchData = await searchResponse.json();
    console.log('Search response:', searchData);

    if (!searchData.results || searchData.results.length === 0) {
      console.log('No places found');
      return null;
    }

    const placeId = searchData.results[0].place_id;
    console.log('Found place_id:', placeId);

    // Now fetch reviews using the place_id
    console.log('Fetching reviews for place_id:', placeId);
    const detailsResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=es`
    );
    const detailsData = await detailsResponse.json();
    console.log('Details response:', detailsData);

    if (detailsData.result?.reviews) {
      console.log('Found reviews:', detailsData.result.reviews.length);
      return detailsData.result.reviews;
    } else {
      console.log('No reviews found');
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
  }

  return null;
}

export async function TestimonialsSection({ dictionary }: { dictionary: Dictionary }) {
  const googleReviews = await getGoogleReviews();

  const reviews: Review[] = googleReviews
    ? googleReviews.map((review: GoogleReview) => {
        console.log('Profile photo URL:', review.profile_photo_url);
        return {
          name: review.author_name,
          initials: review.author_name.split(' ').map(n => n[0]).join('').toUpperCase(),
          comment: review.text,
          rating: review.rating,
          photo: review.profile_photo_url,
        };
      })
    : dictionary.testimonials.reviews;

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
                          <AvatarImage src={`https://i.pravatar.cc/40?u=${review.name}`} alt={review.name} />
                          <AvatarFallback>{review.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg font-semibold">{review.name}</CardTitle>
                          <div className="flex text-primary">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-5 w-5 ${i < (review.rating || 5) ? 'fill-current' : ''}`} />
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
