'use client';

import { useState } from 'react';

interface QuizOption {
  emoji: string;
  label: string;
  value: string;
}

interface QuizQuestion {
  situation: string;
  icon: string;
  options: QuizOption[];
}

interface QuizResult {
  title: string;
  emoji: string;
  description: string;
}

const questions: QuizQuestion[] = [
  {
    situation: 'Your little sibling ate the last cookie...',
    icon: '🍪',
    options: [
      { emoji: '😤', label: 'Furious!', value: 'angry' },
      { emoji: '😭', label: 'Devastated', value: 'sad' },
      { emoji: '🤨', label: 'Suspicious', value: 'cool' },
    ],
  },
  {
    situation: 'You just sat on a whoopee cushion at school...',
    icon: '💨',
    options: [
      { emoji: '😳', label: 'Mortified!', value: 'embarrassed' },
      { emoji: '😂', label: 'Cracking up!', value: 'silly' },
      { emoji: '😬', label: 'Playing it cool', value: 'cool' },
    ],
  },
  {
    situation: "Mom says it's bedtime RIGHT NOW...",
    icon: '🌙',
    options: [
      { emoji: '😤', label: 'NOT TIRED!', value: 'angry' },
      { emoji: '🥱', label: 'Fine, whatever', value: 'sad' },
      { emoji: '😈', label: 'Plotting escape', value: 'silly' },
    ],
  },
  {
    situation: 'You found a dragon in your backyard...',
    icon: '🐉',
    options: [
      { emoji: '😱', label: 'AHHHHH!', value: 'scared' },
      { emoji: '🤩', label: 'BEST. DAY. EVER!', value: 'excited' },
      { emoji: '🤔', label: 'Hmm, interesting', value: 'cool' },
    ],
  },
];

function getResult(answers: string[]): QuizResult {
  const counts: Record<string, number> = {};
  for (const a of answers) {
    counts[a] = (counts[a] ?? 0) + 1;
  }

  const lastAnswer = answers[3] ?? '';

  if (lastAnswer === 'excited' || counts['silly'] >= 2) {
    return {
      title: "The Wild 'n Wiggly",
      emoji: '🤩',
      description:
        "Pure chaos energy! Every day is an adventure and every face you make is MAXIMUM. You'd befriend that dragon on day one and teach it to make faces too.",
    };
  }
  if (lastAnswer === 'scared' || counts['embarrassed'] >= 1) {
    return {
      title: "The 'Oh No No No'",
      emoji: '😱',
      description:
        "You feel ALL the feelings, loudly, and your face gives everything away. That's what makes you the most fun at parties. You'd scream at the dragon... then immediately want to pet it.",
    };
  }
  if ((counts['angry'] ?? 0) >= 2) {
    return {
      title: 'The Seriously Steaming',
      emoji: '😤',
      description:
        "Big opinions, zero chill. Your face could stop traffic. You know what you want and you make it VERY clear. The dragon better not touch your snacks.",
    };
  }
  return {
    title: "The Cool 'n Curious",
    emoji: '🤔',
    description:
      "Mysterious. Strategic. Your face reveals nothing — unless it's really worth it. You'd definitely try to train the dragon rather than run from it.",
  };
}

export default function PooFaceQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [pressed, setPressed] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const ff = "'Concert One', var(--font-concert-one), cursive";

  const handleAnswer = (value: string, idx: number) => {
    if (pressed !== null) return;
    setPressed(idx);
    setTimeout(() => {
      setPressed(null);
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
      } else {
        setDone(true);
      }
    }, 300);
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setDone(false);
    setPressed(null);
  };

  const result = done ? getResult(answers) : null;

  if (done && result) {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #d9b7e5 0%, #f3e0ff 100%)',
          borderRadius: '24px',
          padding: '40px 28px',
          maxWidth: '480px',
          margin: '0 auto',
          textAlign: 'center',
          border: '3px solid #78087c',
          boxShadow: '0 12px 48px rgba(120,8,124,0.2)',
        }}
      >
        <div style={{ fontSize: '4.5rem', marginBottom: '8px', lineHeight: 1 }}>
          {result.emoji}
        </div>
        <p
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '0.8rem',
            color: '#78087c',
            marginBottom: '4px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 700,
            margin: '0 0 6px',
          }}
        >
          You are...
        </p>
        <h3
          style={{
            fontFamily: ff,
            fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            color: '#3a0245',
            marginBottom: '16px',
            lineHeight: 1.1,
            margin: '0 0 16px',
          }}
        >
          {result.title}
        </h3>
        <p
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '1rem',
            color: '#3a0245',
            lineHeight: 1.75,
            marginBottom: '28px',
          }}
        >
          {result.description}
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <a
            href="https://www.amazon.com/dp/1951173163/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#ff9c1a',
              color: '#ffffff',
              borderRadius: '10px',
              padding: '14px 28px',
              fontFamily: ff,
              fontSize: '1rem',
              textDecoration: 'none',
              minHeight: '52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(255,156,26,0.4)',
            }}
          >
            Meet all the faces in the book →
          </a>
          <button
            onClick={reset}
            style={{
              background: 'rgba(255,255,255,0.55)',
              color: '#78087c',
              border: '2px solid #78087c',
              borderRadius: '10px',
              padding: '10px 28px',
              fontFamily: ff,
              fontSize: '0.95rem',
              cursor: 'pointer',
              minHeight: '48px',
            }}
          >
            Try Again 🔄
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto' }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {questions.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '8px',
              borderRadius: '4px',
              background: i <= currentQ ? '#78087c' : 'rgba(120,8,124,0.2)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>

      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px 24px',
          border: '3px solid #d9b7e5',
          boxShadow: '0 8px 32px rgba(120,8,124,0.12)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '3.5rem', marginBottom: '16px', lineHeight: 1 }}>
          {q.icon}
        </div>
        <p
          style={{
            fontFamily: ff,
            fontSize: 'clamp(1.05rem, 3vw, 1.35rem)',
            color: '#3a0245',
            marginBottom: '8px',
            lineHeight: 1.3,
          }}
        >
          {q.situation}
        </p>
        <p
          style={{
            color: '#78087c',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '24px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          your face is...
        </p>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt.value, idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '18px 16px',
                background:
                  pressed === idx ? '#f3e0ff' : 'rgba(217,183,229,0.15)',
                border: `2px solid ${pressed === idx ? '#78087c' : '#d9b7e5'}`,
                borderRadius: '16px',
                cursor: 'pointer',
                minWidth: '88px',
                minHeight: '110px',
                transition: 'all 0.15s ease',
                transform: pressed === idx ? 'scale(0.92)' : 'scale(1)',
                flex: '1 0 80px',
                maxWidth: '130px',
              }}
            >
              <span style={{ fontSize: '2.6rem', lineHeight: 1 }}>{opt.emoji}</span>
              <span
                style={{
                  fontFamily: ff,
                  fontSize: '0.78rem',
                  color: '#3a0245',
                  lineHeight: 1.2,
                  textAlign: 'center',
                }}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p
        style={{
          textAlign: 'center',
          color: 'rgba(120,8,124,0.5)',
          fontSize: '0.82rem',
          marginTop: '12px',
          fontFamily: ff,
        }}
      >
        Question {currentQ + 1} of {questions.length}
      </p>
    </div>
  );
}
