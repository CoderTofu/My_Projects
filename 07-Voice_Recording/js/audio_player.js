// Player
const playAudioElement = document.getElementById('playAudio');
const pauseAudioElement = document.getElementById('pauseAudio');
const stopAudioElement = document.getElementById('stopAudio');
const restartAudioElement = document.getElementById('restartAudio');
// All Controls
const controlElement = document.querySelectorAll('.control');


// For audio player
const audioContext = new AudioContext();
let track;

// Pre recorded audio is default state
let audio = document.getElementById('first-audio')
track = audioContext.createMediaElementSource(audio);
track.connect(audioContext.destination);
audio.addEventListener('ended', () => {
    hideAllControl();
    restartAudioElement.classList.remove('hide-feature');
    startRecordingElement.classList.remove('hide-feature');
})

// Reset Controls
function hideAllControl() {
    controlElement.forEach(element => {
        if (element.classList.contains('important')) return;
        element.classList.add('hide-feature')
    })
}


// Audio player Functions
playAudioElement.addEventListener('click', playAudioFunc)

pauseAudioElement.addEventListener('click', pauseAudioFunc)

stopAudioElement.addEventListener('click', stopAudioFunc)

restartAudioElement.addEventListener('click', playAudioFunc)

function playAudioFunc() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    } else {
        audio.play()
    }
    hideAllControl()
    pauseAudioElement.classList.remove('hide-feature');
    stopAudioElement.classList.remove('hide-feature')
}

function pauseAudioFunc() {
    audio.pause();
    hideAllControl();
    startRecordingElement.classList.remove('hide-feature');
    stopAudioElement.classList.remove('hide-feature');
    playAudioElement.classList.remove('hide-feature');
}

function stopAudioFunc() {
    audio.pause();
    audio.currentTime = 0;
    hideAllControl();
    playAudioElement.classList.remove('hide-feature');
    startRecordingElement.classList.remove('hide-feature');
}