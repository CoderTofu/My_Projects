
// ALL CONTROLS
const ALL_CONTROLS = document.querySelectorAll('.control');

// Recorder
const startRecordingElement = document.getElementById('startRecording');
const playRecordingElement = document.getElementById('playRecording');
const pauseRecordingElement = document.getElementById('pauseRecording');
const stopRecordElement = document.getElementById('stopRecording');
const downloadRecordElement = document.getElementById('downloadRecord');

const audioWaveForm = document.getElementById('audio-wave-form');
const audioBarForm = document.getElementById('audio-bar-form');

// To record
let mediaRecorder;

// If window is to ever resize
window.addEventListener('resize', resize)

// Certain button func (start recording)
startRecordingElement.addEventListener('click', startRecordingFunc)

// Certain button func (download recording)
downloadRecordElement.addEventListener('click', () => {
    downloadRecordingFunc(audio.src, 'your-recording');
})

// Certain button func (stop recording)
stopRecordElement.addEventListener('click', () => {
    mediaRecorder.stop();
    audioWaveForm.classList.remove('hide-feature');
    audioBarForm.classList.add('hide-feature');
    // Timeout is needed so audio can have extra time to load and to play
    setTimeout(() => {
        playAudioFunc()
    }, 100)
})

// Certain button func (pause recording)
pauseRecordingElement.addEventListener('click', () => {
    mediaRecorder.pause();
    hideAllControl();
    stopRecordElement.classList.remove('hide-feature');
    playRecordingElement.classList.remove('hide-feature');
})

// Certain button func (resume recording)
playRecordingElement.addEventListener('click', () => {
    mediaRecorder.resume();
    hideAllControl();
    pauseRecordingElement.classList.remove('hide-feature');
    stopRecordElement.classList.remove('hide-feature');
})

// Start media devices
function getRecording() {
    return navigator.mediaDevices.getUserMedia({
        audio: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            latency: 0
        }
    })
}

// Start the recording
function startRecordingFunc() {
    getRecording()
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            const audioChunks = [];

            mediaRecorder.addEventListener('dataavailable', e => {
                audioChunks.push(e.data)
            });

            mediaRecorder.addEventListener('stop', async() => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                audio = new Audio(audioUrl);
                await wavesurfer.load(audioUrl);
            })
        })
    // Change type of visualization
    audioWaveForm.classList.add('hide-feature');
    audioBarForm.classList.remove('hide-feature');
    // Change controls
    hideAllControl();
    pauseRecordingElement.classList.remove('hide-feature');
    stopRecordElement.classList.remove('hide-feature');
}

// Downloading func
function downloadRecordingFunc(fileUrl, fileName) {
    var a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
    a.click();
}

// Resize func
function resize() {
    audioBarForm.width =audioBarForm.clientWidth * window.devicePixelRatio;
    audioBarForm.height =audioBarForm.clientHeight * window.devicePixelRatio;
    audioWaveForm.width = audioWaveForm.clientWidth * window.devicePixelRatio;
    audioWaveForm.height = audioWaveForm.clientHeight * window.devicePixelRatio;
}