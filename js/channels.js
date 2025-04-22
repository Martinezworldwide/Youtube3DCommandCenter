// Example channel data - replace with your actual channel data
const channels = [
    {
        name: "Str1kerCoach",
        url: "https://www.youtube.com/@Str1kerCoach",
        subscribers: "1M",
        color: "#FF0000",
        contentUrl: "https://www.youtube.com/@Str1kerCoach/videos"
    },
    {
        name: "MartinezTV",
        url: "https://www.youtube.com/@martineztv3056",
        subscribers: "500K",
        color: "#00FF00",
        contentUrl: "https://www.youtube.com/@martineztv3056/videos"
    },
    {
        name: "EventsTV",
        url: "https://www.youtube.com/@eventstv6427",
        subscribers: "250K",
        color: "#0000FF",
        contentUrl: "https://www.youtube.com/@eventstv6427/videos"
    }
];

function createChannelDisplay(channel, position) {
    console.log('Creating display for channel:', channel.name, 'at position:', position);
    
    // Create container entity
    const container = document.createElement('a-entity');
    container.setAttribute('position', position);
    container.setAttribute('class', 'clickable');
    
    // Create the main display plane
    const display = document.createElement('a-plane');
    display.setAttribute('width', '16');  // 16:9 aspect ratio
    display.setAttribute('height', '9');
    display.setAttribute('color', '#FFFFFF');
    
    // Create iframe entity for web content
    const iframe = document.createElement('a-entity');
    iframe.setAttribute('geometry', 'primitive: plane; width: 16; height: 9');
    iframe.setAttribute('material', `shader: html; target: #frame-${channel.name}; fps: 60`);
    iframe.setAttribute('position', '0 0 0.01');  // Slightly in front of the plane
    
    // Create actual iframe in the DOM
    const domIframe = document.createElement('iframe');
    domIframe.id = `frame-${channel.name}`;
    domIframe.src = channel.contentUrl;
    domIframe.style.display = 'none';
    document.body.appendChild(domIframe);
    
    // Add channel name above the display
    const text = document.createElement('a-text');
    text.setAttribute('value', channel.name);
    text.setAttribute('align', 'center');
    text.setAttribute('color', channel.color);
    text.setAttribute('position', '0 4.7 0');  // Position above the display
    text.setAttribute('scale', '2 2 2');
    
    // Add click handler
    container.addEventListener('click', () => {
        console.log('Display clicked:', channel.name);
        window.open(channel.contentUrl, '_blank');
    });
    
    // Assemble the display
    container.appendChild(display);
    container.appendChild(iframe);
    container.appendChild(text);
    
    return container;
}

function setupScene() {
    console.log('Setting up scene...');
    const scene = document.querySelector('a-scene');
    if (!scene) {
        console.error('Scene not found!');
        return;
    }
    
    // Create displays in a curved arrangement
    const radius = 20;  // Distance from center
    const angleStep = 30;  // Degrees between each display
    const startAngle = -30;  // Start from slightly left of center
    
    channels.forEach((channel, index) => {
        const angle = (startAngle + (index * angleStep)) * (Math.PI / 180);
        const x = radius * Math.sin(angle);
        const z = -radius * Math.cos(angle);
        const position = `${x} 4.5 ${z}`;  // Raised up to eye level
        
        const display = createChannelDisplay(channel, position);
        
        // Rotate to face center
        display.setAttribute('rotation', `0 ${-angle * (180 / Math.PI)} 0`);
        
        scene.appendChild(display);
    });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, waiting for scene...');
    
    const debugElement = document.getElementById('debug');
    if (debugElement) {
        debugElement.textContent = 'Initializing...';
    }
    
    const scene = document.querySelector('a-scene');
    if (scene) {
        if (scene.hasLoaded) {
            console.log('Scene already loaded, setting up...');
            setupScene();
            if (debugElement) {
                debugElement.textContent = `Loaded ${channels.length} channels`;
            }
        } else {
            console.log('Waiting for scene to load...');
            scene.addEventListener('loaded', function() {
                console.log('Scene loaded, setting up...');
                setupScene();
                if (debugElement) {
                    debugElement.textContent = `Loaded ${channels.length} channels`;
                }
            });
        }
    } else {
        console.error('Scene element not found!');
        if (debugElement) {
            debugElement.textContent = 'Error: Scene not found';
        }
    }
}); 
