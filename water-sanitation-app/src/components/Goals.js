import React, { useState, useEffect } from 'react';
import './Goals.css';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);

  const predefinedGoals = [
    {
      id: 1,
      title: "5-Minute Showers",
      description: "Take showers under 5 minutes for 7 days",
      icon: "🚿",
      points: 100,
      category: "Bathroom",
      difficulty: "Easy",
      waterSaved: "45L/day",
      tips: ["Use a shower timer", "Turn off water while soaping", "Play a 5-minute song"]
    },
    {
      id: 2,
      title: "Fix All Leaks",
      description: "Identify and fix all leaky faucets and pipes",
      icon: "🔧",
      points: 150,
      category: "Maintenance",
      difficulty: "Medium",
      waterSaved: "20L/day",
      tips: ["Check all faucets monthly", "Replace worn washers", "Call a plumber if needed"]
    },
    {
      id: 3,
      title: "Full Load Washing",
      description: "Only run washing machine with full loads for 2 weeks",
      icon: "👕",
      points: 80,
      category: "Laundry",
      difficulty: "Easy",
      waterSaved: "25L/wash",
      tips: ["Wait for full loads", "Use cold water", "Pre-treat stains"]
    },
    {
      id: 4,
      title: "Rainwater Collection",
      description: "Set up rainwater collection system for garden use",
      icon: "🌧️",
      points: 200,
      category: "Garden",
      difficulty: "Hard",
      waterSaved: "100L/month",
      tips: ["Use clean containers", "Cover to prevent mosquitos", "Filter before use"]
    },
    {
      id: 5,
      title: "Dual-Flush Toilet",
      description: "Install dual-flush toilet or retrofit existing one",
      icon: "🚽",
      points: 180,
      category: "Bathroom",
      difficulty: "Medium",
      waterSaved: "30L/day",
      tips: ["Use half-flush for liquid waste", "Check for leaks", "Consider water-efficient models"]
    },
    {
      id: 6,
      title: "Water-Wise Garden",
      description: "Replace lawn with drought-resistant plants",
      icon: "🌱",
      points: 250,
      category: "Garden",
      difficulty: "Hard",
      waterSaved: "200L/week",
      tips: ["Choose native plants", "Use mulch", "Group plants by water needs"]
    },
    {
      id: 7,
      title: "Kitchen Water Saver",
      description: "Use basin method for washing dishes for 10 days",
      icon: "🍽️",
      points: 70,
      category: "Kitchen",
      difficulty: "Easy",
      waterSaved: "15L/day",
      tips: ["Fill basin with soapy water", "Rinse efficiently", "Scrape plates first"]
    },
    {
      id: 8,
      title: "Greywater Reuse",
      description: "Set up greywater system for garden irrigation",
      icon: "♻️",
      points: 300,
      category: "Advanced",
      difficulty: "Hard",
      waterSaved: "150L/day",
      tips: ["Use eco-friendly soaps", "Install simple diverter", "Check local regulations"]
    },
    {
      id: 9,
      title: "Water Meter Master",
      description: "Monitor water meter daily for 30 days",
      icon: "📊",
      points: 120,
      category: "Tracking",
      difficulty: "Medium",
      waterSaved: "Variable",
      tips: ["Check at same time daily", "Record readings", "Identify usage patterns"]
    },
    {
      id: 10,
      title: "Community Water Champion",
      description: "Teach 5 people about water conservation",
      icon: "👥",
      points: 150,
      category: "Community",
      difficulty: "Medium",
      waterSaved: "Multiplied impact",
      tips: ["Share personal successes", "Use social media", "Lead by example"]
    }
  ];

  useEffect(() => {
    // Load goals from localStorage
    const savedGoals = localStorage.getItem('waterGoals');
    const savedPoints = localStorage.getItem('userPoints');
    const savedLevel = localStorage.getItem('userLevel');

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      // Initialize with predefined goals
      const initialGoals = predefinedGoals.map(goal => ({
        ...goal,
        status: 'not_started',
        progress: 0,
        startDate: null,
        completedDate: null
      }));
      setGoals(initialGoals);
    }

    if (savedPoints) {
      setUserPoints(parseInt(savedPoints));
    }

    if (savedLevel) {
      setUserLevel(parseInt(savedLevel));
    }
  }, []);

  useEffect(() => {
    // Save goals to localStorage
    localStorage.setItem('waterGoals', JSON.stringify(goals));
    localStorage.setItem('userPoints', userPoints.toString());
    localStorage.setItem('userLevel', userLevel.toString());

    // Update user level based on points
    const newLevel = Math.floor(userPoints / 500) + 1;
    if (newLevel !== userLevel) {
      setUserLevel(newLevel);
    }
  }, [goals, userPoints, userLevel]);

  const startGoal = (goalId) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, status: 'in_progress', startDate: new Date().toISOString() }
        : goal
    ));
  };

  const completeGoal = (goalId) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setGoals(prev => prev.map(g => 
        g.id === goalId 
          ? { ...g, status: 'completed', completedDate: new Date().toISOString(), progress: 100 }
          : g
      ));
      setUserPoints(prev => prev + goal.points);
    }
  };

  const updateProgress = (goalId, progress) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress: Math.min(100, Math.max(0, progress)) }
        : goal
    ));
  };

  const resetGoal = (goalId) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, status: 'not_started', progress: 0, startDate: null, completedDate: null }
        : goal
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in_progress': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const inProgressGoals = goals.filter(g => g.status === 'in_progress').length;
  const totalWaterSaved = goals.filter(g => g.status === 'completed').reduce((sum, goal) => {
    const saved = parseInt(goal.waterSaved.split('L')[0]);
    return sum + (saved || 0);
  }, 0);

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h2>🎯 Eco-Habit Goals</h2>
        <p>Transform your water usage habits with gamified conservation goals!</p>
      </div>

      <div className="user-progress">
        <div className="progress-card">
          <div className="level-badge">
            <div className="level-icon">🏆</div>
            <div className="level-info">
              <div className="level-number">Level {userLevel}</div>
              <div className="level-title">Water Guardian</div>
            </div>
          </div>
          
          <div className="progress-stats">
            <div className="stat-item">
              <div className="stat-value">{userPoints}</div>
              <div className="stat-label">Points</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{completedGoals}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{inProgressGoals}</div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{totalWaterSaved}L</div>
              <div className="stat-label">Water Saved</div>
            </div>
          </div>

          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(userPoints % 500) / 500 * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {userPoints % 500}/500 points to next level
          </div>
        </div>
      </div>

      <div className="goals-grid">
        {goals.map((goal) => (
          <div key={goal.id} className={`goal-card ${goal.status}`}>
            <div className="goal-header">
              <div className="goal-icon">{goal.icon}</div>
              <div className="goal-meta">
                <span className="goal-category">{goal.category}</span>
                <span 
                  className="goal-difficulty"
                  style={{ color: getDifficultyColor(goal.difficulty) }}
                >
                  {goal.difficulty}
                </span>
              </div>
            </div>

            <div className="goal-content">
              <h3 className="goal-title">{goal.title}</h3>
              <p className="goal-description">{goal.description}</p>
              
              <div className="goal-rewards">
                <div className="reward-item">
                  <span className="reward-icon">🏆</span>
                  <span>{goal.points} points</span>
                </div>
                <div className="reward-item">
                  <span className="reward-icon">💧</span>
                  <span>Save {goal.waterSaved}</span>
                </div>
              </div>

              {goal.status === 'in_progress' && (
                <div className="goal-progress">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="progress-bar small">
                    <div 
                      className="progress-fill"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-controls">
                    <button 
                      className="progress-btn"
                      onClick={() => updateProgress(goal.id, goal.progress - 10)}
                    >
                      -10%
                    </button>
                    <button 
                      className="progress-btn"
                      onClick={() => updateProgress(goal.id, goal.progress + 10)}
                    >
                      +10%
                    </button>
                  </div>
                </div>
              )}

              <div className="goal-tips">
                <h4>💡 Tips:</h4>
                <ul>
                  {goal.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="goal-actions">
              {goal.status === 'not_started' && (
                <button 
                  className="goal-btn start"
                  onClick={() => startGoal(goal.id)}
                >
                  Start Goal
                </button>
              )}
              
              {goal.status === 'in_progress' && (
                <>
                  <button 
                    className="goal-btn complete"
                    onClick={() => completeGoal(goal.id)}
                  >
                    Mark Complete
                  </button>
                  <button 
                    className="goal-btn reset"
                    onClick={() => resetGoal(goal.id)}
                  >
                    Reset
                  </button>
                </>
              )}
              
              {goal.status === 'completed' && (
                <div className="completed-badge">
                  <span className="completed-icon">✅</span>
                  <span>Completed!</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="achievements-section">
        <h3>🏅 Achievements</h3>
        <div className="achievements-grid">
          <div className={`achievement ${completedGoals >= 1 ? 'earned' : 'locked'}`}>
            <div className="achievement-icon">🌟</div>
            <div className="achievement-name">First Steps</div>
            <div className="achievement-desc">Complete your first goal</div>
          </div>
          
          <div className={`achievement ${completedGoals >= 5 ? 'earned' : 'locked'}`}>
            <div className="achievement-icon">🏆</div>
            <div className="achievement-name">Water Warrior</div>
            <div className="achievement-desc">Complete 5 goals</div>
          </div>
          
          <div className={`achievement ${userPoints >= 1000 ? 'earned' : 'locked'}`}>
            <div className="achievement-icon">💎</div>
            <div className="achievement-name">Point Master</div>
            <div className="achievement-desc">Earn 1000 points</div>
          </div>
          
          <div className={`achievement ${totalWaterSaved >= 500 ? 'earned' : 'locked'}`}>
            <div className="achievement-icon">🌊</div>
            <div className="achievement-name">Water Saver</div>
            <div className="achievement-desc">Save 500L of water</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals; 