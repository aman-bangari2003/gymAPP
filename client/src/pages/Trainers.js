import React from 'react';
import { motion } from 'framer-motion';
import TrainerCard from '../components/TrainerCard';

const Trainers = () => {
  const trainers = [
    { name: 'Dolu', specialization: 'Strength & Conditioning', description: 'Former competitive powerlifter with 10 years of experience turning beginners into beasts.', imageUrl: '/dolu.jpg', imagePosition: 'top' },
    { name: 'Taarush', specialization: 'HIIT & Core', description: 'High energy coach guaranteed to make you sweat and build peak cardiovascular endurance.', imageUrl: '/taarush.png', imagePosition: 'top' },
    { name: 'Aman', specialization: 'Mobility & Recovery', description: 'Specializes in athletic longevity, fixing imbalances, and ensuring you can lift heavy, safely.', imageUrl: '/aman.jpg', imagePosition: 'top' }
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="trainers-page" style={{ paddingTop: '80px' }}>
      <section style={{ ...styles.section, backgroundColor: 'var(--bg-darker)' }}>
        <div className="container" style={{ padding: '0 32px' }}>
          <motion.div 
            style={styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 style={styles.sectionTitle}>Meet Our <span>Trainers</span></h2>
            <p style={styles.sectionSubtitle}>Learn from the best to become the best.</p>
          </motion.div>

          <div style={styles.grid3}>
            {trainers.map((trainer, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUpVariant}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              >
                <TrainerCard {...trainer} />
              </motion.div>
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
