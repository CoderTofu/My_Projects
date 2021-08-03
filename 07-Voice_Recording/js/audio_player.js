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
        element.classList.add('hide-feature');
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

// Audio Visuals
const audioWaveForm = document.getElementById('audio-wave-form');
let ctx = audioWaveForm.getContext('2d');
let analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
track.connect(analyser);
track.connect(audioContext.destination);
let data = new Uint8Array(analyser.frequencyBinCount);

function audioWaveVisuals() {
    analyser.getByteFrequencyData(data);
    draw(data)
    requestAnimationFrame(audioWaveVisuals);
}
requestAnimationFrame(audioWaveVisuals)

function draw(data) {
    data = [...data];
    ctx.clearRect(0, 0, audioWaveForm.width, audioWaveForm.height);
    let space = audioWaveForm.width / data.length; data.forEach((value, i) => {
        ctx.beginPath();
        ctx.moveTo(space * i, audioWaveForm.height); //x,y
        ctx.lineTo(space * i, audioWaveForm.height - value); //x,y
        ctx.stroke();
    })
}