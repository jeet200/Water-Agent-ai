import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">💧</span>
              <span className="logo-text">AquaGuard</span>
            </div>
            <p className="footer-description">
              AI-powered water conservation and sanitation awareness platform 
              aligned with UN SDG 6: Clean Water and Sanitation.
            </p>
            <div className="footer-stats">
              <div className="footer-stat">
                <div className="stat-number">50L</div>
                <div className="stat-label">Daily Savings</div>
              </div>
              <div className="footer-stat">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Liters Saved</div>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li><a href="#chatbot">AI Assistant</a></li>
              <li><a href="#tracker">Water Tracker</a></li>
              <li><a href="#goals">Eco Goals</a></li>
              <li><a href="#education">Education</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#" target="_blank">Water Conservation Tips</a></li>
              <li><a href="#" target="_blank">Sanitation Guidelines</a></li>
              <li><a href="#" target="_blank">SDG 6 Information</a></li>
              <li><a href="#" target="_blank">API Documentation</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Quick Tips</h4>
            <div className="quick-tips">
              <div className="quick-tip">
                <span className="tip-icon">🚿</span>
                <span>5-minute showers save 45L</span>
              </div>
              <div className="quick-tip">
                <span className="tip-icon">🦷</span>
                <span>Turn off tap while brushing</span>
              </div>
              <div className="quick-tip">
                <span className="tip-icon">🔧</span>
                <span>Fix leaks immediately</span>
              </div>
              <div className="quick-tip">
                <span className="tip-icon">🌱</span>
                <span>Reuse water for plants</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>&copy; 2024 AquaGuard. Made with 💙 for a sustainable future.</p>
            <div className="sdg-badge">
              <span>🌐 Contributing to SDG 6: Clean Water & Sanitation</span>
            </div>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 