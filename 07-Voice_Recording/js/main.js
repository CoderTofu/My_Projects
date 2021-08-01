const playAudioElement = document.getElementById('playAudio');

playAudioElement.addEventListener('click', playAudio)

let audioSource = "./recording.mp3"

function playAudio() {
    if (window.HTMLAudioElement) {
        try {
            const newAudio = new Audio(audioSource);
            newAudio.play() 
        } catch (err) {
            console.log(err)
        }
    }
}