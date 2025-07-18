// Education and sanitation awareness module
class EducationModule {
  constructor() {
    this.currentModuleIndex = 0;
    this.modules = [
      {
        id: 'safe-water-storage',
        title: 'Safe Water Storage',
        icon: '🏺',
        description: 'Proper water storage prevents contamination and ensures your family has access to clean water.',
        tips: [
          'Use covered containers to prevent dust and insects',
          'Clean storage vessels with soap weekly',
          'Keep containers elevated off the ground',
          'Use separate containers for drinking and other uses',
          'Label containers clearly',
          'Never store water in containers that held chemicals'
        ],
        quiz: {
          question: 'How often should water storage containers be cleaned?',
          options: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
          correct: 1
        }
      },
      {
        id: 'handwashing',
        title: 'Proper Handwashing',
        icon: '🧼',
        description: 'Handwashing is the most effective way to prevent disease spread. Learn the right technique!',
        tips: [
          'Wet hands with clean water',
          'Apply soap and lather well',
          'Scrub for at least 20 seconds',
          'Clean between fingers and under nails',
          'Rinse thoroughly with clean water',
          'Dry with a clean towel or air dry'
        ],
        quiz: {
          question: 'How long should you scrub your hands with soap?',
          options: ['5 seconds', '10 seconds', '20 seconds', '1 minute'],
          correct: 2
        }
      },
      {
        id: 'toilet-hygiene',
        title: 'Toilet Hygiene & Maintenance',
        icon: '🚽',
        description: 'Proper toilet use and maintenance prevents disease and protects water sources.',
        tips: [
          'Always use the toilet for human waste',
          'Keep toilet clean with regular cleaning',
          'Fix leaks immediately to save water',
          'Use toilet paper sparingly',
          'Always wash hands after toilet use',
          'Keep toilet brush and cleaning supplies handy'
        ],
        quiz: {
          question: 'What should you always do after using the toilet?',
          options: ['Flush twice', 'Wash hands', 'Use air freshener', 'Close the lid'],
          correct: 1
        }
      },
      {
        id: 'water-contamination',
        title: 'Preventing Water Contamination',
        icon: '⚠️',
        description: 'Understanding contamination sources helps protect your family\'s health.',
        tips: [
          'Keep water sources away from toilets/septic tanks',
          'Boil water if quality is uncertain',
          'Use water purification tablets when needed',
          'Prevent animals from accessing water sources',
          'Dispose of chemicals properly, never in drains',
          'Test well water regularly if applicable'
        ],
        quiz: {
          question: 'What is the minimum distance between water source and toilet?',
          options: ['5 meters', '10 meters', '15 meters', '30 meters'],
          correct: 3
        }
      },
      {
        id: 'greywater-reuse',
        title: 'Greywater Reuse',
        icon: '♻️',
        description: 'Reusing greywater from washing can significantly reduce water consumption.',
        tips: [
          'Use biodegradable soaps for easier reuse',
          'Collect shower/bath water for toilet flushing',
          'Water plants with cooled cooking water',
          'Use washing machine water for floor cleaning',
          'Never reuse water containing harsh chemicals',
          'Filter greywater before reuse when possible'
        ],
        quiz: {
          question: 'Which water is safe to reuse for plants?',
          options: ['Toilet water', 'Vegetable washing water', 'Chemical cleaning water', 'Oil cooking water'],
          correct: 1
        }
      },
      {
        id: 'rainwater-harvesting',
        title: 'Rainwater Harvesting',
        icon: '🌧️',
        description: 'Collecting rainwater provides free, clean water for many household uses.',
        tips: [
          'Clean gutters before rainy season',
          'Use first flush diverters',
          'Store in covered tanks',
          'Use mosquito mesh on openings',
          'Clean collection surfaces regularly',
          'Use collected water within reasonable time'
        ],
        quiz: {
          question: 'What should cover rainwater storage tanks?',
          options: ['Nothing', 'Plastic sheet', 'Mosquito mesh', 'Cloth'],
          correct: 2
        }
      },
      {
        id: 'kitchen-hygiene',
        title: 'Kitchen Water & Hygiene',
        icon: '🍳',
        description: 'Good kitchen practices save water and prevent foodborne illness.',
        tips: [
          'Wash vegetables in a bowl, not under running tap',
          'Reuse vegetable washing water for plants',
          'Defrost food in refrigerator, not under water',
          'Use minimal water for cooking',
          'Clean as you cook to avoid dried-on food',
          'Compost food waste instead of using disposal'
        ],
        quiz: {
          question: 'Best way to wash vegetables?',
          options: ['Under running tap', 'In a bowl', 'With soap', 'With hot water'],
          correct: 1
        }
      },
      {
        id: 'water-quality',
        title: 'Water Quality Testing',
        icon: '🔬',
        description: 'Regular testing ensures your water is safe for drinking and cooking.',
        tips: [
          'Test water sources annually',
          'Look for color, odor, and taste changes',
          'Use water testing kits for basic checks',
          'Know your local water quality standards',
          'Report unusual changes to authorities',
          'Keep records of water test results'
        ],
        quiz: {
          question: 'How often should you test drinking water quality?',
          options: ['Never', 'Every 5 years', 'Annually', 'Daily'],
          correct: 2
        }
      }
    ];
    
    this.init();
  }

  init() {
    // Get DOM elements
    this.moduleContent = document.getElementById('moduleContent');
    this.prevButton = document.getElementById('prevModule');
    this.nextButton = document.getElementById('nextModule');
    this.indicators = document.getElementById('moduleIndicators');
    
    // Event listeners
    this.prevButton.addEventListener('click', () => this.previousModule());
    this.nextButton.addEventListener('click', () => this.nextModule());
    
    // Initialize display
    this.createIndicators();
    this.displayModule();
    
    // Load progress
    this.loadProgress();
  }

  createIndicators() {
    this.indicators.innerHTML = '';
    this.modules.forEach((module, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      indicator.addEventListener('click', () => this.goToModule(index));
      this.indicators.appendChild(indicator);
    });
  }

  displayModule() {
    const module = this.modules[this.currentModuleIndex];
    
    this.moduleContent.innerHTML = `
      <div class="module-card">
        <div class="module-icon">${module.icon}</div>
        <h3 class="module-title">${module.title}</h3>
        <p class="module-description">${module.description}</p>
        
        <div class="module-tips">
          <h4>Key Points:</h4>
          <ul>
            ${module.tips.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        </div>
        
        <div class="module-quiz" style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px;">
          <h4 style="color: #0077be; margin-bottom: 10px;">Quick Quiz:</h4>
          <p style="margin-bottom: 10px;">${module.quiz.question}</p>
          <div class="quiz-options">
            ${module.quiz.options.map((option, index) => `
              <button class="quiz-option" data-index="${index}" style="
                display: block;
                width: 100%;
                padding: 10px;
                margin: 5px 0;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                background: #f8f9fa;
                cursor: pointer;
                transition: all 0.3s;
              ">${option}</button>
            `).join('')}
          </div>
          <div class="quiz-result" style="margin-top: 10px; display: none;"></div>
        </div>
      </div>
    `;
    
    // Update indicators
    this.updateIndicators();
    
    // Add quiz functionality
    this.setupQuiz(module);
  }

  setupQuiz(module) {
    const quizOptions = this.moduleContent.querySelectorAll('.quiz-option');
    const quizResult = this.moduleContent.querySelector('.quiz-result');
    
    quizOptions.forEach((option, index) => {
      option.addEventListener('click', () => {
        // Remove previous selections
        quizOptions.forEach(opt => {
          opt.style.backgroundColor = '#f8f9fa';
          opt.style.borderColor = '#e0e0e0';
          opt.disabled = true;
        });
        
        // Check answer
        if (index === module.quiz.correct) {
          option.style.backgroundColor = '#e8f5e9';
          option.style.borderColor = '#4caf50';
          quizResult.innerHTML = '<p style="color: #4caf50;">✓ Correct! Well done!</p>';
          
          // Save progress
          this.markModuleComplete(module.id);
        } else {
          option.style.backgroundColor = '#ffebee';
          option.style.borderColor = '#f44336';
          quizOptions[module.quiz.correct].style.backgroundColor = '#e8f5e9';
          quizOptions[module.quiz.correct].style.borderColor = '#4caf50';
          quizResult.innerHTML = '<p style="color: #f44336;">✗ Not quite. The correct answer is highlighted.</p>';
        }
        
        quizResult.style.display = 'block';
      });
    });
  }

  updateIndicators() {
    const indicators = this.indicators.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentModuleIndex);
    });
  }

  previousModule() {
    if (this.currentModuleIndex > 0) {
      this.currentModuleIndex--;
      this.displayModule();
    }
  }

  nextModule() {
    if (this.currentModuleIndex < this.modules.length - 1) {
      this.currentModuleIndex++;
      this.displayModule();
    }
  }

  goToModule(index) {
    this.currentModuleIndex = index;
    this.displayModule();
  }

  markModuleComplete(moduleId) {
    let progress = window.aquaGuardApp.getFromLocalStorage('educationProgress') || {};
    progress[moduleId] = {
      completed: true,
      completedDate: new Date().toISOString()
    };
    window.aquaGuardApp.saveToLocalStorage('educationProgress', progress);
    
    // Check if all modules completed
    const allCompleted = this.modules.every(m => progress[m.id]?.completed);
    if (allCompleted && !progress.allCompletedNotified) {
      progress.allCompletedNotified = true;
      window.aquaGuardApp.saveToLocalStorage('educationProgress', progress);
      this.showCompletionCertificate();
    }
  }

  loadProgress() {
    const progress = window.aquaGuardApp.getFromLocalStorage('educationProgress') || {};
    
    // Update UI based on progress
    const completedCount = Object.values(progress).filter(p => p.completed).length;
    if (completedCount > 0) {
      // Could add visual indicators for completed modules
      console.log(`${completedCount} modules completed`);
    }
  }

  showCompletionCertificate() {
    const certificate = document.createElement('div');
    certificate.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      text-align: center;
      z-index: 1000;
      max-width: 400px;
    `;
    
    certificate.innerHTML = `
      <div style="font-size: 64px; margin-bottom: 20px;">🏆</div>
      <h2 style="color: #0077be; margin-bottom: 15px;">Congratulations!</h2>
      <p style="font-size: 18px; margin-bottom: 20px;">
        You've completed all sanitation awareness modules!
      </p>
      <p style="color: #666; margin-bottom: 20px;">
        You're now a certified Water & Sanitation Champion!
      </p>
      <button onclick="this.parentElement.remove()" style="
        padding: 12px 30px;
        background: #0077be;
        color: white;
        border: none;
        border-radius: 25px;
        font-size: 16px;
        cursor: pointer;
      ">Close</button>
    `;
    
    document.body.appendChild(certificate);
  }

  // Get random tip for notifications
  getRandomTip() {
    const allTips = this.modules.flatMap(m => m.tips);
    return allTips[Math.floor(Math.random() * allTips.length)];
  }

  // Export learning progress
  exportProgress() {
    const progress = window.aquaGuardApp.getFromLocalStorage('educationProgress') || {};
    const report = {
      modules: this.modules.map(m => ({
        title: m.title,
        completed: progress[m.id]?.completed || false,
        completedDate: progress[m.id]?.completedDate || null
      })),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'water-education-progress.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  updateDisplay() {
    // Method called when tab is switched to ensure proper display
    this.displayModule();
  }
}

// Initialize education module when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.educationModule = new EducationModule();
});
