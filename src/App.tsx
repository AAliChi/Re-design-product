/*
 * All the screens in the app and their web addresses.
 * Add a new screen by adding a <Route> below.
 */
import { HashRouter, Navigate, Route, Routes } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { AppStateProvider } from '@/state/AppState';
import { AppShell } from '@/layout/AppShell';
import { ScrollToTop } from '@/layout/ScrollToTop';
import { Today } from '@/screens/Today';
import { Classes } from '@/screens/Classes';
import { Meals } from '@/screens/Meals';
import { Coach } from '@/screens/Coach';
import { Account } from '@/screens/Account';
import { ManageSubscription } from '@/cancellation-flow/ManageSubscription';
import { PauseSubscription } from '@/cancellation-flow/PauseSubscription';
import { CancelStepPage } from '@/cancellation-flow/CancelStepPage';
import { OutcomePage } from '@/cancellation-flow/OutcomePage';

export default function App() {
  return (
    // HashRouter keeps addresses like /#/account working on any free host, with no extra setup.
    <HashRouter>
      <AppStateProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Today />} />
            <Route path="classes" element={<Classes />} />
            <Route path="meals" element={<Meals />} />
            <Route path="coach" element={<Coach />} />
            <Route path="account" element={<Account />} />

            {/* The subscription / cancellation flow */}
            <Route path="account/subscription" element={<ManageSubscription />} />
            <Route path="account/subscription/pause" element={<PauseSubscription />} />
            <Route path="account/subscription/cancel/:stepId" element={<CancelStepPage />} />
            <Route path="account/subscription/done/:outcome" element={<OutcomePage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </AppStateProvider>
    </HashRouter>
  );
}
