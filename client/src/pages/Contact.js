import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    showToast('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page" style={{ paddingTop: '80px' }}>
      {/* TOAST NOTIFICATION */}
      <div className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bell size={20} color="var(--primary-color)" />
          <span style={{ fontWeight: '600', color: 'white' }}>{toast.message}</span>
        </div>
      </div>

      <section style={styles.section}>
        <div className="container" style={styles.contactContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Get In <span>Touch</span></h2>
            <p style={styles.sectionSubtitle}>Have questions? We're here to help you start your journey.</p>
          </div>

          <form style={styles.contactForm} onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name</label>
              <input className="form-input" type="text" id="name" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-input" type="email" id="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea className="form-input" id="message" rows="5" placeholder="How can we help?" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required style={{ resize: 'vertical' }} />
            </div>
            <button type="submit" className="btn-primary interaction-btn" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

const styles = {
  section: { padding: '8rem 0' },
  sectionHeader: { textAlign: 'center', marginBottom: '4rem' },
  sectionTitle: { fontSize: '2.8rem', color: 'white', marginBottom: '1rem', textTransform: 'uppercase' },
  sectionSubtitle: { fontSize: '1.15rem', color: 'var(--text-muted)' },
  contactContainer: { maxWidth: '650px', margin: '0 auto', padding: '0 32px' },
  contactForm: { backgroundColor: 'var(--bg-card)', padding: '3.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)' }
};

export default Contact;
