import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { CookieConsentProvider } from '@/components/cookie-consent-provider';

export const metadata: Metadata = {
  title: 'Torrevieja Ślusarz 24h',
  description: 'Profesjonalne usługi ślusarskie 24/7 w Torrevieja. Szybka i profesjonalna pomoc w nagłych wypadkach.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
        {/* Use favicon.ico for maximum compatibility */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-body antialiased">
        <CookieConsentProvider>
          {children}
        </CookieConsentProvider>
        <Toaster />
      </body>
    </html>
  );
}
