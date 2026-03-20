import React from 'react';

const TrainerCard = ({ name, specialization, code, description }) => {
  // Using a placeholder image generator matching the dark theme vibe
  // Given no real assets provided, we use unsplash source or a dark gradient placeholder
  const imageUrl = `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=141414&color=f97316&size=300`;

  return (
    <div style={styles.card} className="trainer-card">
      <div style={styles.imageContainer}>
         <img src={imageUrl} alt={name} style={styles.image} />
         <div style={styles.overlay}>
           <p style={styles.description}>{description}</p>
         </div>
      </div>
      <div style={styles.info}>
        <h3 style={styles.name}>{name}</h3>
        <p style={styles.specialization}>{specialization}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid var(--border-color)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
    height: '300px',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#1f1f1f',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
    padding: '1.5rem',
    transform: 'translateY(100%)',
    transition: 'transform 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  description: {
    color: 'var(--text-main)',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    textAlign: 'center',
  },
  info: {
    padding: '1.5rem',
    textAlign: 'center',
  },
  name: {
    fontSize: '1.25rem',
    color: 'white',
    marginBottom: '0.25rem',
  },
  specialization: {
    color: 'var(--primary-color)',
    fontSize: '0.875rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  }
};

// Add CSS for hover effect in js
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .trainer-card:hover { transform: translateY(-10px); }
  .trainer-card:hover img { transform: scale(1.1); }
  .trainer-card:hover .overlay { transform: translateY(0); }
`;
document.head.appendChild(styleSheet);

export default TrainerCard;
