// Example channel data - replace with your actual channel data
const channels = [
    {
        name: "Str1kerCoach",
        url: "https://www.youtube.com/@Str1kerCoach",
        subscribers: "1M",
        color: "#FF0000",
        contentUrl: "https://www.youtube.com/embed?listType=user_uploads&list=@Str1kerCoach&autoplay=0"
    },
    {
        name: "MartinezTV",
        url: "https://www.youtube.com/@martineztv3056",
        subscribers: "500K",
        color: "#00FF00",
        contentUrl: "https://www.youtube.com/embed?listType=user_uploads&list=@martineztv3056&autoplay=0"
    },
    {
        name: "EventsTV",
        url: "https://www.youtube.com/@eventstv6427",
        subscribers: "250K",
        color: "#0000FF",
        contentUrl: "https://www.youtube.com/embed?listType=user_uploads&list=@eventstv6427&autoplay=0"
    }
];

function createLoadingPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.style.width = '1280px';
    placeholder.style.height = '720px';
    placeholder.style.background = '#000';
    placeholder.style.borderRadius = '10px';
    placeholder.style.display = 'flex';
    placeholder.style.justifyContent = 'center';
    placeholder.style.alignItems = 'center';
    placeholder.style.color = '#FFF';
    placeholder.innerHTML = `
        <div style="text-align: center;">
            <div class="spinner"></div>
            <div style="margin-top: 20px;">Loading channel content...</div>
        </div>
    `;
    return placeholder;
}

function createChannelDisplay(channel, position, rotation) {
    console.log('Creating display for channel:', channel.name, 'at position:', position);
    
    // Create container for 3D positioning
    const container = document.createElement('div');
    container.className = 'channel-display';
    container.style.transform = `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateY(${rotation}deg)`;
    
    // Add loading placeholder
    const placeholder = createLoadingPlaceholder();
    container.appendChild(placeholder);
    
    // Create iframe for channel content
    const iframe = document.createElement('iframe');
    iframe.src = channel.contentUrl;
    iframe.width = '1280';
    iframe.height = '720';
    iframe.style.display = 'none';  // Hide initially
    iframe.allowFullscreen = true;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    
    // Handle iframe load
    iframe.addEventListener('load', () => {
        placeholder.remove();  // Remove placeholder
        iframe.style.display = 'block';  // Show iframe
        iframe.classList.add('loaded');  // Fade in
    });
    
    // Create channel name label
    const label = document.createElement('div');
    label.className = 'channel-label';
    label.innerHTML = `
        <div>${channel.name}</div>
        <div style="font-size: 16px; opacity: 0.8; margin-top: 5px;">${channel.subscribers} subscribers</div>
    `;
    label.style.color = channel.color;
    
    // Add hover effect with channel info
    const info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '100%';
    info.style.left = '50%';
    info.style.transform = 'translateX(-50%)';
    info.style.background = 'rgba(0, 0, 0, 0.8)';
    info.style.padding = '15px';
    info.style.borderRadius = '10px';
    info.style.marginTop = '20px';
    info.style.width = '300px';
    info.style.opacity = '0';
    info.style.transition = 'opacity 0.3s ease';
    info.innerHTML = `
        <div style="font-size: 18px; margin-bottom: 10px;">Channel Info</div>
        <div style="font-size: 14px; opacity: 0.8;">
            <div>Name: ${channel.name}</div>
            <div>Subscribers: ${channel.subscribers}</div>
            <div style="margin-top: 10px;">Click to view channel content</div>
        </div>
    `;
    
    container.addEventListener('mouseenter', () => {
        info.style.opacity = '1';
    });
    
    container.addEventListener('mouseleave', () => {
        info.style.opacity = '0';
    });
    
    // Add click handler
    container.addEventListener('click', () => {
        window.open(channel.url, '_blank');
    });
    
    container.appendChild(iframe);
    container.appendChild(label);
    container.appendChild(info);
    
    return container;
}

function setupScene() {
    console.log('Setting up scene...');
    
    const displayContainer = document.getElementById('display-container');
    if (!displayContainer) {
        console.error('Display container not found!');
        return;
    }
    
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
