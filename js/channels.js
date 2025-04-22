// Example channel data - replace with your actual channel data
const channels = [
    {
        name: "Channel 1",
        url: "https://www.youtube.com/@Str1kerCoach",
        subscribers: "1M",
        color: "#FF0000"
      },
      {
        name: "Channel 2",
        url: "https://www.youtube.com/@martineztv3056",
        subscribers: "500K",
        color: "#00FF00"
      },
      {
        name: "Channel 3",
        url: "https://www.youtube.com/@eventstv6427",
        subscribers: "250K",
        color: "#0000FF"
      }
];

function createChannelBox(channel, position) {
  console.log('Creating box for channel:', channel.name, 'at position:', position);
  const box = document.createElement('a-box');
  box.setAttribute('position', position);
  box.setAttribute('width', '1');
  box.setAttribute('height', '1');
  box.setAttribute('depth', '0.1');
  box.setAttribute('color', channel.color);
  box.setAttribute('event-set__mouseenter', 'scale: 1.1 1.1 1.1');
  box.setAttribute('event-set__mouseleave', 'scale: 1 1 1');
  box.setAttribute('class', 'clickable');
  box.setAttribute('data-url', channel.url);

  const text = document.createElement('a-text');
  text.setAttribute('value', `${channel.name}\n${channel.subscribers}`);
  text.setAttribute('align', 'center');
  text.setAttribute('color', 'white');
  text.setAttribute('position', '0 0 0.06');
  text.setAttribute('scale', '0.5 0.5 0.5');

  box.appendChild(text);
  return box;
}

function setupScene() {
  console.log('Setting up scene...');
  const scene = document.querySelector('a-scene');
  if (!scene) {
    console.error('Scene not found!');
    return;
  }
  
  // Create channel boxes in a circle
  const radius = 3;
  channels.forEach((channel, index) => {
    const angle = (index / channels.length) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius - 3;
    const position = `${x} 0.5 ${z}`;
    
    const box = createChannelBox(channel, position);
    scene.appendChild(box);
  });

  // Add click handler
  document.querySelectorAll('.clickable').forEach(element => {
    element.addEventListener('click', () => {
      window.open(element.getAttribute('data-url'), '_blank');
    });
  });

  // Update debug info
  document.getElementById('debug').textContent = `Loaded ${channels.length} channels`;
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, waiting for scene...');
  const scene = document.querySelector('a-scene');
  
  if (scene) {
    if (scene.hasLoaded) {
      console.log('Scene already loaded, setting up...');
      setupScene();
    } else {
      console.log('Waiting for scene to load...');
      scene.addEventListener('loaded', function() {
        console.log('Scene loaded, setting up...');
        setupScene();
      });
    }
  } else {
    console.error('Scene element not found!');
  }
}); 
