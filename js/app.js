// App initialization and navigation
class AquaGuardApp {
  constructor() {
    this.currentTab = 'chat';
    this.init();
  }

  init() {
    // Register service worker for PWA
    this.registerServiceWorker();
    
    // Initialize navigation
    this.setupNavigation();
    
    // Set today's date in tracker
    this.setTodayDate();
    
    // Initialize modules
    this.initializeModules();
    
    // Check for install prompt
    this.setupInstallPrompt();
  }

  registerServiceWorker() {
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
  }

  setupNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;
        
        // Update active states
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        
        this.currentTab = targetTab;
        
        // Trigger tab-specific actions
        this.onTabChange(targetTab);
      });
    });
  }

  onTabChange(tab) {
    switch(tab) {
      case 'tracker':
        // Update tracker display if needed
        if (window.waterTracker) {
          window.waterTracker.loadTodayData();
        }
        break;
      case 'goals':
        // Refresh goals display
        if (window.goalsManager) {
          window.goalsManager.updateStats();
        }
        break;
      case 'learn':
        // Ensure carousel is properly displayed
        if (window.educationModule) {
          window.educationModule.updateDisplay();
        }
        break;
    }
  }

  setTodayDate() {
    const dateInput = document.getElementById('trackerDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
    }
  }

  initializeModules() {
    // Initialize all modules when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      // These will be initialized by their respective JS files
      console.log('AquaGuard App initialized');
    });
  }

  setupInstallPrompt() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      
      // Show custom install prompt
      this.showInstallPrompt(deferredPrompt);
    });
  }

  showInstallPrompt(deferredPrompt) {
    // Create install prompt UI
    const promptDiv = document.createElement('div');
    promptDiv.className = 'install-prompt';
    promptDiv.innerHTML = `
      <span>Install AquaGuard for easy access!</span>
      <button id="installBtn">Install</button>
      <button id="dismissBtn">Not now</button>
    `;
    
    document.body.appendChild(promptDiv);
    promptDiv.style.display = 'flex';
    
    document.getElementById('installBtn').addEventListener('click', () => {
      promptDiv.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        deferredPrompt = null;
      });
    });
    
    document.getElementById('dismissBtn').addEventListener('click', () => {
      promptDiv.style.display = 'none';
    });
  }

  // Utility methods
  showNotification(message, type = 'info') {
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
  }

  // Local storage helpers
  saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  getFromLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  // Date formatting helper
  formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  // Number formatting helper
  formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
  }
}

// Initialize app
const app = new AquaGuardApp();

// Make app instance globally available
window.aquaGuardApp = app;

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translate(-50%, -100%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -100%);
    }
  }
`;
document.head.appendChild(style);
