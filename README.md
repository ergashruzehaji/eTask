# eTask - Task & Appointment Scheduler

A simple, efficient, and modern web application for managing tasks and appointments. Built with vanilla HTML, CSS, and JavaScript for optimal performance and compatibility.

## Features

- ✅ **Task Management**: Create, complete, and delete tasks
- 📅 **Appointment Scheduling**: Schedule appointments with dates and times
- 🔍 **Smart Filtering**: Filter by task type, appointments, or today's items
- 💾 **Local Storage**: Your data persists across sessions
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ⚡ **PWA Ready**: Install as a Progressive Web App
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations
- ⏰ **Overdue Detection**: Visual indicators for overdue tasks
- 🔔 **Notifications**: Success messages for user actions
- ⌨️ **Keyboard Shortcuts**: Ctrl/Cmd + Enter to quickly add tasks

## Usage

1. **Adding Tasks/Appointments**:
   - Fill in the title, date, and time
   - Choose between "Task" or "Appointment"
   - Add an optional description
   - Click "Add Task" or use Ctrl+Enter

2. **Managing Tasks**:
   - Mark tasks as complete/incomplete
   - Delete unwanted tasks
   - Filter by type or date

3. **Installation**:
   - Visit the web app
   - Look for the "Install" prompt in your browser
   - Add to home screen on mobile devices

## Deployment

### GitHub Pages
The app is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Local Development
```bash
# Clone the repository
git clone https://github.com/ergashruzehaji/eTask.git
cd eTask

# Start local server
python -m http.server 8000
# or use any static file server

# Open http://localhost:8000 in your browser
```

### Other Hosting Services
Simply upload all files to any static hosting service:
- Netlify
- Vercel
- Firebase Hosting
- Any web server

## File Structure
```
eTask/
├── index.html          # Main application page
├── styles.css          # Application styles
├── script.js           # Application logic
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for PWA
├── package.json       # Project configuration
├── .gitignore         # Git ignore rules
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Pages deployment
└── README.md          # This file
```

## Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser localStorage
- **PWA**: Service Worker, Web App Manifest
- **Deployment**: GitHub Pages, GitHub Actions

## Browser Support
- Chrome/Chromium 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
MIT License - feel free to use this project for any purpose.

---

**Live Demo**: [Visit eTask](https://ergashruzehaji.github.io/eTask)
