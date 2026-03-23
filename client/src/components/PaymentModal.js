import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Loader } from 'lucide-react';

const PaymentModal = ({ plan, duration, price, onClose, onSuccess }) => {
  const [method, setMethod] = useState('card'); // 'card' or 'upi'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePay = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (method === 'card') {
      const cardNum = e.target.cardNumber.value;
      const expiry = e.target.expiry.value;
      const cvv = e.target.cvv.value;
      if (!cardNum || !expiry || !cvv) {
        setError('Please fill in all card details');
        return;
      }
    } else {
      const upiId = e.target.upiId.value;
      if (!upiId) {
        setError('Please enter your UPI ID');
        return;
      }
    }

    setLoading(true);
    // Simulate Gateway Transaction
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Wait a bit to show success message before calling home success
      setTimeout(() => {
        onSuccess(plan, duration);
      }, 2000);
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content payment-modal" onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Athena <span style={styles.subtitle}>Gateway</span></h2>
          <button style={styles.closeBtn} onClick={!loading ? onClose : undefined} disabled={loading}>
            <X size={24} />
          </button>
        </div>

        <div style={styles.summaryBox}>
          <h3 style={styles.planName}>{plan} Plan</h3>
          <p style={styles.durationLabel}>{duration} Subscription</p>
          <div style={styles.totalPrice}>
            Total: <span style={styles.priceHighlight}>₹{price}</span>
          </div>
        </div>

        <div style={styles.tabs}>
          <button 
            type="button"
            style={{...styles.tab, ...(method === 'card' ? styles.activeTab : {})}}
            onClick={() => !loading && !success && setMethod('card')}
            disabled={loading || success}
          >
            <CreditCard size={18} /> Card
          </button>
          <button 
            type="button"
            style={{...styles.tab, ...(method === 'upi' ? styles.activeTab : {})}}
            onClick={() => !loading && !success && setMethod('upi')}
            disabled={loading || success}
          >
            <Smartphone size={18} /> UPI
          </button>
        </div>

        {error && <div style={styles.errorText}>{error}</div>}

        <form onSubmit={handlePay} style={styles.formContainer}>
          {success ? (
            <div style={styles.successContainer}>
              <div style={styles.successIcon}>✓</div>
              <h3 style={styles.successText}>Payment Successful 🎉</h3>
              <p style={styles.redirectText}>Redirecting to profile...</p>
            </div>
          ) : (
            <>
              {method === 'card' ? (
                <div style={styles.cardInputGroup}>
                  <input name="cardNumber" type="text" placeholder="Card Number" style={styles.input} required minLength={16} maxLength={19} disabled={loading} />
                  <div style={styles.inputRow}>
                    <input name="expiry" type="text" placeholder="MM/YY" style={styles.inputHalf} required maxLength={5} disabled={loading} />
                    <input name="cvv" type="text" placeholder="CVV" style={styles.inputHalf} required minLength={3} maxLength={4} disabled={loading} />
                  </div>
                  <input name="holderName" type="text" placeholder="Cardholder Name" style={styles.input} required disabled={loading} />
                </div>
              ) : (
                <div style={styles.upiInputGroup}>
                  <input name="upiId" type="text" placeholder="Enter UPI ID (e.g. user@okbank)" style={styles.input} required disabled={loading} />
                </div>
              )}

              <button type="submit" className="btn-primary" style={{...styles.payBtn, ...(loading ? styles.payBtnLoading : {})}} disabled={loading}>
                {loading ? <Loader className="spin" size={20} /> : `Pay ₹${price}`}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  title: { fontSize: '1.8rem', color: 'white', margin: 0 },
  subtitle: { color: 'var(--primary-color)' },
  closeBtn: { background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 },
  summaryBox: { backgroundColor: 'var(--bg-darker)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' },
  planName: { fontSize: '1.4rem', color: 'white', margin: '0 0 0.25rem 0' },
  durationLabel: { color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 0.75rem 0' },
  totalPrice: { fontSize: '1.1rem', color: 'var(--text-main)' },
  priceHighlight: { color: 'var(--primary-color)', fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '6px' },
  tabs: { display: 'flex', marginBottom: '1.5rem', gap: '1rem' },
  tab: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: 'transparent', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.3s ease' },
  activeTab: { backgroundColor: 'rgba(249, 115, 22, 0.1)', borderColor: 'var(--primary-color)', color: 'var(--primary-color)' },
  formContainer: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  cardInputGroup: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  upiInputGroup: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { width: '100%', padding: '0.75rem 1rem', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white', outline: 'none', transition: 'border-color 0.3s' },
  inputRow: { display: 'flex', gap: '1rem' },
  inputHalf: { flex: 1, padding: '0.75rem 1rem', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white', outline: 'none' },
  payBtn: { width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.1rem', marginTop: '0.5rem', transition: 'all 0.3s ease' },
  payBtnLoading: { opacity: 0.7, cursor: 'not-allowed' },
  errorText: { color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '4px' },
  successContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0', animation: 'fadeIn 0.5s ease-out' },
  successIcon: { width: '60px', height: '60px', backgroundColor: '#4ade80', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1rem', boxShadow: '0 0 20px rgba(74, 222, 128, 0.4)' },
  successText: { color: 'white', fontSize: '1.5rem', margin: '0 0 0.5rem 0' },
  redirectText: { color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }
};

export default PaymentModal;
