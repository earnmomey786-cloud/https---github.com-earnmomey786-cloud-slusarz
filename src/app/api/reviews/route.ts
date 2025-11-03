import { NextResponse } from 'next/server';

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  original_text?: string;
  profile_photo_url?: string;
  relative_time_description: string;
  language?: string;
  original_language?: string;
  translated?: boolean;
  time?: number;
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured', reviews: [] },
      { status: 200 } // Retornamos 200 para que el frontend maneje el fallback
    );
  }

  try {
    // 1. Buscar el place_id
    const searchResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=cerrajero24torrevieja+Torrevieja+Alicante&key=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache por 1 hora
    );

    if (!searchResponse.ok) {
      throw new Error(`Google Places API error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    
    if (searchData.status !== 'OK' || !searchData.results || searchData.results.length === 0) {
      return NextResponse.json({ reviews: [] });
    }

    const placeId = searchData.results[0].place_id;

    // 2. Obtener reseñas base
    const detailsResponseBase = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    if (!detailsResponseBase.ok) {
      throw new Error(`Google Places Details API error: ${detailsResponseBase.status}`);
    }

    const detailsDataBase = await detailsResponseBase.json();
    
    if (detailsDataBase.status !== 'OK' || !detailsDataBase.result?.reviews) {
      return NextResponse.json({ reviews: [] });
    }

    const baseReviews: GoogleReview[] = detailsDataBase.result.reviews;

    // 3. Obtener idiomas originales
    const originalLangs = Array.from(
      new Set(baseReviews.map((r) => r.original_language).filter(Boolean))
    );

    // 4. Obtener reseñas por idioma
    const langResponses: Record<string, GoogleReview[]> = {};
    
    for (const lang of originalLangs) {
      try {
        const resp = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=${lang}`,
          { next: { revalidate: 3600 } }
        );
        
        if (resp.ok) {
          const data = await resp.json();
          if (data.status === 'OK' && data.result?.reviews) {
            langResponses[lang] = data.result.reviews;
          }
        }
      } catch (e) {
        console.error(`Error fetching reviews for lang ${lang}:`, e);
      }
    }

    // 5. Procesar reseñas para obtener textos originales
    const processedReviews = baseReviews.map((r) => {
      const origLang = r.original_language || r.language || null;
      let originalText = r.text;

      if (origLang && langResponses[origLang]) {
        const candidates = langResponses[origLang].filter(
          (lr) => lr.author_name === r.author_name && lr.time === r.time
        );
        
        if (candidates.length > 0) {
          const preferred = candidates.find(
            (c) => c.translated === false || c.language === c.original_language
          ) || candidates[0];
          
          if (preferred?.text) {
            originalText = preferred.text;
          }
        }
      }

      return {
        author_name: r.author_name,
        rating: r.rating,
        text: originalText,
        profile_photo_url: r.profile_photo_url,
        relative_time_description: r.relative_time_description,
        language: origLang || r.language,
      };
    });

    // 6. Eliminar duplicados (usar author_name + relative_time_description como clave única)
    const uniqueReviews = Object.values(
      processedReviews.reduce((acc, r) => {
        const key = `${r.author_name}_${r.relative_time_description || 'unknown'}`;
        if (!acc[key]) {
          acc[key] = r;
        }
        return acc;
      }, {} as Record<string, typeof processedReviews[0]>)
    );

    return NextResponse.json(
      { reviews: uniqueReviews },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews', reviews: [] },
      { status: 200 } // 200 para que el frontend maneje el fallback
    );
  }
}

