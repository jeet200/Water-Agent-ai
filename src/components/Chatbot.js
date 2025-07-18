import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = ({ utils }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  // Using secure API route instead of direct API calls
  const apiUrl = '/api/gemini';

  const suggestions = [
    { text: "💧 How much water does a shower use?", icon: "🚿" },
    { text: "🦷 Water-saving tips for brushing teeth", icon: "🦷" },
    { text: "🍽️ Kitchen water conservation tips", icon: "🍽️" },
    { text: "🌱 How to reuse greywater for plants", icon: "🌱" },
    { text: "📊 Track my daily water usage", icon: "📊" }
  ];

  useEffect(() => {
    // Load knowledge base
    loadKnowledgeBase();
    
    // Load conversation history
    loadConversationHistory();
    
    // Add initial bot message
    if (messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          content: "Hello! I'm AquaGuard, your water conservation assistant. Ask me anything about saving water or sanitation practices!\n\nTry asking: \"How can I save water while brushing teeth?\" or \"How much water does a shower use?\"",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadKnowledgeBase = async () => {
    try {
      const [tipsResponse, modulesResponse] = await Promise.all([
        fetch('/data/water-tips.json'),
        fetch('/data/sanitation-modules.json')
      ]);

      const waterTips = await tipsResponse.json();
      const sanitationModules = await modulesResponse.json();

      setKnowledgeBase({
        waterTips,
        sanitationModules
      });
    } catch (error) {
      console.log('Could not load knowledge base files:', error);
    }
  };

  const loadConversationHistory = () => {
    const history = utils.getFromLocalStorage('chatHistory');
    if (history && history.length > 0) {
      const recentMessages = history.slice(-10);
      setMessages(recentMessages);
    }
  };

  const saveConversationHistory = (newMessages) => {
    const recentHistory = newMessages.slice(-50);
    utils.saveToLocalStorage('chatHistory', recentHistory);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSuggestionClick = (text) => {
    setInputValue(text);
    handleSendMessage(text);
  };

  const handleSendMessage = async (messageText = null) => {
    const message = messageText || inputValue.trim();
    if (!message) return;

    setInputValue('');
    setShowSuggestions(false);

    // Add user message
    const userMessage = {
      sender: 'user',
      content: message,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      // Get response
      const response = await getResponse(message);
      
      // Add bot response
      const botMessage = {
        sender: 'bot',
        content: response,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      saveConversationHistory(finalMessages);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Fallback response
      const fallbackResponse = getFallbackResponse(message);
      const botMessage = {
        sender: 'bot',
        content: fallbackResponse,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      saveConversationHistory(finalMessages);
    }

    setIsTyping(false);
  };

  const getResponse = async (message) => {
    try {
      return await getGeminiResponse(message);
    } catch (error) {
      return getEnhancedLocalResponse(message);
    }
  };

  const getGeminiResponse = async (message) => {
    const systemContext = `You are AquaGuard, an AI assistant specialized in water conservation and sanitation. 
    Your role is to:
    1. Provide practical tips for saving water in daily activities
    2. Educate about water usage and consumption patterns
    3. Promote good sanitation and hygiene practices
    4. Give specific, actionable advice with numbers when possible
    5. Be encouraging and positive about water conservation
    6. Use simple language that everyone can understand
    7. Focus on SDG 6: Clean Water and Sanitation
    8. Reference specific water amounts (liters) when relevant
    
    Context from user's app:
    - Average shower: 45L (5 minutes)
    - Toilet flush: 6L per flush
    - Dishwashing: 20L per session
    - Laundry: 50L per load
    - Recommended daily limit: 100L per person
    
    Keep responses concise (2-3 sentences), practical, and motivational.`;

    const prompt = `${systemContext}\n\nUser question: ${message}\n\nProvide a helpful, specific response about water conservation or sanitation.`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    if (data.response) {
      return data.response;
    } else {
      throw new Error('Invalid response format');
    }
  };

  const getEnhancedLocalResponse = (message) => {
    return getFallbackResponse(message);
  };

  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('shower')) {
      return "🚿 A typical shower uses about 9-10 liters per minute. A 5-minute shower = 45 liters.\n\n💡 **Water-saving tips:**\n• Turn off water while soaping\n• Use a shower timer\n• Install a low-flow showerhead\n• Try the 5-minute shower challenge!";
    }
    
    if (lowerMessage.includes('brush') || lowerMessage.includes('teeth')) {
      return "🦷 **Turn off the tap while brushing!**\n\n💧 Running water uses 6L per minute\n✅ Turn off = Save 12L daily\n🏆 That's 4,380L saved per year!\n\n💡 Use a glass of water for rinsing instead.";
    }
    
    if (lowerMessage.includes('wash') && (lowerMessage.includes('cloth') || lowerMessage.includes('laundry'))) {
      return "👔 **Smart laundry tips:**\n• Wait for full loads (50L per wash)\n• Use cold water when possible\n• Reuse towels 2-3 times\n• Use appropriate water level settings\n\n💰 Full loads save 25L per wash!";
    }
    
    if (lowerMessage.includes('toilet')) {
      return "🚽 **Toilet water facts:**\n• Each flush: 6-9 liters\n• Average person: 6-8 flushes daily\n• Daily toilet use: ~48 liters\n\n💡 **Save water by:**\n• Using dual-flush correctly\n• Fixing leaks immediately\n• Not using as wastebasket";
    }
    
    if (lowerMessage.includes('kitchen') || lowerMessage.includes('dish')) {
      return "🍽️ **Kitchen water-saving:**\n• Don't pre-rinse dishes (saves 25L)\n• Wash vegetables in a bowl\n• Run dishwasher only when full\n• Use leftover water for plants\n\n🌱 Vegetable water is great for gardens!";
    }
    
    if (lowerMessage.includes('save') || lowerMessage.includes('tips')) {
      return "💡 **Top 5 daily water-savers:**\n1. 🚿 5-minute showers (save 45L)\n2. 🦷 Turn off tap while brushing (save 12L)\n3. 🔧 Fix leaky taps (save 20L)\n4. 👔 Full laundry loads only\n5. 🌱 Reuse water for plants\n\n🏆 Total daily savings: 77+ liters!";
    }
    
    const dailyTips = [
      "💧 **Did you know?** A running tap wastes 6 liters per minute!",
      "🚿 **Shower tip:** Reduce shower time by 2 minutes to save 18L daily!",
      "🌱 **Garden tip:** Use drip irrigation to save 70% water vs sprinklers!",
      "🏠 **Home tip:** Fix household leaks to save 30,000L yearly!",
      "🦷 **Hygiene tip:** Turn off tap while brushing to save 12L daily!",
      "🍽️ **Kitchen tip:** Use a bowl for washing vegetables, then water plants!",
      "🚽 **Bathroom tip:** Use dual-flush toilets to save 6L per flush!",
      "⏰ **Timer tip:** Use a 5-minute shower timer to track usage!"
    ];
    
    const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    
    return `${randomTip}\n\n🎯 **Ask me about:**\n• Shower water usage\n• Kitchen water saving\n• Toilet efficiency\n• Handwashing techniques\n• Water-saving goals\n\n💬 Try: "How much water does a 10-minute shower use?"`;
  };

  const formatMessageContent = (content) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.trim()) {
        if (line.includes('**')) {
          return (
            <p key={index} dangerouslySetInnerHTML={{ 
              __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
            }} />
          );
        } else {
          return <p key={index}>{line}</p>;
        }
      }
      return null;
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {showSuggestions && (
          <div className="quick-suggestions">
            <div className="suggestions-title">💡 Quick Questions:</div>
            <div className="suggestions-grid">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-button"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  <span className="suggestion-icon">{suggestion.icon}</span>
                  <span className="suggestion-text">{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}-message`}>
            <div className="message-avatar">
              {message.sender === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              {formatMessageContent(message.content)}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot-message typing-indicator">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="loading"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button className="send-button" onClick={() => handleSendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot; 