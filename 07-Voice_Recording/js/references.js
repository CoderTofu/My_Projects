const startRecording = document.getElementById('startRecording');
const stopRecording = document.getElementById('stopRecording');
const playRecording = document.getElementById('playRecording');
const pauseRecording = document.getElementById('pauseRecording');
const downloadRecording = document.getElementById('downloadRecording')

let mediaRecorder;
let audio;

const audioContext = new AudioContext();
let track;

startRecording.addEventListener('click', startRecordingFunc);

stopRecording.addEventListener('click', () => {
    mediaRecorder.stop();
})

playRecording.addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    } else {
        audio.play()
    }
})

pauseRecording.addEventListener('click', () => {
    audio.pause()
})

downloadRecording.addEventListener('click', () => {
    //downloadRecordingFunc(audio.src, 'your-recording');
    console.log(mediaRecorder)
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
                track.connect(audioContext.destination)
                audio.play()
            })
        })
}

function downloadRecordingFunc(fileUrl, fileName) {
    var a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
    a.click();
}


/*

    Once the user arrives at the record page. He/She will be met with a pre recorded audio(PRA).
    Pag pinindot ng user ng mic button mawawala yung, PRA at mapapalitan ng magiging audio ni ininput nila.

    SOOOOO pag nasa play mode ang website gagamit tayo ng waves oscillation. Pag nagrerecord naman dapat
    ang gagamitin is bars.

*/