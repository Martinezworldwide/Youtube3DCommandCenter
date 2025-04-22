// Example channel data - replace with your actual channel data
const channels = [
    {
        name: "Channel 1",
        url: "https://www.youtube.com/@Str1kerCoach",
        subscribers: "1M",
        color: "#FF0000",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
      },
      {
        name: "Channel 2",
        url: "https://www.youtube.com/@martineztv3056",
        subscribers: "500K",
        color: "#00FF00",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
      },
      {
        name: "Channel 3",
        url: "https://www.youtube.com/@eventstv6427",
        subscribers: "250K",
        color: "#0000FF",
        thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
      }
];

function createChannelBox(channel, position) {
  console.log('Creating box for channel:', channel.name, 'at position:', position);
  const box = document.createElement('a-box');
  box.setAttribute('position', position);
  box.setAttribute('width', '2');
  box.setAttribute('height', '1.5');
  box.setAttribute('depth', '0.1');
  box.setAttribute('color', channel.color);
  box.setAttribute('class', 'clickable');
  box.setAttribute('data-url', channel.url);
  box.setAttribute('data-name', channel.name);
  box.setAttribute('data-subscribers', channel.subscribers);
  box.setAttribute('data-thumbnail', channel.thumbnail);

  // Add hover effect
  box.setAttribute('animation__hover', 'property: scale; to: 1.05 1.05 1.05; dur: 300; startEvents: mouseenter; pauseEvents: mouseleave');
  box.setAttribute('animation__unhover', 'property: scale; to: 1 1 1; dur: 300; startEvents: mouseleave');

  const text = document.createElement('a-text');
  text.setAttribute('value', `${channel.name}\n${channel.subscribers}`);
  text.setAttribute('align', 'center');
  text.setAttribute('color', 'white');
  text.setAttribute('position', '0 0 0.06');
  text.setAttribute('scale', '0.5 0.5 0.5');

  box.appendChild(text);
  return box;
}

function showChannelPreview(event) {
  const preview = document.getElementById('channel-preview');
  const box = event.target;
  
  preview.style.display = 'block';
  preview.style.left = `${event.clientX}px`;
  preview.style.top = `${event.clientY}px`;
  
  preview.innerHTML = `
    <h3 style="color: white; margin: 0;">${box.getAttribute('data-name')}</h3>
    <p style="color: white; margin: 5px 0;">Subscribers: ${box.getAttribute('data-subscribers')}</p>
    <img src="${box.getAttribute('data-thumbnail')}" style="width: 100%; height: auto; border-radius: 5px;">
  `;
}

function hideChannelPreview() {
  const preview = document.getElementById('channel-preview');
  preview.style.display = 'none';
}

function setupScene() {
  console.log('Setting up scene...');
  const scene = document.querySelector('a-scene');
  if (!scene) {
    console.error('Scene not found!');
    return;
  }
  
  // Create channel boxes in a grid
  const columns = 3;
  const spacing = 3;
  const startX = -spacing;
  const startZ = -8;
  
  channels.forEach((channel, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const x = startX + (col * spacing);
    const z = startZ - (row * spacing);
    const position = `${x} 1.5 ${z}`;
    
    const box = createChannelBox(channel, position);
    scene.appendChild(box);
    
    // Add preview events
    box.addEventListener('mouseenter', showChannelPreview);
    box.addEventListener('mouseleave', hideChannelPreview);
    box.addEventListener('click', () => {
      window.open(box.getAttribute('data-url'), '_blank');
    });
  });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, waiting for scene...');
  
  // Update debug info
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
