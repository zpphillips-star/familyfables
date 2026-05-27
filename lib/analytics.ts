'use client';

import { track } from '@vercel/analytics';

// ── LocalStorage event store for dashboard ────────────────────────────────────
const STORAGE_KEY = 'ff_analytics_events';
const MAX_EVENTS = 2000;

export interface AnalyticsEvent {
  event: string;
  props: Record<string, string | number>;
  timestamp: number;
}

function storeEvent(eventName: string, props: Record<string, string | number>) {
  if (typeof window === 'undefined') return;
  try {
    const existing: AnalyticsEvent[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );
    existing.push({ event: eventName, props, timestamp: Date.now() });
    // Keep last MAX_EVENTS events to avoid unbounded growth
    const trimmed = existing.slice(-MAX_EVENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // localStorage unavailable — silently skip
  }
}

export function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

// ── Tracking helpers ──────────────────────────────────────────────────────────

export function trackBookViewed(bookSlug: string, bookTitle: string) {
  track('book_viewed', { book: bookSlug, title: bookTitle });
  storeEvent('book_viewed', { book: bookSlug, title: bookTitle });
}

export function trackReadAloudStarted(bookSlug: string) {
  track('read_aloud_started', { book: bookSlug });
  storeEvent('read_aloud_started', { book: bookSlug });
}

export function trackReadAloudPageTurned(bookSlug: string, page: number) {
  track('read_aloud_page_turned', { book: bookSlug, page });
  storeEvent('read_aloud_page_turned', { book: bookSlug, page });
}

export function trackReadAloudCompleted(bookSlug: string) {
  track('read_aloud_completed', { book: bookSlug });
  storeEvent('read_aloud_completed', { book: bookSlug });
}

export function trackAmazonClick(bookSlug: string, bookTitle: string) {
  track('amazon_buy_clicked', { book: bookSlug, title: bookTitle });
  storeEvent('amazon_buy_clicked', { book: bookSlug, title: bookTitle });
}

export function trackBlogViewed(postSlug: string, postTitle: string) {
  track('blog_viewed', { post: postSlug, title: postTitle });
  storeEvent('blog_viewed', { post: postSlug, title: postTitle });
}
