type Dictionary = {
  site: {
    name: string;
    url: string;
    logo: string;
    phoneE164: string;
    address: string;
  };
};

export default function JsonLd({ dictionary }: { dictionary: Dictionary }) {
  const { site } = dictionary;
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Locksmith',
    '@id': `${site.url}#organization`,
    name: site.name,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: `${site.url}${site.logo}`,
    },
    telephone: site.phoneE164,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: 'Torrevieja',
      addressRegion: 'Alicante',
      postalCode: '03181',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.9792,
      longitude: -0.6823,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phoneE164,
      contactType: 'customer service',
      areaServed: ['ES', 'Torrevieja', 'Alicante'],
      availableLanguage: ['en', 'es', 'pl'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 37.9792,
        longitude: -0.6823,
      },
      geoRadius: {
        '@type': 'Distance',
        name: 'Torrevieja y alrededores',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Cerrajería',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Apertura de puertas urgente',
            description: 'Servicio de apertura de puertas 24 horas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cambio de cerraduras',
            description: 'Instalación y cambio de cerraduras',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cerrajería de coches',
            description: 'Apertura de vehículos sin daños',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
