import React, { useState, useEffect } from 'react';
import { Users, Dumbbell, Clock, HeartPulse, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Features.css';

const Features = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrevFeature = () => setActiveFeature((prev) => (prev === 0 ? featuresData.length - 1 : prev - 1));
    const handleNextFeature = () => setActiveFeature((prev) => (prev === featuresData.length - 1 ? 0 : prev + 1));

    const featuresData = [
        {
            icon: <Users size={40} color="#fff" />,
            title: "Support",
            description: "Iron Clad offers comprehensive support to all gym members. From personalized training to regular guidance, our certified trainers are here to assist you in fulfilling your fitness goals. It is the perfect place for starting a journey towards a healthy lifestyle.",
            bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            shadowColor: "rgba(79, 172, 254, 0.4)",
            bgImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800"
        },
        {
            icon: <Dumbbell size={40} color="#fff" />,
            title: "Tools & Training",
            description: "With avant-garde equipment incorporating cardio machines, free weights, and strength training, you'll get everything you need to pursue a balanced workout routine. Iron Clad has dedicated space for group classes, functional training, and personal training ensuring that there's something for everyone.",
            bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            shadowColor: "rgba(102, 126, 234, 0.4)",
            bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
        },
        {
            icon: <Clock size={40} color="#fff" />,
            title: "Convenience",
            description: "With flexible workout hours at our clubs, you can train on your terms. From early morning to late night, our doors are open to fit your busy schedule.",
            bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            shadowColor: "rgba(240, 147, 251, 0.4)",
            bgImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800"
        },
        {
            icon: <HeartPulse size={40} color="#fff" />,
            title: "Community",
            description: "You're not just Joining a gym. You're joining a supportive community of like-minded individuals. We organize regular events and activities to keep you engaged, motivated, and excited about your health journey.",
            bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            shadowColor: "rgba(67, 233, 123, 0.4)",
            bgImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800"
        }
    ];

    const fadeUpVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="features-section">
            <div className="container" style={{ padding: '0 32px' }}>
                <motion.h2 
                    className="features-title"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUpVariant}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    WHY CHOOSE <span>IRONCLAD MEMBERSHIP</span>
                </motion.h2>

                {isMobile ? (
                    <div className="features-slider-container">
                        <div className="slider-wrapper">
                            <button 
                                className="slider-btn prev vertical-center" 
                                onClick={handlePrevFeature} 
                                aria-label="Previous feature"
                            >
                                <ChevronLeft size={24} color="var(--primary-color)" />
                            </button>

                            <div className="slider-viewport features-viewport">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeFeature}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="feature-card mobile-slider-card"
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={(e, { offset }) => {
                                            if (offset.x < -50) handleNextFeature();
                                            else if (offset.x > 50) handlePrevFeature();
                                        }}
                                    >
                                        <div
                                            className="feature-card-bg"
                                            style={{ backgroundImage: `url(${featuresData[activeFeature].bgImage})` }}
                                        />
                                        <div className="feature-card-overlay" />
                                        <div className="feature-card-content">
                                            <div
                                                className="feature-icon-wrapper"
                                                style={{
                                                    background: featuresData[activeFeature].bgColor,
                                                    boxShadow: `0 10px 20px ${featuresData[activeFeature].shadowColor}`
                                                }}
                                            >
                                                {featuresData[activeFeature].icon}
                                            </div>
                                            <h3 className="feature-card-title">{featuresData[activeFeature].title}</h3>
                                            <p className="feature-card-desc">{featuresData[activeFeature].description}</p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <button 
                                className="slider-btn next vertical-center" 
                                onClick={handleNextFeature} 
                                aria-label="Next feature"
                            >
                                <ChevronRight size={24} color="var(--primary-color)" />
                            </button>
                        </div>

                        <div className="slider-dots">
                            {featuresData.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`slider-dot ${idx === activeFeature ? 'active' : ''}`}
                                    onClick={() => setActiveFeature(idx)}
                                    aria-label={`Go to feature ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="features-grid">
                        {featuresData.map((feature, index) => (
                            <motion.div 
                                className="feature-card" 
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={fadeUpVariant}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                            >
                                <div
                                    className="feature-card-bg"
                                    style={{ backgroundImage: `url(${feature.bgImage})` }}
                                />
                                <div className="feature-card-overlay" />
                                <div className="feature-card-content">
                                    <div
                                        className="feature-icon-wrapper"
                                        style={{
                                            background: feature.bgColor,
                                            boxShadow: `0 10px 20px ${feature.shadowColor}`
                                        }}
                                    >
                                        {feature.icon}
                                    </div>
                                    <h3 className="feature-card-title">{feature.title}</h3>
                                    <p className="feature-card-desc">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Features;
