// Enhanced chatbot functionality with integrated knowledge base
class AquaGuardChatbot {
  constructor() {
    // Using secure API route instead of direct API calls
    this.apiUrl = '/api/gemini';
    this.conversationHistory = [];
    this.waterTips = null;
    this.sanitationModules = null;
    this.knowledgeBase = null;
    this.init();
  }

  async init() {
    this.chatMessages = document.getElementById('chatMessages');
    this.chatInput = document.getElementById('chatInput');
    this.sendButton = document.getElementById('sendButton');
    
    // Load knowledge base
    await this.loadKnowledgeBase();
    
    // Event listeners
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
    
    // Load conversation history
    this.loadConversationHistory();
    
    // Add quick suggestion buttons
    this.addQuickSuggestions();
  }

  async loadKnowledgeBase() {
    try {
      // Load water tips
      const tipsResponse = await fetch('data/water-tips.json');
      this.waterTips = await tipsResponse.json();
      
      // Load sanitation modules
      const modulesResponse = await fetch('data/sanitation-modules.json');
      this.sanitationModules = await modulesResponse.json();
      
      // Create comprehensive knowledge base
      this.createKnowledgeBase();
    } catch (error) {
      console.log('Could not load knowledge base files:', error);
    }
  }

  createKnowledgeBase() {
    this.knowledgeBase = {
      // Water conservation patterns
      waterSaving: {
        patterns: [
          'save water', 'conserve water', 'reduce water', 'water usage',
          'water bill', 'water efficient', 'water waste', 'water tips'
        ],
        responses: this.waterTips?.tips || []
      },
      
      // Bathroom activities
      bathroom: {
        patterns: [
          'shower', 'bath', 'toilet', 'bathroom', 'brush teeth', 'shave',
          'flush', 'faucet', 'tap', 'sink'
        ],
        responses: this.waterTips?.tips.find(t => t.category === 'bathroom')?.tips || []
      },
      
      // Kitchen activities
      kitchen: {
        patterns: [
          'kitchen', 'cook', 'dish', 'wash vegetables', 'drink water',
          'food preparation', 'clean dishes', 'dishwasher'
        ],
        responses: this.waterTips?.tips.find(t => t.category === 'kitchen')?.tips || []
      },
      
      // Laundry
      laundry: {
        patterns: [
          'laundry', 'wash clothes', 'washing machine', 'clothes',
          'detergent', 'fabric softener'
        ],
        responses: this.waterTips?.tips.find(t => t.category === 'laundry')?.tips || []
      },
      
      // Outdoor activities
      outdoor: {
        patterns: [
          'garden', 'plants', 'watering', 'lawn', 'car wash',
          'outdoor', 'irrigation', 'sprinkler', 'hose'
        ],
        responses: this.waterTips?.tips.find(t => t.category === 'outdoor')?.tips || []
      },
      
      // Sanitation and hygiene
      sanitation: {
        patterns: [
          'hygiene', 'sanitati', 'clean', 'handwash', 'soap',
          'bacteria', 'germs', 'disease', 'health'
        ],
        responses: this.sanitationModules?.modules || []
      },
      
      // Water facts and numbers
      facts: {
        patterns: [
          'how much water', 'water consumption', 'liters', 'gallons',
          'statistics', 'average', 'daily usage'
        ],
        responses: this.waterTips?.facts || []
      },
      
      // Challenges and goals
      challenges: {
        patterns: [
          'challenge', 'goal', 'target', 'save money', 'reduce bill',
          'eco friendly', 'sustainable', 'environment'
        ],
        responses: this.waterTips?.challenges || []
      }
    };
  }

  addQuickSuggestions() {
    const suggestions = [
      { text: "💧 How much water does a shower use?", icon: "🚿" },
      { text: "🦷 Water-saving tips for brushing teeth", icon: "🦷" },
      { text: "🍽️ Kitchen water conservation tips", icon: "🍽️" },
      { text: "🌱 How to reuse greywater for plants", icon: "🌱" },
      { text: "📊 Track my daily water usage", icon: "📊" }
    ];
    
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'quick-suggestions';
    suggestionsContainer.innerHTML = `
      <div class="suggestions-title">💡 Quick Questions:</div>
      <div class="suggestions-grid">
        ${suggestions.map(suggestion => `
          <button class="suggestion-button" onclick="window.aquaGuardChatbot.sendSuggestion('${suggestion.text}')">
            <span class="suggestion-icon">${suggestion.icon}</span>
            <span class="suggestion-text">${suggestion.text}</span>
          </button>
        `).join('')}
      </div>
    `;
    
    this.chatMessages.appendChild(suggestionsContainer);
  }

  sendSuggestion(text) {
    this.chatInput.value = text;
    this.sendMessage();
  }

  async sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message) return;
    
    // Clear input
    this.chatInput.value = '';
    
    // Hide suggestions after first message
    const suggestions = document.querySelector('.quick-suggestions');
    if (suggestions) {
      suggestions.style.display = 'none';
    }
    
    // Add user message to chat
    this.addMessage(message, 'user');
    
    // Show typing indicator
    const typingIndicator = this.showTypingIndicator();
    
    try {
      // Get response from API or fallback
      const response = await this.getResponse(message);
      
      // Remove typing indicator
      typingIndicator.remove();
      
      // Add bot response
      this.addMessage(response, 'bot');
      
      // Save conversation
      this.saveConversationHistory();
      
    } catch (error) {
      console.error('Error getting response:', error);
      typingIndicator.remove();
      
      // Fallback to local responses
      const fallbackResponse = this.getFallbackResponse(message);
      this.addMessage(fallbackResponse, 'bot');
    }
  }

  async getResponse(message) {
    // Try API first
    try {
      return await this.getGeminiResponse(message);
    } catch (error) {
      // Fallback to enhanced local responses
      return this.getEnhancedLocalResponse(message);
    }
  }

  async getGeminiResponse(message) {
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

    const response = await fetch(this.apiUrl, {
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
  }

  getEnhancedLocalResponse(message) {
    if (!this.knowledgeBase) {
      return this.getFallbackResponse(message);
    }

    const lowerMessage = message.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    // Find best category match
    for (const [category, data] of Object.entries(this.knowledgeBase)) {
      const score = data.patterns.reduce((sum, pattern) => {
        return sum + (lowerMessage.includes(pattern) ? 1 : 0);
      }, 0);

      if (score > bestScore) {
        bestScore = score;
        bestMatch = { category, data };
      }
    }

    if (bestMatch && bestScore > 0) {
      return this.formatKnowledgeResponse(bestMatch, lowerMessage);
    }

    // Fallback to basic responses
    return this.getFallbackResponse(message);
  }

  formatKnowledgeResponse(match, message) {
    const { category, data } = match;
    
    switch (category) {
      case 'bathroom':
        if (message.includes('shower')) {
          return "🚿 A 5-minute shower uses about 45 liters. Try these tips:\n• Turn off water while soaping\n• Use a shower timer\n• Install a low-flow showerhead\n• Collect cold water while it heats up";
        }
        if (message.includes('toilet')) {
          return "🚽 Each flush uses about 6 liters. Save water by:\n• Using dual-flush options wisely\n• Fixing leaks immediately\n• Not using toilet as a wastebasket\n• Installing a water-efficient toilet";
        }
        break;
        
      case 'kitchen':
        if (message.includes('dish')) {
          return "🍽️ Kitchen water-saving tips:\n• Don't pre-rinse dishes before dishwasher\n• Run dishwasher only when full\n• Use a bowl for washing vegetables\n• Fix dripping faucets immediately";
        }
        break;
        
      case 'facts':
        const randomFact = data.responses[Math.floor(Math.random() * data.responses.length)];
        return `📊 ${randomFact.fact}\n💡 ${randomFact.impact}`;
        
      case 'challenges':
        const randomChallenge = data.responses[Math.floor(Math.random() * data.responses.length)];
        return `🎯 Try this challenge: ${randomChallenge.title}\n${randomChallenge.description}\n💧 Potential savings: ${randomChallenge.savings}`;
        
      default:
        const randomTip = data.responses[Math.floor(Math.random() * data.responses.length)];
        return typeof randomTip === 'string' ? randomTip : `💡 ${randomTip}`;
    }
    
    return this.getFallbackResponse(message);
  }

  getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Specific water usage questions
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
    
    if (lowerMessage.includes('drink') || lowerMessage.includes('water storage')) {
      return "💧 **Safe water storage:**\n• Use covered containers\n• Clean weekly with soap\n• Keep elevated off ground\n• Boil if quality uncertain\n\n🛡️ Proper storage prevents contamination!";
    }
    
    if (lowerMessage.includes('hand') || lowerMessage.includes('hygiene')) {
      return "🧼 **Proper handwashing:**\n• Wet hands, turn off tap\n• Apply soap, scrub 20 seconds\n• Turn on tap to rinse\n• Dry with clean towel\n\n💧 Uses only 2-3L vs 6L+ with running water!";
    }
    
    if (lowerMessage.includes('save') || lowerMessage.includes('tips')) {
      return "💡 **Top 5 daily water-savers:**\n1. 🚿 5-minute showers (save 45L)\n2. 🦷 Turn off tap while brushing (save 12L)\n3. 🔧 Fix leaky taps (save 20L)\n4. 👔 Full laundry loads only\n5. 🌱 Reuse water for plants\n\n🏆 Total daily savings: 77+ liters!";
    }
    
    if (lowerMessage.includes('leak')) {
      return "🔧 **Fix leaks immediately!**\n• Dripping tap: 20L daily waste\n• Running toilet: 200L daily waste\n• Small pipe leak: 300L daily waste\n\n💰 A €2 washer can save 7,000L yearly!";
    }
    
    // Default response with daily tip
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
  }

  addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? '👤' : '🤖';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Handle multi-line messages with better formatting
    const lines = content.split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        const p = document.createElement('p');
        // Handle bold text
        if (line.includes('**')) {
          p.innerHTML = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        } else {
          p.textContent = line;
        }
        messageContent.appendChild(p);
      }
    });
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    this.chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    
    // Add to conversation history
    this.conversationHistory.push({ sender, content, timestamp: new Date() });
  }

  showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="loading"></div>
      </div>
    `;
    
    this.chatMessages.appendChild(typingDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    
    return typingDiv;
  }

  saveConversationHistory() {
    const recentHistory = this.conversationHistory.slice(-50);
    window.aquaGuardApp.saveToLocalStorage('chatHistory', recentHistory);
  }

  loadConversationHistory() {
    const history = window.aquaGuardApp.getFromLocalStorage('chatHistory');
    if (history && history.length > 0) {
      const recentMessages = history.slice(-10);
      recentMessages.forEach(msg => {
        this.addMessage(msg.content, msg.sender);
      });
    }
  }

  getWaterFact() {
    const facts = [
      "A running tap wastes 6 liters of water per minute!",
      "Fixing a dripping tap can save up to 20 liters per day.",
      "A 5-minute shower uses about 45-50 liters of water.",
      "Using a bucket for car washing saves 100+ liters compared to a hose.",
      "A dual-flush toilet can save up to 6 liters per flush.",
      "Collecting shower water while it heats up can save 10-15 liters daily.",
      "Running dishwashers and washing machines with full loads saves water and energy.",
      "A family of 4 can save 30,000 liters yearly by fixing household leaks."
    ];
    
    return facts[Math.floor(Math.random() * facts.length)];
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.aquaGuardChatbot = new AquaGuardChatbot();
});

// Add CSS for quick suggestions
const style = document.createElement('style');
style.textContent = `
  .quick-suggestions {
    margin: 20px 0;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e9ecef;
  }
  
  .suggestions-title {
    font-size: 14px;
    font-weight: 600;
    color: #0077be;
    margin-bottom: 10px;
  }
  
  .suggestions-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .suggestion-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    text-align: left;
  }
  
  .suggestion-button:hover {
    background: #e3f2fd;
    border-color: #0077be;
    transform: translateX(2px);
  }
  
  .suggestion-icon {
    font-size: 16px;
    flex-shrink: 0;
  }
  
  .suggestion-text {
    flex: 1;
    color: #333;
  }
  
  .message-content strong {
    color: #0077be;
    font-weight: 600;
  }
`;
document.head.appendChild(style);
