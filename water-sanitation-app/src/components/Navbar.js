import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">💧</span>
          <span className="logo-text">AquaGuard</span>
        </Link>
        
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => scrollToSection('hero')}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <button className="navbar-link" onClick={() => scrollToSection('features')}>
              Features
            </button>
          </li>
          <li className="navbar-item">
            <button className="navbar-link" onClick={() => scrollToSection('chatbot')}>
              AI Assistant
            </button>
          </li>
          <li className="navbar-item">
            <button className="navbar-link" onClick={() => scrollToSection('tracker')}>
              Tracker
            </button>
          </li>
          <li className="navbar-item">
            <button className="navbar-link" onClick={() => scrollToSection('goals')}>
              Goals
            </button>
          </li>
          <li className="navbar-item">
            <button className="navbar-link" onClick={() => scrollToSection('education')}>
              Education
            </button>
          </li>
          <li className="navbar-item">
            <button className="navbar-cta" onClick={() => scrollToSection('chatbot')}>
              Get Started
            </button>
          </li>
        </ul>

        <div className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 