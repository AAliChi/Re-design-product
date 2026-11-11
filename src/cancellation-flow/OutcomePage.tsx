/*
 * The screen shown at the end of the flow:
 * cancelled, paused, accepted the discount, or kept membership.
 */
import { CircleCheck, CirclePause, HeartHandshake, Tag } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/state/AppState';
import { formatDate } from '@/utils/format';
import { cn } from '@/lib/utils';
import { SUBSCRIPTION_PATH } from './useCancellationFlow';

export function OutcomePage() {
  const { outcome } = useParams();
  const { subscription, persona } = useAppState();

  const content = {
    cancelled: {
      icon: CircleCheck,
      tone: 'bg-muted text-foreground',
      title: 'Your subscription has been cancelled',
      body: `You'll still have access until ${subscription.endsOn ? formatDate(subscription.endsOn) : 'the end of your billing period'}. We've sent a confirmation to your email.`,
    },
    paused: {
      icon: CirclePause,
      tone: 'bg-calm-soft text-calm',
      title: 'Your membership is paused',
      body: `Enjoy the break, ${persona.name}. We'll resume your membership on ${subscription.pausedUntil ? formatDate(subscription.pausedUntil) : 'the date you chose'}.`,
    },
    discount: {
      icon: Tag,
      tone: 'bg-brand-soft text-brand',
      title: 'Discount applied!',
      body: `${subscription.discount?.percent ?? 30}% off has been added to your next ${subscription.discount?.months ?? 3} payments. Glad you're staying.`,
    },
    kept: {
      icon: HeartHandshake,
      tone: 'bg-brand-soft text-brand',
      title: "Great, you're staying!",
      body: 'Your membership continues as normal. Nothing has changed.',
    },
  }[outcome ?? ''];

  if (!content) return <Navigate to={SUBSCRIPTION_PATH} replace />;
  const Icon = content.icon;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-2 pt-16 text-center md:pt-24">
      <span className={cn('flex size-16 items-center justify-center rounded-full', content.tone)}>
        <Icon className="size-8" />
      </span>
      <h1 className="mt-6 text-3xl font-semibold leading-tight">{content.title}</h1>
      <p className="mt-3 text-muted-foreground">{content.body}</p>
      <div className="mt-8 grid w-full gap-3">
        <Button asChild size="lg" className="h-12 rounded-full text-base">
          <Link to="/">Back to ThriveWell</Link>
        </Button>
        <Button asChild size="lg" variant="ghost" className="h-12 rounded-full">
          <Link to={SUBSCRIPTION_PATH}>View subscription</Link>
        </Button>
      </div>
    </div>
  );
}
