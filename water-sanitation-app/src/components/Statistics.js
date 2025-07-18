import React from 'react';
import { motion } from 'framer-motion';
import './Statistics.css';

const Statistics = () => {
  const stats = [
    {
      number: '2.2B',
      label: 'People lack access to safely managed drinking water',
      icon: '🚰',
      color: '#F44336'
    },
    {
      number: '4.2B',
      label: 'People lack access to safely managed sanitation',
      icon: '🚽',
      color: '#FF9800'
    },
    {
      number: '150L',
      label: 'Average daily water consumption per person',
      icon: '💧',
      color: '#2196F3'
    },
    {
      number: '30%',
      label: 'Of household water use is for toilets',
      icon: '🏠',
      color: '#4CAF50'
    }
  ];

  const tips = [
    {
      tip: 'Turn off tap while brushing teeth',
      savings: 'Save 12L daily',
      icon: '🦷'
    },
    {
      tip: 'Take 5-minute showers',
      savings: 'Save 45L per shower',
      icon: '🚿'
    },
    {
      tip: 'Fix leaky taps immediately',
      savings: 'Save 20L daily',
      icon: '🔧'
    },
    {
      tip: 'Use full loads in washing machine',
      savings: 'Save 25L per wash',
      icon: '👔'
    }
  ];

  return (
    <section id="statistics" className="statistics">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>📊 Water Crisis & Conservation Impact</h2>
          <p>Understanding the global water challenge and how we can make a difference</p>
        </motion.div>

        <div className="statistics-content">
          <motion.div 
            className="stats-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="tips-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>💡 Daily Water-Saving Tips</h3>
            <div className="tips-grid">
              {tips.map((tip, index) => (
                <motion.div 
                  key={index}
                  className="tip-card"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="tip-icon">{tip.icon}</div>
                  <div className="tip-content">
                    <div className="tip-text">{tip.tip}</div>
                    <div className="tip-savings">{tip.savings}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Statistics; 