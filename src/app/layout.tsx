import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { CookieConsentProvider } from '@/components/cookie-consent-provider';

export const metadata: Metadata = {
  title: 'Torrevieja Ślusarz 24h',
  description: 'Profesjonalne usługi ślusarskie 24/7 w Torrevieja. Szybka i profesjonalna pomoc w nagłych wypadkach.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icono.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/icono.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/icono.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
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
