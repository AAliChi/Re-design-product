/*
 * Shows whichever cancellation step is in the URL, e.g.
 * /account/subscription/cancel/discount-offer
 * You normally won't need to edit this file.
 */
import { Navigate, useParams } from 'react-router';
import { FlowHeader } from '@/components/FlowHeader';
import { flowConfig } from './flow.config';
import { isStepId, steps } from './steps';
import { stepPath, SUBSCRIPTION_PATH, useCancellationFlow } from './useCancellationFlow';

export function CancelStepPage() {
  const { stepId } = useParams();
  const flow = useCancellationFlow();
  const list = flowConfig.cancellationSteps;

  if (!isStepId(stepId) || !list.includes(stepId)) {
    return <Navigate to={SUBSCRIPTION_PATH} replace />;
  }

  const index = list.indexOf(stepId);
  const backTo = index === 0 ? SUBSCRIPTION_PATH : stepPath(list[index - 1]);
  const { Component } = steps[stepId];

  return (
    <div className="mx-auto max-w-xl">
      <FlowHeader title={flowConfig.settingsEntryLabel} backTo={backTo} />
      {/* `key` makes each step start fresh */}
      <Component key={stepId} goNext={() => flow.next(stepId)} keepMembership={flow.keepMembership} />
    </div>
  );
}
