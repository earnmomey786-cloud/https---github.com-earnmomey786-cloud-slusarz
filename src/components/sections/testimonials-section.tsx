import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    return null;
  }

  try {
    // First, search for the place to get place_id
    const searchResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=cerrajero%2024h%20torrevieja&key=${apiKey}`
    );
    const searchData = await searchResponse.json();

    if (searchData.results && searchData.results.length > 0) {
      const placeId = searchData.results[0].place_id;

      // Then, get details with reviews
      const detailsResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=es`
      );
      const detailsData = await detailsResponse.json();

      if (detailsData.result?.reviews) {
        return detailsData.result.reviews.slice(0, 6); // Get first 6 reviews
      }
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
  }

  return null;
}

export async function TestimonialsSection({ dictionary }: { dictionary: Dictionary }) {
  const googleReviews = await getGoogleReviews();

  const reviews = googleReviews
    ? googleReviews.map((review: GoogleReview) => ({
        name: review.author_name,
        initials: review.author_name.split(' ').map(n => n[0]).join('').toUpperCase(),
        comment: review.text,
        rating: review.rating,
        photo: review.profile_photo_url,
      }))
    : dictionary.testimonials.reviews;

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.testimonials.title}
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-background border-border/60">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={review.photo || `https://i.pravatar.cc/40?u=${review.name}`} alt={review.name} />
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
              <CardContent>
                <p className="text-muted-foreground italic">&quot;{review.comment}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
