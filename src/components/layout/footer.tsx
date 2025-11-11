'use client';

import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';
import { useCookieConsent } from '@/components/cookie-consent-provider';

type Dictionary = {
  site: { name: string };
  footer: { rights: string };
}

export default function Footer({ dictionary }: { dictionary: Dictionary }) {
  const { setConsent } = useCookieConsent();
  const currentYear = new Date().getFullYear();

  const handleConfigureCookies = () => {
    const newConsent = confirm('¿Quieres activar las cookies de análisis?');
    setConsent(newConsent);
  };

  return (
    <footer className="bg-card text-card-foreground">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <p className="text-sm text-muted-foreground">
              Calle Santomera 23<br />
              03185 Torrevieja (Alicante)<br />
              Tel. <a href="tel:+34653445018" className="text-primary hover:underline">653 44 50 18</a><br />
              Email: <a href="mailto:j46990754@gmail.com" className="text-primary hover:underline">j46990754@gmail.com</a>
            </p>
          </div>

          {/* Enlaces legales */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="aviso-legal" className="text-muted-foreground hover:text-primary">Aviso Legal</Link></li>
              <li><Link href="politica-de-privacidad" className="text-muted-foreground hover:text-primary">Política de Privacidad</Link></li>
              <li><Link href="cookies-policy" className="text-muted-foreground hover:text-primary">Política de Cookies</Link></li>
              <li><Link href="descargo-de-responsabilidad" className="text-muted-foreground hover:text-primary">Descargo de Responsabilidad</Link></li>
              <li><button onClick={handleConfigureCookies} className="text-muted-foreground hover:text-primary">Configurar Cookies</button></li>
            </ul>
          </div>

          {/* Copyright */}
          <div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} JAROSLAW BALCERAK – {dictionary.site.name}<br />
              {dictionary.footer.rights}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
