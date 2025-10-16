'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import CookieBanner from '@/components/ui/cookie-banner';
import { useAnalyticsConsent } from '@/hooks/use-analytics-consent';

interface CookieConsentContextType {
  consent: boolean | null;
  setConsent: (consent: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check localStorage for existing consent
    const storedConsent = localStorage.getItem('cookie-consent');
    if (storedConsent !== null) {
      const parsedConsent = storedConsent === 'true';
      setConsentState(parsedConsent);
    } else {
      // Show banner if no consent stored
      setShowBanner(true);
    }
  }, []);

  const setConsent = (accepted: boolean) => {
    setConsentState(accepted);
    localStorage.setItem('cookie-consent', accepted.toString());
    setShowBanner(false);
  };

  // Use the analytics hook when consent changes
  useAnalyticsConsent(consent === true);

  return (
    <CookieConsentContext.Provider value={{ consent, setConsent }}>
      {children}
      {showBanner && <CookieBanner onConsent={setConsent} />}
    </CookieConsentContext.Provider>
  );
}