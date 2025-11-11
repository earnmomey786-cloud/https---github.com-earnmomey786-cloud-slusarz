type Dictionary = {
  hero: {
    emergencyText: string;
    urgentAssistance: string;
    callUsText: string;
    specialistTitle: string;
    services: {
      doorOpening: string;
      carLocksmith: string;
      lockRepair: string;
      emergency24h: string;
      fastIntervention: string;
    };
    available24h: string;
  };
};

export function InfoSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container max-w-4xl">
        <div className="space-y-6 text-base md:text-lg">
          <p className="font-semibold text-xl md:text-2xl text-center">
            {dictionary.hero.emergencyText}
          </p>
          <p className="text-muted-foreground text-center">
            {dictionary.hero.urgentAssistance}
          </p>
          <p className="text-muted-foreground text-center">
            {dictionary.hero.callUsText}
          </p>
          
          <div className="mt-10">
            <h2 className="font-bold text-2xl md:text-3xl mb-6 text-center">
              {dictionary.hero.specialistTitle}
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl mt-1">✓</span>
                <span>{dictionary.hero.services.doorOpening}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl mt-1">✓</span>
                <span>{dictionary.hero.services.carLocksmith}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl mt-1">✓</span>
                <span>{dictionary.hero.services.lockRepair}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl mt-1">✓</span>
                <span>{dictionary.hero.services.emergency24h}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl mt-1">✓</span>
                <span>{dictionary.hero.services.fastIntervention}</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-10 p-6 md:p-8 bg-primary/10 rounded-lg border-l-4 border-primary">
            <p className="font-semibold text-lg md:text-xl text-center">
              {dictionary.hero.available24h}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
