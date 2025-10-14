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
    name: site.name,
    url: site.url,
    logo: site.logo,
    telephone: site.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: 'Torrevieja',
      addressRegion: 'Alicante',
      postalCode: '03181',
      addressCountry: 'ES',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phoneE164,
      contactType: 'customer service',
      areaServed: 'ES',
      availableLanguage: ['en', 'es', 'pl'],
    },
    openingHours: 'Mo-Su 00:00-23:59',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
