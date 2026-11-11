import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { useAppState } from '@/state/AppState';
import { formatDate } from '@/utils/format';

/** Shows a notice on the Today screen when the membership is paused or cancelled. */
export function SubscriptionBanner() {
  const { subscription } = useAppState();
  if (subscription.status === 'active') return null;

  const text =
    subscription.status === 'paused'
      ? `Membership paused until ${subscription.pausedUntil ? formatDate(subscription.pausedUntil) : '—'}`
      : `Membership cancelled · access until ${subscription.endsOn ? formatDate(subscription.endsOn) : '—'}`;

  return (
    <Link
      to="/account/subscription"
      className="mb-5 flex items-center justify-between gap-3 rounded-xl bg-calm-soft px-4 py-3 text-sm font-medium"
    >
      {text}
      <ChevronRight className="size-4 shrink-0" />
    </Link>
  );
}
