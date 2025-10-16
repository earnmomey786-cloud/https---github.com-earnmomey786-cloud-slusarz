import { useState } from "react";

export default function CookieBanner({ onConsent }: { onConsent: (accepted: boolean) => void }) {
  const [show, setShow] = useState(true);
  const [configuring, setConfiguring] = useState(false);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-card border-t border-border p-4 flex flex-col md:flex-row items-center justify-between shadow-lg">
      <div className="mb-2 md:mb-0 text-sm text-muted-foreground">
        🔒 Utilizamos cookies propias y de terceros (Google Analytics) para analizar el tráfico y mejorar la experiencia. Puedes aceptar todas o configurarlas.
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={() => { onConsent(true); setShow(false); }}>Aceptar todas</button>
        <button className="btn btn-secondary" onClick={() => { onConsent(false); setShow(false); }}>Rechazar</button>
        <button className="btn btn-outline" onClick={() => setConfiguring(true)}>Configurar cookies</button>
      </div>
      {configuring && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-background border p-4 rounded shadow-lg">
          <div className="mb-2">Puedes activar/desactivar las cookies de análisis (Google Analytics):</div>
          <button className="btn btn-primary mr-2" onClick={() => { onConsent(true); setShow(false); }}>Activar Analytics</button>
          <button className="btn btn-secondary" onClick={() => { onConsent(false); setShow(false); }}>Desactivar Analytics</button>
        </div>
      )}
    </div>
  );
}
