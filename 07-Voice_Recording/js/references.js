// Global variable to track current file name.
var currentFile = "";
function playAudio() {
    // Check for audio element support.
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            var btn = document.getElementById('play');
            var audioURL = document.getElementById('audiofile');

            //Skip loading if current file hasn't changed.
            if (audioURL.value !== currentFile) {
                oAudio.src = audioURL.value;
                currentFile = audioURL.value;
            }

            // Tests the paused attribute and set state.
            if (oAudio.paused) {
                oAudio.play();
                btn.textContent = "Pause";
            }
            else {
                oAudio.pause();
                btn.textContent = "Play";
            }
        }
        catch (e) {
            // Fail silently but show in F12 developer tools console
            if (window.console && console.error("Error:" + e));
        }
    }
}
// Rewinds the audio file by 30 seconds.

function rewindAudio() {
    // Check for audio element support.
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            oAudio.currentTime -= 30.0;
        }
        catch (e) {
            // Fail silently but show in F12 developer tools console
            if (window.console && console.error("Error:" + e));
        }
    }
}

// Fast forwards the audio file by 30 seconds.

function forwardAudio() {

    // Check for audio element support.
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            oAudio.currentTime += 30.0;
        }
        catch (e) {
            // Fail silently but show in F12 developer tools console
            if (window.console && console.error("Error:" + e));
        }
    }
}

// Restart the audio file to the beginning.

function restartAudio() {
    // Check for audio element support.
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            oAudio.currentTime = 0;
        }
        catch (e) {
            // Fail silently but show in F12 developer tools console
            if (window.console && console.error("Error:" + e));
        }
    }
}


navigator.mediaDevices.getUserMedia({audio: true})
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', e => {
            audioChunks.push(e.data)
        });

        mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play()
        })

        setTimeout(() => {
            mediaRecorder.stop();
        }, 3000)
    })

/*

    Once the user arrives at the record page. He/She will be met with a pre recorded audio(PRA).
    Pag pinindot ng user ng mic button mawawala yung, PRA at mapapalitan ng magiging audio ni ininput nila.

    SOOOOO pag nasa play mode ang website gagamit tayo ng waves oscillation. Pag nagrerecord naman dapat
    ang gagamitin is bars.

*/