/** The ThriveWell wordmark. */
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 64 64" className="size-7" aria-hidden>
        <rect width="64" height="64" rx="16" className="fill-brand" />
        <path d="M32 48c-9-6-14-12-14-19a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 7-5 13-14 19z" className="fill-background" />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight">ThriveWell</span>
    </span>
  );
}
