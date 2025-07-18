import React, { useState, useEffect } from 'react';
import './Education.css';

const Education = () => {
  const [currentModule, setCurrentModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  const modules = [
    {
      id: 1,
      title: "Water Conservation Basics",
      icon: "💧",
      duration: "10 min",
      difficulty: "Beginner",
      description: "Learn fundamental water conservation principles and techniques",
      content: `
        <h3>Understanding Water Conservation</h3>
        <p>Water conservation is the practice of using water efficiently to reduce unnecessary water usage. It's crucial for:</p>
        <ul>
          <li>Protecting the environment and wildlife</li>
          <li>Reducing water bills and costs</li>
          <li>Ensuring water availability for future generations</li>
          <li>Reducing strain on water treatment facilities</li>
        </ul>
        
        <h3>Key Conservation Principles</h3>
        <p><strong>Efficiency:</strong> Use water only when needed and in appropriate amounts</p>
        <p><strong>Reuse:</strong> Find ways to use water multiple times</p>
        <p><strong>Reduction:</strong> Minimize overall water consumption</p>
        <p><strong>Responsibility:</strong> Be aware of your water usage impact</p>
        
        <h3>Simple Daily Actions</h3>
        <ul>
          <li>Turn off tap while brushing teeth (saves 12L daily)</li>
          <li>Take shorter showers (saves 45L per shower)</li>
          <li>Fix leaks promptly (saves 20L daily per leak)</li>
          <li>Use full loads in dishwashers and washing machines</li>
        </ul>
      `,
      quiz: [
        {
          question: "How much water can you save daily by turning off the tap while brushing teeth?",
          options: ["5L", "12L", "20L", "30L"],
          correct: 1
        },
        {
          question: "What is the most effective way to reduce shower water usage?",
          options: ["Use cold water", "Take shorter showers", "Shower less frequently", "Use low-pressure showerheads"],
          correct: 1
        },
        {
          question: "Which principle is NOT part of water conservation?",
          options: ["Efficiency", "Reuse", "Expansion", "Reduction"],
          correct: 2
        }
      ]
    },
    {
      id: 2,
      title: "Household Water Systems",
      icon: "🏠",
      duration: "15 min",
      difficulty: "Intermediate",
      description: "Understand how water flows through your home and identify improvement opportunities",
      content: `
        <h3>Home Water Distribution</h3>
        <p>Water enters your home through the main supply line, passes through a meter, and is distributed to various fixtures:</p>
        <ul>
          <li>Kitchen: sink, dishwasher, ice maker</li>
          <li>Bathroom: sink, toilet, shower/tub</li>
          <li>Laundry: washing machine, utility sink</li>
          <li>Outdoor: hose connections, sprinkler systems</li>
        </ul>
        
        <h3>Water Pressure and Flow</h3>
        <p>Normal residential water pressure ranges from 30-80 PSI. Low pressure might indicate:</p>
        <ul>
          <li>Clogged pipes or fixtures</li>
          <li>Leaks in the system</li>
          <li>Issues with the municipal supply</li>
          <li>Pressure regulator problems</li>
        </ul>
        
        <h3>Hot Water Systems</h3>
        <p>Most homes use either tank-style or tankless water heaters. Conservation tips:</p>
        <ul>
          <li>Set water heater to 120°F (49°C)</li>
          <li>Insulate hot water pipes</li>
          <li>Consider tankless systems for efficiency</li>
          <li>Regular maintenance prevents energy waste</li>
        </ul>
      `,
      quiz: [
        {
          question: "What is the normal residential water pressure range?",
          options: ["10-30 PSI", "30-80 PSI", "80-120 PSI", "120-200 PSI"],
          correct: 1
        },
        {
          question: "What temperature should you set your water heater to for efficiency?",
          options: ["100°F", "120°F", "140°F", "160°F"],
          correct: 1
        },
        {
          question: "Low water pressure might indicate:",
          options: ["High efficiency", "Clogged pipes", "Good conservation", "New fixtures"],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: "Sanitation and Hygiene",
      icon: "🧼",
      duration: "12 min",
      difficulty: "Beginner",
      description: "Essential sanitation practices for health and water quality protection",
      content: `
        <h3>Personal Hygiene Fundamentals</h3>
        <p>Good personal hygiene prevents disease and protects water sources:</p>
        <ul>
          <li>Wash hands frequently with soap for 20 seconds</li>
          <li>Use clean water for drinking and cooking</li>
          <li>Maintain clean living spaces</li>
          <li>Properly dispose of waste materials</li>
        </ul>
        
        <h3>Water Quality Protection</h3>
        <p>Protect your water sources by:</p>
        <ul>
          <li>Properly disposing of chemicals and medications</li>
          <li>Using eco-friendly cleaning products</li>
          <li>Maintaining septic systems properly</li>
          <li>Avoiding contamination of groundwater</li>
        </ul>
        
        <h3>Sanitation Best Practices</h3>
        <ul>
          <li>Clean water storage containers monthly</li>
          <li>Disinfect surfaces regularly</li>
          <li>Ensure proper drainage around your home</li>
          <li>Keep food preparation areas clean</li>
        </ul>
      `,
      quiz: [
        {
          question: "How long should you wash your hands with soap?",
          options: ["10 seconds", "20 seconds", "30 seconds", "1 minute"],
          correct: 1
        },
        {
          question: "How often should you clean water storage containers?",
          options: ["Weekly", "Monthly", "Yearly", "Only when dirty"],
          correct: 1
        },
        {
          question: "What type of products should you use to protect water sources?",
          options: ["Any available products", "Strongest chemical cleaners", "Eco-friendly products", "No products at all"],
          correct: 2
        }
      ]
    },
    {
      id: 4,
      title: "Leak Detection and Repair",
      icon: "🔧",
      duration: "18 min",
      difficulty: "Intermediate",
      description: "Learn to identify, locate, and fix common household water leaks",
      content: `
        <h3>Common Types of Leaks</h3>
        <p>Most household leaks occur in these locations:</p>
        <ul>
          <li>Faucets and showerheads (90% of leaks)</li>
          <li>Toilet tanks and flappers</li>
          <li>Pipe joints and connections</li>
          <li>Water heater tanks</li>
          <li>Washing machine hoses</li>
        </ul>
        
        <h3>Leak Detection Methods</h3>
        <p><strong>Water Meter Test:</strong> Turn off all water, check if meter is still running</p>
        <p><strong>Food Coloring Test:</strong> Add drops to toilet tank, see if color appears in bowl</p>
        <p><strong>Visual Inspection:</strong> Look for water stains, mold, or dampness</p>
        <p><strong>Sound Detection:</strong> Listen for running water when all fixtures are off</p>
        
        <h3>DIY Repair Tips</h3>
        <ul>
          <li>Replace worn faucet washers and O-rings</li>
          <li>Adjust or replace toilet flappers</li>
          <li>Tighten loose pipe connections</li>
          <li>Replace old supply lines</li>
          <li>Know when to call a professional</li>
        </ul>
      `,
      quiz: [
        {
          question: "What percentage of household leaks occur in faucets and showerheads?",
          options: ["50%", "70%", "90%", "100%"],
          correct: 2
        },
        {
          question: "How do you perform a water meter test for leaks?",
          options: ["Run all water fixtures", "Turn off all water and check if meter runs", "Check water pressure", "Test water temperature"],
          correct: 1
        },
        {
          question: "What is the food coloring test used for?",
          options: ["Testing water quality", "Detecting toilet leaks", "Checking water pressure", "Testing pipe materials"],
          correct: 1
        }
      ]
    },
    {
      id: 5,
      title: "Greywater Systems",
      icon: "♻️",
      duration: "20 min",
      difficulty: "Advanced",
      description: "Explore greywater recycling systems for sustainable water reuse",
      content: `
        <h3>What is Greywater?</h3>
        <p>Greywater is wastewater from:</p>
        <ul>
          <li>Bathroom sinks and showers</li>
          <li>Washing machines</li>
          <li>Kitchen sinks (if not too greasy)</li>
        </ul>
        <p><strong>NOT included:</strong> Toilet waste (blackwater) or heavily contaminated water</p>
        
        <h3>Greywater System Types</h3>
        <p><strong>Simple Systems:</strong> Direct discharge to landscape</p>
        <p><strong>Complex Systems:</strong> Treatment and storage before reuse</p>
        <p><strong>Hybrid Systems:</strong> Combination of treatment methods</p>
        
        <h3>Benefits and Considerations</h3>
        <p><strong>Benefits:</strong></p>
        <ul>
          <li>Reduces water bills by 30-50%</li>
          <li>Decreases strain on septic systems</li>
          <li>Provides irrigation for landscapes</li>
          <li>Reduces environmental impact</li>
        </ul>
        
        <p><strong>Considerations:</strong></p>
        <ul>
          <li>Local regulations and permits</li>
          <li>System maintenance requirements</li>
          <li>Appropriate plant selection</li>
          <li>Seasonal usage variations</li>
        </ul>
      `,
      quiz: [
        {
          question: "Which of these is NOT considered greywater?",
          options: ["Shower water", "Washing machine water", "Toilet water", "Bathroom sink water"],
          correct: 2
        },
        {
          question: "How much can greywater systems reduce water bills?",
          options: ["10-20%", "30-50%", "60-80%", "90-100%"],
          correct: 1
        },
        {
          question: "What should you consider before installing a greywater system?",
          options: ["Only the cost", "Local regulations", "Plant preferences", "All of the above"],
          correct: 3
        }
      ]
    },
    {
      id: 6,
      title: "Rainwater Harvesting",
      icon: "🌧️",
      duration: "16 min",
      difficulty: "Intermediate",
      description: "Capture and utilize rainwater for various household and garden uses",
      content: `
        <h3>Rainwater Harvesting Basics</h3>
        <p>Rainwater harvesting involves collecting and storing rainwater for later use. Benefits include:</p>
        <ul>
          <li>Reduced water bills</li>
          <li>Decreased stormwater runoff</li>
          <li>Emergency water supply</li>
          <li>Reduced erosion and flooding</li>
        </ul>
        
        <h3>System Components</h3>
        <p><strong>Catchment Area:</strong> Usually your roof</p>
        <p><strong>Gutters and Downspouts:</strong> Channel water to collection point</p>
        <p><strong>First Flush Diverter:</strong> Removes initial dirty water</p>
        <p><strong>Storage Tank:</strong> Holds collected water</p>
        <p><strong>Distribution System:</strong> Pumps and pipes for use</p>
        
        <h3>Calculation and Design</h3>
        <p>Formula: Roof Area (sq ft) × Rainfall (inches) × 0.623 = Gallons collected</p>
        <p>Example: 1,000 sq ft roof × 1 inch rain × 0.623 = 623 gallons</p>
        
        <h3>Uses for Harvested Rainwater</h3>
        <ul>
          <li>Garden and landscape irrigation</li>
          <li>Toilet flushing</li>
          <li>Laundry (with proper treatment)</li>
          <li>Car washing</li>
          <li>Emergency supply (with filtration)</li>
        </ul>
      `,
      quiz: [
        {
          question: "What is the main component that serves as the catchment area?",
          options: ["Yard", "Roof", "Driveway", "Garden"],
          correct: 1
        },
        {
          question: "How many gallons can a 1,000 sq ft roof collect from 1 inch of rain?",
          options: ["423 gallons", "623 gallons", "823 gallons", "1,000 gallons"],
          correct: 1
        },
        {
          question: "What is a first flush diverter used for?",
          options: ["Increasing water pressure", "Removing initial dirty water", "Heating water", "Measuring rainfall"],
          correct: 1
        }
      ]
    },
    {
      id: 7,
      title: "Water-Efficient Landscaping",
      icon: "🌱",
      duration: "14 min",
      difficulty: "Intermediate",
      description: "Design and maintain beautiful gardens while minimizing water usage",
      content: `
        <h3>Xeriscaping Principles</h3>
        <p>Xeriscaping is landscaping that requires minimal water. Key principles:</p>
        <ul>
          <li>Planning and design</li>
          <li>Soil improvement</li>
          <li>Appropriate plant selection</li>
          <li>Efficient irrigation</li>
          <li>Mulching</li>
          <li>Maintenance practices</li>
        </ul>
        
        <h3>Native Plant Benefits</h3>
        <p>Native plants are adapted to local conditions and offer:</p>
        <ul>
          <li>Lower water requirements</li>
          <li>Reduced maintenance</li>
          <li>Better pest resistance</li>
          <li>Wildlife habitat value</li>
          <li>Soil erosion control</li>
        </ul>
        
        <h3>Efficient Irrigation Techniques</h3>
        <p><strong>Drip Irrigation:</strong> Delivers water directly to roots</p>
        <p><strong>Soaker Hoses:</strong> Slow, even water distribution</p>
        <p><strong>Micro-Sprinklers:</strong> Targeted watering for specific areas</p>
        <p><strong>Smart Controllers:</strong> Weather-based watering schedules</p>
        
        <h3>Mulching Benefits</h3>
        <ul>
          <li>Reduces water evaporation by up to 70%</li>
          <li>Suppresses weeds</li>
          <li>Moderates soil temperature</li>
          <li>Improves soil health</li>
          <li>Prevents erosion</li>
        </ul>
      `,
      quiz: [
        {
          question: "What does xeriscaping focus on?",
          options: ["Using more water", "Minimizing water usage", "Growing tropical plants", "Increasing lawn size"],
          correct: 1
        },
        {
          question: "How much can mulching reduce water evaporation?",
          options: ["Up to 30%", "Up to 50%", "Up to 70%", "Up to 90%"],
          correct: 2
        },
        {
          question: "Which irrigation method delivers water directly to plant roots?",
          options: ["Sprinklers", "Drip irrigation", "Flooding", "Misting"],
          correct: 1
        }
      ]
    },
    {
      id: 8,
      title: "Global Water Issues",
      icon: "🌍",
      duration: "22 min",
      difficulty: "Advanced",
      description: "Understand worldwide water challenges and sustainable development goals",
      content: `
        <h3>Global Water Crisis</h3>
        <p>Current global water statistics:</p>
        <ul>
          <li>2.2 billion people lack access to safely managed drinking water</li>
          <li>4.2 billion people lack access to safely managed sanitation</li>
          <li>3 billion people lack basic handwashing facilities</li>
          <li>Water scarcity affects 40% of the global population</li>
        </ul>
        
        <h3>UN Sustainable Development Goal 6</h3>
        <p>SDG 6 aims to "ensure availability and sustainable management of water and sanitation for all" by 2030.</p>
        
        <p><strong>Key Targets:</strong></p>
        <ul>
          <li>Universal access to safe drinking water</li>
          <li>Access to adequate sanitation and hygiene</li>
          <li>Improve water quality by reducing pollution</li>
          <li>Increase water-use efficiency</li>
          <li>Implement integrated water resources management</li>
          <li>Protect and restore water-related ecosystems</li>
        </ul>
        
        <h3>Climate Change Impact</h3>
        <p>Climate change affects water resources through:</p>
        <ul>
          <li>Changing precipitation patterns</li>
          <li>Increased frequency of droughts and floods</li>
          <li>Melting glaciers and ice caps</li>
          <li>Rising sea levels affecting freshwater</li>
          <li>Temperature changes affecting water quality</li>
        </ul>
        
        <h3>Individual Actions for Global Impact</h3>
        <ul>
          <li>Reduce personal water consumption</li>
          <li>Support water-efficient businesses</li>
          <li>Advocate for water conservation policies</li>
          <li>Educate others about water issues</li>
          <li>Donate to water-related charities</li>
          <li>Choose products with lower water footprints</li>
        </ul>
      `,
      quiz: [
        {
          question: "How many people lack access to safely managed drinking water?",
          options: ["1.2 billion", "2.2 billion", "3.2 billion", "4.2 billion"],
          correct: 1
        },
        {
          question: "What is the target year for achieving SDG 6?",
          options: ["2025", "2030", "2035", "2040"],
          correct: 1
        },
        {
          question: "What percentage of the global population is affected by water scarcity?",
          options: ["20%", "30%", "40%", "50%"],
          correct: 2
        }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('completedModules');
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, []);

  const startModule = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    setCurrentModule(module);
    setShowQuiz(false);
    setQuizResults(null);
    setQuizAnswers({});
  };

  const closeModule = () => {
    setCurrentModule(null);
    setShowQuiz(false);
    setQuizResults(null);
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setQuizAnswers({});
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const submitQuiz = () => {
    const quiz = currentModule.quiz;
    let correctAnswers = 0;
    
    quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / quiz.length) * 100;
    setQuizResults({
      score: score,
      correctAnswers: correctAnswers,
      totalQuestions: quiz.length,
      passed: score >= 70
    });

    if (score >= 70) {
      const newCompleted = [...completedModules, currentModule.id];
      setCompletedModules(newCompleted);
      localStorage.setItem('completedModules', JSON.stringify(newCompleted));
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const progressPercentage = (completedModules.length / modules.length) * 100;

  return (
    <div className="education-container">
      <div className="education-header">
        <h2>📚 Sanitation Education Hub</h2>
        <p>Master water conservation and sanitation through interactive learning modules</p>
        
        <div className="progress-overview">
          <div className="progress-stats">
            <div className="stat">
              <div className="stat-number">{completedModules.length}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat">
              <div className="stat-number">{modules.length}</div>
              <div className="stat-label">Total Modules</div>
            </div>
            <div className="stat">
              <div className="stat-number">{Math.round(progressPercentage)}%</div>
              <div className="stat-label">Progress</div>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {!currentModule ? (
        <div className="modules-grid">
          {modules.map((module) => (
            <div 
              key={module.id} 
              className={`module-card ${completedModules.includes(module.id) ? 'completed' : ''}`}
            >
              <div className="module-header">
                <div className="module-icon">{module.icon}</div>
                <div className="module-meta">
                  <span className="module-duration">{module.duration}</span>
                  <span 
                    className="module-difficulty"
                    style={{ color: getDifficultyColor(module.difficulty) }}
                  >
                    {module.difficulty}
                  </span>
                </div>
              </div>

              <div className="module-content">
                <h3 className="module-title">{module.title}</h3>
                <p className="module-description">{module.description}</p>
              </div>

              <div className="module-footer">
                <button 
                  className="module-btn"
                  onClick={() => startModule(module.id)}
                >
                  {completedModules.includes(module.id) ? 'Review' : 'Start Module'}
                </button>
                {completedModules.includes(module.id) && (
                  <div className="completion-badge">
                    <span>✅ Completed</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="module-viewer">
          <div className="module-nav">
            <button className="back-btn" onClick={closeModule}>
              ← Back to Modules
            </button>
            <h2>{currentModule.title}</h2>
          </div>

          {!showQuiz ? (
            <div className="module-content-area">
              <div 
                className="module-text"
                dangerouslySetInnerHTML={{ __html: currentModule.content }}
              />
              
              <div className="module-actions">
                <button className="quiz-btn" onClick={startQuiz}>
                  Take Quiz
                </button>
              </div>
            </div>
          ) : (
            <div className="quiz-container">
              <h3>📝 Module Quiz</h3>
              <p>Answer all questions correctly (70% or higher) to complete this module.</p>
              
              {currentModule.quiz.map((question, qIndex) => (
                <div key={qIndex} className="quiz-question">
                  <div className="question-text">
                    {qIndex + 1}. {question.question}
                  </div>
                  <div className="question-options">
                    {question.options.map((option, oIndex) => (
                      <label key={oIndex} className="option-label">
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          value={oIndex}
                          checked={quizAnswers[qIndex] === oIndex}
                          onChange={() => handleQuizAnswer(qIndex, oIndex)}
                        />
                        <span className="option-text">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="quiz-actions">
                <button 
                  className="submit-btn"
                  onClick={submitQuiz}
                  disabled={Object.keys(quizAnswers).length !== currentModule.quiz.length}
                >
                  Submit Quiz
                </button>
              </div>

              {quizResults && (
                <div className={`quiz-results ${quizResults.passed ? 'passed' : 'failed'}`}>
                  <h4>Quiz Results</h4>
                  <p>Score: {quizResults.score.toFixed(1)}%</p>
                  <p>Correct Answers: {quizResults.correctAnswers}/{quizResults.totalQuestions}</p>
                  <p>
                    {quizResults.passed ? 
                      '🎉 Congratulations! You passed the quiz and completed the module!' : 
                      '❌ You need 70% or higher to pass. Please review the material and try again.'}
                  </p>
                  {quizResults.passed && (
                    <button className="continue-btn" onClick={closeModule}>
                      Continue Learning
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Education; 