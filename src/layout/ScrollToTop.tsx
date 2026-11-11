import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** Scrolls back to the top whenever you move to a new screen. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
