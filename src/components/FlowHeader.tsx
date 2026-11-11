import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

/** The top bar on flow screens: a back arrow and a title. */
export function FlowHeader({ title, backTo }: { title: string; backTo: string }) {
  return (
    <header className="sticky top-0 z-20 -mx-4 mb-4 grid grid-cols-[2.5rem_1fr_2.5rem] items-center bg-background/90 px-2 py-2 backdrop-blur md:static md:mx-0 md:mb-6 md:bg-transparent md:px-0 md:backdrop-blur-none">
      <Button asChild variant="ghost" size="icon" className="rounded-full" aria-label="Back">
        <Link to={backTo}>
          <ChevronLeft className="size-5" />
        </Link>
      </Button>
      <h1 className="truncate text-center font-sans text-base font-semibold tracking-normal">{title}</h1>
      <span />
    </header>
  );
}
