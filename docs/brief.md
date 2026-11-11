# Business Brief: Re:Design, Week 1

## Case: Redesigning the Cancellation Flow at "ThriveWell"

### Company context

ThriveWell is a mid-size subscription wellness app (fitness classes, meal planning, and coaching) with a loyal, multi-year user base. Like most subscription businesses, a meaningful share of revenue depends on keeping monthly subscribers from canceling — and ThriveWell's current cancellation flow includes several retention steps (a "pause instead" offer, a discount offer, and a required reason survey) before a user can actually cancel.

### Why this is happening now

Subscription cancellation is under real regulatory pressure. Some states, including Colorado, already require simple, low-friction cancellation for consumers, with those requirements expanding to cover more types of subscriptions in 2026. Other cities and states are moving in the same direction, though the rules aren't consistent everywhere yet, and there's currently no single federal standard. Regulators and courts increasingly treat the design of a cancellation flow itself — not just the legal terms — as the thing being regulated.

Leadership has asked the product team to redesign the cancellation experience before this becomes a bigger legal or reputational risk — but revenue protection still matters, and retention offers have historically recovered a real share of would-be cancellations.

### What exists today

ThriveWell's current cancellation flow, as it stands now:

1. User navigates to Account Settings and finds "Manage Subscription" (not labeled "Cancel" — this wording was originally chosen deliberately to reduce cancellation intent)
2. User selects "Manage Subscription," which surfaces a "Pause Instead" offer as the first option, with "Cancel" presented as a secondary, less prominent link
3. If the user proceeds past the pause offer, a discount offer appears ("Stay for 30% off your next 3 months")
4. If the user declines the discount, a mandatory reason survey appears before the cancel button becomes active
5. Only after all of the above does a final "Confirm Cancellation" button appear

**Known problems with the current flow:**

- Internal support data shows this flow is the top source of complaint tickets and negative app store reviews, with users specifically calling it a "maze" or saying they "couldn't find" cancel
- The multi-step flow takes a median of 4-6 screens and roughly 3 minutes to complete, well above what regulators and consumer advocates now consider "simple"
- Some users have disputed charges with their bank/credit card after failing to complete cancellation through the app — each dispute costs ThriveWell a chargeback fee and counts against their processor standing, on top of the lost revenue
- The reason survey has poor completion data quality — many users appear to be selecting answers at random just to get through the required step, so the data isn't reliably useful to the business anyway
- No current mechanism accounts for state-by-state differences — every user sees the identical flow regardless of location

### Business goal

Redesign the cancellation flow so it meets a "simple, low-friction cancellation" standard, while minimizing the revenue impact from lost retention opportunities — targeted for rollout within the current quarter.

### Constraints

- Small product team, limited engineering capacity this quarter
- Must work within the existing subscription billing system (no full re-platform)
- Different states may have different requirements — there is no single confirmed national standard right now
- Retention offers have historically been a meaningful source of recovered revenue; leadership is wary of removing them entirely

### Explicitly out of scope

- Changes to the sign-up or onboarding flow
- Pricing or plan structure changes
- Full legal review (assume a real legal team exists and will review the final direction — the PM/designer pair should focus on the product and experience decisions, not draft legal text)

### The user base

ThriveWell has roughly 340,000 active subscribers across the US, with an average subscriber tenure of 14 months. Monthly voluntary churn currently sits at 4.2%, of which internal data attributes about a third to users who start the cancellation flow but abandon partway through the current multi-step process (rather than genuinely changing their mind about canceling). Subscribers are spread across all 50 states, with no current segmentation by state-level regulatory requirements.

**Brief personas, for grounding the work:**

- **Dana, 34, marketing manager, California.** Subscribed 18 months ago, uses the fitness classes weekly. Genuinely engaged, but recently tried to pause her subscription during a busy work month and gave up after the third retention screen, later posting a frustrated review. Represents the loyal-but-frustrated segment — not trying to leave, but the flow itself creates a bad experience even for happy users.
- **Marcus, 41, small business owner, Colorado.** Signed up 3 months ago on a promotional trial, decided the app isn't a fit, and wants to cancel quickly. Colorado's cancellation law technically applies to him. Represents the new, low-tenure segment most likely to be actively trying to leave, and the segment most directly implicated by current state regulation.
- **Priya, 29, nurse, Texas, works rotating shifts.** Subscribed 8 months ago, generally satisfied but price-sensitive, has considered canceling twice but stayed after seeing the discount offer. Represents the segment where the retention offer genuinely works and recovers revenue — the business case for keeping some form of retention step, not just removing it entirely.

### What we're asking of this team

Figure out what the cancellation flow should actually look like — how much friction (if any) is acceptable, whether and how retention offers still show up, and how to handle the reality that requirements may not be identical everywhere. Land on a direction, document the reasoning, and be ready for this to shift as new information comes in.
