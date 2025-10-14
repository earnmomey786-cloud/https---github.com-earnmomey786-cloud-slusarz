'use client';

import { LockKeyhole } from 'lucide-react';

type Dictionary = {
  site: { name: string };
  footer: { rights: string };
}

export default function Footer({ dictionary }: { dictionary: Dictionary }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <LockKeyhole className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} {dictionary.site.name}. {dictionary.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
