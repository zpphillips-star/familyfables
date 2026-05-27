'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getStoredEvents, AnalyticsEvent } from '@/lib/analytics';

// ── Types ──────────────────────────────────────────────────────────────────────
type TimeRange = 'today' | 'week' | 'month';

interface BookStats {
  slug: string;
  starts: number;
  completions: number;
  amazonClicks: number;
  pageTurns: Record<number, number>; // page number → count
  maxPage: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function getTimeFilter(range: TimeRange): number {
  const now = Date.now();
  if (range === 'today') return now - 24 * 60 * 60 * 1000;
  if (range === 'week') return now - 7 * 24 * 60 * 60 * 1000;
  return now - 30 * 24 * 60 * 60 * 1000;
}

function filterByTime(events: AnalyticsEvent[], range: TimeRange): AnalyticsEvent[] {
  const cutoff = getTimeFilter(range);
  return events.filter(e => e.timestamp >= cutoff);
}

function slugToTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ── SVG Bar Chart ─────────────────────────────────────────────────────────────
function BarChart({
  data,
  color = '#6366f1',
  height = 120,
}: {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
}) {
  if (!data.length) return <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>No data yet</p>;
  const max = Math.max(...data.map(d => d.value), 1);
  const barWidth = Math.max(24, Math.min(60, Math.floor(500 / data.length) - 8));

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg
        width={Math.max(400, data.length * (barWidth + 8))}
        height={height + 40}
        style={{ display: 'block' }}
      >
        {data.map((d, i) => {
          const barH = Math.max(2, Math.round((d.value / max) * height));
          const x = i * (barWidth + 8) + 4;
          const y = height - barH;
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={4}
                fill={color}
                opacity={0.85}
              />
              <text
                x={x + barWidth / 2}
                y={height + 14}
                textAnchor="middle"
                fontSize={10}
                fill="rgba(255,255,255,0.6)"
              >
                {d.label.length > 10 ? d.label.slice(0, 9) + '…' : d.label}
              </text>
              <text
                x={x + barWidth / 2}
                y={y - 4}
                textAnchor="middle"
                fontSize={11}
                fill="rgba(255,255,255,0.85)"
                fontWeight="bold"
              >
                {d.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon }: { label: string; value: string | number; sub?: string; icon: string }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 16,
      padding: '20px 24px',
      flex: '1 1 160px',
      minWidth: 140,
    }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 4, fontFamily: "'Concert One', cursive" }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ── Funnel Bar ────────────────────────────────────────────────────────────────
function FunnelBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
        <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>{pct}% <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>({value})</span></span>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
        <div style={{ background: color, width: `${pct}%`, height: '100%', borderRadius: 4, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  // Load events from localStorage
  useEffect(() => {
    setEvents(getStoredEvents());
  }, []);

  // Password check
  const handleLogin = () => {
    if (password === 'familyfables2024') {
      setAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Try again.');
    }
  };

  // Filtered events for selected time range
  const filtered = useMemo(() => filterByTime(events, timeRange), [events, timeRange]);

  // Aggregate stats
  const stats = useMemo(() => {
    const bookMap: Record<string, BookStats> = {};

    const ensureBook = (slug: string) => {
      if (!bookMap[slug]) {
        bookMap[slug] = { slug, starts: 0, completions: 0, amazonClicks: 0, pageTurns: {}, maxPage: 0 };
      }
    };

    filtered.forEach(e => {
      const book = (e.props.book as string) || '';
      if (!book) return;
      ensureBook(book);

      if (e.event === 'read_aloud_started') bookMap[book].starts++;
      else if (e.event === 'read_aloud_completed') bookMap[book].completions++;
      else if (e.event === 'amazon_buy_clicked') bookMap[book].amazonClicks++;
      else if (e.event === 'read_aloud_page_turned') {
        const page = e.props.page as number;
        bookMap[book].pageTurns[page] = (bookMap[book].pageTurns[page] || 0) + 1;
        if (page > bookMap[book].maxPage) bookMap[book].maxPage = page;
      }
    });

    return Object.values(bookMap).sort((a, b) => b.starts - a.starts);
  }, [filtered]);

  const totalPageViews = useMemo(() =>
    filtered.filter(e => e.event === 'book_viewed' || e.event === 'blog_viewed').length,
    [filtered]
  );
  const totalStarts = useMemo(() => filtered.filter(e => e.event === 'read_aloud_started').length, [filtered]);
  const totalCompletions = useMemo(() => filtered.filter(e => e.event === 'read_aloud_completed').length, [filtered]);
  const totalAmazonClicks = useMemo(() => filtered.filter(e => e.event === 'amazon_buy_clicked').length, [filtered]);

  const topBooksBarData = stats.slice(0, 8).map(b => ({
    label: slugToTitle(b.slug).split(' ')[0],
    value: b.starts,
  }));

  // ── Password Gate ──────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#050212',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 24,
          padding: '48px 40px',
          width: '100%',
          maxWidth: 420,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
          <h1 style={{
            fontFamily: "'Concert One', cursive",
            fontSize: 28,
            color: '#fff',
            marginBottom: 8,
          }}>
            Analytics Dashboard
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 32 }}>
            Family Fables internal use only
          </p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              fontSize: 16,
              marginBottom: 12,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {passwordError && (
            <p style={{ color: '#f87171', fontSize: 13, marginBottom: 12 }}>{passwordError}</p>
          )}
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Unlock Dashboard →
          </button>
          <div style={{ marginTop: 24 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textDecoration: 'none' }}>
              ← Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard UI ───────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: '#050212',
      color: '#fff',
      fontFamily: "'Open Sans', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0d0620 0%, #1a0a36 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Concert One', cursive",
            fontSize: 'clamp(22px, 4vw, 32px)',
            margin: 0,
            color: '#fff',
          }}>
            📊 Family Fables Analytics
          </h1>
          <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
            Internal dashboard — {events.length} total events tracked
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['today', 'week', 'month'] as TimeRange[]).map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              style={{
                padding: '8px 18px',
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.2)',
                background: timeRange === r ? 'rgba(99,102,241,0.8)' : 'rgba(255,255,255,0.06)',
                color: timeRange === r ? '#fff' : 'rgba(255,255,255,0.6)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {r === 'today' ? 'Today' : r === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>

        {/* ── Traffic Overview Cards ─────────────────────────────────────── */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
            Traffic Overview
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <StatCard icon="👁️" label="Content Views" value={totalPageViews} sub="Books + blog pages viewed" />
            <StatCard icon="📖" label="Read-Alouds Started" value={totalStarts} sub="Readers who hit play" />
            <StatCard icon="🏁" label="Completions" value={totalCompletions} sub="Finished the whole book" />
            <StatCard icon="🛒" label="Amazon Clicks" value={totalAmazonClicks} sub="Buy button taps" />
          </div>

          {/* Vercel API Placeholder */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.08) 100%)',
            border: '1px dashed rgba(99,102,241,0.4)',
            borderRadius: 16,
            padding: '20px 24px',
          }}>
            <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
              <span style={{ color: '#818cf8', fontWeight: 700 }}>🔌 Connect Vercel Analytics API</span>
              {' '}to see real-time page views, unique visitors, top pages, referrers, and geographic data here.
              Go to <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8' }}>vercel.com/dashboard</a>
              {' '}→ Your Project → Analytics → enable &amp; get API token. Then add{' '}
              <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>VERCEL_ANALYTICS_TOKEN</code>
              {' '}to your environment variables.
            </p>
          </div>
        </section>

        {/* ── Top Books Chart ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
            Top Books by Read-Aloud Starts
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '24px',
          }}>
            {topBooksBarData.length > 0 ? (
              <BarChart data={topBooksBarData} color="#6366f1" height={120} />
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0', color: 'rgba(255,255,255,0.4)' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📚</div>
                <p style={{ fontSize: 14 }}>No read-aloud data yet. Once readers start a book, stats will appear here.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Top Books Table ────────────────────────────────────────────── */}
        {stats.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
              Book Rankings
            </h2>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              overflow: 'hidden',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>
                    {['#', 'Book', '▶ Starts', '🏁 Completions', '% Complete', '🛒 Amazon Clicks'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.map((book, i) => {
                    const completionRate = book.starts > 0 ? Math.round((book.completions / book.starts) * 100) : 0;
                    return (
                      <tr key={book.slug} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{i + 1}</td>
                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>{slugToTitle(book.slug)}</td>
                        <td style={{ padding: '12px 16px', color: '#818cf8', fontWeight: 700 }}>{book.starts}</td>
                        <td style={{ padding: '12px 16px', color: '#34d399', fontWeight: 700 }}>{book.completions}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 6, minWidth: 60 }}>
                              <div style={{ background: completionRate > 50 ? '#34d399' : completionRate > 25 ? '#fbbf24' : '#f87171', width: `${completionRate}%`, height: '100%', borderRadius: 4 }} />
                            </div>
                            <span style={{ color: 'rgba(255,255,255,0.7)', minWidth: 32 }}>{completionRate}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#fb923c', fontWeight: 700 }}>{book.amazonClicks}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Read Completion Funnel ─────────────────────────────────────── */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
            Read Completion Funnels
          </h2>
          {stats.length === 0 ? (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '32px',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.4)',
            }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>📊</div>
              <p style={{ fontSize: 14 }}>Funnel data will appear after readers start using the read-aloud feature.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {stats.slice(0, 6).map(book => (
                <div key={book.slug} style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: '20px',
                }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'rgba(255,255,255,0.85)' }}>
                    {slugToTitle(book.slug)}
                  </h3>
                  <FunnelBar
                    label="Started"
                    value={book.starts}
                    total={book.starts}
                    color="#6366f1"
                  />
                  <FunnelBar
                    label="Reached Page 2"
                    value={book.pageTurns[2] || 0}
                    total={book.starts}
                    color="#8b5cf6"
                  />
                  <FunnelBar
                    label="Reached Page 5"
                    value={book.pageTurns[5] || 0}
                    total={book.starts}
                    color="#a78bfa"
                  />
                  <FunnelBar
                    label="Completed"
                    value={book.completions}
                    total={book.starts}
                    color="#34d399"
                  />
                  {book.amazonClicks > 0 && (
                    <FunnelBar
                      label="Amazon Click"
                      value={book.amazonClicks}
                      total={book.starts}
                      color="#fb923c"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Blog Views ────────────────────────────────────────────────── */}
        {(() => {
          const blogEvents = filtered.filter(e => e.event === 'blog_viewed');
          const blogCounts: Record<string, number> = {};
          blogEvents.forEach(e => {
            const post = (e.props.post as string) || 'unknown';
            blogCounts[post] = (blogCounts[post] || 0) + 1;
          });
          const blogData = Object.entries(blogCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([slug, count]) => ({ label: slug.replace(/-/g, ' ').slice(0, 20), value: count }));

          if (!blogData.length) return null;

          return (
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
                Blog Post Views
              </h2>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: '24px',
              }}>
                <BarChart data={blogData} color="#f472b6" height={100} />
              </div>
            </section>
          );
        })()}

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', paddingBottom: 40, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginBottom: 8 }}>
            Data sourced from browser localStorage. Resets when storage is cleared.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, textDecoration: 'none' }}>
              ← Back to Site
            </Link>
            <button
              onClick={() => setAuthenticated(false)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 13, cursor: 'pointer' }}
            >
              🔒 Lock Dashboard
            </button>
            <button
              onClick={() => {
                if (confirm('Clear all locally stored analytics events? This cannot be undone.')) {
                  localStorage.removeItem('ff_analytics_events');
                  setEvents([]);
                }
              }}
              style={{ background: 'none', border: 'none', color: 'rgba(248,113,113,0.5)', fontSize: 13, cursor: 'pointer' }}
            >
              🗑️ Clear Local Data
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
