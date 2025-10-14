import { MetadataRoute } from 'next'
import { i18n } from '@/i18n-config'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // IMPORTANT: Replace with your actual domain before deploying.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com';

  const routes = i18n.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: locale === i18n.defaultLocale ? 1.0 : 0.8,
  }));
 
  return routes;
}
