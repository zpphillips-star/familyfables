'use client';

import { useEffect } from 'react';
import { trackBookViewed } from '@/lib/analytics';

/**
 * Fires a book_viewed analytics event on mount.
 * Renders nothing — just a tracking side-effect component.
 */
export default function BookPageAnalytics({
  bookSlug,
  bookTitle,
}: {
  bookSlug: string;
  bookTitle: string;
}) {
  useEffect(() => {
    trackBookViewed(bookSlug, bookTitle);
  }, [bookSlug, bookTitle]);
  return null;
}
