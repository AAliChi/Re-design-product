# Notes for AI coding assistants

This repo is a teaching prototype for the **Re:Design** program. Participants are designers and PMs, many of them returning to work and not very confident with code. They use this as-is app of "ThriveWell" (a fictional subscription wellness app) to redesign its **cancellation flow**. The brief is in `docs/brief.md`.

## How to help

- Make small, focused changes and explain them in plain language. Say which file changed and why.
- Prefer editing `src/cancellation-flow/flow.config.ts` over changing flow logic, whenever the request can be met that way.
- Use the existing **shadcn/ui** components in `src/components/ui/` and **Tailwind** classes. Don't add other UI libraries or CSS files. If a shadcn component is missing, add it with `npx shadcn@latest add <name>`. Don't hand-write it.
- Use design tokens (`bg-brand`, `text-muted-foreground`, `bg-card`, `rounded-xl`…) from `src/styles/index.css`, not hard-coded hex colours.
- Icons come from `lucide-react`.
- Keep the app working on phone widths (≈375px) and desktop. The layout is mobile-first; `md:` is the 768px breakpoint.
- There's no backend. State lives in `src/state/AppState.tsx`, in memory only (a refresh resets it). The persona shown is `DEFAULT_PERSONA` in `src/data/personas.ts`.
- After changes, run `npm run check` (types) and `npm run build`.

## Map

```
src/
  App.tsx                     routes (HashRouter)
  cancellation-flow/
    flow.config.ts            ← steps, labels, discount, survey options
    ManageSubscription.tsx    pause-first screen with faint cancel link
    PauseSubscription.tsx     choose pause length
    steps/                    one file per cancellation step + registry (index.ts)
    useCancellationFlow.ts    moves between steps; last step cancels
    CancelStepPage.tsx        renders the step named in the URL
    OutcomePage.tsx           cancelled / paused / discount / kept
  state-rules/stateRules.ts   per-US-state rules placeholder (unused in as-is)
  state/AppState.tsx          persona + subscription state
  screens/                    Today, Classes, Meals, Coach, Account
  layout/AppShell.tsx         sidebar (desktop) / bottom tabs (mobile)
  components/ui/              shadcn/ui components
  data/                       personas + made-up content
  styles/index.css            design tokens (colours, radius, fonts)
```

Adding a cancellation step: create `steps/MyStep.tsx` that takes `StepProps` (`goNext`, `keepMembership`), register it in `steps/index.ts`, then list its id in `flow.config.ts`.
