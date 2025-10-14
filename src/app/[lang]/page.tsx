import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { MapSection } from '@/components/sections/map-section';
import { ContactSection } from '@/components/sections/contact-section';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <HeroSection dictionary={dictionary} />
      <FeaturesSection dictionary={dictionary} />
      <TestimonialsSection dictionary={dictionary} />
      <MapSection dictionary={dictionary} />
      <ContactSection dictionary={dictionary} />
    </>
  );
}
