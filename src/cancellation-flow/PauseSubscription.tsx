/*
 * AS-IS SCREEN: Pause your membership
 * Reached from the "Pause my membership" button on Manage Subscription.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FlowHeader } from '@/components/FlowHeader';
import { useAppState } from '@/state/AppState';
import { addMonths, formatDate } from '@/utils/format';
import { cn } from '@/lib/utils';
import { flowConfig } from './flow.config';
import { outcomePath, SUBSCRIPTION_PATH } from './useCancellationFlow';

export function PauseSubscription() {
  const navigate = useNavigate();
  const { pauseSubscription } = useAppState();
  const [months, setMonths] = useState(String(flowConfig.pauseOptions[0]));

  const confirm = () => {
    pauseSubscription(Number(months));
    navigate(outcomePath('paused'));
  };

  return (
    <div className="mx-auto max-w-xl">
      <FlowHeader title="Pause membership" backTo={SUBSCRIPTION_PATH} />
      <h2 className="text-2xl font-semibold leading-tight">How long would you like to pause?</h2>
      <p className="mt-1 text-sm text-muted-foreground">You won't be charged while paused. Your progress is saved.</p>

      <RadioGroup value={months} onValueChange={setMonths} className="mt-5 gap-2">
        {flowConfig.pauseOptions.map((m) => {
          const value = String(m);
          return (
            <Label
              key={m}
              htmlFor={`pause-${m}`}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-xl border bg-card px-4 py-4 font-normal',
                months === value && 'border-foreground ring-1 ring-foreground',
              )}
            >
              <RadioGroupItem id={`pause-${m}`} value={value} />
              <span className="flex-1 text-sm font-medium">{m} month{m > 1 ? 's' : ''}</span>
              <span className="text-xs text-muted-foreground">until {formatDate(addMonths(new Date(), m))}</span>
            </Label>
          );
        })}
      </RadioGroup>

      <Button size="lg" className="mt-6 h-12 w-full rounded-full text-base" onClick={confirm}>
        Pause membership
      </Button>
    </div>
  );
}
