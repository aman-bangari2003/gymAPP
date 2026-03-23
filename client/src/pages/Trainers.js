import React from 'react';
import TrainerCard from '../components/TrainerCard';

const Trainers = () => {
  const trainers = [
    { name: 'Dolu', specialization: 'Strength & Conditioning', description: 'Former competitive powerlifter with 10 years of experience turning beginners into beasts.', imageUrl: '/dolu.jpg', imagePosition: 'top' },
    { name: 'Taarush', specialization: 'HIIT & Core', description: 'High energy coach guaranteed to make you sweat and build peak cardiovascular endurance.', imageUrl: '/taarush.png', imagePosition: 'top' },
    { name: 'Aman', specialization: 'Mobility & Recovery', description: 'Specializes in athletic longevity, fixing imbalances, and ensuring you can lift heavy, safely.', imageUrl: '/aman.jpg', imagePosition: 'top' }
  ];

  return (
    <div className="trainers-page" style={{ paddingTop: '80px' }}>
      <section style={{ ...styles.section, backgroundColor: 'var(--bg-darker)' }}>
        <div className="container" style={{ padding: '0 32px' }}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Meet Our <span>Trainers</span></h2>
            <p style={styles.sectionSubtitle}>Learn from the best to become the best.</p>
          </div>

          <div style={styles.grid3}>
            {trainers.map((trainer, idx) => (
              <TrainerCard key={idx} {...trainer} />
            ))}
          </div>
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
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'stretch' },
};

export default Trainers;
