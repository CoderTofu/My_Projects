const PRE_RECORDED_AUDIO_SRC = './welcome-record.m4a';

const playAudioElement = document.getElementById('playAudio');

playAudioElement.addEventListener('click', () => {

})


// navigator.mediaDevices.getUserMedia({audio: true})
//     .then(stream => {
//         const mediaRecorder = new MediaRecorder(stream);
//         mediaRecorder.start();

//         const audioChunks = [];

//         mediaRecorder.addEventListener('dataavailable', e => {
//             audioChunks.push(e.data)
//         });

//         mediaRecorder.addEventListener('stop', () => {
//             const audioBlob = new Blob(audioChunks);
//             const audioUrl = URL.createObjectURL(audioBlob);
//             const audio = new Audio(audioUrl);
//             audio.play()
//         })

//         setTimeout(() => {
//             mediaRecorder.stop();
//         }, 3000)
//     })

/*

    Once the user arrives at the record page. He/She will be met with a pre recorded audio(PRA).
    Pag pinindot ng user ng mic button mawawala yung, PRA at mapapalitan ng magiging audio ni ininput nila.

    SOOOOO pag nasa play mode ang website gagamit tayo ng waves oscillation. Pag nagrerecord naman dapat
    ang gagamitin is bars.

*/