import { useEffect } from 'react';
import { isTawkConfigured, loadTawkWidget } from '@/lib/tawk';

/**
 * Loads the Tawk.to live chat widget (the green bubble at the bottom right).
 * The widget is the single support entry point on the site.
 */
export default function TawkChat() {
  useEffect(() => {
    if (!isTawkConfigured()) return;
    const timer = window.setTimeout(() => {
      void loadTawkWidget();
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}