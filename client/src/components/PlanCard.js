import React from 'react';
import { Check } from 'lucide-react';

const PlanCard = ({ title, price, features, isPopular }) => {
  return (
    <div style={{ ...styles.card, ...(isPopular ? styles.popularCard : {}) }}>
      {isPopular && <div style={styles.popularBadge}>Most Popular</div>}
      <h3 style={styles.title}>{title}</h3>
      <div style={styles.priceContainer}>
        <span style={styles.currency}>$</span>
        <span style={styles.price}>{price}</span>
        <span style={styles.period}>/mo</span>
      </div>

      <ul style={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} style={styles.featureItem}>
            <Check size={18} color="var(--primary-color)" style={{ flexShrink: 0 }} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={isPopular ? "btn-primary" : "btn-outline"} style={styles.button}>
        Select Plan
      </button>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: '8px',
    padding: '2.5rem 2rem',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'transform 0.3s, box-shadow 0.3s',
    height: '100%',
  },
  popularCard: {
    borderColor: 'var(--primary-color)',
    transform: 'scale(1.05)',
    boxShadow: '0 10px 30px rgba(249, 115, 22, 0.1)',
    zIndex: 1,
  },
  popularBadge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '1.5rem',
    color: 'white',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  currency: {
    fontSize: '1.5rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  price: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: 'white',
    lineHeight: '1',
  },
  period: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    marginLeft: '4px',
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
    marginBottom: '1rem',
    color: 'var(--text-main)',
    fontSize: '0.95rem',
  },
  button: {
    width: '100%',
    marginTop: 'auto',
  }
};

export default PlanCard;
