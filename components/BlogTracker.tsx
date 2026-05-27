'use client';

import { useEffect } from 'react';
import { trackBlogViewed } from '@/lib/analytics';

export default function BlogTracker({ postSlug, postTitle }: { postSlug: string; postTitle: string }) {
  useEffect(() => {
    trackBlogViewed(postSlug, postTitle);
  }, [postSlug, postTitle]);
  return null;
}
