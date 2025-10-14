import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // IMPORTANT: Replace with your actual domain before deploying.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.your-domain.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
