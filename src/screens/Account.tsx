/*
 * AS-IS SCREEN: Account Settings
 * ------------------------------------------------------------------
 * Step 1 of the brief: the user has to find "Manage Subscription"
 * here. It is deliberately not labelled "Cancel", and it sits in the
 * middle of a list of other settings.
 */
import {
  Bell,
  ChevronRight,
  CircleHelp,
  CreditCard,
  LogOut,
  Ruler,
  Shield,
  Smartphone,
  UserRound,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAppState } from '@/state/AppState';
import { flowConfig } from '@/cancellation-flow/flow.config';
import { addDays } from '@/utils/format';

interface Row {
  label: string;
  icon: LucideIcon;
  to?: string;
}

export function Account() {
  const { persona, subscription } = useAppState();
  const memberSince = addDays(new Date(), -persona.tenureMonths * 30).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const groups: { title: string; rows: Row[] }[] = [
    {
      title: 'Account',
      rows: [
        { label: 'Personal information', icon: UserRound },
        { label: 'Notifications', icon: Bell },
        { label: 'Connected devices', icon: Smartphone },
        { label: flowConfig.settingsEntryLabel, icon: Wallet, to: '/account/subscription' },
        { label: 'Payment methods', icon: CreditCard },
      ],
    },
    {
      title: 'Preferences',
      rows: [
        { label: 'Units & measurements', icon: Ruler },
        { label: 'Privacy', icon: Shield },
      ],
    },
    {
      title: 'Support',
      rows: [
        { label: 'Help centre', icon: CircleHelp },
        { label: 'Log out', icon: LogOut },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex items-center gap-4">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand font-display text-2xl font-semibold text-brand-foreground">
          {persona.name[0]}
        </span>
        <div>
          <h1 className="text-2xl font-semibold">{persona.name}</h1>
          <p className="text-sm text-muted-foreground">
            {persona.city}, {persona.stateCode} · Member since {memberSince}
          </p>
          <Badge className="mt-2 bg-brand-soft text-brand">
            {persona.plan.name}
            {subscription.status !== 'active' && ` · ${subscription.status}`}
          </Badge>
        </div>
      </div>

      <h2 className="mb-3 font-sans text-sm font-semibold tracking-normal text-muted-foreground">Account Settings</h2>
      <div className="space-y-5">
        {groups.map((g) => (
          <section key={g.title}>
            <p className="mb-2 px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">{g.title}</p>
            <Card className="gap-0 py-1">
              <CardContent className="divide-y px-0">
                {g.rows.map((row) => (
                  <SettingsRow key={row.label} row={row} />
                ))}
              </CardContent>
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
}

function SettingsRow({ row }: { row: Row }) {
  const inner = (
    <>
      <row.icon className="size-5 text-muted-foreground" />
      <span className="flex-1 text-sm">{row.label}</span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </>
  );
  const className = 'flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-muted/50';

  return row.to ? (
    <Link to={row.to} className={className}>
      {inner}
    </Link>
  ) : (
    <button className={className} onClick={() => toast(`"${row.label}" isn't part of this prototype`)}>
      {inner}
    </button>
  );
}
