/* Browse fitness classes, filtered by category. */
import { useState } from 'react';
import { Activity, Bike, Dumbbell, Flower2, Play, StretchHorizontal, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PageTitle } from '@/components/PageTitle';
import { classCategories, classes, toneClasses, type ClassCategory } from '@/data/content';
import { cn } from '@/lib/utils';

const categoryIcon: Record<ClassCategory, typeof Activity> = {
  Strength: Dumbbell,
  Yoga: Flower2,
  HIIT: Zap,
  Mobility: StretchHorizontal,
  Cardio: Bike,
};

export function Classes() {
  const [filter, setFilter] = useState<'All' | ClassCategory>('All');
  const shown = filter === 'All' ? classes : classes.filter((c) => c.category === filter);

  return (
    <div>
      <PageTitle title="Classes" subtitle={`${classes.length} classes · new ones every week`} />

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-5">
        <div className="-mx-4 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
          <TabsList className="h-10 rounded-full p-1">
            {(['All', ...classCategories] as const).map((c) => (
              <TabsTrigger key={c} value={c} className="rounded-full px-4">
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((c) => {
          const Icon = categoryIcon[c.category];
          const tone = toneClasses[c.tone];
          return (
            <button
              key={c.id}
              onClick={() => toast('Classes don’t play in this prototype')}
              className="group overflow-hidden rounded-xl border bg-card text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={cn('relative flex h-36 items-center justify-center', tone.soft)}>
                <Icon className={cn('size-12 opacity-80', tone.text)} strokeWidth={1.5} />
                <Badge className="absolute top-3 left-3 bg-card text-foreground">{c.minutes} min</Badge>
                <span className="absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-full bg-foreground text-background opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="size-4 fill-current" />
                </span>
              </div>
              <div className="p-4">
                <p className="font-medium">{c.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {c.coach} · {c.level}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
