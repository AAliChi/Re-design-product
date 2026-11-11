/*
 * AS-IS STEP: Discount offer
 * "Stay for 30% off your next 3 months"
 * The accept button is big and bold; continuing to cancel is a small grey link.
 */
import { Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppState } from '@/state/AppState';
import { formatPrice } from '@/utils/format';
import { flowConfig } from '../flow.config';
import { outcomePath } from '../useCancellationFlow';
import type { StepProps } from '.';

export function DiscountOffer({ goNext }: StepProps) {
  const navigate = useNavigate();
  const { persona, applyDiscount } = useAppState();
  const { percent, months } = flowConfig.discount;
  const price = persona.plan.monthlyPrice;
  const discounted = price * (1 - percent / 100);

  const claim = () => {
    applyDiscount(percent, months);
    navigate(outcomePath('discount'));
  };

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-2xl bg-brand p-6 text-brand-foreground">
        <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/10" aria-hidden />
        <div className="absolute -right-4 bottom-[-3rem] size-28 rounded-full bg-white/10" aria-hidden />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
          <Sparkles className="size-3.5" /> A special offer, just for you
        </span>
        <h2 className="mt-4 text-3xl font-semibold leading-tight">
          Wait! Stay for {percent}% off
        </h2>
        <p className="mt-2 text-sm text-white/80">We'd hate to see you go, {persona.name}.</p>
        <div className="mt-6 flex items-baseline gap-2">
          <span className="font-display text-5xl font-semibold">{formatPrice(discounted)}</span>
          <span className="text-white/70 line-through">{formatPrice(price)}</span>
          <span className="text-sm text-white/80">/month</span>
        </div>
        <p className="mt-1 text-sm text-white/80">for your next {months} months</p>
      </section>

      <Card className="gap-3 py-5">
        <CardContent className="space-y-3">
          <p className="text-sm font-semibold">You'll keep everything:</p>
          {['Unlimited classes', 'Your weekly meal plan', 'Messaging with your coach', 'Your progress & streak'].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm">
              <span className="flex size-6 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Check className="size-3.5" />
              </span>
              {item}
            </div>
          ))}
        </CardContent>
      </Card>

      <Button size="lg" className="h-12 w-full rounded-full text-base" onClick={claim}>
        Claim {percent}% off
      </Button>
      <button onClick={goNext} className="mx-auto block py-2 text-xs text-muted-foreground/70 hover:underline">
        No thanks, continue cancelling
      </button>
    </div>
  );
}
