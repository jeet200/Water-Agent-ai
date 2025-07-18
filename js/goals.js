// Eco-habit goals management
class GoalsManager {
  constructor() {
    this.availableGoals = [
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
    
    this.userGoals = [];
    this.completedGoals = [];
    this.totalPoints = 0;
    this.init();
  }

  init() {
    // Get DOM elements
    this.goalsList = document.getElementById('goalsList');
    this.goalSelect = document.getElementById('goalSelect');
    this.addGoalButton = document.getElementById('addGoalButton');
    
    // Load saved data
    this.loadGoalsData();
    
    // Populate goal selector
    this.populateGoalSelector();
    
    // Display current goals
    this.displayGoals();
    
    // Update statistics
    this.updateStats();
    
    // Event listeners
    this.addGoalButton.addEventListener('click', () => this.addNewGoal());
  }

  loadGoalsData() {
    const savedData = window.aquaGuardApp.getFromLocalStorage('goalsData');
    if (savedData) {
      this.userGoals = savedData.userGoals || [];
      this.completedGoals = savedData.completedGoals || [];
      this.totalPoints = savedData.totalPoints || 0;
    }
  }

  saveGoalsData() {
    const data = {
      userGoals: this.userGoals,
      completedGoals: this.completedGoals,
      totalPoints: this.totalPoints
    };
    window.aquaGuardApp.saveToLocalStorage('goalsData', data);
  }

  populateGoalSelector() {
    // Clear existing options
    this.goalSelect.innerHTML = '<option value="">Select a goal...</option>';
    
    // Add available goals that aren't already active
    this.availableGoals.forEach(goal => {
      const isActive = this.userGoals.some(g => g.id === goal.id);
      const isCompleted = this.completedGoals.some(g => g.id === goal.id);
      
      if (!isActive) {
        const option = document.createElement('option');
        option.value = goal.id;
        option.textContent = `${goal.icon} ${goal.title} (+${goal.points} pts)`;
        if (isCompleted) {
          option.textContent += ' ✓';
        }
        this.goalSelect.appendChild(option);
      }
    });
  }

  addNewGoal() {
    const selectedId = this.goalSelect.value;
    if (!selectedId) {
      window.aquaGuardApp.showNotification('Please select a goal', 'error');
      return;
    }
    
    const goal = this.availableGoals.find(g => g.id === selectedId);
    if (goal) {
      const newGoal = {
        ...goal,
        addedDate: new Date().toISOString(),
        progress: 0,
        completed: false
      };
      
      this.userGoals.push(newGoal);
      this.saveGoalsData();
      this.displayGoals();
      this.updateStats();
      this.populateGoalSelector();
      
      window.aquaGuardApp.showNotification('Goal added successfully!', 'success');
      
      // Reset selector
      this.goalSelect.value = '';
    }
  }

  displayGoals() {
    this.goalsList.innerHTML = '';
    
    if (this.userGoals.length === 0) {
      this.goalsList.innerHTML = `
        <div class="empty-state">
          <p style="text-align: center; color: #666; padding: 20px;">
            No active goals yet. Add one from below to start saving water!
          </p>
        </div>
      `;
      return;
    }
    
    this.userGoals.forEach((goal, index) => {
      const goalElement = this.createGoalElement(goal, index);
      this.goalsList.appendChild(goalElement);
    });
  }

  createGoalElement(goal, index) {
    const div = document.createElement('div');
    div.className = `goal-item ${goal.completed ? 'completed' : ''}`;
    
    div.innerHTML = `
      <input type="checkbox" 
             class="goal-checkbox" 
             id="goal-${index}" 
             ${goal.completed ? 'checked' : ''}>
      <div class="goal-content">
        <div class="goal-title">${goal.icon} ${goal.title}</div>
        <div class="goal-description">${goal.description}</div>
        <div class="goal-progress">
          <div class="progress-bar" style="width: ${goal.progress}%"></div>
        </div>
      </div>
      <div class="goal-points">+${goal.points}</div>
    `;
    
    // Add event listeners
    const checkbox = div.querySelector('.goal-checkbox');
    checkbox.addEventListener('change', () => this.toggleGoal(index));
    
    // Add daily check functionality
    if (!goal.completed) {
      const progressBar = div.querySelector('.progress-bar');
      progressBar.addEventListener('click', () => this.updateProgress(index));
    }
    
    return div;
  }

  toggleGoal(index) {
    const goal = this.userGoals[index];
    goal.completed = !goal.completed;
    
    if (goal.completed) {
      // Add points
      this.totalPoints += goal.points;
      
      // Move to completed goals
      this.completedGoals.push({
        ...goal,
        completedDate: new Date().toISOString()
      });
      
      // Show celebration
      this.celebrateCompletion(goal);
    } else {
      // Remove points
      this.totalPoints -= goal.points;
      
      // Remove from completed goals
      this.completedGoals = this.completedGoals.filter(g => g.id !== goal.id);
    }
    
    this.saveGoalsData();
    this.displayGoals();
    this.updateStats();
  }

  updateProgress(index) {
    const goal = this.userGoals[index];
    
    // Increment progress (assuming daily check-ins)
    goal.progress = Math.min(goal.progress + 20, 100); // 5 days to complete
    
    if (goal.progress === 100) {
      // Auto-complete the goal
      this.toggleGoal(index);
    } else {
      this.saveGoalsData();
      this.displayGoals();
      window.aquaGuardApp.showNotification('Great job! Keep it up!', 'success');
    }
  }

  celebrateCompletion(goal) {
    // Create celebration overlay
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
    
    // Remove after 3 seconds
    setTimeout(() => {
      celebration.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => celebration.remove(), 300);
    }, 3000);
  }

  updateStats() {
    // Update active goals count
    const activeGoals = this.userGoals.filter(g => !g.completed).length;
    document.getElementById('activeGoals').textContent = activeGoals;
    
    // Update completed goals count
    document.getElementById('completedGoals').textContent = this.completedGoals.length;
    
    // Update total points
    document.getElementById('totalPoints').textContent = this.totalPoints;
    
    // Check for achievements
    this.checkAchievements();
  }

  checkAchievements() {
    const achievements = [
      { points: 100, title: 'Water Saver', icon: '💧' },
      { points: 250, title: 'Eco Warrior', icon: '🌿' },
      { points: 500, title: 'Conservation Champion', icon: '🏆' },
      { points: 1000, title: 'Water Guardian', icon: '🛡️' }
    ];
    
    achievements.forEach(achievement => {
      const key = `achievement_${achievement.points}`;
      const hasAchievement = window.aquaGuardApp.getFromLocalStorage(key);
      
      if (!hasAchievement && this.totalPoints >= achievement.points) {
        window.aquaGuardApp.saveToLocalStorage(key, true);
        this.showAchievement(achievement);
      }
    });
  }

  showAchievement(achievement) {
    const notification = `${achievement.icon} Achievement Unlocked: ${achievement.title}!`;
    window.aquaGuardApp.showNotification(notification, 'success');
  }

  // Get goal recommendations based on usage
  getRecommendations(usageData) {
    const recommendations = [];
    
    if (usageData.showers > 2) {
      recommendations.push('shower-time');
    }
    
    if (usageData.toiletFlushes > 10) {
      recommendations.push('dual-flush');
    }
    
    if (usageData.dishwashing > 3) {
      recommendations.push('dishwasher-full');
    }
    
    return recommendations;
  }
}

// Initialize goals manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.goalsManager = new GoalsManager();
});

// Add bounce animation
const style = document.createElement('style');
style.textContent += `
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.3);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  .progress-bar {
    height: 4px;
    background-color: #4caf50;
    border-radius: 2px;
    transition: width 0.3s ease;
    cursor: pointer;
  }
  
  .goal-progress {
    width: 100%;
    height: 4px;
    background-color: #e0e0e0;
    border-radius: 2px;
    margin-top: 8px;
    overflow: hidden;
  }
`;
document.head.appendChild(style);
