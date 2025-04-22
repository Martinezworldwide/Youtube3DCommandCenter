// Example channel data - replace with your actual channel data
const channels = [
    {
        name: "Str1kerCoach",
        url: "https://www.youtube.com/@Str1kerCoach",
        subscribers: "1M",
        color: "#FF0000",
        contentUrl: "https://www.youtube.com/embed?listType=user_uploads&list=Str1kerCoach"
      },
      {
        name: "MartinezTV",
        url: "https://www.youtube.com/@martineztv3056",
        subscribers: "500K",
        color: "#00FF00",
        contentUrl: "https://www.youtube.com/embed?listType=user_uploads&list=martineztv3056"
      },
      {
        name: "EventsTV",
        url: "https://www.youtube.com/@eventstv6427",
        subscribers: "250K",
        color: "#0000FF",
        contentUrl: "https://www.youtube.com/embed?listType=user_uploads&list=eventstv6427"
      }
];

let currentScene = 'channels'; // 'channels' or 'content'

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
  box.setAttribute('data-content-url', channel.contentUrl);
  box.setAttribute('data-name', channel.name);

  // Add hover effect
  box.setAttribute('animation__hover', 'property: scale; to: 1.05 1.05 1.05; dur: 300; startEvents: mouseenter; pauseEvents: mouseleave');
  box.setAttribute('animation__unhover', 'property: scale; to: 1 1 1; dur: 300; startEvents: mouseleave');

  const text = document.createElement('a-text');
  text.setAttribute('value', channel.name);
  text.setAttribute('align', 'center');
  text.setAttribute('color', 'white');
  text.setAttribute('position', '0 0 0.06');
  text.setAttribute('scale', '0.5 0.5 0.5');

  box.appendChild(text);
  return box;
}

function showChannelContent(contentUrl) {
  const frame = document.getElementById('content-frame');
  const backButton = document.getElementById('back-button');
  const scene = document.querySelector('a-scene');
  
  // Hide 3D scene
  scene.style.display = 'none';
  
  // Show content frame and back button
  frame.src = contentUrl;
  frame.style.display = 'block';
  backButton.style.display = 'block';
  
  currentScene = 'content';
}

function goBackToChannels() {
  const frame = document.getElementById('content-frame');
  const backButton = document.getElementById('back-button');
  const scene = document.querySelector('a-scene');
  
  // Hide content frame and back button
  frame.style.display = 'none';
  backButton.style.display = 'none';
  
  // Show 3D scene
  scene.style.display = 'block';
  
  currentScene = 'channels';
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
    
    // Add click handler to show channel content
    box.addEventListener('click', () => {
      showChannelContent(box.getAttribute('data-content-url'));
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
