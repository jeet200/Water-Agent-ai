# 🚀 AquaGuard React App - Setup Instructions

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git** (optional)

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
# Navigate to the project directory
cd water-sanitation-app

# Install all dependencies
npm install
```

### 2. Start Development Server

```bash
# Start the React development server
npm start
```

The app will open at `http://localhost:3000`

### 3. Build for Production

```bash
# Create optimized production build
npm run build
```

### 4. Serve Production Build

```bash
# Install serve globally (if not already installed)
npm install -g serve

# Serve the production build
npm run serve
```

## 🔧 Configuration

### API Configuration

1. **Google Gemini API Key**:
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Edit `src/components/Chatbot.js`
   - Replace the API key on line 15:

```javascript
const apiKey = 'YOUR_GEMINI_API_KEY_HERE';
```

2. **Offline Mode**:
   - The app works offline with built-in knowledge base
   - No API key required for basic functionality

### PWA Setup

1. **Generate Icons**:
   ```bash
   # Open the icon generator
   open generate-icons.html
   ```

2. **Create Icons Directory**:
   ```bash
   mkdir -p public/images/icons
   ```

3. **Download Generated Icons**:
   - Save all generated icons to `public/images/icons/`
   - Use exact filenames: `icon-72.png`, `icon-96.png`, etc.

## 🌟 Features

### ✅ What's Included

- **🧠 AI Chatbot** - Powered by Google Gemini API
- **📊 Water Usage Tracker** - Interactive charts with Chart.js
- **🎯 Eco-Habit Goals** - Gamified water-saving challenges
- **📚 Educational Modules** - 8 interactive learning modules
- **📱 Progressive Web App** - Installable on mobile devices
- **🔄 Offline Support** - Works without internet connection

### 🎨 Modern Tech Stack

- **React 18** - Latest React with hooks
- **Chart.js + react-chartjs-2** - Beautiful interactive charts
- **CSS3** - Modern styling with CSS variables
- **LocalStorage** - Persistent offline data
- **Service Worker** - PWA functionality

## 🚀 Deployment

### Deploy to Netlify

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Drag and drop the `build` folder to [Netlify](https://app.netlify.com/drop)
   - Or connect your GitHub repository for automatic deployments

### Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

### Deploy to GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/aquaguard-app",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🎯 Usage

### 1. Water Conservation Chat

- Ask about water-saving tips
- Get personalized recommendations
- Learn about daily water usage
- **Example**: "How much water does a shower use?"

### 2. Daily Water Tracking

- Input daily activities (showers, toilet flushes, etc.)
- See visual analytics and charts
- Compare against recommended limits
- Track progress over time

### 3. Eco-Habit Goals

- Choose from 10 predefined goals
- Track progress with visual indicators
- Earn points and achievements
- Get motivated with rewards

### 4. Interactive Learning

- Complete 8 educational modules
- Take quizzes to test knowledge
- Learn about sanitation best practices
- Earn certification upon completion

## 📱 Progressive Web App

### Installation

1. **Mobile (Chrome/Safari)**:
   - Visit the app URL
   - Tap "Add to Home Screen"

2. **Desktop (Chrome/Edge)**:
   - Click the install button in the address bar
   - Or use the in-app install prompt

### Offline Features

- Full functionality without internet
- Cached resources for fast loading
- Local data storage
- Background sync when connection returns

## 🔄 Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Serve production build
npm run serve
```

### Project Structure

```
water-sanitation-app/
├── public/
│   ├── data/
│   │   ├── water-tips.json
│   │   └── sanitation-modules.json
│   ├── images/icons/
│   ├── index.html
│   ├── manifest.json
│   └── service-worker.js
├── src/
│   ├── components/
│   │   ├── Chatbot.js
│   │   ├── Tracker.js
│   │   ├── Goals.js
│   │   └── Education.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎨 Customization

### Theming

Edit CSS variables in `src/App.css`:

```css
:root {
  --primary-color: #0077be;
  --secondary-color: #00a8cc;
  --accent-color: #5eb3d6;
  /* ... */
}
```

### Water Usage Rates

Edit `src/components/Tracker.js`:

```javascript
const waterUsageData = {
  shower: 45,     // liters per shower
  toiletFlush: 6, // liters per flush
  dishwashing: 20, // liters per session
  laundry: 50     // liters per load
};
```

### Goals

Edit `src/components/Goals.js` to add custom goals:

```javascript
const availableGoals = [
  {
    id: 'custom-goal',
    title: 'Your Custom Goal',
    description: 'Description of your goal',
    points: 50,
    icon: '🎯',
    category: 'custom'
  }
];
```

## 🌍 Localization

The app structure supports internationalization:

1. Create translation files in `src/locales/`
2. Use React i18n libraries
3. Add language selector component
4. Support RTL languages

## 🔧 Troubleshooting

### Common Issues

1. **App won't start**:
   - Check Node.js version (v14+)
   - Run `npm install` again
   - Clear npm cache: `npm cache clean --force`

2. **API errors**:
   - Verify Gemini API key
   - Check internet connection
   - Fallback responses work offline

3. **Build failures**:
   - Update dependencies: `npm update`
   - Check for TypeScript errors
   - Ensure all imports are correct

4. **PWA not installing**:
   - Serve over HTTPS
   - Check manifest.json validity
   - Verify service worker registration

## 📊 Performance

### Optimization Tips

- **Lazy loading**: Components load on demand
- **Code splitting**: Automatic with React
- **Caching**: Service worker caches resources
- **Compression**: Enable gzip on server
- **CDN**: Use CDN for static assets

### Lighthouse Scores

Target scores:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 90+
- **PWA**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Success!

Your AquaGuard React app is now ready! 🚀

- **Development**: `npm start` → `http://localhost:3000`
- **Production**: `npm run build` → Deploy the `build` folder
- **PWA**: Generate icons and enable HTTPS for full PWA experience

**Happy water conserving! 💧🌍** 