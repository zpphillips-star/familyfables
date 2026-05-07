"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#F0EBF8" }}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-5xl mb-4 sparkle inline-block">💌</div>
        <h2
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{
            fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
            color: "#2D1B69",
          }}
        >
          Get in on the silliness 📬
        </h2>
        <p className="text-base mb-8" style={{ color: "#7B6898" }}>
          New books, printables, and dad jokes delivered to your inbox. First Friday of every month. Unsubscribe if you hate fun.
        </p>

        {submitted ? (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: "#6B3FA0", color: "white" }}
          >
            <div className="text-4xl mb-3">🎉</div>
            <p className="font-bold text-lg">You&apos;re in the family now!</p>
            <p className="text-sm mt-1 opacity-80">
              Watch your inbox for magical updates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3.5 rounded-xl text-base outline-none border-2 focus:border-purple-400 transition-colors"
              style={{
                borderColor: "#C8B4E8",
                color: "#2D1B69",
                backgroundColor: "white",
              }}
            />
            <button
              type="submit"
              className="btn-shine px-7 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:shadow-lg whitespace-nowrap"
              style={{ backgroundColor: "#6B3FA0" }}
            >
              Count me in →
            </button>
          </form>
        )}

        <p className="text-xs mt-4" style={{ color: "#9B8AC4" }}>
          No spam. Just wholesome chaos. Unsubscribe anytime (we&apos;ll understand).
        </p>
      </div>
    </section>
  );
}
