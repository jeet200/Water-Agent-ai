// Water usage tracker functionality - API calls handled through /api/gemini route

// Water usage tracker functionality
class WaterTracker {
  constructor() {
    this.waterUsageData = {
      shower: 45, // liters per shower (5 minutes)
      toiletFlush: 6, // liters per flush
      dishwashing: 20, // liters per session
      laundry: 50 // liters per load
    };
    
    this.dailyRecommended = 100; // liters per person per day
    this.chart = null;
    this.init();
  }

  init() {
    // Get DOM elements
    this.dateInput = document.getElementById('trackerDate');
    this.showerInput = document.getElementById('showers');
    this.toiletInput = document.getElementById('toiletFlushes');
    this.dishwashingInput = document.getElementById('dishwashing');
    this.laundryInput = document.getElementById('laundry');
    this.calculateButton = document.getElementById('calculateUsage');
    this.resultSection = document.getElementById('usageResult');
    
    // Event listeners
    this.calculateButton.addEventListener('click', () => this.calculateUsage());
    this.dateInput.addEventListener('change', () => this.loadDataForDate());
    
    // Initialize chart
    this.initChart();
    
    // Load today's data
    this.loadTodayData();
  }

  calculateUsage() {
    const showers = parseInt(this.showerInput.value) || 0;
    const toiletFlushes = parseInt(this.toiletInput.value) || 0;
    const dishwashing = parseInt(this.dishwashingInput.value) || 0;
    const laundry = parseInt(this.laundryInput.value) || 0;
    
    // Calculate total usage
    const totalUsage = 
      (showers * this.waterUsageData.shower) +
      (toiletFlushes * this.waterUsageData.toiletFlush) +
      (dishwashing * this.waterUsageData.dishwashing) +
      (laundry * this.waterUsageData.laundry);
    
    // Save data
    this.saveUsageData(totalUsage);
    
    // Display results
    this.displayResults(totalUsage);
    
    // Update chart
    this.updateChart();
    
    // Show notification
    window.aquaGuardApp.showNotification('Water usage calculated!', 'success');
  }

  displayResults(totalUsage) {
    // Show result section
    this.resultSection.classList.remove('hidden');
    
    // Update total usage display
    document.getElementById('totalUsage').textContent = totalUsage;
    
    // Update progress bar
    const usageBar = document.getElementById('usageBar');
    const percentage = Math.min((totalUsage / this.dailyRecommended) * 100, 100);
    usageBar.style.width = percentage + '%';
    
    // Update message
    const usageMessage = document.getElementById('usageMessage');
    let message = '';
    let tips = [];
    
    if (totalUsage <= this.dailyRecommended) {
      message = `Great job! You're within the recommended daily limit of ${this.dailyRecommended}L.`;
      tips = [
        "Keep up the good work!",
        "You're a water conservation champion!",
        "Your habits are helping save water for everyone."
      ];
    } else if (totalUsage <= this.dailyRecommended * 1.2) {
      message = `You're slightly above the recommended ${this.dailyRecommended}L daily limit.`;
      tips = [
        "Try reducing shower time by 1-2 minutes",
        "Turn off taps while soaping or brushing",
        "Check for any leaking taps"
      ];
    } else {
      message = `You're using ${totalUsage - this.dailyRecommended}L more than recommended.`;
      tips = [
        "Consider taking shorter showers (aim for 5 minutes)",
        "Use a bucket for washing instead of running water",
        "Fix any leaking taps immediately",
        "Run washing machines only with full loads"
      ];
    }
    
    // Add tips to message
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    usageMessage.innerHTML = `${message}<br><strong>Tip:</strong> ${randomTip}`;
    
    // Animate the result
    this.animateNumber(totalUsage);
  }

  animateNumber(target) {
    const element = document.getElementById('totalUsage');
    const duration = 1000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  saveUsageData(totalUsage) {
    const date = this.dateInput.value;
    const data = {
      date: date,
      usage: totalUsage,
      breakdown: {
        showers: parseInt(this.showerInput.value) || 0,
        toiletFlushes: parseInt(this.toiletInput.value) || 0,
        dishwashing: parseInt(this.dishwashingInput.value) || 0,
        laundry: parseInt(this.laundryInput.value) || 0
      }
    };
    
    // Get existing data
    let allData = window.aquaGuardApp.getFromLocalStorage('waterUsageData') || {};
    
    // Save new data
    allData[date] = data;
    
    // Keep only last 30 days
    const dates = Object.keys(allData).sort().slice(-30);
    const recentData = {};
    dates.forEach(d => recentData[d] = allData[d]);
    
    window.aquaGuardApp.saveToLocalStorage('waterUsageData', recentData);
  }

  loadDataForDate() {
    const date = this.dateInput.value;
    const allData = window.aquaGuardApp.getFromLocalStorage('waterUsageData') || {};
    
    if (allData[date]) {
      const data = allData[date];
      this.showerInput.value = data.breakdown.showers;
      this.toiletInput.value = data.breakdown.toiletFlushes;
      this.dishwashingInput.value = data.breakdown.dishwashing;
      this.laundryInput.value = data.breakdown.laundry;
      
      // Show results
      this.displayResults(data.usage);
    } else {
      // Reset inputs
      this.showerInput.value = 0;
      this.toiletInput.value = 0;
      this.dishwashingInput.value = 0;
      this.laundryInput.value = 0;
      this.resultSection.classList.add('hidden');
    }
  }

  loadTodayData() {
    const today = new Date().toISOString().split('T')[0];
    this.dateInput.value = today;
    this.loadDataForDate();
  }

  initChart() {
    const ctx = document.getElementById('usageChart');
    if (!ctx) return;
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Daily Water Usage (Liters)',
          data: [],
          borderColor: '#0077be',
          backgroundColor: 'rgba(0, 119, 190, 0.1)',
          tension: 0.4,
          fill: true
        }, {
          label: 'Recommended Limit',
          data: [],
          borderColor: '#4caf50',
          borderDash: [5, 5],
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Liters'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    });
    
    this.updateChart();
  }

  updateChart() {
    if (!this.chart) return;
    
    const allData = window.aquaGuardApp.getFromLocalStorage('waterUsageData') || {};
    const sortedDates = Object.keys(allData).sort().slice(-7); // Last 7 days
    
    const labels = sortedDates.map(date => {
      const d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    });
    
    const usageData = sortedDates.map(date => allData[date].usage);
    const recommendedData = sortedDates.map(() => this.dailyRecommended);
    
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = usageData;
    this.chart.data.datasets[1].data = recommendedData;
    this.chart.update();
  }

  // Get usage statistics
  getUsageStats() {
    const allData = window.aquaGuardApp.getFromLocalStorage('waterUsageData') || {};
    const values = Object.values(allData).map(d => d.usage);
    
    if (values.length === 0) return null;
    
    const total = values.reduce((a, b) => a + b, 0);
    const average = total / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    return {
      average: Math.round(average),
      total: total,
      max: max,
      min: min,
      days: values.length
    };
  }

  // Export data as CSV
  exportData() {
    const allData = window.aquaGuardApp.getFromLocalStorage('waterUsageData') || {};
    let csv = 'Date,Total Usage (L),Showers,Toilet Flushes,Dishwashing,Laundry\n';
    
    Object.entries(allData).forEach(([date, data]) => {
      csv += `${date},${data.usage},${data.breakdown.showers},${data.breakdown.toiletFlushes},${data.breakdown.dishwashing},${data.breakdown.laundry}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'water-usage-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

// Initialize tracker when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.waterTracker = new WaterTracker();
});
