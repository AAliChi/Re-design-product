/* The weekly meal plan. Tap a meal to open its recipe in a bottom sheet. */
import { useState } from 'react';
import { ChevronRight, Clock, Flame, Shuffle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PageTitle } from '@/components/PageTitle';
import { mealsForDay, toneClasses, type Recipe } from '@/data/content';
import { addDays, todayIndex, WEEKDAY_SHORT } from '@/utils/format';
import { cn } from '@/lib/utils';

export function Meals() {
  const today = todayIndex();
  const [day, setDay] = useState(today);
  const [open, setOpen] = useState<Recipe | null>(null);
  const meals = mealsForDay(day);
  const monday = addDays(new Date(), -today);

  return (
    <div>
      <PageTitle title="Meal plan" subtitle="Balanced, high-protein meals picked for your goals" />

      {/* Day picker */}
      <div className="mb-6 grid grid-cols-7 gap-1.5 rounded-2xl bg-card p-1.5 shadow-sm md:max-w-xl">
        {WEEKDAY_SHORT.map((d, i) => (
          <button
            key={d}
            onClick={() => setDay(i)}
            className={cn(
              'flex flex-col items-center rounded-xl py-2 text-xs transition-colors',
              i === day ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted',
            )}
          >
            {d}
            <span className="mt-0.5 text-base font-semibold">{addDays(monday, i).getDate()}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {meals.map((m) => (
          <button
            key={m.id}
            onClick={() => setOpen(m)}
            className="flex w-full min-w-0 items-center gap-4 rounded-xl border bg-card p-3 text-left shadow-sm transition-shadow hover:shadow-md md:flex-col md:items-stretch md:p-0"
          >
            <span className={cn('size-20 shrink-0 rounded-lg md:h-32 md:w-full md:rounded-none', toneClasses[m.tone].soft)} />
            <div className="min-w-0 flex-1 md:px-4 md:pb-4">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{m.mealType}</p>
              <p className="mt-1 font-semibold">{m.name}</p>
              <p className="truncate text-sm text-muted-foreground">{m.description}</p>
              <p className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Flame className="size-3.5" />{m.kcal} kcal</span>
                <span className="flex items-center gap-1"><Clock className="size-3.5" />{m.minutes} min</span>
              </p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground md:hidden" />
          </button>
        ))}
      </div>

      <RecipeSheet recipe={open} onClose={() => setOpen(null)} />
    </div>
  );
}

function RecipeSheet({ recipe, onClose }: { recipe: Recipe | null; onClose: () => void }) {
  const [swap, setSwap] = useState('none');

  return (
    <Drawer open={!!recipe} onOpenChange={(o) => !o && (onClose(), setSwap('none'))}>
      <DrawerContent className="mx-auto max-w-lg bg-card">
        {recipe && (
          <>
            <DrawerHeader className="text-left">
              <div className={cn('mb-3 h-28 rounded-xl', toneClasses[recipe.tone].soft)} />
              <DrawerTitle className="font-display text-2xl">{recipe.name}</DrawerTitle>
              <DrawerDescription>{recipe.description}</DrawerDescription>
              <div className="mt-2 flex gap-4 text-sm">
                <span><strong>{recipe.kcal}</strong> kcal</span>
                <span><strong>{recipe.protein}g</strong> protein</span>
                <span><strong>{recipe.minutes}</strong> min</span>
              </div>
            </DrawerHeader>
            <div className="overflow-y-auto px-4">
              <p className="mb-2 flex items-center gap-2 font-display text-lg font-semibold">
                <Shuffle className="size-4" /> Make it your own
              </p>
              <RadioGroup value={swap} onValueChange={setSwap} className="gap-0 divide-y rounded-xl border">
                {recipe.swaps.map((s) => (
                  <Label key={s.id} htmlFor={s.id} className="flex cursor-pointer items-center gap-3 px-4 py-3 font-normal">
                    <RadioGroupItem id={s.id} value={s.id} />
                    <span className="flex-1 font-medium">{s.label}</span>
                    <span className="text-xs text-muted-foreground">{s.detail}</span>
                  </Label>
                ))}
              </RadioGroup>
              <p className="mt-4 mb-1 text-sm font-semibold">Ingredients</p>
              <p className="text-sm text-muted-foreground">{recipe.ingredients.join(' · ')}</p>
            </div>
            <DrawerFooter>
              <Button
                size="lg"
                className="h-12 rounded-full"
                onClick={() => {
                  toast.success('Saved to your plan');
                  onClose();
                }}
              >
                Save to plan
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
