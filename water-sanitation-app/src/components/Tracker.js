import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './Tracker.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Tracker = () => {
  const [waterData, setWaterData] = useState({
    shower: 0,
    toilet: 0,
    kitchen: 0,
    laundry: 0,
    garden: 0,
    other: 0
  });

  const [weeklyData, setWeeklyData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('waterTracker');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setWaterData(parsedData.today || waterData);
      setWeeklyData(parsedData.weekly || []);
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage
    const dataToSave = {
      today: waterData,
      weekly: weeklyData
    };
    localStorage.setItem('waterTracker', JSON.stringify(dataToSave));
  }, [waterData, weeklyData]);

  const handleInputChange = (category, value) => {
    setWaterData(prev => ({
      ...prev,
      [category]: Math.max(0, parseInt(value) || 0)
    }));
  };

  const totalUsage = Object.values(waterData).reduce((sum, value) => sum + value, 0);
  const averageUsage = 150; // WHO recommended daily water consumption
  const savingsPercentage = Math.max(0, ((averageUsage - totalUsage) / averageUsage) * 100);

  const categories = [
    { key: 'shower', label: 'Shower/Bath', icon: '🚿', tip: 'Take 5-minute showers', avgUsage: 45 },
    { key: 'toilet', label: 'Toilet', icon: '🚽', tip: 'Use dual-flush toilets', avgUsage: 30 },
    { key: 'kitchen', label: 'Kitchen', icon: '🍽️', tip: 'Use basin for washing dishes', avgUsage: 25 },
    { key: 'laundry', label: 'Laundry', icon: '👕', tip: 'Use full loads only', avgUsage: 20 },
    { key: 'garden', label: 'Garden', icon: '🌱', tip: 'Water in early morning', avgUsage: 20 },
    { key: 'other', label: 'Other', icon: '💧', tip: 'Fix leaks immediately', avgUsage: 10 }
  ];

  // Chart data
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Water Usage (L)',
        data: [145, 132, 128, 155, 140, 138, totalUsage],
        borderColor: 'rgb(0, 119, 190)',
        backgroundColor: 'rgba(0, 119, 190, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Target Usage (L)',
        data: [120, 120, 120, 120, 120, 120, 120],
        borderColor: 'rgb(76, 175, 80)',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
      }
    ]
  };

  const barChartData = {
    labels: categories.map(cat => cat.label),
    datasets: [
      {
        label: 'Current Usage (L)',
        data: categories.map(cat => waterData[cat.key]),
        backgroundColor: 'rgba(0, 119, 190, 0.8)',
        borderColor: 'rgb(0, 119, 190)',
        borderWidth: 1,
      },
      {
        label: 'Average Usage (L)',
        data: categories.map(cat => cat.avgUsage),
        backgroundColor: 'rgba(255, 152, 0, 0.8)',
        borderColor: 'rgb(255, 152, 0)',
        borderWidth: 1,
      }
    ]
  };

  const doughnutData = {
    labels: categories.map(cat => cat.label),
    datasets: [
      {
        data: categories.map(cat => waterData[cat.key]),
        backgroundColor: [
          '#0077be',
          '#00a8cc',
          '#5eb3d6',
          '#4CAF50',
          '#FF9800',
          '#9C27B0'
        ],
        borderWidth: 2,
        borderColor: '#fff',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Water Usage Analytics'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + 'L';
          }
        }
      }
    }
  };

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <h2>💧 Water Usage Tracker</h2>
        <div className="date-selector">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card total-usage">
          <div className="stat-icon">💧</div>
          <div className="stat-content">
            <div className="stat-value">{totalUsage}L</div>
            <div className="stat-label">Today's Usage</div>
          </div>
        </div>

        <div className="stat-card savings">
          <div className="stat-icon">🌱</div>
          <div className="stat-content">
            <div className="stat-value">{savingsPercentage.toFixed(1)}%</div>
            <div className="stat-label">Water Saved</div>
          </div>
        </div>

        <div className="stat-card target">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">120L</div>
            <div className="stat-label">Daily Target</div>
          </div>
        </div>

        <div className="stat-card efficiency">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <div className="stat-value">{totalUsage <= 120 ? 'Excellent' : totalUsage <= 150 ? 'Good' : 'Needs Improvement'}</div>
            <div className="stat-label">Efficiency</div>
          </div>
        </div>
      </div>

      <div className="input-section">
        <h3>📊 Log Your Water Usage</h3>
        <div className="input-grid">
          {categories.map((category) => (
            <div key={category.key} className="input-card">
              <div className="input-header">
                <span className="input-icon">{category.icon}</span>
                <div className="input-info">
                  <h4>{category.label}</h4>
                  <p className="tip">{category.tip}</p>
                </div>
              </div>
              <div className="input-control">
                <input
                  type="number"
                  min="0"
                  value={waterData[category.key]}
                  onChange={(e) => handleInputChange(category.key, e.target.value)}
                  className="water-input"
                  placeholder="0"
                />
                <span className="unit">L</span>
              </div>
              <div className="usage-comparison">
                <span className={`usage-indicator ${waterData[category.key] <= category.avgUsage ? 'good' : 'high'}`}>
                  {waterData[category.key] <= category.avgUsage ? '✓ Efficient' : '⚠ Above Average'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>📈 Weekly Trend</h3>
          <div className="chart-wrapper">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-container">
          <h3>📊 Category Comparison</h3>
          <div className="chart-wrapper">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-container">
          <h3>🥧 Usage Distribution</h3>
          <div className="chart-wrapper">
            <Doughnut data={doughnutData} options={{...chartOptions, scales: undefined}} />
          </div>
        </div>
      </div>

      <div className="insights-section">
        <h3>💡 Personal Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>🏆 Achievement</h4>
            <p>
              {savingsPercentage > 20 ? 'Excellent water conservation!' : 
               savingsPercentage > 10 ? 'Good progress on water saving!' : 
               'Room for improvement in water conservation.'}
            </p>
          </div>
          <div className="insight-card">
            <h4>🎯 Top Tip</h4>
            <p>
              {Object.entries(waterData).reduce((a, b) => waterData[a[0]] > waterData[b[0]] ? a : b)[0] === 'shower' ? 
                'Try taking shorter showers - even 2 minutes less can save 20L daily!' :
                'Focus on fixing leaks and using water-efficient appliances.'}
            </p>
          </div>
          <div className="insight-card">
            <h4>📊 Weekly Goal</h4>
            <p>Aim to reduce total daily usage by 10L this week through small changes in your highest usage category.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker; 