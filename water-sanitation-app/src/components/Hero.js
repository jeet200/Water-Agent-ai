import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="water-animation">
          <div className="water-drop"></div>
          <div className="water-drop"></div>
          <div className="water-drop"></div>
          <div className="water-drop"></div>
          <div className="water-drop"></div>
        </div>
      </div>
      
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Save Water, Save Life
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            AI-powered water conservation and sanitation awareness platform aligned with 
            <strong> SDG 6: Clean Water and Sanitation</strong>
          </motion.p>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="stat-item">
              <div className="stat-number">50L</div>
              <div className="stat-label">Daily Water Savings</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Liters Saved Yearly</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">Education Modules</div>
            </div>
          </motion.div>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <button 
              className="cta-button primary"
              onClick={() => scrollToSection('chatbot')}
            >
              🤖 Start AI Assistant
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => scrollToSection('features')}
            >
              🌟 Explore Features
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="hero-image">
            <div className="water-globe">
              <div className="globe-water"></div>
              <div className="globe-highlight"></div>
            </div>
            <div className="floating-elements">
              <div className="floating-icon">💧</div>
              <div className="floating-icon">🌍</div>
              <div className="floating-icon">🌱</div>
              <div className="floating-icon">♻️</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 