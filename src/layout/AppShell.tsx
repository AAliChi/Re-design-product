/*
 * The frame around every screen.
 *   • Phones / small screens: a top bar and a bottom tab bar
 *   • Tablets / desktops (768px+): a sidebar on the left
 * The bottom tab bar hides during the subscription flow, like most apps.
 */
import { Bell, Dumbbell, House, MessageCircle, Salad, UserRound, type LucideIcon } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/state/AppState';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

const NAV: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/', label: 'Today', icon: House },
  { to: '/classes', label: 'Classes', icon: Dumbbell },
  { to: '/meals', label: 'Meals', icon: Salad },
  { to: '/coach', label: 'Coach', icon: MessageCircle },
  { to: '/account', label: 'Account', icon: UserRound },
];

export function AppShell() {
  const { pathname } = useLocation();
  const inFlow = pathname.startsWith('/account/subscription');

  return (
    <div className="min-h-dvh md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        {!inFlow && <MobileTopBar />}
        <main
          className={cn(
            'mx-auto w-full max-w-6xl px-4 pt-2 md:px-10 md:pt-10',
            inFlow ? 'pb-24' : 'pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-12',
          )}
        >
          <Outlet />
        </main>
      </div>

      {!inFlow && <BottomNav />}
    </div>
  );
}

function Sidebar() {
  const { persona } = useAppState();
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r bg-card/60 px-4 py-6 md:flex">
      <Link to="/" className="px-3">
        <Logo />
      </Link>
      <nav className="mt-8 flex flex-col gap-1">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )
            }
          >
            <Icon className="size-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>
      <Link to="/account" className="mt-auto flex items-center gap-3 rounded-xl p-2 hover:bg-muted">
        <span className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
          {persona.name[0]}
        </span>
        <span className="text-sm">
          <span className="block font-medium">{persona.name}</span>
          <span className="block text-xs text-muted-foreground">{persona.plan.name}</span>
        </span>
      </Link>
    </aside>
  );
}

function MobileTopBar() {
  const { persona } = useAppState();
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-background/90 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 backdrop-blur md:hidden">
      <Logo />
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications" onClick={() => toast('No new notifications')}>
          <Bell className="size-5" />
        </Button>
        <Link
          to="/account"
          aria-label="Account"
          className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground"
        >
          {persona.name[0]}
        </Link>
      </div>
    </header>
  );
}

function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium',
                isActive ? 'text-foreground' : 'text-muted-foreground',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="size-5" strokeWidth={isActive ? 2.4 : 1.8} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
