// Channel data with valid YouTube embed URLs resolved from live channel pages
const channels = [
    {
        name: "Str1kerCoach",
        url: "https://www.youtube.com/@Str1kerCoach",
        subscribers: "1M",
        color: "#FF0000",
        channelId: "UCXJyzYcsGYaUjdx6yN-l8Wg",
        uploadsPlaylistId: "UUXJyzYcsGYaUjdx6yN-l8Wg",
        featuredVideoId: "eXEM3yga0Xw"
    },
    {
        name: "MartinezTV",
        url: "https://www.youtube.com/@martineztv3056",
        subscribers: "500K",
        color: "#00FF00",
        channelId: "UC7zSoBU65JBaivmoj9BbQAQ",
        uploadsPlaylistId: "UU7zSoBU65JBaivmoj9BbQAQ",
        featuredVideoId: "m-hK9fjUtcs"
    },
    {
        name: "EventsTV",
        url: "https://www.youtube.com/@eventstv6427",
        subscribers: "250K",
        color: "#0000FF",
        channelId: "UCHDCuixmw8MrGlSqcQTYKsA",
        uploadsPlaylistId: "UUHDCuixmw8MrGlSqcQTYKsA",
        featuredVideoId: "gNFwFeZwGjo"
    }
];

// Detect touch-first devices that need on-screen controls
function isTouchDevice() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

function getSceneSettings() {
    const isCompact = window.matchMedia('(max-width: 900px)').matches;

    if (isCompact) {
        return {
            radius: 650,
            angleStep: 35,
            startAngle: -35,
            screenWidth: 360,
            screenHeight: 202,
            labelOffset: -72
        };
    }

    return {
        radius: 1400,
        angleStep: 30,
        startAngle: -30,
        screenWidth: 1280,
        screenHeight: 720,
        labelOffset: -90
    };
}

function applySceneVariables(settings) {
    const root = document.documentElement;
    root.style.setProperty('--screen-width', `${settings.screenWidth}px`);
    root.style.setProperty('--screen-height', `${settings.screenHeight}px`);
    root.style.setProperty('--label-offset', `${settings.labelOffset}px`);
}

// Track pending YouTube players until the iframe API is ready
const pendingPlayers = [];
let youtubeApiReady = false;

window.onYouTubeIframeAPIReady = function() {
    youtubeApiReady = true;
    pendingPlayers.splice(0).forEach((createPlayer) => createPlayer());
};

function queueYouTubePlayer(createPlayer) {
    if (youtubeApiReady && window.YT && window.YT.Player) {
        createPlayer();
        return;
    }

    pendingPlayers.push(createPlayer);
}

function createLoadingPlaceholder(message) {
    const placeholder = document.createElement('div');
    placeholder.className = 'channel-placeholder';
    placeholder.innerHTML = `
        <div class="placeholder-content">
            <div class="spinner"></div>
            <div class="placeholder-message">${message || 'Loading channel content...'}</div>
        </div>
    `;
    return placeholder;
}

function showEmbedError(container, channel, placeholder, message) {
    placeholder.innerHTML = `
        <div class="placeholder-content">
            <div class="placeholder-message">${message}</div>
            <button type="button" class="retry-button">Retry</button>
            <button type="button" class="open-channel-button">Open on YouTube</button>
        </div>
    `;

    placeholder.querySelector('.retry-button').addEventListener('click', (event) => {
        event.stopPropagation();
        container.querySelector('.channel-player-host')?.remove();
        placeholder.remove();
        const replacement = createChannelDisplay(channel, container._position, container._rotation);
        container.replaceWith(replacement);
    });

    placeholder.querySelector('.open-channel-button').addEventListener('click', (event) => {
        event.stopPropagation();
        window.open(channel.url, '_blank');
    });
}

function openVideoModal(channel) {
    const modal = document.getElementById('video-modal');
    const title = document.getElementById('video-modal-title');
    const playerHost = document.getElementById('video-modal-player');
    if (!modal || !title || !playerHost) {
        return;
    }

    title.textContent = channel.name;
    playerHost.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${channel.featuredVideoId}?playsinline=1&rel=0&modestbranding=1&autoplay=1`;
    iframe.title = `${channel.name} featured video`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.className = 'video-modal-iframe';
    playerHost.appendChild(iframe);

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const playerHost = document.getElementById('video-modal-player');
    if (!modal || !playerHost) {
        return;
    }

    playerHost.innerHTML = '';
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;

function createYouTubePlayer(channel, playerHost, placeholder) {
    queueYouTubePlayer(() => {
        const player = new YT.Player(playerHost, {
            height: '100%',
            width: '100%',
            videoId: channel.featuredVideoId,
            playerVars: {
                autoplay: 0,
                controls: 1,
                listType: 'playlist',
                list: channel.uploadsPlaylistId,
                modestbranding: 1,
                playsinline: 1,
                rel: 0
            },
            events: {
                onReady: () => {
                    placeholder.remove();
                    playerHost.classList.add('loaded');
                },
                onError: (event) => {
                    const errorMessages = {
                        2: 'This video is unavailable.',
                        5: 'This video cannot be played in the embedded player.',
                        100: 'This video was removed or is private.',
                        101: 'Embedding is disabled for this video.',
                        150: 'Embedding is disabled for this video.'
                    };

                    showEmbedError(
                        playerHost.closest('.channel-display'),
                        channel,
                        placeholder,
                        errorMessages[event.data] || 'Unable to load this channel video.'
                    );
                }
            }
        });

        setTimeout(() => {
            if (placeholder.isConnected) {
                showEmbedError(
                    playerHost.closest('.channel-display'),
                    channel,
                    placeholder,
                    'Video took too long to load. Check your connection and retry.'
                );
                try {
                    player.destroy();
                } catch (error) {
                    console.warn('Could not destroy stalled player:', error);
                }
            }
        }, 20000);
    });
}

function createTouchChannelScreen(channel) {
    const screen = document.createElement('button');
    screen.type = 'button';
    screen.className = 'channel-touch-screen';
    screen.setAttribute('aria-label', `Watch ${channel.name}`);

    const thumbnail = document.createElement('img');
    thumbnail.className = 'channel-thumbnail';
    thumbnail.src = `https://i.ytimg.com/vi/${channel.featuredVideoId}/hqdefault.jpg`;
    thumbnail.alt = `${channel.name} preview`;

    const playOverlay = document.createElement('div');
    playOverlay.className = 'channel-play-overlay';
    playOverlay.innerHTML = '<span class="channel-play-icon">&#9654;</span><span>Tap to watch</span>';

    screen.appendChild(thumbnail);
    screen.appendChild(playOverlay);
    screen.addEventListener('click', (event) => {
        event.stopPropagation();
        openVideoModal(channel);
    });

    return screen;
}

function createChannelDisplay(channel, position, rotation, useTouchScreen) {
    console.log('Creating display for channel:', channel.name, 'at position:', position);

    const container = document.createElement('div');
    container.className = 'channel-display';
    container.style.transform = `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateY(${rotation}deg)`;
    container._position = position;
    container._rotation = rotation;

    const inner = document.createElement('div');
    inner.className = 'channel-display-inner';

    if (useTouchScreen) {
        inner.appendChild(createTouchChannelScreen(channel));
    } else {
        const placeholder = createLoadingPlaceholder();
        inner.appendChild(placeholder);

        const playerHost = document.createElement('div');
        playerHost.className = 'channel-player-host';
        playerHost.id = `player-${channel.channelId}`;
        inner.appendChild(playerHost);

        createYouTubePlayer(channel, playerHost, placeholder);
    }

    const label = document.createElement('div');
    label.className = 'channel-label';
    label.innerHTML = `
        <div>${channel.name}</div>
        <div class="channel-subscribers">${channel.subscribers} subscribers</div>
        <button type="button" class="open-channel-link">Open channel on YouTube</button>
    `;
    label.style.color = channel.color;

    label.querySelector('.open-channel-link').addEventListener('click', (event) => {
        event.stopPropagation();
        window.open(channel.url, '_blank');
    });

    const info = document.createElement('div');
    info.className = 'channel-info';
    info.innerHTML = `
        <div class="channel-info-title">Channel Info</div>
        <div class="channel-info-body">
            <div>Name: ${channel.name}</div>
            <div>Subscribers: ${channel.subscribers}</div>
            <div class="channel-info-tip">${useTouchScreen ? 'Tap the screen to watch inside the app' : 'Use the player controls to watch inside the app'}</div>
        </div>
    `;

    container.addEventListener('mouseenter', () => {
        info.classList.add('visible');
    });

    container.addEventListener('mouseleave', () => {
        info.classList.remove('visible');
    });

    container.appendChild(inner);
    container.appendChild(label);
    container.appendChild(info);

    return container;
}

function setupScene() {
    console.log('Setting up 3D scene...');

    const displayContainer = document.getElementById('display-container');
    if (!displayContainer) {
        console.error('Display container not found!');
        return;
    }

    const settings = getSceneSettings();
    applySceneVariables(settings);

    if (isTouchDevice()) {
        document.body.classList.add('touch-mode');
    }

    const useTouchScreen = isTouchDevice();
    const displayHeight = settings.screenHeight;

    channels.forEach((channel, index) => {
        const angle = settings.startAngle + (index * settings.angleStep);
        const angleRad = angle * (Math.PI / 180);

        const position = {
            x: settings.radius * Math.sin(angleRad),
            y: displayHeight / 2,
            z: -settings.radius * Math.cos(angleRad)
        };

        const display = createChannelDisplay(channel, position, -angle, useTouchScreen);
        displayContainer.appendChild(display);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('video-modal');
    modal?.querySelector('.video-modal-close')?.addEventListener('click', closeVideoModal);
    modal?.querySelector('.video-modal-backdrop')?.addEventListener('click', closeVideoModal);

    console.log('DOM loaded, setting up displays...');
    setupScene();
});
