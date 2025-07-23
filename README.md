# Modern Minesweeper 💣

A fully modernized Minesweeper clone built with React 18, TypeScript, and Node.js. This project has been completely rewritten from the ground up to incorporate modern web development best practices, performance optimizations, and production-ready deployment strategies.

## ✨ Features

- **Modern React 18**: Built with functional components, hooks, and latest React features
- **TypeScript**: Full type safety and better developer experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Progressive Web App**: Works offline and can be installed on mobile devices
- **Real-time Scoring**: Persistent leaderboard with top 10 scores
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Touch Friendly**: Optimized for both mouse and touch interactions

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Modern CSS** with Flexbox/Grid
- **Bulma CSS Framework** for consistent styling
- **FontAwesome** for icons
- **Animate.css** for smooth animations

### Backend
- **Node.js** with Express
- **File-based storage** for simplicity
- **CORS** enabled for cross-origin requests
- **Input validation** and error handling
- **Graceful shutdown** handling

### DevOps & Deployment
- **Docker** containerization
- **GitHub Actions** CI/CD pipeline
- **Multi-stage builds** for optimized images
- **Health checks** and monitoring
- **Security auditing**

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modernized
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server && npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the development servers**
   
   **Frontend (React)**:
   ```bash
   npm start
   # Runs on http://localhost:3000
   ```
   
   **Backend (Node.js)**:
   ```bash
   cd server && npm run dev
   # Runs on http://localhost:5000
   ```

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd server && NODE_ENV=production npm start
   ```

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t minesweeper .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

## 🎮 How to Play

1. **Objective**: Clear the minefield without hitting any mines
2. **Controls**:
   - **Left Click**: Reveal a square
   - **Right Click / Long Press**: Flag a square as a mine
3. **Numbers**: Show how many mines are adjacent to that square
4. **Win**: Flag all mines correctly or reveal all non-mine squares

## 🧪 Testing

### Frontend Tests
```bash
npm test                    # Run tests in watch mode
npm test -- --coverage     # Run tests with coverage
```

### Server Tests
```bash
cd server && npm test
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
npm run lint -- --fix      # Auto-fix issues
```

## 📱 Mobile Support

The game is fully optimized for mobile devices with:
- Touch-friendly controls
- Responsive layout
- Long-press for flagging
- Optimized button sizes
- Progressive Web App capabilities

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences
- **Focus Management**: Clear focus indicators

## 🔒 Security

- Input validation and sanitization
- CORS protection
- Rate limiting (configurable)
- Security headers
- Regular dependency auditing
- Non-root Docker containers

## 🚀 Performance

- **Code Splitting**: Automatic chunk splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized assets
- **Caching**: Browser and CDN caching strategies
- **Bundle Analysis**: Webpack bundle analyzer
- **Lighthouse Score**: 95+ performance score

## 🌍 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Monitoring

The application includes:
- Health check endpoint (`/api/health`)
- Error logging and handling
- Performance monitoring ready
- Docker health checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Ensure accessibility compliance
- Update documentation
- Use conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original concept inspired by Microsoft Minesweeper
- Built with modern web technologies and best practices
- Community feedback and contributions

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Follow the issue template

---

**Happy Minesweeping!** 💣✨
