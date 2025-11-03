import { MetadataRoute } from 'next'
import { i18n } from '@/i18n-config'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // IMPORTANT: Replace with your actual domain before deploying.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cerrajero24torrevieja.com';

  const staticPages = [
    '',
    'aviso-legal',
    'cookies-policy',
    'descargo-de-responsabilidad',
    'politica-de-privacidad',
  ];

  const routes: MetadataRoute.Sitemap = [];

  // Agregar todas las páginas para cada idioma
  for (const locale of i18n.locales) {
    for (const page of staticPages) {
      routes.push({
        url: `${siteUrl}/${locale}${page ? `/${page}` : ''}`,
        lastModified: new Date(),
        changeFrequency: locale === i18n.defaultLocale && page === '' ? 'weekly' : 'monthly',
        priority: locale === i18n.defaultLocale && page === '' ? 1.0 : page === '' ? 0.9 : 0.5,
      });
    }
  }
 
  return routes;
}
