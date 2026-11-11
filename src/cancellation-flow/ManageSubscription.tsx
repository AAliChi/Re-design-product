/*
 * AS-IS SCREEN: Manage Subscription
 * ------------------------------------------------------------------
 * What the brief describes: tapping "Manage Subscription" surfaces a
 * "Pause Instead" offer as the first, most prominent option, with
 * "Cancel" presented as a small, low-contrast link at the very bottom.
 */
import { CalendarClock, CirclePause, CreditCard, PlayCircle } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FlowHeader } from '@/components/FlowHeader';
import { useAppState } from '@/state/AppState';
import { formatDate, formatPrice } from '@/utils/format';
import { flowConfig } from './flow.config';
import { useCancellationFlow } from './useCancellationFlow';

export function ManageSubscription() {
  const { persona, subscription, nextBillingDate, resumeSubscription } = useAppState();
  const flow = useCancellationFlow();
  const { plan } = persona;
  const discount = subscription.discount;
  const price = discount ? plan.monthlyPrice * (1 - discount.percent / 100) : plan.monthlyPrice;

  return (
    <div className="mx-auto max-w-xl">
      <FlowHeader title={flowConfig.settingsEntryLabel} backTo="/account" />

      {/* ---------- Plan summary ---------- */}
      <Card className="gap-4 py-5">
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Your plan</p>
              <p className="mt-1 font-display text-xl font-semibold">{plan.name}</p>
            </div>
            <StatusBadge status={subscription.status} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl font-semibold">{formatPrice(price)}</span>
            <span className="text-sm text-muted-foreground">/month</span>
            {discount && (
              <span className="ml-2 text-sm text-muted-foreground line-through">{formatPrice(plan.monthlyPrice)}</span>
            )}
          </div>
          {discount && (
            <p className="text-sm text-brand">{discount.percent}% off applied for your next {discount.months} months</p>
          )}
          {plan.note && <p className="text-sm text-muted-foreground">{plan.note}</p>}
          <Separator />
          <div className="grid gap-3 text-sm">
            <Row icon={CalendarClock} label={statusLine(subscription.status)}>
              {subscription.status === 'paused' && subscription.pausedUntil
                ? formatDate(subscription.pausedUntil)
                : subscription.status === 'cancelled' && subscription.endsOn
                  ? formatDate(subscription.endsOn)
                  : formatDate(nextBillingDate)}
            </Row>
            <Row icon={CreditCard} label="Payment method">Visa •••• 4242</Row>
          </div>
        </CardContent>
      </Card>

      {/* ---------- The big "Pause instead" offer ---------- */}
      {subscription.status === 'active' && (
        <section className="mt-5 rounded-2xl bg-calm-soft p-6">
          <span className="flex size-11 items-center justify-center rounded-full bg-calm text-white">
            <CirclePause className="size-5" />
          </span>
          <h2 className="mt-4 text-2xl font-semibold leading-tight">Need a break? Pause instead.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Life gets busy. Pause for up to 3 months and keep your progress, your streak and your coach. We'll hold
            your spot.
          </p>
          <Button asChild size="lg" className="mt-5 h-12 w-full rounded-full text-base">
            <Link to="/account/subscription/pause">Pause my membership</Link>
          </Button>
        </section>
      )}

      {subscription.status === 'paused' && (
        <section className="mt-5 rounded-2xl bg-calm-soft p-6">
          <h2 className="text-xl font-semibold">Your membership is paused</h2>
          <p className="mt-2 text-sm text-muted-foreground">You won't be charged until it resumes.</p>
          <Button size="lg" className="mt-5 h-12 w-full rounded-full" onClick={resumeSubscription}>
            <PlayCircle /> Resume now
          </Button>
        </section>
      )}

      {subscription.status === 'cancelled' && (
        <section className="mt-5 rounded-2xl bg-brand-soft p-6">
          <h2 className="text-xl font-semibold">We'd love to have you back</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Resubscribe any time — your history and preferences are saved.
          </p>
          <Button size="lg" className="mt-5 h-12 w-full rounded-full" onClick={resumeSubscription}>
            Resubscribe
          </Button>
        </section>
      )}

      {/* ---------- Other options ---------- */}
      <Card className="mt-5 gap-0 py-1">
        <CardContent className="divide-y px-5 text-sm">
          {['Change plan', 'Billing history', 'Update payment method'].map((item) => (
            <div key={item} className="py-3.5 text-muted-foreground">{item}</div>
          ))}
        </CardContent>
      </Card>

      {/* ---------- The deliberately low-key Cancel link ---------- */}
      {subscription.status !== 'cancelled' && (
        <div className="mt-10 mb-6 text-center">
          <button onClick={flow.start} className="text-xs text-muted-foreground/60 hover:underline">
            Cancel subscription
          </button>
        </div>
      )}
    </div>
  );
}

function statusLine(status: string) {
  if (status === 'paused') return 'Resumes on';
  if (status === 'cancelled') return 'Access ends on';
  return 'Next payment';
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'paused') return <Badge className="bg-calm-soft text-calm">Paused</Badge>;
  if (status === 'cancelled') return <Badge variant="secondary">Cancelled</Badge>;
  return <Badge className="bg-brand-soft text-brand">Active</Badge>;
}

function Row({ icon: Icon, label, children }: { icon: typeof CreditCard; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" /> {label}
      </span>
      <span className="font-medium">{children}</span>
    </div>
  );
}
