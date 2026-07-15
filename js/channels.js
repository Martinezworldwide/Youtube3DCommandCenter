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

// Track pending YouTube players until the iframe API is ready
const pendingPlayers = [];
let youtubeApiReady = false;

// Called by the YouTube iframe API script when it finishes loading
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
    // Replace the loading state with a visible error and retry option
    placeholder.innerHTML = `
        <div class="placeholder-content">
            <div class="placeholder-message">${message}</div>
            <button type="button" class="retry-button">Retry</button>
            <button type="button" class="open-channel-button">Open on YouTube</button>
        </div>
    `;

    const retryButton = placeholder.querySelector('.retry-button');
    retryButton.addEventListener('click', (event) => {
        event.stopPropagation();
        container.querySelector('.channel-player-host')?.remove();
        placeholder.remove();
        const replacement = createChannelDisplay(channel, container._position, container._rotation);
        container.replaceWith(replacement);
    });

    const openButton = placeholder.querySelector('.open-channel-button');
    openButton.addEventListener('click', (event) => {
        event.stopPropagation();
        window.open(channel.url, '_blank');
    });
}

function createYouTubePlayer(channel, playerHost, placeholder) {
    queueYouTubePlayer(() => {
        const player = new YT.Player(playerHost, {
            height: '720',
            width: '1280',
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

        // Guard against silent API failures
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

function createChannelDisplay(channel, position, rotation) {
    console.log('Creating display for channel:', channel.name, 'at position:', position);

    const container = document.createElement('div');
    container.className = 'channel-display';
    container.style.transform = `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateY(${rotation}deg)`;
    container._position = position;
    container._rotation = rotation;

    const inner = document.createElement('div');
    inner.className = 'channel-display-inner';

    const placeholder = createLoadingPlaceholder();
    inner.appendChild(placeholder);

    const playerHost = document.createElement('div');
    playerHost.className = 'channel-player-host';
    playerHost.id = `player-${channel.channelId}`;
    inner.appendChild(playerHost);

    createYouTubePlayer(channel, playerHost, placeholder);

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
            <div class="channel-info-tip">Use the player controls to watch inside the app</div>
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
    console.log('Setting up scene...');

    const displayContainer = document.getElementById('display-container');
    if (!displayContainer) {
        console.error('Display container not found!');
        return;
    }

    // Place displays close enough to read and interact with embedded players
    const radius = 1400;
    const angleStep = 30;
    const startAngle = -30;
    const displayHeight = 720;

    channels.forEach((channel, index) => {
        const angle = startAngle + (index * angleStep);
        const angleRad = angle * (Math.PI / 180);

        const position = {
            x: radius * Math.sin(angleRad),
            y: displayHeight / 2,
            z: -radius * Math.cos(angleRad)
        };

        const display = createChannelDisplay(channel, position, -angle);
        displayContainer.appendChild(display);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up displays...');
    setupScene();
});
