import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';
import { LanguageSwitcher } from '@/components/language-switcher';
import type { Locale } from '@/i18n-config';

type Dictionary = {
  site: { name: string };
  header: { nav: { [key: string]: string }, a11y: string };
  langSwitcher: { select: string, [key: string]: string };
}

export default function Header({ dictionary, lang }: { dictionary: Dictionary, lang: Locale }) {
  const navItems = [
    { href: '#features', label: dictionary.header.nav.features },
    { href: '#hours', label: dictionary.header.nav.hours },
    { href: '#gallery', label: dictionary.header.nav.gallery },
    { href: '#contact', label: dictionary.header.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href={`/${lang}`} className="mr-6 flex items-center space-x-2">
          <LockKeyhole className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">
            {dictionary.site.name}
          </span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm" aria-label={dictionary.header.a11y}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <LanguageSwitcher lang={lang} dictionary={dictionary.langSwitcher} />
        </div>
      </div>
    </header>
  );
}
