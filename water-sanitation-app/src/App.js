import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Chatbot from './components/Chatbot';
import Tracker from './components/Tracker';
import Goals from './components/Goals';
import Education from './components/Education';
import Statistics from './components/Statistics';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Statistics />
              <section id="chatbot" className="section">
                <div className="container">
                  <div className="section-header">
                    <h2>💬 AI Water Conservation Assistant</h2>
                    <p>Get personalized water-saving tips and sanitation guidance</p>
                  </div>
                  <Chatbot />
                </div>
              </section>
              <section id="tracker" className="section">
                <div className="container">
                  <div className="section-header">
                    <h2>📊 Water Usage Tracker</h2>
                    <p>Monitor your daily water consumption and track progress</p>
                  </div>
                  <Tracker />
                </div>
              </section>
              <section id="goals" className="section">
                <div className="container">
                  <div className="section-header">
                    <h2>🎯 Eco-Habit Goals</h2>
                    <p>Set and achieve water conservation goals with gamification</p>
                  </div>
                  <Goals />
                </div>
              </section>
              <section id="education" className="section">
                <div className="container">
                  <div className="section-header">
                    <h2>📚 Sanitation Education</h2>
                    <p>Learn best practices for water and sanitation management</p>
                  </div>
                  <Education />
                </div>
              </section>
            </>
          } />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/education" element={<Education />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 