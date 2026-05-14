'use client';

import { useRef, useState, useCallback } from 'react';

type Stage = 'disclaimer' | 'camera' | 'preview' | 'processing' | 'result';

export default function PooFaceCamera() {
  const [stage, setStage] = useState<Stage>('disclaimer');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [resultImage, setResultImage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStage('camera');
    } catch {
      setError('Camera not available. Try on a mobile device!');
    }
  };

  const capture = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    // Use fallback dimensions if videoWidth/videoHeight aren't ready
    const w = video.videoWidth || video.clientWidth || 640;
    const h = video.videoHeight || video.clientHeight || 480;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    // Mirror the image (selfie cameras are mirrored)
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);
    // Store the full data URL directly (don't split/rejoin)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setCapturedImage(dataUrl);
    // Stop camera stream
    streamRef.current?.getTracks().forEach(t => t.stop());
    setStage('preview');
  }, []);

  const transform = async () => {
    setStage('processing');
    try {
      // capturedImage is a full data URL — extract just the base64 part
      const base64 = capturedImage.includes(',') ? capturedImage.split(',')[1] : capturedImage;
      const res = await fetch('/api/poo-face', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64 }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setResultImage(data.imageUrl);
        setStage('result');
      } else {
        setError('Something went wrong. Try again!');
        setStage('preview');
      }
    } catch {
      setError('Connection error. Try again!');
      setStage('preview');
    }
  };

  const reset = () => {
    setStage('disclaimer');
    setCapturedImage('');
    setResultImage('');
    setError('');
  };

  const ff = "'Concert One', cursive";
  const ORANGE = '#ff9c1a';
  const PURPLE = '#78087c';

  // DISCLAIMER
  if (stage === 'disclaimer') {
    return (
      <div style={{ textAlign: 'center', padding: '32px 24px', maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📸</div>
        <h3 style={{ fontFamily: ff, fontSize: '2rem', color: PURPLE, marginBottom: '12px' }}>
          Make Your Poo Poo Face!
        </h3>
        <p style={{ color: '#3a0245', marginBottom: '8px', lineHeight: 1.6 }}>
          Make your funniest face and AI will turn it into a Poo Poo Face character!
        </p>
        <p style={{
          color: '#78087c',
          fontSize: '0.85rem',
          marginBottom: '28px',
          padding: '10px 16px',
          background: 'rgba(120,8,124,0.08)',
          borderRadius: '8px',
        }}>
          👨‍👩‍👧 <strong>For parents:</strong> This uses your camera briefly. Photos are processed by AI and never stored.
        </p>
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        <button
          onClick={startCamera}
          style={{
            background: ORANGE, color: '#fff', border: 'none',
            padding: '16px 48px', borderRadius: '50px',
            fontFamily: ff, fontSize: '1.2rem', cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(255,156,26,0.4)',
            letterSpacing: '0.05em',
          }}
        >
          Open Camera! 📷
        </button>
      </div>
    );
  }

  // CAMERA
  if (stage === 'camera') {
    return (
      <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto', padding: '16px' }}>
        <p style={{ fontFamily: ff, color: PURPLE, fontSize: '1.3rem', marginBottom: '12px' }}>
          Make your funniest face! 😜
        </p>
        <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: `4px solid ${PURPLE}` }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', display: 'block', transform: 'scaleX(-1)' }}
          />
        </div>
        <button
          onClick={capture}
          style={{
            marginTop: '20px',
            background: ORANGE, color: '#fff', border: 'none',
            padding: '18px 56px', borderRadius: '50px',
            fontFamily: ff, fontSize: '1.3rem', cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(255,156,26,0.4)',
          }}
        >
          📸 Capture!
        </button>
      </div>
    );
  }

  // PREVIEW
  if (stage === 'preview') {
    return (
      <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto', padding: '16px' }}>
        <p style={{ fontFamily: ff, color: PURPLE, fontSize: '1.3rem', marginBottom: '12px' }}>
          Looking good! Ready to transform? 🐉
        </p>
        <img src={capturedImage} alt="Your face" style={{ width: '100%', borderRadius: '20px', border: `4px solid ${PURPLE}` }} />
        {error && <p style={{ color: 'red', margin: '8px 0' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'center' }}>
          <button onClick={reset} style={{
            background: 'transparent', color: PURPLE, border: `2px solid ${PURPLE}`,
            padding: '14px 28px', borderRadius: '50px', fontFamily: ff, fontSize: '1rem', cursor: 'pointer',
          }}>
            Retake
          </button>
          <button onClick={transform} style={{
            background: PURPLE, color: '#fff', border: 'none',
            padding: '14px 32px', borderRadius: '50px', fontFamily: ff, fontSize: '1rem', cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(120,8,124,0.4)',
          }}>
            Make My Face! ✨
          </button>
        </div>
      </div>
    );
  }

  // PROCESSING
  if (stage === 'processing') {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px', maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ fontSize: '80px', animation: 'spin 1s linear infinite', display: 'inline-block' }}>🐉</div>
        <h3 style={{ fontFamily: ff, color: PURPLE, fontSize: '1.8rem', marginTop: '20px' }}>
          Working the dragon magic...
        </h3>
        <p style={{ color: '#3a0245', marginTop: '8px' }}>This takes about 10–15 seconds</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // RESULT
  return (
    <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto', padding: '16px' }}>
      <h3 style={{ fontFamily: ff, color: PURPLE, fontSize: '2rem', marginBottom: '16px' }}>
        Your Poo Poo Face! 🎉
      </h3>
      <img
        src={resultImage}
        alt="Your Poo Poo Face"
        style={{ width: '100%', borderRadius: '20px', border: `4px solid ${ORANGE}`, boxShadow: '0 8px 32px rgba(120,8,124,0.3)' }}
      />
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={reset} style={{
          background: 'transparent', color: PURPLE, border: `2px solid ${PURPLE}`,
          padding: '14px 24px', borderRadius: '50px', fontFamily: ff, fontSize: '0.95rem', cursor: 'pointer',
        }}>
          Try Again
        </button>
        <a
          href="https://www.amazon.com/dp/1951173163/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: ORANGE, color: '#fff', textDecoration: 'none',
            padding: '14px 24px', borderRadius: '50px', fontFamily: ff, fontSize: '0.95rem',
            boxShadow: '0 4px 20px rgba(255,156,26,0.4)',
          }}
        >
          Get the Book! 📚
        </a>
      </div>
    </div>
  );
}
