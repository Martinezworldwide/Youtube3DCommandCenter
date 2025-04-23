# Youtube3DCommandCenter

DEMO: https://martinezworldwide.github.io/Youtube3DCommandCenter

# YouTube Channel 3D Gallery

A 3D visualization of YouTube channels using A-Frame. This project creates an interactive 3D environment where each YouTube channel is represented as a clickable box in a circular arrangement.

## Features

- 3D visualization of YouTube channels
- Interactive boxes that scale on hover
- Click to visit the YouTube channel
- Responsive design that works on desktop and mobile
- VR compatible (with WebXR enabled browser)

## Setup

1. Clone this repository
2. Open `index.html` in your browser to view locally

## Customization

To add your own YouTube channels, edit the `channels` array in `js/channels.js`:

```javascript
const channels = [
  {
    name: "Your Channel Name",
    url: "https://youtube.com/yourchannel",
    subscribers: "1M",
    color: "#FF0000"
  },
  // Add more channels here
];
```

## Deployment to GitHub Pages

1. Push your code to a GitHub repository
2. Go to your repository settings
3. Scroll down to the "GitHub Pages" section
4. Select the branch you want to deploy (usually `main` or `master`)
5. Your site will be available at `https://[your-username].github.io/[repository-name]/`

## Technologies Used

- [A-Frame](https://aframe.io/) - Web framework for building VR experiences
- HTML5
- JavaScript
- CSS3

## License

MIT 

# YouTube Command Center

A powerful 3D visualization tool for managing and viewing YouTube content, available in both web demo and premium desktop versions.

## 🌟 Features

### Web Demo (Free)
- 3D YouTube channel visualization
- Basic navigation controls (WASD, Space, Shift)
- Channel preview displays
- Cross-browser compatibility
- No installation required

### Desktop Version (Premium)
- Full Chromium Embedded Framework (CEF) integration
- Native 3D rendering performance
- Any website display capability
- Multiple room layouts
- Custom themes and configurations
- Stream deck integration
- Chat overlay support
- Voice commands
- Plugin system

## 🚀 Quick Start

### Web Demo
1. Visit: [Demo URL]
2. Use WASD keys to move
3. Space/Shift to fly up/down
4. Q/E to rotate
5. Click channels to view content

### Desktop Version (Premium)
1. Download the installer
2. Run setup wizard
3. Enter your license key
4. Start creating your custom command center

## 🎮 Controls

### Web Demo Controls
- W/S: Move forward/backward
- A/D: Move left/right
- Space: Move up
- Shift: Move down
- Q/E: Rotate view
- Mouse: Look around

### Desktop Premium Controls
- All web controls plus:
- R/F: Adjust display size
- T/G: Change display layout
- Z/X: Switch rooms
- C: Toggle chat overlay
- V: Voice commands
- Tab: Quick settings
- Customizable keybindings

## 💻 System Requirements

### Web Demo
- Modern browser (Chrome recommended)
- WebGL support
- 4GB RAM recommended
- Stable internet connection

### Desktop Version
- Windows 10/11
- 8GB RAM minimum
- Dedicated GPU recommended
- DirectX 11+
- 2GB storage
- Stable internet connection

## 🛠️ Development

### Web Version Setup
```bash
# Clone repository
git clone https://github.com/yourusername/youtube-command-center
cd youtube-command-center

# Install dependencies
npm install

# Start development server
npm start
```

### Desktop Version Setup
```bash
# Prerequisites
- Visual Studio 2022
- CMake 3.21+
- CEF SDK
- DirectX SDK

# Build Steps
1. Clone repository
2. Run setup.bat
3. Open solution in Visual Studio
4. Build solution
```

## 📦 Premium Features

### Basic ($29.99)
- CEF integration
- Custom layouts
- Basic themes
- Configuration saving

### Premium ($49.99)
- All Basic features
- Multi-room support
- Stream integration
- Chat overlay
- Voice commands

### Premium+ ($79.99)
- All Premium features
- Plugin support
- Priority support
- Custom scripts
- Early access

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

- Web Demo: MIT License
- Desktop Version: Commercial License

## 🔗 Links

- [Official Website]
- [Documentation]
- [Community Discord]
- [Feature Requests]
- [Bug Reports]
- [Development Blog]

## 📞 Support

- Email: support@yourdomain.com
- Discord: [Discord Server Link]
- Documentation: [Docs Link]
- Premium Support: [Premium Portal]

## 🚧 Current Status

Web Demo: Beta
Desktop Version: In Development

See our [Development Plan](DEVELOPMENT_PLAN.md) for detailed roadmap.
