/*
 * The "engine" that moves a user through the cancellation steps.
 * You normally won't need to edit this — change flow.config.ts instead.
 */
import { useNavigate } from 'react-router';
import { useAppState } from '@/state/AppState';
import { flowConfig } from './flow.config';
import type { StepId } from './steps';

export const SUBSCRIPTION_PATH = '/account/subscription';
export const stepPath = (id: StepId) => `${SUBSCRIPTION_PATH}/cancel/${id}`;
export const outcomePath = (outcome: 'cancelled' | 'paused' | 'discount' | 'kept') =>
  `${SUBSCRIPTION_PATH}/done/${outcome}`;

export function useCancellationFlow() {
  const navigate = useNavigate();
  const { cancelSubscription } = useAppState();
  const list = flowConfig.cancellationSteps;

  const finish = () => {
    cancelSubscription();
    navigate(outcomePath('cancelled'));
  };

  return {
    /** Called by the "Cancel subscription" link. */
    start: () => (list.length > 0 ? navigate(stepPath(list[0])) : finish()),

    /** Move on from the given step. */
    next: (current: StepId) => {
      const nextStep = list[list.indexOf(current) + 1];
      if (nextStep) navigate(stepPath(nextStep));
      else finish();
    },

    /** The user backs out and keeps their membership. */
    keepMembership: () => navigate(outcomePath('kept')),
  };
}
