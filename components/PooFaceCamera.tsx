'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

type Stage = 'disclaimer' | 'camera' | 'preview' | 'processing' | 'result';

const FF = "'Concert One', cursive";
const ORANGE = '#ff9c1a';
const PURPLE = '#78087c';

export default function PooFaceCamera() {
  const [stage, setStage] = useState<Stage>('disclaimer');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [resultImage, setResultImage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [videoReady, setVideoReady] = useState(false);
  const [progressMsg, setProgressMsg] = useState('Warming up the dragon magic...');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const readyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── KEY FIX: attach stream AFTER video element mounts ─────────────────────
  // When stage transitions to 'camera', videoRef.current is now valid.
  useEffect(() => {
    if (stage === 'camera' && videoRef.current && streamRef.current) {
      const video = videoRef.current;
      video.srcObject = streamRef.current;
      video.play().catch(() => {/* autoplay may need user gesture — that's OK */});
    }
  }, [stage]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
      if (pollRef.current)  clearTimeout(pollRef.current);
      if (readyTimerRef.current) clearTimeout(readyTimerRef.current);
    };
  }, []);

  const startCamera = async () => {
    setError('');
    setVideoReady(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      // Don't set srcObject here — video element doesn't exist yet.
      // The useEffect above handles it after setStage rerenders the video.
      setStage('camera');
    } catch (err) {
      const msg = (err instanceof Error) ? err.message : String(err);
      if (msg.includes('Permission') || msg.includes('denied')) {
        setError('Camera permission denied. Allow camera access in your browser settings.');
      } else {
        setError('Camera not available. Make sure you\'re on HTTPS and allow camera access.');
      }
    }
  };

  const handleVideoReady = useCallback(() => {
    setVideoReady(true);
    if (readyTimerRef.current) clearTimeout(readyTimerRef.current);
  }, []);

  // Fallback: mark ready after 4s even if events don't fire (some Android browsers)
  useEffect(() => {
    if (stage === 'camera') {
      readyTimerRef.current = setTimeout(() => setVideoReady(true), 4000);
    }
    return () => { if (readyTimerRef.current) clearTimeout(readyTimerRef.current); };
  }, [stage]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const w = video.videoWidth  || video.clientWidth  || 640;
    const h = video.videoHeight || video.clientHeight || 480;
    if (w === 0 || h === 0) {
      setError('Camera still warming up — try again in a moment.');
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    // Quick sanity: a valid image has >1KB of data
    if (dataUrl.length < 1500) {
      setError('Got a blank frame — wait a moment and try again.');
      return;
    }
    setCapturedImage(dataUrl);
    streamRef.current?.getTracks().forEach(t => t.stop());
    setError('');
    setStage('preview');
  }, []);

  // ── Client-side polling (avoids Vercel 10s timeout) ────────────────────────
  const pollStatus = useCallback(async (requestId: string, attempts = 0) => {
    if (attempts > 45) {
      setError('Taking too long. Try again!');
      setStage('preview');
      return;
    }
    if (attempts === 5)  setProgressMsg('Almost there...');
    if (attempts === 12) setProgressMsg('The dragon is working hard...');
    if (attempts === 22) setProgressMsg('Putting the final touches on your face...');

    try {
      const res = await fetch(`/api/poo-face?id=${encodeURIComponent(requestId)}`);
      const data = await res.json();

      if (data.status === 'COMPLETED') {
        if (data.imageUrl) {
          setResultImage(data.imageUrl);
          setStage('result');
        } else {
          setError('Got a result but no image. Try again!');
          setStage('preview');
        }
        return;
      }
      if (data.status === 'FAILED' || data.status === 'ERROR') {
        setError('AI processing failed. Try again!');
        setStage('preview');
        return;
      }
      pollRef.current = setTimeout(() => pollStatus(requestId, attempts + 1), 2000);
    } catch {
      setError('Connection error. Try again!');
      setStage('preview');
    }
  }, []);

  const transform = async () => {
    setStage('processing');
    setProgressMsg('Warming up the dragon magic...');
    try {
      const base64 = capturedImage.includes(',') ? capturedImage.split(',')[1] : capturedImage;
      const res = await fetch('/api/poo-face', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64 }),
      });
      const data = await res.json();
      if (!res.ok || !data.requestId) {
        setError(data.error || 'Failed to start. Try again!');
        setStage('preview');
        return;
      }
      pollStatus(data.requestId, 0);
    } catch {
      setError('Connection error. Try again!');
      setStage('preview');
    }
  };

  // ── Save to phone ──────────────────────────────────────────────────────────
  const saveImage = async () => {
    // Try Web Share API first — this triggers native "Save to Photos" on iOS/Android
    if (navigator.share && navigator.canShare) {
      try {
        const blob = await (await fetch(resultImage)).blob();
        const file = new File([blob], 'my-poo-poo-face.png', { type: blob.type });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Poo Poo Face! 💩',
            text: 'Check out my Poo Poo Face from Family Fables!',
          });
          return;
        }
      } catch { /* fall through to download */ }
    }
    // Fallback: trigger download
    const a = document.createElement('a');
    a.href = resultImage;
    a.download = 'my-poo-poo-face.png';
    a.target = '_blank';
    a.click();
  };

  const reset = () => {
    if (pollRef.current) clearTimeout(pollRef.current);
    if (readyTimerRef.current) clearTimeout(readyTimerRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    setStage('disclaimer');
    setCapturedImage('');
    setResultImage('');
    setError('');
    setVideoReady(false);
  };

  // ── DISCLAIMER ─────────────────────────────────────────────────────────────
  if (stage === 'disclaimer') return (
    <div style={{ textAlign: 'center', padding: '32px 24px', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>📸</div>
      <h3 style={{ fontFamily: FF, fontSize: '2rem', color: PURPLE, marginBottom: '12px' }}>
        Make Your Poo Poo Face!
      </h3>
      <p style={{ color: '#3a0245', marginBottom: '8px', lineHeight: 1.6 }}>
        Make your funniest face and AI will turn it into a Poo Poo Face character!
      </p>
      <p style={{
        color: PURPLE, fontSize: '0.85rem', marginBottom: '28px',
        padding: '10px 16px', background: 'rgba(120,8,124,0.08)', borderRadius: '8px',
      }}>
        👨‍👩‍👧 <strong>For parents:</strong> Camera is used briefly. Photos are processed by AI and never stored.
      </p>
      {error && <p style={{ color: '#cc0000', marginBottom: '16px', fontWeight: 'bold' }}>{error}</p>}
      <button onClick={startCamera} style={{
        background: ORANGE, color: '#fff', border: 'none',
        padding: '18px 52px', borderRadius: '50px',
        fontFamily: FF, fontSize: '1.3rem', cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(255,156,26,0.5)',
      }}>
        Open Camera! 📷
      </button>
    </div>
  );

  // ── CAMERA ─────────────────────────────────────────────────────────────────
  if (stage === 'camera') return (
    <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto', padding: '16px' }}>
      <p style={{ fontFamily: FF, color: PURPLE, fontSize: '1.3rem', marginBottom: '12px' }}>
        {videoReady ? '😜 Make your funniest face!' : '📷 Starting camera...'}
      </p>
      <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: `4px solid ${PURPLE}`, background: '#1a001a', minHeight: '280px' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onCanPlay={handleVideoReady}
          onLoadedData={handleVideoReady}
          onLoadedMetadata={handleVideoReady}
          onPlaying={handleVideoReady}
          style={{ width: '100%', display: 'block', transform: 'scaleX(-1)' }}
        />
        {!videoReady && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(120,8,124,0.7)',
            flexDirection: 'column', gap: '12px',
          }}>
            <span style={{ fontSize: '2rem' }}>📷</span>
            <span style={{ fontFamily: FF, color: 'white', fontSize: '1.1rem' }}>Starting camera...</span>
            <span style={{ fontFamily: 'sans-serif', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
              Allow camera access if prompted
            </span>
          </div>
        )}
      </div>
      {error && <p style={{ color: '#cc0000', margin: '8px 0', fontWeight: 'bold' }}>{error}</p>}
      <button
        onClick={capture}
        style={{
          marginTop: '20px',
          background: videoReady ? ORANGE : '#888',
          color: '#fff', border: 'none',
          padding: '20px 60px', borderRadius: '50px',
          fontFamily: FF, fontSize: '1.4rem',
          cursor: videoReady ? 'pointer' : 'default',
          boxShadow: videoReady ? '0 4px 20px rgba(255,156,26,0.5)' : 'none',
          transition: 'all 0.3s ease',
          opacity: videoReady ? 1 : 0.65,
        }}
      >
        📸 Capture!
      </button>
      {!videoReady && (
        <p style={{ color: PURPLE, fontSize: '0.8rem', marginTop: '10px', opacity: 0.8 }}>
          Waiting for camera feed...
        </p>
      )}
    </div>
  );

  // ── PREVIEW ─────────────────────────────────────────────────────────────────
  if (stage === 'preview') return (
    <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto', padding: '16px' }}>
      <p style={{ fontFamily: FF, color: PURPLE, fontSize: '1.3rem', marginBottom: '12px' }}>
        Looking good! Ready to transform? 🐉
      </p>
      {capturedImage && (
        <img src={capturedImage} alt="Your face"
          style={{ width: '100%', borderRadius: '20px', border: `4px solid ${PURPLE}` }} />
      )}
      {error && <p style={{ color: '#cc0000', margin: '10px 0', fontWeight: 'bold' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'center' }}>
        <button onClick={reset} style={{
          background: 'transparent', color: PURPLE, border: `2px solid ${PURPLE}`,
          padding: '14px 28px', borderRadius: '50px', fontFamily: FF, fontSize: '1rem', cursor: 'pointer',
        }}>
          Retake
        </button>
        <button onClick={transform} style={{
          background: PURPLE, color: '#fff', border: 'none',
          padding: '14px 32px', borderRadius: '50px', fontFamily: FF, fontSize: '1rem', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(120,8,124,0.4)',
        }}>
          Make My Face! ✨
        </button>
      </div>
    </div>
  );

  // ── PROCESSING ──────────────────────────────────────────────────────────────
  if (stage === 'processing') return (
    <div style={{ textAlign: 'center', padding: '48px 24px', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ fontSize: '72px', animation: 'spin 1.2s linear infinite', display: 'inline-block' }}>🐉</div>
      <h3 style={{ fontFamily: FF, color: PURPLE, fontSize: '1.8rem', marginTop: '20px' }}>
        {progressMsg}
      </h3>
      <p style={{ color: '#3a0245', marginTop: '8px', opacity: 0.7 }}>Takes about 15–30 seconds</p>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  // ── RESULT ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto', padding: '16px' }}>
      <h3 style={{ fontFamily: FF, color: PURPLE, fontSize: '2rem', marginBottom: '16px' }}>
        Your Poo Poo Face! 🎉
      </h3>
      <img src={resultImage} alt="Your Poo Poo Face"
        style={{ width: '100%', borderRadius: '20px', border: `4px solid ${ORANGE}`, boxShadow: '0 8px 32px rgba(120,8,124,0.3)' }} />
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={reset} style={{
          background: 'transparent', color: PURPLE, border: `2px solid ${PURPLE}`,
          padding: '14px 24px', borderRadius: '50px', fontFamily: FF, fontSize: '0.95rem', cursor: 'pointer',
        }}>
          Try Again
        </button>
        <button onClick={saveImage} style={{
          background: '#009380', color: '#fff', border: 'none',
          padding: '14px 28px', borderRadius: '50px', fontFamily: FF, fontSize: '0.95rem',
          cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,147,128,0.4)',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          📲 Save to Phone
        </button>
        <a href="https://www.amazon.com/dp/1951173163/" target="_blank" rel="noopener noreferrer"
          style={{
            background: ORANGE, color: '#fff', textDecoration: 'none',
            padding: '14px 24px', borderRadius: '50px', fontFamily: FF, fontSize: '0.95rem',
            boxShadow: '0 4px 20px rgba(255,156,26,0.4)',
          }}>
          Get the Book! 📚
        </a>
      </div>
    </div>
  );
}