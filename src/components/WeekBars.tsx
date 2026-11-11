import { cn } from '@/lib/utils';
import { todayIndex, WEEKDAY_LETTERS } from '@/utils/format';

/** A small Monday → Sunday bar chart. Today's bar is highlighted. */
export function WeekBars({ values, className }: { values: number[]; className?: string }) {
  const max = Math.max(...values, 30);
  const today = todayIndex();
  return (
    <div className={cn('flex h-28 items-end gap-2', className)} role="img" aria-label={`Minutes per day: ${values.join(', ')}`}>
      {values.map((v, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
          <div
            className={cn(
              'w-full max-w-7 rounded-md transition-all',
              v === 0 ? 'bg-muted' : i === today ? 'bg-energy' : 'bg-energy/35',
            )}
            style={{ height: v === 0 ? 4 : `${Math.max(8, (v / max) * 100)}%` }}
          />
          <span className={cn('text-[11px] text-muted-foreground', i === today && 'font-semibold text-foreground')}>
            {WEEKDAY_LETTERS[i]}
          </span>
        </div>
      ))}
    </div>
  );
}
