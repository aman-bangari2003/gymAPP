import React from 'react';
import { Check } from 'lucide-react';

const PlanCard = ({ title, features, isPopular, onSelect, isSelected, isPending, isAnyPlanSelected, membershipStatus, cardTier, currentPlanTier }) => {
  const isHighlighted = isSelected || isPending;
  const isDimmed = isAnyPlanSelected && !isHighlighted;

  const getButtonLabel = () => {
    if (membershipStatus === 'Expired') return "Renew Plan";
    if (isSelected) return "Current Plan ✔";
    if (membershipStatus === 'Active') {
      if (cardTier > currentPlanTier) return "Upgrade Plan";
      if (cardTier < currentPlanTier) return "Downgrade Plan";
    }
    return "View Plans";
  };

  return (
    <div className={`plan-card ${isHighlighted ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}`} style={{ ...styles.card, ...(isHighlighted ? styles.selectedCard : {}) }}>
      {isPopular && <div className={`popular-badge ${isDimmed ? 'dimmed-badge' : ''}`} style={styles.popularBadge}>Most Popular</div>}
      <h3 style={styles.title}>{title}</h3>

      <ul style={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} style={styles.featureItem}>
            <Check size={18} color="var(--primary-color)" style={{ flexShrink: 0 }} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => !isSelected && onSelect(title)}
        className={isSelected ? "btn-primary selected-btn" : "btn-outline interaction-btn"}
        style={styles.button}
        disabled={isSelected}
      >
        {getButtonLabel()}
      </button>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: '12px',
    padding: '2.5rem 2rem',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    height: '100%',
  },
  selectedCard: {
    borderColor: 'var(--primary-color)',
    transform: 'scale(1.05)',
    boxShadow: '0 10px 40px rgba(249, 115, 22, 0.25), inset 0 0 20px rgba(249, 115, 22, 0.05)',
    zIndex: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    zIndex: 3,
    transition: 'opacity 0.3s ease',
    boxShadow: '0 2px 10px rgba(249, 115, 22, 0.3)'
  },
  title: {
    fontSize: '1.5rem',
    color: 'white',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  featuresList: {
    listStyle: 'none',
    margin: '0 0 2rem 0',
    padding: '0',
    flexGrow: 1,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '1.25rem',
    color: 'var(--text-main)',
    fontSize: '0.95rem',
  },
  button: {
    width: '100%',
    marginTop: 'auto',
    transition: 'all 0.3s ease',
  }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .plan-card.dimmed { opacity: 0.85; filter: grayscale(20%); }
  .plan-card:not(.selected):hover { transform: translateY(-12px) scale(1.03); box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(249, 115, 22, 0.1); border-color: rgba(249, 115, 22, 0.6); filter: grayscale(0%); opacity: 1; }
  .plan-card.selected:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 15px 50px rgba(249, 115, 22, 0.3); border-color: var(--primary-color); }
  .dimmed-badge { opacity: 0.5; box-shadow: none !important; }
  .interaction-btn:hover { transform: scale(1.05); filter: brightness(1.2); box-shadow: 0 0 15px rgba(249, 115, 22, 0.3); }
  .selected-btn { cursor: not-allowed !important; background-color: var(--primary-hover) !important; color: white !important; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4) !important; opacity: 0.9; }
`;
document.head.appendChild(styleSheet);

export default PlanCard;
