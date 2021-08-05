// ALL CONTROLS
const ALL_CONTROLS = document.querySelectorAll('.control');

// Recorder
const startRecordingElement = document.getElementById('startRecording');
const playRecordingElement = document.getElementById('playRecording');
const pauseRecordingElement = document.getElementById('pauseRecording');
const stopRecordElement = document.getElementById('stopRecording');
const downloadRecordElement = document.getElementById('downloadRecord');

// To record
let mediaRecorder;
let audioUrl;

startRecordingElement.addEventListener('click', startRecordingFunc)
downloadRecordElement.addEventListener('click', () => {
    downloadRecordingFunc(audio.src, 'your-recording');
})

stopRecordElement.addEventListener('click', () => {
    mediaRecorder.stop();
    setTimeout(() => {
        playAudioFunc()
    }, 100)
})

pauseRecordingElement.addEventListener('click', () => {
    mediaRecorder.pause();
    hideAllControl();
    stopRecordElement.classList.remove('hide-feature');
    playRecordingElement.classList.remove('hide-feature');
})

playRecordingElement.addEventListener('click', () => {
    mediaRecorder.resume();
    hideAllControl();
    pauseRecordingElement.classList.remove('hide-feature');
    stopRecordElement.classList.remove('hide-feature');
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

            mediaRecorder.addEventListener('stop', async() => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                audio = new Audio(audioUrl);
                await wavesurfer.load(audioUrl);
            })
        })
    hideAllControl()
    pauseRecordingElement.classList.remove('hide-feature');
    stopRecordElement.classList.remove('hide-feature');
}

function downloadRecordingFunc(fileUrl, fileName) {
    var a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
    a.click();
}
