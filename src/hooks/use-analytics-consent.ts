import { useEffect } from "react";

// Declare global types for Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function useAnalyticsConsent(consent: boolean) {
  useEffect(() => {
    if (consent) {
      // Insert Google Analytics script only if consent is given
      if (!document.getElementById("ga-script")) {
        const script = document.createElement("script");
        script.id = "ga-script";
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"; // Reemplaza con tu ID
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){window.dataLayer.push(arguments);};
        window.gtag('js', new Date());
        window.gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
      }
    } else {
      // Remove Google Analytics script if consent is revoked
      const script = document.getElementById("ga-script");
      if (script) script.remove();
      (window as any)["ga-disable-G-XXXXXXXXXX"] = true;
    }
  }, [consent]);
}
