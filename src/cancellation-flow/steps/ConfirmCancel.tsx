/*
 * AS-IS STEP: Final confirmation
 * "Keep my membership" is the big primary button; "Confirm Cancellation"
 * is the quieter secondary one.
 */
import { CalendarX, Dumbbell, Flame, MessageCircle, Salad } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppState } from '@/state/AppState';
import { formatDate } from '@/utils/format';
import { coach } from '@/data/content';
import type { StepProps } from '.';

export function ConfirmCancel({ goNext, keepMembership }: StepProps) {
  const { persona, nextBillingDate } = useAppState();

  const losses = [
    { icon: Flame, text: `Your ${persona.usage.streakDays}-day streak`, show: persona.usage.streakDays > 0 },
    { icon: Dumbbell, text: `Progress from ${persona.usage.classesCompleted} completed classes`, show: true },
    { icon: Salad, text: 'Your personalised weekly meal plan', show: true },
    { icon: MessageCircle, text: `Messaging with coach ${coach.name}`, show: true },
  ].filter((l) => l.show);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold leading-tight">Are you sure you want to cancel?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Here's what you'll lose access to:</p>
      </div>

      <Card className="gap-0 py-2">
        <CardContent className="divide-y px-5">
          {losses.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 py-3.5 text-sm">
              <span className="flex size-9 items-center justify-center rounded-full bg-rose-soft text-rose">
                <Icon className="size-4" />
              </span>
              {text}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex items-start gap-3 rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
        <CalendarX className="mt-0.5 size-4 shrink-0" />
        If you cancel, your membership ends on {formatDate(nextBillingDate)}.
      </div>

      <div className="space-y-3 pt-2">
        <Button size="lg" className="h-12 w-full rounded-full text-base" onClick={keepMembership}>
          Keep my membership
        </Button>
        <Button size="lg" variant="outline" className="h-12 w-full rounded-full text-base" onClick={goNext}>
          Confirm Cancellation
        </Button>
      </div>
    </div>
  );
}
