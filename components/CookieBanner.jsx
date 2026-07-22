"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("hm_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("hm_cookie_consent", "true");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("hm_cookie_consent", "false");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: 20,
      right: 20,
      maxWidth: 400,
      zIndex: 99999,
      background: 'rgba(7,7,7,0.85)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(214,4,29,0.2)',
      borderRadius: 16,
      padding: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      color: '#fff',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="material-symbols-outlined" style={{ color: '#d6041d' }}>cookie</span>
        Privacy & Cookies
      </h3>
      <p style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
        By clicking "Accept", you consent to our use of cookies.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button 
          onClick={handleAccept}
          style={{
            flex: 1,
            padding: '10px 0',
            borderRadius: 8,
            background: '#d6041d',
            color: '#fff',
            fontWeight: 600,
            fontSize: 12,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Accept
        </button>
        <button 
          onClick={handleDecline}
          style={{
            flex: 1,
            padding: '10px 0',
            borderRadius: 8,
            background: 'transparent',
            color: '#fff',
            fontWeight: 600,
            fontSize: 12,
            border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer'
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
