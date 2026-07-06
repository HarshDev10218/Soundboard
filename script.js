// Clean local file paths mapping
const soundMap = {
    'airhorn': 'sounds/airhorn.mp3',
    'applause': 'sounds/applause.mp3',
    'ba-dum-tss': 'sounds/badumtss.mp3',
    'crickets': 'sounds/crickets.mp3',
    'fail': 'sounds/fail.mp3',
    'gasp': 'sounds/gasp.mp3',
    'laser': 'sounds/laser.mp3',
    'sad-trombone': 'sounds/trombone.mp3',
    'victory': 'sounds/victory.mp3',
    'vine-boom': 'sounds/vineboom.mp3',
    'wah-wah': 'sounds/wahwah.mp3',
    'wilhelm': 'sounds/scream.mp3'
};

let activeAudios = [];

const volumeSlider = document.getElementById('volume');
const stopButton = document.getElementById('stop-all');
const soundButtons = document.querySelectorAll('.sound-btn');

function stopAllSounds() {
    activeAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    activeAudios = []; 
}

soundButtons.forEach(button => {
    button.addEventListener('click', () => {
        const soundKey = button.getAttribute('data-sound');
        const soundPath = soundMap[soundKey];

        if (soundPath) {
            const audio = new Audio(soundPath);
            audio.volume = volumeSlider.value;
            
            audio.play().catch(err => {
                console.log("Playback failed. Run a local server (like VS Code Live Server) to fix this!", err);
            });
            activeAudios.push(audio);

            audio.addEventListener('ended', () => {
                activeAudios = activeAudios.filter(a => a !== audio);
            });
        }
    });
});

stopButton.addEventListener('click', stopAllSounds);

volumeSlider.addEventListener('input', (e) => {
    const currentVolume = e.target.value;
    activeAudios.forEach(audio => {
        audio.volume = currentVolume;
    });
});