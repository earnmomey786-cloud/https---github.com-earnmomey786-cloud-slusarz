import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { HeroSection } from '@/components/sections/hero-section';
import { InfoSection } from '@/components/sections/info-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <HeroSection dictionary={dictionary} />
      <InfoSection dictionary={dictionary} />
      <FeaturesSection dictionary={dictionary} />
      <TestimonialsSection dictionary={dictionary} />
      <ContactSection dictionary={dictionary} />
    </>
  );
}
