import React, { useState, useEffect } from 'react';
import Chatbot from './components/Chatbot';
import Tracker from './components/Tracker';
import Goals from './components/Goals';
import Education from './components/Education';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState('chat');
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registered:', registration);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed:', error);
          });
      });
    }

    // Setup install prompt
    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    setShowInstallPrompt(false);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  const showNotification = (message, type = 'info') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 15px 25px;
      background-color: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
      color: white;
      border-radius: 25px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  };

  const getFromLocalStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  };

  const tabs = [
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'tracker', icon: '📊', label: 'Tracker' },
    { id: 'goals', icon: '🎯', label: 'Goals' },
    { id: 'learn', icon: '📚', label: 'Learn' }
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      case 'chat':
        return <Chatbot utils={{ showNotification, saveToLocalStorage, getFromLocalStorage }} />;
      case 'tracker':
        return <Tracker utils={{ showNotification, saveToLocalStorage, getFromLocalStorage }} />;
      case 'goals':
        return <Goals utils={{ showNotification, saveToLocalStorage, getFromLocalStorage }} />;
      case 'learn':
        return <Education utils={{ showNotification, saveToLocalStorage, getFromLocalStorage }} />;
      default:
        return <Chatbot utils={{ showNotification, saveToLocalStorage, getFromLocalStorage }} />;
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>💧 AquaGuard</h1>
        <p className="tagline">Save Water, Save Life</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <main className="tab-content">
        <div className="tab-panel active">
          {renderTabContent()}
        </div>
      </main>

      {/* Install Prompt */}
      {showInstallPrompt && (
        <div className="install-prompt">
          <span>Install AquaGuard for easy access!</span>
          <button onClick={handleInstallClick}>Install</button>
          <button onClick={() => setShowInstallPrompt(false)}>Not now</button>
        </div>
      )}
    </div>
  );
}

export default App; 