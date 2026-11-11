/*
 * AS-IS STEP: Mandatory reason survey
 * The Continue button stays disabled until a reason is picked.
 * The brief notes many users pick at random just to get through.
 */
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { flowConfig } from '../flow.config';
import type { StepProps } from '.';

export function ReasonSurvey({ goNext, keepMembership }: StepProps) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const canContinue = !flowConfig.surveyRequired || reason !== '';

  return (
    <div className="space-y-5">
      <div>
        {flowConfig.surveyRequired && (
          <Badge variant="secondary" className="mb-3">Required</Badge>
        )}
        <h2 className="text-2xl font-semibold leading-tight">Why are you leaving?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Please tell us why you want to cancel. Your feedback helps us improve ThriveWell.
        </p>
      </div>

      <RadioGroup value={reason} onValueChange={setReason} className="gap-2">
        {flowConfig.surveyReasons.map((r) => (
          <Label
            key={r}
            htmlFor={r}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-xl border bg-card px-4 py-3.5 text-sm font-normal transition-colors',
              reason === r && 'border-foreground ring-1 ring-foreground',
            )}
          >
            <RadioGroupItem id={r} value={r} />
            {r}
          </Label>
        ))}
      </RadioGroup>

      <div className="space-y-2">
        <Label htmlFor="details" className="text-sm">Anything else? (optional)</Label>
        <Textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Tell us more…"
          className="min-h-20 bg-card"
        />
      </div>

      <Button size="lg" className="h-12 w-full rounded-full text-base" disabled={!canContinue} onClick={goNext}>
        Continue
      </Button>
      <button onClick={keepMembership} className="mx-auto block py-2 text-sm font-medium text-brand hover:underline">
        Never mind, keep my membership
      </button>
    </div>
  );
}
