"""
Theme all book reader pages to match their book's color palette.
Replaces the generic cold-purple placeholder colors with per-book themed colors.
"""
import re, os

BASE = r"C:\Users\zaphilli\projects\familyfables\app\read"

# Each entry: (folder, start_bg_gradient, reader_bg, bar_bg, bar_bg2, border_rgba, btn_grad_start, btn_grad_end, btn_shadow_rgba, sparkle2, nav_rgba, nav_border_rgba, progress_rgba, read_aloud_rgba)
THEMES = {
    "amber-dragon-keeper": {
        "start_grad": "linear-gradient(160deg, #2d0a3a 0%, #5a1060 45%, #8b1a6b 100%)",
        "reader_bg": "#180422",
        "bar1": "rgba(20,5,40,0.8)",
        "bar2": "rgba(20,5,40,0.85)",
        "border": "rgba(232,107,181,0.18)",
        "btn_from": "#E86BB5", "btn_to": "#8b1a6b",
        "btn_shadow": "rgba(232,107,181,0.45)",
        "sparkle2": "#C0394A",
        "nav_bg": "rgba(232,107,181,0.25)",
        "nav_border": "rgba(232,107,181,0.45)",
        "progress": "rgba(232,107,181,0.55)",
        "read_aloud": "rgba(232,107,181,0.18)",
        "read_aloud_border": "rgba(232,107,181,0.45)",
    },
    "brian-the-ghost": {
        "start_grad": "linear-gradient(160deg, #10081e 0%, #22105a 45%, #3a1870 100%)",
        "reader_bg": "#0c0616",
        "bar1": "rgba(12,6,25,0.82)",
        "bar2": "rgba(12,6,25,0.88)",
        "border": "rgba(123,94,167,0.20)",
        "btn_from": "#9B8AD0", "btn_to": "#4a1a80",
        "btn_shadow": "rgba(123,94,167,0.45)",
        "sparkle2": "#B0E0FF",
        "nav_bg": "rgba(123,94,167,0.25)",
        "nav_border": "rgba(123,94,167,0.45)",
        "progress": "rgba(123,94,167,0.55)",
        "read_aloud": "rgba(123,94,167,0.18)",
        "read_aloud_border": "rgba(123,94,167,0.45)",
    },
    "dream-ideas": {
        "start_grad": "linear-gradient(160deg, #060214 0%, #120a50 45%, #2d1b80 100%)",
        "reader_bg": "#060214",
        "bar1": "rgba(6,2,20,0.82)",
        "bar2": "rgba(6,2,20,0.88)",
        "border": "rgba(91,155,213,0.18)",
        "btn_from": "#7BAED8", "btn_to": "#2d1b80",
        "btn_shadow": "rgba(91,155,213,0.45)",
        "sparkle2": "#9B8AFF",
        "nav_bg": "rgba(91,155,213,0.22)",
        "nav_border": "rgba(91,155,213,0.45)",
        "progress": "rgba(91,155,213,0.55)",
        "read_aloud": "rgba(91,155,213,0.18)",
        "read_aloud_border": "rgba(91,155,213,0.45)",
    },
    "finding-hampton": {
        "start_grad": "linear-gradient(160deg, #0e2210 0%, #1a4018 45%, #2d7025 100%)",
        "reader_bg": "#0a1a0c",
        "bar1": "rgba(10,26,12,0.82)",
        "bar2": "rgba(10,26,12,0.88)",
        "border": "rgba(92,184,92,0.18)",
        "btn_from": "#6DBF6D", "btn_to": "#1a4018",
        "btn_shadow": "rgba(92,184,92,0.45)",
        "sparkle2": "#A5D6A7",
        "nav_bg": "rgba(92,184,92,0.22)",
        "nav_border": "rgba(92,184,92,0.45)",
        "progress": "rgba(92,184,92,0.55)",
        "read_aloud": "rgba(92,184,92,0.18)",
        "read_aloud_border": "rgba(92,184,92,0.45)",
    },
    "frog-a-dog": {
        "start_grad": "linear-gradient(160deg, #0a1408 0%, #1a3a18 45%, #2a5a28 100%)",
        "reader_bg": "#080e08",
        "bar1": "rgba(8,14,8,0.82)",
        "bar2": "rgba(8,14,8,0.88)",
        "border": "rgba(74,155,53,0.18)",
        "btn_from": "#5DB840", "btn_to": "#1a3a18",
        "btn_shadow": "rgba(74,155,53,0.45)",
        "sparkle2": "#9B6FD0",
        "nav_bg": "rgba(74,155,53,0.22)",
        "nav_border": "rgba(74,155,53,0.45)",
        "progress": "rgba(74,155,53,0.55)",
        "read_aloud": "rgba(74,155,53,0.18)",
        "read_aloud_border": "rgba(74,155,53,0.45)",
    },
    "gilroys-gobble": {
        "start_grad": "linear-gradient(160deg, #3d1500 0%, #7a2e00 45%, #bf5600 100%)",
        "reader_bg": "#1a0800",
        "bar1": "rgba(30,10,0,0.82)",
        "bar2": "rgba(30,10,0,0.88)",
        "border": "rgba(244,168,57,0.18)",
        "btn_from": "#F4A839", "btn_to": "#e65100",
        "btn_shadow": "rgba(244,168,57,0.45)",
        "sparkle2": "#FF8C00",
        "nav_bg": "rgba(244,168,57,0.22)",
        "nav_border": "rgba(244,168,57,0.45)",
        "progress": "rgba(244,168,57,0.55)",
        "read_aloud": "rgba(244,168,57,0.18)",
        "read_aloud_border": "rgba(244,168,57,0.45)",
    },
    "ollie-come-home": {
        "start_grad": "linear-gradient(160deg, #0e1a0e 0%, #1e3a1a 45%, #3a6030 100%)",
        "reader_bg": "#0a1208",
        "bar1": "rgba(10,18,8,0.82)",
        "bar2": "rgba(10,18,8,0.88)",
        "border": "rgba(92,184,92,0.18)",
        "btn_from": "#6DB85C", "btn_to": "#2d4a20",
        "btn_shadow": "rgba(92,184,92,0.45)",
        "sparkle2": "#FFD0A0",
        "nav_bg": "rgba(92,184,92,0.22)",
        "nav_border": "rgba(92,184,92,0.45)",
        "progress": "rgba(92,184,92,0.55)",
        "read_aloud": "rgba(92,184,92,0.18)",
        "read_aloud_border": "rgba(92,184,92,0.45)",
    },
    "one-tom-turkey": {
        "start_grad": "linear-gradient(160deg, #2a0e00 0%, #7a3000 45%, #c05610 100%)",
        "reader_bg": "#180800",
        "bar1": "rgba(28,10,0,0.82)",
        "bar2": "rgba(28,10,0,0.88)",
        "border": "rgba(192,107,57,0.18)",
        "btn_from": "#E07B39", "btn_to": "#c05610",
        "btn_shadow": "rgba(192,107,57,0.45)",
        "sparkle2": "#C06B39",
        "nav_bg": "rgba(192,107,57,0.22)",
        "nav_border": "rgba(192,107,57,0.45)",
        "progress": "rgba(192,107,57,0.55)",
        "read_aloud": "rgba(192,107,57,0.18)",
        "read_aloud_border": "rgba(192,107,57,0.45)",
    },
    "the-shut-in-button": {
        "start_grad": "linear-gradient(160deg, #04122a 0%, #083060 45%, #0a509a 100%)",
        "reader_bg": "#02091a",
        "bar1": "rgba(4,12,35,0.82)",
        "bar2": "rgba(4,12,35,0.88)",
        "border": "rgba(91,155,213,0.18)",
        "btn_from": "#5B9BD5", "btn_to": "#0a509a",
        "btn_shadow": "rgba(91,155,213,0.45)",
        "sparkle2": "#A8D8EA",
        "nav_bg": "rgba(91,155,213,0.22)",
        "nav_border": "rgba(91,155,213,0.45)",
        "progress": "rgba(91,155,213,0.55)",
        "read_aloud": "rgba(91,155,213,0.18)",
        "read_aloud_border": "rgba(91,155,213,0.45)",
    },
}

CHANGES = 0

def theme_file(path, t):
    global CHANGES
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()

    orig = c

    # 1. Start screen gradient
    c = re.sub(
        r"linear-gradient\(160deg, #1a0a2e 0%, #2d1060 50%, #0d1f3c 100%\)",
        t["start_grad"], c
    )

    # 2. Reader background
    c = c.replace("background: '#0a0018',", f"background: '{t['reader_bg']}',")

    # 3. Top bar
    c = c.replace("background: 'rgba(0,0,0,0.6)',", f"background: '{t['bar1']}',")

    # 4. Bottom bar
    c = c.replace("background: 'rgba(0,0,0,0.7)',", f"background: '{t['bar2']}',")

    # 5. Border top
    c = c.replace(
        "borderTop: '1px solid rgba(255,255,255,0.08)',",
        f"borderTop: '1px solid {t['border']}',"
    )

    # 6. Start button gradient
    c = c.replace(
        "background: 'linear-gradient(135deg, #9B6FD0, #7C3AED)',",
        f"background: 'linear-gradient(135deg, {t['btn_from']}, {t['btn_to']})',"
    )

    # 7. Start button shadow
    c = c.replace(
        "boxShadow: '0 6px 24px rgba(155,111,208,0.5)',",
        f"boxShadow: '0 6px 24px {t['btn_shadow']}',"
    )

    # 8. Sparkle 2nd colour
    c = c.replace(
        "background: i % 2 === 0 ? ACCENT : '#9B6FD0',",
        f"background: i % 2 === 0 ? ACCENT : '{t['sparkle2']}',"
    )

    # 9a. Prev nav button bg
    c = c.replace(
        "background: pageIdx === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(155,111,208,0.3)',",
        f"background: pageIdx === 0 ? 'rgba(255,255,255,0.05)' : '{t['nav_bg']}',"
    )
    # 9b. Next nav button bg
    c = c.replace(
        "background: pageIdx === total - 1 ? 'rgba(255,255,255,0.05)' : 'rgba(155,111,208,0.3)',",
        f"background: pageIdx === total - 1 ? 'rgba(255,255,255,0.05)' : '{t['nav_bg']}',"
    )
    # 9c. Nav button borders (both)
    c = c.replace(
        "border: '1px solid rgba(155,111,208,0.4)',",
        f"border: '1px solid {t['nav_border']}',"
    )

    # 10. Progress dots
    c = c.replace(
        "i < pageIdx ? 'rgba(155,111,208,0.6)' : 'rgba(255,255,255,0.15)'",
        f"i < pageIdx ? '{t['progress']}' : 'rgba(255,255,255,0.12)'"
    )

    # 11. Read aloud button
    c = c.replace(
        "background: 'rgba(155,111,208,0.2)',",
        f"background: '{t['read_aloud']}',"
    )
    c = c.replace(
        "border: '1px solid rgba(155,111,208,0.4)',\n                color:",
        f"border: '1px solid {t['read_aloud_border']}',\n                color:"
    )

    if c != orig:
        CHANGES += 1
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(c)
        print(f"  ✅ Updated: {path}")
    else:
        print(f"  ⚠️  No changes: {path}")

for folder, t in THEMES.items():
    p = os.path.join(BASE, folder, "page.tsx")
    if os.path.exists(p):
        theme_file(p, t)
    else:
        print(f"  ❌ Missing: {p}")

print(f"\n{CHANGES} files updated.")
