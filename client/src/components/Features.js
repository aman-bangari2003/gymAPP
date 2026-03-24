import React from 'react';
import { Users, Dumbbell, Clock, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import './Features.css';

const Features = () => {
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
            </div>
        </section>
    );
};

export default Features;
