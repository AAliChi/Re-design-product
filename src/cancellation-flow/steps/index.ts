/*
 * The registry of cancellation steps.
 * ------------------------------------------------------------------
 * Each step is a screen component. flow.config.ts decides which of
 * these steps are used and in what order.
 *
 * To add a new step:
 *   1. Copy one of the step files (e.g. ConfirmCancel.tsx) and rename it
 *   2. Add its id to the StepId list below
 *   3. Add it to `steps` below
 *   4. Add its id to cancellationSteps in flow.config.ts
 */
import type { ComponentType } from 'react';
import { DiscountOffer } from './DiscountOffer';
import { ReasonSurvey } from './ReasonSurvey';
import { ConfirmCancel } from './ConfirmCancel';

export type StepId = 'discount-offer' | 'reason-survey' | 'confirm-cancel';

/** Every step receives these two functions. */
export interface StepProps {
  /** Go to the next step. On the last step this cancels the subscription. */
  goNext: () => void;
  /** The user changed their mind and is keeping their membership. */
  keepMembership: () => void;
}

export const steps: Record<StepId, { title: string; Component: ComponentType<StepProps> }> = {
  'discount-offer': { title: 'Discount offer (30% off)', Component: DiscountOffer },
  'reason-survey': { title: 'Reason survey (required)', Component: ReasonSurvey },
  'confirm-cancel': { title: 'Confirm cancellation', Component: ConfirmCancel },
};

export function isStepId(value: string | undefined): value is StepId {
  return !!value && value in steps;
}
