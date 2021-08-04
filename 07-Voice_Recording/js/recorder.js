// ALL CONTROLS
const ALL_CONTROLS = document.querySelectorAll('.control');

// Recorder
const startRecordingElement = document.getElementById('startRecording');
const pauseRecordingElement = document.getElementById('pauseRecording');
const stopRecordElement = document.getElementById('stopRecording');
const downloadRecordElement = document.getElementById('downloadRecord');

// To record
let mediaRecorder;

startRecordingElement.addEventListener('click', startRecordingFunc)

stopRecordElement.addEventListener('click', () => {
    mediaRecorder.stop();
    wavesurfer.seekTo(0);
    wavesurfer.play()
    playAudioFunc()
})

function startRecordingFunc() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            const audioChunks = [];

            mediaRecorder.addEventListener('dataavailable', e => {
                audioChunks.push(e.data)
            });

            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                audio = new Audio(audioUrl);
                track = audioContext.createMediaElementSource(audio);
                track.connect(audioContext.destination);
                wavesurfer.load(audioUrl)
            })
        })
    hideAllControl()
    pauseRecordingElement.classList.remove('hide-feature');
    stopRecordElement.classList.remove('hide-feature');
}

