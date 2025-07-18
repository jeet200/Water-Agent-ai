import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './Tracker.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Tracker = ({ utils }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showers, setShowers] = useState(0);
  const [toiletFlushes, setToiletFlushes] = useState(0);
  const [dishwashing, setDishwashing] = useState(0);
  const [laundry, setLaundry] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [totalUsage, setTotalUsage] = useState(0);
  const [chartData, setChartData] = useState(null);

  const waterUsageData = {
    shower: 45, // liters per shower (5 minutes)
    toiletFlush: 6, // liters per flush
    dishwashing: 20, // liters per session
    laundry: 50 // liters per load
  };

  const dailyRecommended = 100; // liters per person per day

  useEffect(() => {
    loadDataForDate();
  }, [date]);

  useEffect(() => {
    updateChart();
  }, [showResult]);

  const loadDataForDate = () => {
    const allData = utils.getFromLocalStorage('waterUsageData') || {};
    
    if (allData[date]) {
      const data = allData[date];
      setShowers(data.breakdown.showers);
      setToiletFlushes(data.breakdown.toiletFlushes);
      setDishwashing(data.breakdown.dishwashing);
      setLaundry(data.breakdown.laundry);
      setTotalUsage(data.usage);
      setShowResult(true);
    } else {
      setShowers(0);
      setToiletFlushes(0);
      setDishwashing(0);
      setLaundry(0);
      setShowResult(false);
    }
  };

  const calculateUsage = () => {
    const total = 
      (showers * waterUsageData.shower) +
      (toiletFlushes * waterUsageData.toiletFlush) +
      (dishwashing * waterUsageData.dishwashing) +
      (laundry * waterUsageData.laundry);

    setTotalUsage(total);
    saveUsageData(total);
    setShowResult(true);
    utils.showNotification('Water usage calculated!', 'success');
  };

  const saveUsageData = (total) => {
    const data = {
      date: date,
      usage: total,
      breakdown: {
        showers: showers,
        toiletFlushes: toiletFlushes,
        dishwashing: dishwashing,
        laundry: laundry
      }
    };
    
    let allData = utils.getFromLocalStorage('waterUsageData') || {};
    allData[date] = data;
    
    // Keep only last 30 days
    const dates = Object.keys(allData).sort().slice(-30);
    const recentData = {};
    dates.forEach(d => recentData[d] = allData[d]);
    
    utils.saveToLocalStorage('waterUsageData', recentData);
  };

  const updateChart = () => {
    const allData = utils.getFromLocalStorage('waterUsageData') || {};
    const sortedDates = Object.keys(allData).sort().slice(-7); // Last 7 days
    
    const labels = sortedDates.map(date => {
      const d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    });
    
    const usageData = sortedDates.map(date => allData[date].usage);
    const recommendedData = sortedDates.map(() => dailyRecommended);
    
    setChartData({
      labels,
      datasets: [
        {
          label: 'Daily Water Usage (Liters)',
          data: usageData,
          borderColor: '#0077be',
          backgroundColor: 'rgba(0, 119, 190, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Recommended Limit',
          data: recommendedData,
          borderColor: '#4caf50',
          borderDash: [5, 5],
          fill: false,
        }
      ]
    });
  };

  const getUsageMessage = () => {
    let message = '';
    let tips = [];
    
    if (totalUsage <= dailyRecommended) {
      message = `Great job! You're within the recommended daily limit of ${dailyRecommended}L.`;
      tips = [
        "Keep up the good work!",
        "You're a water conservation champion!",
        "Your habits are helping save water for everyone."
      ];
    } else if (totalUsage <= dailyRecommended * 1.2) {
      message = `You're slightly above the recommended ${dailyRecommended}L daily limit.`;
      tips = [
        "Try reducing shower time by 1-2 minutes",
        "Turn off taps while soaping or brushing",
        "Check for any leaking taps"
      ];
    } else {
      message = `You're using ${totalUsage - dailyRecommended}L more than recommended.`;
      tips = [
        "Consider taking shorter showers (aim for 5 minutes)",
        "Use a bucket for washing instead of running water",
        "Fix any leaking taps immediately",
        "Run washing machines only with full loads"
      ];
    }
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    return { message, tip: randomTip };
  };

  const chartOptions = {
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
  };

  return (
    <div className="tracker-container">
      <h2>Daily Water Usage Tracker</h2>
      
      <div className="usage-date">
        <label htmlFor="trackerDate">Date:</label>
        <input
          type="date"
          id="trackerDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      
      <div className="usage-inputs">
        <div className="usage-item">
          <label>
            <span className="usage-icon">🚿</span>
            Showers
          </label>
          <div className="input-group">
            <input
              type="number"
              min="0"
              max="10"
              value={showers}
              onChange={(e) => setShowers(parseInt(e.target.value) || 0)}
            />
            <span className="unit">times</span>
          </div>
        </div>
        
        <div className="usage-item">
          <label>
            <span className="usage-icon">🚽</span>
            Toilet Flushes
          </label>
          <div className="input-group">
            <input
              type="number"
              min="0"
              max="20"
              value={toiletFlushes}
              onChange={(e) => setToiletFlushes(parseInt(e.target.value) || 0)}
            />
            <span className="unit">times</span>
          </div>
        </div>
        
        <div className="usage-item">
          <label>
            <span className="usage-icon">🍽️</span>
            Dishwashing
          </label>
          <div className="input-group">
            <input
              type="number"
              min="0"
              max="10"
              value={dishwashing}
              onChange={(e) => setDishwashing(parseInt(e.target.value) || 0)}
            />
            <span className="unit">times</span>
          </div>
        </div>
        
        <div className="usage-item">
          <label>
            <span className="usage-icon">👔</span>
            Laundry Loads
          </label>
          <div className="input-group">
            <input
              type="number"
              min="0"
              max="5"
              value={laundry}
              onChange={(e) => setLaundry(parseInt(e.target.value) || 0)}
            />
            <span className="unit">loads</span>
          </div>
        </div>
      </div>
      
      <button className="calculate-button" onClick={calculateUsage}>
        Calculate Usage
      </button>
      
      {showResult && (
        <div className="usage-result">
          <h3>Today's Water Usage</h3>
          <div className="usage-display">
            <div className="usage-number">{totalUsage}</div>
            <div className="usage-unit">Liters</div>
          </div>
          <div className="usage-comparison">
            <div className="comparison-bar">
              <div 
                className="bar-fill" 
                style={{ 
                  width: `${Math.min((totalUsage / dailyRecommended) * 100, 100)}%` 
                }}
              ></div>
            </div>
            <div className="usage-message">
              {getUsageMessage().message}
              <br />
              <strong>Tip:</strong> {getUsageMessage().tip}
            </div>
          </div>
          {chartData && (
            <div className="usage-history">
              <div style={{ height: '200px' }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tracker; 