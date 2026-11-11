/*
 * App state — the "pretend backend".
 * ------------------------------------------------------------------
 * There is no server. This file keeps track of:
 *   • which persona the app shows (set DEFAULT_PERSONA in data/personas.ts)
 *   • their subscription: active / paused / cancelled, plus any discount
 *
 * Nothing is saved: refreshing the page resets the demo.
 */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_PERSONA, personas, type Persona } from '@/data/personas';
import { addDays, addMonths } from '@/utils/format';

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';

export interface Subscription {
  status: SubscriptionStatus;
  /** ISO date — when a pause ends. */
  pausedUntil?: string;
  /** ISO date — when access ends after cancelling. */
  endsOn?: string;
  /** Set when the user accepted a retention discount. */
  discount?: { percent: number; months: number };
}

interface AppStateValue {
  persona: Persona;
  subscription: Subscription;
  /** Next billing date for the current persona. */
  nextBillingDate: Date;

  pauseSubscription: (months: number) => void;
  applyDiscount: (percent: number, months: number) => void;
  cancelSubscription: () => void;
  resumeSubscription: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const persona = personas[DEFAULT_PERSONA];
  const [subscription, setSubscription] = useState<Subscription>({ status: 'active' });
  const nextBillingDate = useMemo(() => addDays(new Date(), persona.plan.daysUntilBilling), [persona]);

  const value: AppStateValue = {
    persona,
    subscription,
    nextBillingDate,

    pauseSubscription: (months) =>
      setSubscription((s) => ({ ...s, status: 'paused', pausedUntil: addMonths(new Date(), months).toISOString() })),

    applyDiscount: (percent, months) => setSubscription({ status: 'active', discount: { percent, months } }),

    // Access continues until the end of the period that has already been paid for.
    cancelSubscription: () => setSubscription({ status: 'cancelled', endsOn: nextBillingDate.toISOString() }),

    resumeSubscription: () => setSubscription({ status: 'active' }),
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used inside <AppStateProvider>');
  return ctx;
}
