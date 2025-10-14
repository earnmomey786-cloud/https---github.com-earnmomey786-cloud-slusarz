import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import JsonLd from '@/components/json-ld';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  const { metadata, site } = dictionary;
  const baseUrl = site.url;

  const alternates: { canonical: string, languages: { [key: string]: string } } = {
    canonical: `${baseUrl}/${params.lang}`,
    languages: {},
  };

  for (const locale of i18n.locales) {
    alternates.languages[locale] = `${baseUrl}/${locale}`;
  }
  
  return {
    title: metadata.title,
    description: metadata.description,
    alternates,
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: `${baseUrl}/${params.lang}`,
      siteName: site.name,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      locale: params.lang,
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
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <>
      <JsonLd dictionary={dictionary} />
      <Header dictionary={dictionary} lang={params.lang} />
      <main>{children}</main>
      <Footer dictionary={dictionary} />
    </>
  );
}
