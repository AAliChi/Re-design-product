/*
 * ============================================================================
 *  STATE-BY-STATE RULES  (placeholder — NOT used by the as-is app)
 * ============================================================================
 *
 * The brief: "No current mechanism accounts for state-by-state differences —
 * every user sees the identical flow regardless of location."
 *
 * That's true of the as-is app: nothing calls this file yet. It's here
 * as a starting point if your team's design treats some locations
 * differently (for example, Marcus in Colorado).
 *
 * How you might use it in your redesign:
 *
 *   import { getRulesForState } from '@/state-rules/stateRules';
 *   const rules = getRulesForState(persona.stateCode);
 *   if (rules.maxRetentionOffers === 0) { ...skip the discount step... }
 *
 * ⚠️  These values are made-up placeholders for prototyping, not legal
 * guidance. The brief says a legal team will review the final direction.
 */

export interface CancellationRules {
  /** A short, human-readable name for this set of rules. */
  label: string;
  /** How many retention offers (pause, discount…) may be shown before cancelling. */
  maxRetentionOffers: number;
  /** May a survey be required before cancelling? */
  allowRequiredSurvey: boolean;
  /** Must "Cancel" be clearly labelled and easy to find? */
  requireClearCancelLabel: boolean;
}

/** What every user gets today, regardless of where they live. */
export const DEFAULT_RULES: CancellationRules = {
  label: 'Default (same for everyone)',
  maxRetentionOffers: Infinity,
  allowRequiredSurvey: true,
  requireClearCancelLabel: false,
};

/**
 * Overrides per state, keyed by two-letter code.
 * Empty on purpose — the as-is product has no state-specific behaviour.
 * Your team decides what goes here.
 */
export const RULES_BY_STATE: Record<string, Partial<CancellationRules>> = {
  // CO: { label: 'Colorado', maxRetentionOffers: 1, allowRequiredSurvey: false, requireClearCancelLabel: true },
};

export function getRulesForState(stateCode: string): CancellationRules {
  return { ...DEFAULT_RULES, ...RULES_BY_STATE[stateCode] };
}
