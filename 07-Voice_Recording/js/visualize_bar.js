// load module from Skypack CDN
import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';

const visualizerContainer = document.getElementById('audio-bar-form');

const audioMotion = new AudioMotionAnalyzer(
    visualizerContainer,
    {
        gradient: 'rainbow',
        height: visualizerContainer.height - 40,
        showScaleY: true
    }
);

function getVisuals() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(stream => {
        // create stream using audioMotion audio context
        const micStream = audioMotion.audioCtx.createMediaStreamSource(stream);
        // connect microphone stream to analyzer
        audioMotion.connectInput(micStream);
        // mute output to prevent feedback loops from the speakers
        audioMotion.volume = 0;
    })
}

// To stop or disconnect the visualization
const stopRecordElement = document.getElementById('stopRecording');
const pauseRecordingElement = document.getElementById('pauseRecording');
stopRecordElement.addEventListener('click', () => {
    audioMotion.disconnectInput();
})
pauseRecordingElement.addEventListener('click', () => {
    audioMotion.disconnectInput();
})

// Reconnect the visualizer
const startRecordingElement = document.getElementById('startRecording');
const playRecordingElement = document.getElementById('playRecording');
playRecordingElement.addEventListener('click', getVisuals);
startRecordingElement.addEventListener('click', getVisuals);
