// Example channel data - replace with your actual channel data
const channels = [
    {
        name: "Str1kerCoach",
        url: "https://www.youtube.com/@Str1kerCoach",
        subscribers: "1M",
        color: "#FF0000",
        contentUrl: "https://www.youtube.com/embed/videoseries?list=UUStr1kerCoach"
    },
    {
        name: "MartinezTV",
        url: "https://www.youtube.com/@martineztv3056",
        subscribers: "500K",
        color: "#00FF00",
        contentUrl: "https://www.youtube.com/embed/videoseries?list=UUmartineztv3056"
    },
    {
        name: "EventsTV",
        url: "https://www.youtube.com/@eventstv6427",
        subscribers: "250K",
        color: "#0000FF",
        contentUrl: "https://www.youtube.com/embed/videoseries?list=UUeventstv6427"
    }
];

function createChannelDisplay(channel, position, rotation) {
    console.log('Creating display for channel:', channel.name, 'at position:', position);
    
    // Create container for 3D positioning
    const container = document.createElement('div');
    container.className = 'channel-display';
    container.style.transform = `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateY(${rotation}deg)`;
    
    // Create iframe for channel content
    const iframe = document.createElement('iframe');
    iframe.src = channel.contentUrl;
    iframe.width = '1280';  // 16:9 aspect ratio
    iframe.height = '720';
    iframe.allowFullscreen = true;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    
    // Create channel name label
    const label = document.createElement('div');
    label.className = 'channel-label';
    label.textContent = channel.name;
    label.style.color = channel.color;
    
    container.appendChild(iframe);
    container.appendChild(label);
    
    return container;
}

function setupScene() {
    console.log('Setting up scene...');
    
    const displayContainer = document.createElement('div');
    displayContainer.id = 'display-container';
    document.body.appendChild(displayContainer);
    
    // Create displays in a curved arrangement
    const radius = 2000;  // Radius in pixels
    const angleStep = 30;  // Degrees between each display
    const startAngle = -30;  // Start from slightly left of center
    const displayHeight = 720;  // Height in pixels
    
    channels.forEach((channel, index) => {
        const angle = startAngle + (index * angleStep);
        const angleRad = angle * (Math.PI / 180);
        
        const position = {
            x: radius * Math.sin(angleRad),
            y: displayHeight / 2,  // Center vertically
            z: -radius * Math.cos(angleRad)
        };
        
        const display = createChannelDisplay(channel, position, -angle);
        displayContainer.appendChild(display);
    });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up displays...');
    setupScene();
}); 
