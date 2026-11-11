/*
 * ============================================================================
 *  CANCELLATION FLOW SETTINGS  ← start here when redesigning the flow
 * ============================================================================
 *
 * This file controls the AS-IS cancellation flow described in the brief:
 *
 *   Account Settings
 *     → "Manage Subscription"          (settingsEntryLabel)
 *     → Pause offer, Cancel is a faint link   (ManageSubscription.tsx)
 *     → 30% discount offer              ┐
 *     → Required reason survey          ├ cancellationSteps (in this order)
 *     → Confirm Cancellation            ┘
 *
 * Things you can try without touching any other file:
 *   • Rename the settings entry, e.g. 'Cancel or pause subscription'
 *   • Remove a step: delete its line from cancellationSteps
 *   • Re-order the steps
 *   • Change the discount offer
 *
 * The LAST step's main button is what actually cancels the subscription.
 * If you remove every step, the Cancel link cancels straight away.
 *
 * To add a brand new step, see steps/index.ts.
 */
import type { StepId } from './steps';

export const flowConfig = {
  /** The label of the row in Account Settings. Deliberately avoids the word "Cancel". */
  settingsEntryLabel: 'Manage Subscription',

  /** The screens a user must get through after tapping "Cancel subscription". */
  cancellationSteps: ['discount-offer', 'reason-survey', 'confirm-cancel'] as StepId[],

  /** The retention discount: "Stay for 30% off your next 3 months". */
  discount: { percent: 30, months: 3 },

  /** How many months a user can pause for. */
  pauseOptions: [1, 2, 3],

  /** Reasons offered in the mandatory survey. */
  surveyReasons: [
    "It's too expensive",
    "I'm not using it enough",
    'I found another app',
    'Technical problems',
    'I only signed up for the trial',
    "I'm taking a break",
    'Something else',
  ],

  /** Whether the survey must be answered before the user can continue. */
  surveyRequired: true,
};
