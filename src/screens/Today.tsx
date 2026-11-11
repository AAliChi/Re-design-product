/* The home screen: today's class, activity, meals and a note from your coach. */
import { ChevronRight, Clock, Dumbbell, Flame, MessageCircle, Play, Salad } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubscriptionBanner } from '@/components/SubscriptionBanner';
import { WeekBars } from '@/components/WeekBars';
import { classes, coach, coachThread, mealsForDay, toneClasses } from '@/data/content';
import { useAppState } from '@/state/AppState';
import { formatLongDate, greeting, todayIndex } from '@/utils/format';
import { cn } from '@/lib/utils';

export function Today() {
  const { persona } = useAppState();
  const upNext = classes.find((c) => c.category === persona.usage.favouriteCategory) ?? classes[0];
  const meals = mealsForDay(todayIndex());
  const weekTotal = persona.usage.weekMinutes.reduce((a, b) => a + b, 0);
  const lastCoachMessage = coachThread(persona.name).filter((m) => m.from === 'coach').at(-1);

  return (
    <div>
      <div className="mb-5 md:mb-8">
        <p className="text-sm text-muted-foreground">{formatLongDate(new Date())}</p>
        <h1 className="mt-1 text-3xl font-semibold md:text-4xl">
          {greeting()}, {persona.name}
        </h1>
      </div>

      <SubscriptionBanner />

      {/* Quick links (inspired by the pill-card row in the references) */}
      <div className="mb-5 grid grid-cols-3 gap-3 md:hidden">
        {[
          { to: '/classes', label: 'Classes', icon: Dumbbell, tone: 'energy' as const },
          { to: '/meals', label: 'Meals', icon: Salad, tone: 'brand' as const },
          { to: '/coach', label: 'Coach', icon: MessageCircle, tone: 'rose' as const },
        ].map(({ to, label, icon: Icon, tone }) => (
          <Link key={to} to={to} className="flex flex-col items-start gap-3 rounded-xl border bg-card p-3 shadow-sm">
            <span className={cn('flex size-9 items-center justify-center rounded-full', toneClasses[tone].soft, toneClasses[tone].text)}>
              <Icon className="size-4" />
            </span>
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Up next */}
        <section className="relative overflow-hidden rounded-2xl bg-foreground p-6 text-background md:col-span-2 xl:col-span-2">
          <div className="absolute -right-12 -bottom-16 size-56 rounded-full bg-energy/80" aria-hidden />
          <div className="absolute right-16 -bottom-6 size-24 rounded-full bg-calm/80" aria-hidden />
          <p className="text-xs font-medium tracking-wide text-background/60 uppercase">Up next for you</p>
          <h2 className="relative mt-3 max-w-sm text-2xl font-semibold leading-tight md:text-3xl">{upNext.title}</h2>
          <p className="relative mt-2 flex items-center gap-2 text-sm text-background/70">
            <Clock className="size-4" /> {upNext.minutes} min · {upNext.level} · with {upNext.coach}
          </p>
          <Button
            size="lg"
            className="relative mt-6 rounded-full bg-background text-foreground hover:bg-background/90"
            onClick={() => toast('Classes don’t play in this prototype')}
          >
            <Play className="fill-current" /> Start class
          </Button>
        </section>

        {/* Streak */}
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="text-base">Streak</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div>
              <p className="font-display text-5xl font-semibold">{persona.usage.streakDays}</p>
              <p className="text-sm text-muted-foreground">days in a row</p>
            </div>
            <span className="flex size-14 items-center justify-center rounded-full bg-energy-soft text-energy">
              <Flame className="size-7" />
            </span>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="gap-3">
          <CardHeader>
            <CardTitle className="text-base">This week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Active time</p>
            <p className="mb-4 font-display text-3xl font-semibold text-energy">{weekTotal} min</p>
            <WeekBars values={persona.usage.weekMinutes} />
          </CardContent>
        </Card>

        {/* Meals */}
        <Card className="gap-3">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-base">Today's meals</CardTitle>
            <Link to="/meals" className="flex items-center text-sm font-medium text-muted-foreground">
              Plan <ChevronRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {meals.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <span className={cn('size-11 shrink-0 rounded-lg', toneClasses[m.tone].soft)} />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{m.mealType}</p>
                  <p className="truncate text-sm font-medium">{m.name}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Coach */}
        <Card className="gap-3">
          <CardHeader>
            <CardTitle className="text-base">From your coach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-rose-soft text-sm font-semibold text-rose">
                {coach.initials}
              </span>
              <div>
                <p className="text-sm font-medium">{coach.name}</p>
                <p className="text-xs text-muted-foreground">{coach.role}</p>
              </div>
            </div>
            <p className="mt-4 rounded-xl bg-muted px-4 py-3 text-sm">{lastCoachMessage?.text}</p>
            <Button asChild variant="outline" className="mt-4 w-full rounded-full">
              <Link to="/coach">Reply</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
