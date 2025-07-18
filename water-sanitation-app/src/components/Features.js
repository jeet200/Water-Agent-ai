import React from 'react';
import { motion } from 'framer-motion';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '🧠',
      title: 'AI-Powered Assistant',
      description: 'Get personalized water conservation tips and sanitation guidance powered by Google Gemini AI',
      color: '#4CAF50'
    },
    {
      icon: '📊',
      title: 'Water Usage Tracking',
      description: 'Monitor your daily water consumption with interactive charts and analytics',
      color: '#2196F3'
    },
    {
      icon: '🎯',
      title: 'Eco-Habit Goals',
      description: 'Set and achieve water-saving goals with gamification and reward system',
      color: '#FF9800'
    },
    {
      icon: '📚',
      title: 'Interactive Education',
      description: 'Learn sanitation best practices through 8 comprehensive modules with quizzes',
      color: '#9C27B0'
    },
    {
      icon: '📱',
      title: 'Progressive Web App',
      description: 'Install on any device and use offline with full functionality',
      color: '#00BCD4'
    },
    {
      icon: '🌍',
      title: 'SDG 6 Aligned',
      description: 'Contributing to UN Sustainable Development Goal 6: Clean Water and Sanitation',
      color: '#4CAF50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="features" className="features">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>🌟 Powerful Features for Water Conservation</h2>
          <p>Everything you need to start saving water and improving sanitation practices</p>
        </motion.div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 