import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import JsonLd from '@/components/json-ld';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { metadata, site } = dictionary;
  const baseUrl = site.url;

  const alternates: { canonical: string, languages: { [key: string]: string } } = {
    canonical: `${baseUrl}/${lang}`,
    languages: {},
  };

  for (const locale of i18n.locales) {
    alternates.languages[locale] = `${baseUrl}/${locale}`;
  }
  
  return {
    title: metadata.title,
    description: metadata.description,
    alternates,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icono.png', type: 'image/png', sizes: '192x192' },
      ],
      shortcut: '/favicon.ico',
      apple: '/icono.png',
    },
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: `${baseUrl}/${lang}`,
      siteName: site.name,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      images: [`${baseUrl}/og-image.jpg`],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const whatsappUrl = `https://wa.me/${dictionary.site.phoneE164}?text=${encodeURIComponent(`Hello, I'm interested in your locksmith services.`)}`;

  return (
    <>
      <JsonLd dictionary={dictionary} />
      <Header dictionary={dictionary} lang={lang} />
      <main>{children}</main>
      <Footer dictionary={dictionary} />
      <div className="fixed bottom-4 right-4 z-50 group">
        <Button asChild className="bg-green-500 hover:bg-green-600 text-white rounded-full p-8 shadow-lg animate-pulse">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Contact via WhatsApp - Al contactar aceptas nuestra Política de Privacidad" title="Al contactar por WhatsApp, aceptas nuestra Política de Privacidad">
            <Phone className="h-10 w-10" />
          </a>
        </Button>
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Al contactar por WhatsApp, aceptas nuestra Política de Privacidad
        </div>
      </div>
    </>
  );
}
