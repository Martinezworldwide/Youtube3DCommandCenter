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
