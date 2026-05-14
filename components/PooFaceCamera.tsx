'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

type Stage = 'disclaimer' | 'camera' | 'preview' | 'processing' | 'result';

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

  // Clean up on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, []);

  const startCamera = async () => {
    setError('');
    setVideoReady(false);
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
    const video = videoRef.current;
    if (!video) return;
    // Guard: don't capture if video hasn't loaded
    if (!videoReady || video.readyState < 2 || video.videoWidth === 0) {
      setError('Camera still loading — wait a moment and try again.');
      return;
    }
    const w = video.videoWidth;
    const h = video.videoHeight;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    // Mirror (selfie cameras are mirrored)
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    setCapturedImage(dataUrl);
    streamRef.current?.getTracks().forEach(t => t.stop());
    setError('');
    setStage('preview');
  }, [videoReady]);

  // Client-side polling — avoids Vercel serverless 10s timeout
  const pollStatus = useCallback(async (requestId: string, attempts = 0) => {
    if (attempts > 45) {  // 90 seconds max
      setError('Taking too long. The AI is busy — try again!');
      setStage('preview');
      return;
    }
    if (attempts === 5)  setProgressMsg('Almost there...');
    if (attempts === 15) setProgressMsg('The dragon is working hard...');
    if (attempts === 25) setProgressMsg('Putting the final touches on your face...');

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

      // Still in progress — poll again in 2s
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
      // Start client-side polling
      pollStatus(data.requestId, 0);
    } catch {
      setError('Connection error. Try again!');
      setStage('preview');
    }
  };

  const reset = () => {
    if (pollRef.current) clearTimeout(pollRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    setStage('disclaimer');
    setCapturedImage('');
    setResultImage('');
    setError('');
    setVideoReady(false);
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
          color: '#78087c', fontSize: '0.85rem', marginBottom: '28px',
          padding: '10px 16px', background: 'rgba(120,8,124,0.08)', borderRadius: '8px',
        }}>
          👨‍👩‍👧 <strong>For parents:</strong> Camera is used briefly. Photos are processed by AI and never stored.
        </p>
        {error && <p style={{ color: '#cc0000', marginBottom: '16px', fontWeight: 'bold' }}>{error}</p>}
        <button onClick={startCamera} style={{
          background: ORANGE, color: '#fff', border: 'none',
          padding: '16px 48px', borderRadius: '50px',
          fontFamily: ff, fontSize: '1.2rem', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(255,156,26,0.4)',
          letterSpacing: '0.05em',
        }}>
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
          {videoReady ? 'Make your funniest face! 😜' : 'Camera loading... 📷'}
        </p>
        <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: `4px solid ${PURPLE}` }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onCanPlay={() => setVideoReady(true)}
            onLoadedMetadata={() => setVideoReady(true)}
            style={{ width: '100%', display: 'block', transform: 'scaleX(-1)' }}
          />
          {!videoReady && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(120,8,124,0.6)',
            }}>
              <span style={{ fontFamily: ff, color: 'white', fontSize: '1.1rem' }}>Loading camera...</span>
            </div>
          )}
        </div>
        {error && <p style={{ color: '#cc0000', margin: '8px 0', fontWeight: 'bold' }}>{error}</p>}
        <button
          onClick={capture}
          disabled={!videoReady}
          style={{
            marginTop: '20px',
            background: videoReady ? ORANGE : '#ccc',
            color: '#fff', border: 'none',
            padding: '18px 56px', borderRadius: '50px',
            fontFamily: ff, fontSize: '1.3rem',
            cursor: videoReady ? 'pointer' : 'not-allowed',
            boxShadow: videoReady ? '0 4px 20px rgba(255,156,26,0.4)' : 'none',
            transition: 'all 0.3s ease',
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
        {capturedImage && (
          <img src={capturedImage} alt="Your face"
            style={{ width: '100%', borderRadius: '20px', border: `4px solid ${PURPLE}` }} />
        )}
        {error && <p style={{ color: '#cc0000', margin: '10px 0', fontWeight: 'bold' }}>{error}</p>}
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
        <div style={{ fontSize: '72px', animation: 'spin 1.2s linear infinite', display: 'inline-block' }}>🐉</div>
        <h3 style={{ fontFamily: ff, color: PURPLE, fontSize: '1.8rem', marginTop: '20px' }}>
          {progressMsg}
        </h3>
        <p style={{ color: '#3a0245', marginTop: '8px', opacity: 0.7 }}>Takes about 15–30 seconds</p>
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
      <img src={resultImage} alt="Your Poo Poo Face"
        style={{ width: '100%', borderRadius: '20px', border: `4px solid ${ORANGE}`, boxShadow: '0 8px 32px rgba(120,8,124,0.3)' }} />
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={reset} style={{
          background: 'transparent', color: PURPLE, border: `2px solid ${PURPLE}`,
          padding: '14px 24px', borderRadius: '50px', fontFamily: ff, fontSize: '0.95rem', cursor: 'pointer',
        }}>
          Try Again
        </button>
        <a href="https://www.amazon.com/dp/1951173163/" target="_blank" rel="noopener noreferrer"
          style={{
            background: ORANGE, color: '#fff', textDecoration: 'none',
            padding: '14px 24px', borderRadius: '50px', fontFamily: ff, fontSize: '0.95rem',
            boxShadow: '0 4px 20px rgba(255,156,26,0.4)',
          }}>
          Get the Book! 📚
        </a>
      </div>
    </div>
  );
}


