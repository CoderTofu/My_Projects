// Player
const playAudioElement = document.getElementById('playAudio');
const pauseAudioElement = document.getElementById('pauseAudio');
const stopAudioElement = document.getElementById('stopAudio');
const restartAudioElement = document.getElementById('restartAudio');
// All Controls
const controlElement = document.querySelectorAll('.control');

// Pre recorded audio is default state
let audio = document.getElementById('first-audio')

// Reset Controls
function hideAllControl() {
    controlElement.forEach(element => {
        if (element.classList.contains('important')) return;
        element.classList.add('hide-feature');
    })
}

// Audio visuals
let wavesurfer = WaveSurfer.create({
    container: '#audio-wave-form',
    waveColor: 'orange',
    progressColor: 'purple'
});
wavesurfer.load(audio);
wavesurfer.on('finish', () => {
    hideAllControl();
    restartAudioElement.classList.remove('hide-feature');
    startRecordingElement.classList.remove('hide-feature');
})

// Audio player Functions
playAudioElement.addEventListener('click', playAudioFunc);

pauseAudioElement.addEventListener('click', pauseAudioFunc);

stopAudioElement.addEventListener('click', stopAudioFunc);

restartAudioElement.addEventListener('click', () => {
    wavesurfer.seekTo(0);
    playAudioFunc()
});

// Certain button func (play audio recording or resume)
function playAudioFunc() {
    wavesurfer.play()
    // Change to appropriate controls
    hideAllControl()
    pauseAudioElement.classList.remove('hide-feature');
    stopAudioElement.classList.remove('hide-feature')
}

// Certain button func (pause audio recording)
function pauseAudioFunc() {
    wavesurfer.pause();
    // Change to appropriate controls
    hideAllControl();
    startRecordingElement.classList.remove('hide-feature');
    stopAudioElement.classList.remove('hide-feature');
    playAudioElement.classList.remove('hide-feature');
}

// Certain button func (stop audio recording)
function stopAudioFunc() {
    wavesurfer.stop();
    // Change to appropriate controls
    hideAllControl();
    playAudioElement.classList.remove('hide-feature');
    startRecordingElement.classList.remove('hide-feature');
}

