import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm AquaBot, your water conservation assistant. How can I help you save water today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const waterTips = [
    "💧 Take shorter showers to save up to 45L per day",
    "🚿 Install low-flow showerheads to reduce water usage by 30%",
    "🦷 Turn off the tap while brushing teeth to save 12L daily",
    "🌱 Water plants early morning or evening to reduce evaporation",
    "🔧 Fix leaky faucets immediately - a single drip can waste 20L daily",
    "🏠 Use full loads when running dishwashers and washing machines",
    "🚽 Install dual-flush toilets to save 30% on toilet water usage",
    "🌧️ Collect rainwater for garden irrigation and outdoor cleaning",
    "🍽️ Use a basin to wash dishes instead of running water continuously",
    "🚗 Wash cars with a bucket instead of running hose to save 150L"
  ];

  const sanitationTips = [
    "🧼 Wash hands with soap for at least 20 seconds",
    "🚰 Always use treated water for drinking and cooking",
    "🧽 Keep kitchen and bathroom surfaces clean and dry",
    "🗑️ Dispose of waste properly to prevent water contamination",
    "🚿 Take regular baths/showers to maintain personal hygiene",
    "🦠 Disinfect water storage containers regularly",
    "🌿 Use eco-friendly cleaning products to protect water sources",
    "🏠 Ensure proper drainage around your home to prevent stagnant water"
  ];

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help you with water conservation and sanitation tips. What would you like to know?";
    }
    
    if (lowerMessage.includes('save') || lowerMessage.includes('conservation')) {
      const randomTip = waterTips[Math.floor(Math.random() * waterTips.length)];
      return `Here's a water-saving tip: ${randomTip}`;
    }
    
    if (lowerMessage.includes('shower') || lowerMessage.includes('bath')) {
      return "🚿 For showers: Take 5-minute showers instead of baths to save up to 45L per use. Install low-flow showerheads and turn off water while soaping!";
    }
    
    if (lowerMessage.includes('toilet') || lowerMessage.includes('flush')) {
      return "🚽 For toilets: Install dual-flush systems, fix leaks immediately, and avoid using toilet as a trash can. This can save 30% of your toilet water usage!";
    }
    
    if (lowerMessage.includes('kitchen') || lowerMessage.includes('dishes')) {
      return "🍽️ For kitchen: Use a basin for washing dishes, run dishwashers only with full loads, and keep a pitcher of drinking water in the fridge instead of running tap water.";
    }
    
    if (lowerMessage.includes('garden') || lowerMessage.includes('plants')) {
      return "🌱 For gardening: Water plants early morning or evening, use drip irrigation, collect rainwater, and choose drought-resistant plants. Mulch helps retain soil moisture!";
    }
    
    if (lowerMessage.includes('leak') || lowerMessage.includes('repair')) {
      return "🔧 For leaks: Check faucets, pipes, and toilets regularly. A single drip can waste 20L daily! Fix leaks immediately and consider upgrading to water-efficient fixtures.";
    }
    
    if (lowerMessage.includes('sanitation') || lowerMessage.includes('hygiene')) {
      const randomTip = sanitationTips[Math.floor(Math.random() * sanitationTips.length)];
      return `Here's a sanitation tip: ${randomTip}`;
    }
    
    if (lowerMessage.includes('sdg') || lowerMessage.includes('sustainable')) {
      return "🌍 SDG 6 aims to ensure clean water and sanitation for all by 2030. You can contribute by conserving water, preventing pollution, and advocating for water access in your community!";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what')) {
      return "I can help you with:\n• Water conservation tips\n• Sanitation best practices\n• Leak detection and repair\n• Garden watering techniques\n• Kitchen water savings\n• Bathroom efficiency\n• SDG 6 information\n\nJust ask me anything about water!";
    }
    
    // Default responses with tips
    const allTips = [...waterTips, ...sanitationTips];
    const randomTip = allTips[Math.floor(Math.random() * allTips.length)];
    return `${randomTip}\n\nNeed more specific help? Ask me about showers, toilets, kitchen, garden, leaks, or sanitation!`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const quickActions = [
    { text: "Water saving tips", icon: "💧" },
    { text: "Shower efficiency", icon: "🚿" },
    { text: "Kitchen conservation", icon: "🍽️" },
    { text: "Garden watering", icon: "🌱" },
    { text: "Leak detection", icon: "🔧" },
    { text: "Sanitation practices", icon: "🧼" }
  ];

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="bot-avatar">🤖</div>
        <div className="bot-info">
          <h3>AquaBot Assistant</h3>
          <p>Your Water Conservation Guide</p>
        </div>
        <div className="status-indicator online"></div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">{message.timestamp}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-actions">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="quick-action"
            onClick={() => setInputMessage(action.text)}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-text">{action.text}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chatbot-form">
        <div className="input-group">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me about water conservation..."
            className="message-input"
          />
          <button type="submit" className="send-button" disabled={isLoading}>
            <span className="send-icon">➤</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot; 