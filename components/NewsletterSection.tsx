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
    <section
      className="py-20 px-4"
      style={{
        backgroundColor: "#12111a",
        borderTop: "1px solid #2e2a42",
        borderBottom: "1px solid #2e2a42",
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-4xl mb-4 float-slow inline-block" aria-hidden>🪶</div>
        <div className="eyebrow mb-4">Stay in the Story</div>
        <h2
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{
            fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
            color: "#f0ece4",
          }}
        >
          Join the Family Fables Circle
        </h2>
        <p className="text-base mb-8" style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}>
          Be first to know about new books, the stories behind the stories, and
          rare dispatches from the collection. No noise — just legacy.
        </p>

        {submitted ? (
          <div
            className="rounded-xl p-8 text-center border"
            style={{
              backgroundColor: "#1e1c2e",
              borderColor: "#c9a84c",
              boxShadow: "0 0 30px rgba(201,168,76,0.08)",
            }}
          >
            <div className="text-4xl mb-3">🐦‍⬛</div>
            <p
              className="font-bold text-lg"
              style={{ color: "#f0ece4", fontFamily: "var(--font-fredoka), cursive" }}
            >
              You&apos;re in the circle now.
            </p>
            <p className="text-sm mt-1" style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}>
              Watch your inbox for dispatches from the collection.
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
              className="flex-1 px-5 py-3.5 rounded-xl text-base border-2 transition-colors"
              style={{
                borderColor: "#2e2a42",
                color: "#f0ece4",
                backgroundColor: "#1e1c2e",
                fontFamily: "var(--font-lora), serif",
              }}
            />
            <button
              type="submit"
              className="btn-shine px-7 py-3.5 rounded-xl font-bold transition-all hover:opacity-90 hover:shadow-lg whitespace-nowrap"
              style={{
                backgroundColor: "#c9a84c",
                color: "#0f0e17",
                fontFamily: "var(--font-fredoka), cursive",
              }}
            >
              Subscribe →
            </button>
          </form>
        )}

        <p className="text-xs mt-4" style={{ color: "#2e2a42", letterSpacing: "0.06em" }}>
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
