import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Navigation, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet icon issues in React
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const FindUs = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const locations = [
    {
      id: 1,
      name: 'IronClad Dwarka',
      address: 'Plot No. 12, Sector 10, Dwarka, New Delhi, 110075',
      coords: [28.5921, 77.0460],
      hours: 'Mon - Fri: 5:00 AM - 11:00 PM\nSat - Sun: 7:00 AM - 9:00 PM\nHolidays: 8:00 AM - 6:00 PM',
      phone: '+91 98765 43210',
      city: 'Delhi',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=28.5921,77.0460'
    },
    {
      id: 2,
      name: 'IronClad Rohini',
      address: 'Shop No. 45, Sector 8, Rohini, New Delhi, 110085',
      coords: [28.7041, 77.1025],
      hours: 'Mon - Fri: 5:00 AM - 11:00 PM\nSat - Sun: 7:00 AM - 9:00 PM\nHolidays: 8:00 AM - 6:00 PM',
      phone: '+91 98765 43211',
      city: 'Delhi',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=28.7041,77.1025'
    },
    {
      id: 3,
      name: 'IronClad Saket',
      address: 'M-Block, Saket, New Delhi, 110017',
      coords: [28.5245, 77.2066],
      hours: 'Mon - Fri: 5:00 AM - 11:00 PM\nSat - Sun: 7:00 AM - 9:00 PM\nHolidays: 8:00 AM - 6:00 PM',
      phone: '+91 98765 43212',
      city: 'Delhi',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=28.5245,77.2066'
    },
    {
      id: 4,
      name: 'IronClad Noida',
      address: 'Sector 62, Noida, Uttar Pradesh, 201301',
      coords: [28.6139, 77.3910],
      hours: 'Mon - Fri: 5:00 AM - 11:00 PM\nSat - Sun: 7:00 AM - 9:00 PM\nHolidays: 8:00 AM - 6:00 PM',
      phone: '+91 98765 43213',
      city: 'Noida',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=28.6139,77.3910'
    }
  ];

  const filteredLocations = filter === 'All' 
    ? locations 
    : locations.filter(loc => loc.city === filter);

  // Map center logic: center on first filtered location or default to Delhi
  const mapCenter = filteredLocations.length > 0 ? filteredLocations[0].coords : [28.6139, 77.2090];

  return (
    <div className="find-us-page" style={{ paddingTop: '80px', backgroundColor: 'var(--bg-dark)' }}>
      {/* HERO SECTION */}
      <section style={styles.heroSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={styles.heroTitle}>Find Your Nearest <span>IronClad Gym</span></h1>
          <p style={styles.heroSubtitle}>Train with us wherever you are. Elite facilities across the city.</p>
        </div>
      </section>

      {/* FILTER & MAP SECTION */}
      <section style={styles.mapSection}>
        <div className="container">
          <div style={styles.filterWrapper}>
            <label style={styles.filterLabel}>Filter by City:</label>
            <select 
              style={styles.filterSelect} 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Cities</option>
              <option value="Delhi">Delhi</option>
              <option value="Noida">Noida</option>
            </select>
          </div>

          <div style={styles.mapContainer}>
            <MapContainer center={[28.6139, 77.2090]} zoom={11} style={{ height: '500px', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {locations.map((loc) => (
                <Marker key={loc.id} position={loc.coords}>
                  <Popup>
                    <div style={styles.popupContent}>
                      <h4 style={styles.popupTitle}>{loc.name}</h4>
                      <p style={styles.popupAddress}>{loc.address}</p>
                      <a 
                        href={loc.mapUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={styles.popupLink}
                      >
                        Get Directions <ExternalLink size={14} />
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      {/* LOCATIONS GRID */}
      <section style={styles.locationsSection}>
        <div className="container">
          <div style={styles.locationsGrid}>
            {filteredLocations.map((loc) => (
              <div key={loc.id} className="location-card" style={styles.locationCard}>
                <h3 style={styles.locationName}>{loc.name}</h3>
                
                <div style={styles.infoRow}>
                  <MapPin size={18} color="var(--primary-color)" />
                  <p style={styles.infoText}>{loc.address}</p>
                </div>

                <div style={styles.infoRow}>
                  <Clock size={18} color="var(--primary-color)" />
                  <p style={styles.infoText}>{loc.hours}</p>
                </div>

                <div style={styles.infoRow}>
                  <Phone size={18} color="var(--primary-color)" />
                  <p style={styles.infoText}>{loc.phone}</p>
                </div>

                <a 
                  href={loc.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary" 
                  style={styles.directionsBtn}
                >
                  <Navigation size={18} />
                  Get Directions
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={styles.ctaTitle}>Ready to Join the <span>IronClad Elite?</span></h2>
          <p style={styles.ctaSubtitle}>Start your journey at any of our branches today.</p>
          <button 
            onClick={() => navigate('/plans')} 
            className="btn-primary" 
            style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
          >
            View Membership Plans
          </button>
        </div>
      </section>
    </div>
  );
};

const styles = {
  heroSection: { padding: '6rem 0 4rem', backgroundColor: 'var(--bg-darker)' },
  heroTitle: { fontSize: '3rem', fontWeight: '800', color: 'white', textTransform: 'uppercase', marginBottom: '1rem' },
  heroSubtitle: { fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' },
  
  mapSection: { padding: '2rem 0' },
  filterWrapper: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' },
  filterLabel: { color: 'white', fontWeight: '600' },
  filterSelect: { 
    backgroundColor: 'var(--bg-card)', 
    color: 'white', 
    border: '1px solid var(--border-color)', 
    padding: '0.5rem 1rem', 
    borderRadius: '8px',
    outline: 'none'
  },
  mapContainer: { 
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
    borderRadius: '12px', 
    overflow: 'hidden',
    border: '1px solid var(--border-color)',
    zIndex: 1
  },

  popupContent: { padding: '0.5rem', minWidth: '150px' },
  popupTitle: { color: '#333', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '700' },
  popupAddress: { color: '#666', fontSize: '0.85rem', marginBottom: '0.75rem', lineHeight: '1.4' },
  popupLink: { 
    color: 'var(--primary-color)', 
    fontSize: '0.85rem', 
    fontWeight: '600', 
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  locationsSection: { padding: '4rem 0' },
  locationsGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
    gap: '2rem' 
  },
  locationCard: { 
    backgroundColor: 'var(--bg-card)', 
    padding: '2rem', 
    borderRadius: '16px', 
    border: '1px solid var(--border-color)',
    transition: 'transform 0.3s ease, border-color 0.3s ease',
  },
  locationName: { fontSize: '1.5rem', color: 'white', marginBottom: '1.5rem', fontWeight: '700' },
  infoRow: { display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' },
  infoText: { color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: '1.5', whiteSpace: 'pre-line' },
  directionsBtn: { 
    marginTop: '1.5rem', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: '0.5rem', 
    width: '100%',
    padding: '0.75rem'
  },

  ctaSection: { padding: '6rem 0', borderTop: '1px solid var(--border-color)' },
  ctaTitle: { fontSize: '2.5rem', color: 'white', marginBottom: '1rem', textTransform: 'uppercase' },
  ctaSubtitle: { color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .location-card:hover { 
    transform: translateY(-8px); 
    border-color: var(--primary-color); 
    box-shadow: 0 10px 25px rgba(249, 115, 22, 0.15); 
  }
  span { color: var(--primary-color); }
  .leaflet-popup-content-wrapper { border-radius: 8px; }
  .leaflet-container { font-family: 'Outfit', sans-serif !important; }
`;
document.head.appendChild(styleSheet);

export default FindUs;
