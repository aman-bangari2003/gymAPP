import React, { useRef, useState } from 'react';
import { Wifi, Users, Trophy, Star, Shield, Dumbbell, Zap, Heart, Clock, Award } from 'lucide-react';

// Map feature text to an appropriate icon
const featureIconMap = (feature) => {
  const f = feature.toLowerCase();
  if (f.includes('wi-fi') || f.includes('wifi')) return <Wifi size={16} />;
  if (f.includes('locker')) return <Shield size={16} />;
  if (f.includes('class') || f.includes('group')) return <Users size={16} />;
  if (f.includes('nutrition')) return <Heart size={16} />;
  if (f.includes('guest')) return <Star size={16} />;
  if (f.includes('personal') || f.includes('training')) return <Dumbbell size={16} />;
  if (f.includes('recovery')) return <Zap size={16} />;
  if (f.includes('assessment') || f.includes('fitness')) return <Award size={16} />;
  if (f.includes('hour') || f.includes('access')) return <Clock size={16} />;
  return <Trophy size={16} />;
};

const PlanCard = ({
  title, features, isPopular, onSelect, isSelected, isPending,
  isAnyPlanSelected, membershipStatus, cardTier, currentPlanTier
}) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  const isHighlighted = isSelected || isPending;
  const isDimmed = isAnyPlanSelected && !isHighlighted;

  const getButtonLabel = () => {
    if (membershipStatus === 'Expired') return 'Renew Plan';
    if (isSelected) return 'Current Plan ✔';
    if (membershipStatus === 'Active') {
      if (cardTier > currentPlanTier) return 'Upgrade Plan';
      if (cardTier < currentPlanTier) return 'Downgrade Plan';
    }
    return 'Get Started';
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleButtonClick = (e) => {
    if (isSelected) return;
    // Ripple effect
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
    onSelect(title);
  };

  // Per-plan gradient configs
  const gradients = {
    Basic: 'linear-gradient(135deg, rgba(30,30,40,0.85) 0%, rgba(40,40,60,0.9) 100%)',
    Pro: 'linear-gradient(135deg, rgba(40,20,10,0.9) 0%, rgba(60,30,10,0.95) 100%)',
    Elite: 'linear-gradient(135deg, rgba(20,30,40,0.9) 0%, rgba(15,40,60,0.95) 100%)',
  };
  const glowColors = {
    Basic: 'rgba(100,120,180,0.3)',
    Pro: 'rgba(249,115,22,0.5)',
    Elite: 'rgba(56,189,248,0.35)',
  };
  const accentColors = {
    Basic: '#7c8cff',
    Pro: 'var(--primary-color)',
    Elite: '#38bdf8',
  };
  const accent = accentColors[title] || 'var(--primary-color)';
  const glow = glowColors[title] || 'rgba(249,115,22,0.3)';

  const cardStyle = {
    background: gradients[title] || gradients.Basic,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: '20px',
    padding: '2.5rem 2rem 2rem',
    border: `1px solid ${isHighlighted || isHovered ? accent : 'rgba(255,255,255,0.08)'}`,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    boxSizing: 'border-box',
    cursor: 'default',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'scale(1.03) translateY(-8px)' : 'scale(1)'}`,
    boxShadow: isHighlighted
      ? `0 20px 60px ${glow}, 0 0 0 1px ${accent}`
      : isHovered
        ? `0 24px 60px ${glow}, 0 0 30px ${glow}`
        : '0 8px 32px rgba(0,0,0,0.5)',
    opacity: isDimmed ? 0.75 : 1,
    filter: isDimmed ? 'grayscale(25%)' : 'none',
    willChange: 'transform',
    zIndex: isPopular ? 2 : 1,
  };

  return (
    <div
      ref={cardRef}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shimmer / inner glow overlay */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '20px', pointerEvents: 'none',
        background: `radial-gradient(ellipse at 60% 0%, ${glow} 0%, transparent 70%)`,
        opacity: isHovered ? 1 : 0.5,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Most Popular Badge */}
      {isPopular && (
        <div style={styles.popularRibbon}>
          <span style={styles.popularText}>⚡ Most Popular</span>
          <div style={styles.ribbonGlow} />
        </div>
      )}

      {/* Plan Title */}
      <h3 style={{ ...styles.title, color: accent }}>{title}</h3>

      {/* Divider */}
      <div style={{ ...styles.divider, background: `linear-gradient(to right, transparent, ${accent}, transparent)` }} />

      {/* Features List */}
      <ul style={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} style={styles.featureItem}>
            <span style={{ ...styles.iconWrapper, color: accent, background: `${accent}18` }}>
              {featureIconMap(feature)}
            </span>
            <span style={styles.featureText}>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={handleButtonClick}
        disabled={isSelected}
        style={{
          ...styles.button,
          background: isSelected
            ? 'rgba(255,255,255,0.1)'
            : `linear-gradient(135deg, ${accent} 0%, ${isPopular ? '#ff4500' : accent}cc 100%)`,
          color: 'white',
          cursor: isSelected ? 'not-allowed' : 'pointer',
          boxShadow: !isSelected ? `0 4px 20px ${glow}` : 'none',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {ripples.map(r => (
          <span key={r.id} style={{
            position: 'absolute', left: r.x, top: r.y,
            width: 0, height: 0,
            background: 'rgba(255,255,255,0.4)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple-expand 0.7s ease-out forwards',
            pointerEvents: 'none',
          }} />
        ))}
        {getButtonLabel()}
      </button>
    </div>
  );
};

const styles = {
  popularRibbon: {
    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #f97316, #ff4500)',
    padding: '6px 28px', borderRadius: '0 0 14px 14px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(249,115,22,0.6)',
    zIndex: 5,
    animation: 'ribbon-glow 2s ease-in-out infinite alternate',
  },
  ribbonGlow: {
    position: 'absolute', inset: 0, borderRadius: 'inherit',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.3), transparent)',
    pointerEvents: 'none',
  },
  popularText: {
    color: 'white', fontWeight: '800', fontSize: '0.7rem',
    textTransform: 'uppercase', letterSpacing: '1.5px',
  },
  title: {
    fontSize: '1.7rem', fontWeight: '800', textAlign: 'center',
    marginBottom: '1.25rem', marginTop: '1.5rem',
    letterSpacing: '-0.5px',
  },
  divider: { height: '1px', marginBottom: '1.5rem', opacity: 0.6 },
  featuresList: { listStyle: 'none', margin: '0 0 2rem 0', padding: 0, flexGrow: 1 },
  featureItem: {
    display: 'flex', alignItems: 'center', gap: '12px',
    marginBottom: '1rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.93rem',
  },
  iconWrapper: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '28px', height: '28px', borderRadius: '8px',
    flexShrink: 0, transition: 'transform 0.2s ease',
  },
  featureText: { lineHeight: 1.4 },
  button: {
    width: '100%', marginTop: 'auto', border: 'none',
    padding: '0.9rem 1.5rem', borderRadius: '12px',
    fontSize: '0.95rem', fontWeight: '700', letterSpacing: '0.3px',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
  },
};

// Inject global keyframes once
if (typeof document !== 'undefined' && !document.getElementById('plancard-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'plancard-styles';
  styleEl.textContent = `
    @keyframes ripple-expand {
      to { width: 300px; height: 300px; opacity: 0; }
    }
    @keyframes ribbon-glow {
      from { box-shadow: 0 4px 20px rgba(249,115,22,0.5); }
      to   { box-shadow: 0 4px 35px rgba(249,115,22,0.9), 0 0 15px rgba(249,115,22,0.5); }
    }
    .plan-cta-btn:hover:not(:disabled) {
      transform: translateY(-2px) scale(1.03);
      filter: brightness(1.15);
    }
    @keyframes price-in {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(styleEl);
}

export default PlanCard;
