import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Clock, MapPin } from 'lucide-react';

type Dictionary = {
  site: { address: string };
  hours: {
    title: string;
    days: { [key: string]: string };
    schedule: { [key: string]: string };
    emergency: string;
    addressTitle: string;
  };
};

export function HoursSection({ dictionary }: { dictionary: Dictionary }) {
  const schedule = [
    { day: dictionary.hours.days.monday, time: dictionary.hours.schedule.weekdays },
    { day: dictionary.hours.days.tuesday, time: dictionary.hours.schedule.weekdays },
    { day: dictionary.hours.days.wednesday, time: dictionary.hours.schedule.weekdays },
    { day: dictionary.hours.days.thursday, time: dictionary.hours.schedule.weekdays },
    { day: dictionary.hours.days.friday, time: dictionary.hours.schedule.weekdays },
    { day: dictionary.hours.days.saturday, time: dictionary.hours.schedule.saturday },
    { day: dictionary.hours.days.sunday, time: dictionary.hours.schedule.sunday },
  ];

  return (
    <section id="hours" className="py-16 md:py-24 bg-card">
      <div className="container grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.hours.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{dictionary.hours.emergency}</p>
          <div className="mt-8">
            <Card>
              <Table>
                <TableBody>
                  {schedule.map((item) => (
                    <TableRow key={item.day}>
                      <TableCell className="font-medium">{item.day}</TableCell>
                      <TableCell className="text-right">{item.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                {dictionary.hours.addressTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">{dictionary.site.address}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
