import React, { useState, useEffect } from 'react';
import './Goals.css';

const Goals = ({ utils }) => {
  const [userGoals, setUserGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState('');

  const availableGoals = [
    {
      id: 'shower-time',
      title: 'Reduce shower time by 2 minutes',
      description: 'Take shorter showers to save water',
      points: 50,
      icon: '🚿',
      category: 'bathroom'
    },
    {
      id: 'tap-brushing',
      title: 'Turn off tap while brushing',
      description: 'Save 12 liters daily by turning off tap',
      points: 30,
      icon: '🦷',
      category: 'bathroom'
    },
    {
      id: 'full-loads',
      title: 'Run only full laundry loads',
      description: 'Wait for full loads before washing',
      points: 40,
      icon: '👔',
      category: 'laundry'
    },
    {
      id: 'fix-leaks',
      title: 'Check and fix leaky taps',
      description: 'A dripping tap wastes 20L daily',
      points: 60,
      icon: '🔧',
      category: 'maintenance'
    },
    {
      id: 'reuse-water',
      title: 'Reuse water for plants',
      description: 'Use vegetable washing water for plants',
      points: 35,
      icon: '🌱',
      category: 'kitchen'
    },
    {
      id: 'bucket-wash',
      title: 'Use bucket for car washing',
      description: 'Save 100+ liters vs using a hose',
      points: 45,
      icon: '🚗',
      category: 'outdoor'
    },
    {
      id: 'rainwater',
      title: 'Collect rainwater',
      description: 'Set up containers to collect rainwater',
      points: 70,
      icon: '🌧️',
      category: 'outdoor'
    },
    {
      id: 'dual-flush',
      title: 'Use dual flush wisely',
      description: 'Use appropriate flush option',
      points: 25,
      icon: '🚽',
      category: 'bathroom'
    },
    {
      id: 'dishwasher-full',
      title: 'Run dishwasher only when full',
      description: 'Wait for full loads to save water',
      points: 35,
      icon: '🍽️',
      category: 'kitchen'
    },
    {
      id: 'cold-water',
      title: 'Collect shower warm-up water',
      description: 'Use a bucket to collect cold water',
      points: 40,
      icon: '🪣',
      category: 'bathroom'
    }
  ];

  useEffect(() => {
    loadGoalsData();
  }, []);

  const loadGoalsData = () => {
    const savedData = utils.getFromLocalStorage('goalsData');
    if (savedData) {
      setUserGoals(savedData.userGoals || []);
      setCompletedGoals(savedData.completedGoals || []);
      setTotalPoints(savedData.totalPoints || 0);
    }
  };

  const saveGoalsData = (goals, completed, points) => {
    const data = {
      userGoals: goals,
      completedGoals: completed,
      totalPoints: points
    };
    utils.saveToLocalStorage('goalsData', data);
  };

  const addNewGoal = () => {
    if (!selectedGoal) {
      utils.showNotification('Please select a goal', 'error');
      return;
    }
    
    const goal = availableGoals.find(g => g.id === selectedGoal);
    if (goal) {
      const newGoal = {
        ...goal,
        addedDate: new Date().toISOString(),
        progress: 0,
        completed: false
      };
      
      const updatedGoals = [...userGoals, newGoal];
      setUserGoals(updatedGoals);
      saveGoalsData(updatedGoals, completedGoals, totalPoints);
      
      utils.showNotification('Goal added successfully!', 'success');
      setSelectedGoal('');
    }
  };

  const toggleGoal = (index) => {
    const updatedGoals = [...userGoals];
    const goal = updatedGoals[index];
    goal.completed = !goal.completed;
    
    let updatedCompleted = [...completedGoals];
    let updatedPoints = totalPoints;
    
    if (goal.completed) {
      updatedPoints += goal.points;
      updatedCompleted.push({
        ...goal,
        completedDate: new Date().toISOString()
      });
      celebrateCompletion(goal);
    } else {
      updatedPoints -= goal.points;
      updatedCompleted = updatedCompleted.filter(g => g.id !== goal.id);
    }
    
    setUserGoals(updatedGoals);
    setCompletedGoals(updatedCompleted);
    setTotalPoints(updatedPoints);
    saveGoalsData(updatedGoals, updatedCompleted, updatedPoints);
  };

  const updateProgress = (index) => {
    const updatedGoals = [...userGoals];
    const goal = updatedGoals[index];
    
    goal.progress = Math.min(goal.progress + 20, 100);
    
    if (goal.progress === 100) {
      toggleGoal(index);
    } else {
      setUserGoals(updatedGoals);
      saveGoalsData(updatedGoals, completedGoals, totalPoints);
      utils.showNotification('Great job! Keep it up!', 'success');
    }
  };

  const celebrateCompletion = (goal) => {
    const celebration = document.createElement('div');
    celebration.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      text-align: center;
      z-index: 1000;
      animation: bounceIn 0.5s ease;
    `;
    
    celebration.innerHTML = `
      <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
      <h3 style="color: #4caf50; margin-bottom: 10px;">Goal Completed!</h3>
      <p style="font-size: 18px; margin-bottom: 5px;">${goal.title}</p>
      <p style="font-size: 24px; color: #ff9800;">+${goal.points} points earned!</p>
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
      celebration.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => celebration.remove(), 300);
    }, 3000);
  };

  const getAvailableGoals = () => {
    return availableGoals.filter(goal => {
      const isActive = userGoals.some(g => g.id === goal.id);
      return !isActive;
    });
  };

  const activeGoals = userGoals.filter(g => !g.completed).length;

  return (
    <div className="goals-container">
      <h2>Eco-Habit Goals</h2>
      
      <div className="goals-stats">
        <div className="stat-card">
          <div className="stat-number">{activeGoals}</div>
          <div className="stat-label">Active Goals</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedGoals.length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalPoints}</div>
          <div className="stat-label">Points</div>
        </div>
      </div>
      
      <div className="goals-list">
        {userGoals.length === 0 ? (
          <div className="empty-state">
            <p>No active goals yet. Add one from below to start saving water!</p>
          </div>
        ) : (
          userGoals.map((goal, index) => (
            <div key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                className="goal-checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(index)}
              />
              <div className="goal-content">
                <div className="goal-title">{goal.icon} {goal.title}</div>
                <div className="goal-description">{goal.description}</div>
                <div className="goal-progress">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${goal.progress}%` }}
                    onClick={() => !goal.completed && updateProgress(index)}
                  ></div>
                </div>
              </div>
              <div className="goal-points">+{goal.points}</div>
            </div>
          ))
        )}
      </div>
      
      <div className="add-goal-section">
        <h3>Add New Goal</h3>
        <select
          className="goal-select"
          value={selectedGoal}
          onChange={(e) => setSelectedGoal(e.target.value)}
        >
          <option value="">Select a goal...</option>
          {getAvailableGoals().map(goal => (
            <option key={goal.id} value={goal.id}>
              {goal.icon} {goal.title} (+{goal.points} pts)
            </option>
          ))}
        </select>
        <button className="add-goal-button" onClick={addNewGoal}>
          Add Goal
        </button>
      </div>
    </div>
  );
};

export default Goals; 