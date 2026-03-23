import React from 'react';
import { X } from 'lucide-react';

const DurationModal = ({ plan, onClose, onProceedToPayment }) => {
  if (!plan) return null;

  // Fixed Pricing Schedule mapped strictly
  const pricing = {
    'Basic': { 1: 1999, 3: 4999, 6: 8999, 12: 15999 },
    'Pro': { 1: 2999, 3: 7999, 6: 14999, 12: 24999 },
    'Elite': { 1: 3999, 3: 9999, 6: 18999, 12: 34999 }
  };

  const planPricing = pricing[plan] || pricing['Basic'];

  const durations = [
    { months: 1, label: '1 Month', price: planPricing[1] },
    { months: 3, label: '3 Months', price: planPricing[3], badge: 'Save 15%' },
    { months: 6, label: '6 Months', price: planPricing[6], badge: 'Save 25%' },
    { months: 12, label: '12 Months', price: planPricing[12], badge: 'Best Value', highlight: true }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>{plan} Plan <span style={styles.subtitle}>Duration</span></h2>
          <button style={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div style={styles.optionsContainer}>
          {durations.map((dur, idx) => (
            <div key={idx} style={{...styles.durationCard, ...(dur.highlight ? styles.highlightCard : {})}}>
              {dur.badge && (
                <div style={{...styles.badge, ...(dur.highlight ? styles.badgeHighlight : {})}}>
                  {dur.badge}
                </div>
              )}
              <h3 style={styles.durationLabel}>{dur.label}</h3>
              <div style={styles.priceContainer}>
                <span style={styles.currency}>₹</span>
                <span style={styles.price}>{Math.floor(dur.price / dur.months)}</span>
                <span style={styles.period}>/mo</span>
              </div>
              <div style={styles.totalPrice}>
                Total: ₹{dur.price}
              </div>
              <button 
                className={dur.highlight ? "btn-primary interaction-btn" : "btn-outline interaction-btn"} 
                style={styles.selectBtn}
                onClick={() => onProceedToPayment(plan, dur)}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' },
  title: { fontSize: '2rem', color: 'white', margin: 0 },
  subtitle: { color: 'var(--primary-color)' },
  closeBtn: { background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s', padding: 0 },
  optionsContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' },
  durationCard: { position: 'relative', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem 1.5rem', textAlign: 'center', transition: 'transform 0.3s ease, box-shadow 0.3s ease' },
  highlightCard: { borderColor: 'var(--primary-color)', boxShadow: '0 10px 30px rgba(249, 115, 22, 0.15)' },
  badge: { position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--bg-darker)', color: 'white', border: '1px solid var(--border-color)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', whiteSpace: 'nowrap' },
  badgeHighlight: { backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)', color: 'white', boxShadow: '0 4px 10px rgba(249, 115, 22, 0.3)' },
  durationLabel: { fontSize: '1.25rem', color: 'white', marginBottom: '1rem' },
  priceContainer: { display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '1.5rem' },
  currency: { fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: '600' },
  price: { fontSize: '2.5rem', fontWeight: '800', color: 'white', lineHeight: '1' },
  period: { fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '2px' },
  totalPrice: { fontSize: '1rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', fontWeight: '500' },
  selectBtn: { width: '100%' }
};

export default DurationModal;
