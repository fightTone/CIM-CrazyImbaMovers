// YouTube Player variables
let player;
let isPlayerReady = false;

// YouTube IFrame API callback
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'afcFRz81yTg', // "We are electric" by Flying Steps
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'afcFRz81yTg',
            'start': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    isPlayerReady = true;
    console.log('YouTube player ready');
}

function onPlayerStateChange(event) {
    // Handle player state changes if needed
}

document.addEventListener('DOMContentLoaded', function() {
    const powerBtn = document.getElementById('power-btn');
    const powerSection = document.getElementById('power-section');
    const mainContent = document.getElementById('main-content');

    let isActivated = false;

    powerBtn.addEventListener('click', function() {
        if (!isActivated) {
            activateWebsite();
            isActivated = true;
        }
    });

    function activateWebsite() {
        // Add click effect
        powerBtn.style.transform = 'scale(0.9)';

        setTimeout(() => {
            // Fade out power section
            powerSection.classList.add('fade-out');

            // Show main content after a delay
            setTimeout(() => {
                powerSection.style.display = 'none';
                mainContent.classList.remove('hidden');

                // Trigger team member animations
                animateTeamMembers();

                // Try to play music (note: modern browsers require user interaction)
                playMusic();

            }, 1000);

        }, 200);
    }

    function animateTeamMembers() {
        const teamMembers = document.querySelectorAll('.team-member');

        teamMembers.forEach((member, index) => {
            setTimeout(() => {
                member.style.animationPlayState = 'running';
            }, index * 200);
        });
    }

    function playMusic() {
        if (isPlayerReady && player) {
            try {
                // Set volume to a reasonable level (0-100)
                player.setVolume(70);

                // Play the YouTube video (audio)
                player.playVideo();

                console.log('Playing: We are electric - Flying Steps');
            } catch (error) {
                console.log('YouTube playback failed:', error);
                // Fallback to electronic sound effect
                createElectronicSound();
            }
        } else {
            console.log('YouTube player not ready yet, trying electronic sound effect');
            createElectronicSound();

            // Try again after a short delay
            setTimeout(() => {
                if (isPlayerReady && player) {
                    player.setVolume(70);
                    player.playVideo();
                }
            }, 1000);
        }
    }

    function createElectronicSound() {
        // Create a simple electronic sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Create a sequence of electronic beeps
            const frequencies = [440, 554, 659, 880]; // A4, C#5, E5, A5

            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    playBeep(audioContext, freq, 0.1, 0.3);
                }, index * 150);
            });

        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    function playBeep(audioContext, frequency, duration, volume) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'square'; // Electronic sound

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    // Add hover effects for power button
    powerBtn.addEventListener('mouseenter', function() {
        if (!isActivated) {
            this.style.transform = 'scale(1.1)';
        }
    });

    powerBtn.addEventListener('mouseleave', function() {
        if (!isActivated) {
            this.style.transform = 'scale(1)';
        }
    });

    // Add keyboard support
    powerBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isActivated) {
                activateWebsite();
                isActivated = true;
            }
        }
    });

    // Particle effects removed for cleaner design

    // Matrix effect removed for cleaner design
});