import React, { useState, useEffect } from 'react';
import './Education.css';

const Education = ({ utils }) => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [educationProgress, setEducationProgress] = useState({});

  const modules = [
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

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const progress = utils.getFromLocalStorage('educationProgress') || {};
    setEducationProgress(progress);
  };

  const markModuleComplete = (moduleId) => {
    const updatedProgress = {
      ...educationProgress,
      [moduleId]: {
        completed: true,
        completedDate: new Date().toISOString()
      }
    };
    
    setEducationProgress(updatedProgress);
    utils.saveToLocalStorage('educationProgress', updatedProgress);
    
    // Check if all modules completed
    const allCompleted = modules.every(m => updatedProgress[m.id]?.completed);
    if (allCompleted && !updatedProgress.allCompletedNotified) {
      updatedProgress.allCompletedNotified = true;
      utils.saveToLocalStorage('educationProgress', updatedProgress);
      showCompletionCertificate();
    }
  };

  const showCompletionCertificate = () => {
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
  };

  const handleQuizAnswer = (optionIndex) => {
    const currentModule = modules[currentModuleIndex];
    const isCorrect = optionIndex === currentModule.quiz.correct;
    
    if (isCorrect) {
      utils.showNotification('Correct! Well done!', 'success');
      markModuleComplete(currentModule.id);
    } else {
      utils.showNotification('Not quite right. Try again!', 'error');
    }
  };

  const nextModule = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const prevModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const goToModule = (index) => {
    setCurrentModuleIndex(index);
  };

  const currentModule = modules[currentModuleIndex];

  return (
    <div className="learn-container">
      <h2>Sanitation Awareness</h2>
      
      <div className="module-carousel">
        <button 
          className="carousel-button prev" 
          onClick={prevModule}
          disabled={currentModuleIndex === 0}
        >
          ‹
        </button>
        
        <div className="module-content">
          <div className="module-card">
            <div className="module-icon">{currentModule.icon}</div>
            <h3 className="module-title">{currentModule.title}</h3>
            <p className="module-description">{currentModule.description}</p>
            
            <div className="module-tips">
              <h4>Key Points:</h4>
              <ul>
                {currentModule.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="module-quiz">
              <h4>Quick Quiz:</h4>
              <p>{currentModule.quiz.question}</p>
              <div className="quiz-options">
                {currentModule.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    className="quiz-option"
                    onClick={() => handleQuizAnswer(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <button 
          className="carousel-button next" 
          onClick={nextModule}
          disabled={currentModuleIndex === modules.length - 1}
        >
          ›
        </button>
      </div>
      
      <div className="module-indicators">
        {modules.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentModuleIndex ? 'active' : ''}`}
            onClick={() => goToModule(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Education; 