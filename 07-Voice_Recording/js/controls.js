import {
    startRecordingElement, 
    playAudioElement, 
    stopRecordingElement, 
    pauseRecordingElement,
    downloadAudioElement,
    stopAudioElement,
    pauseAudioElement,
    restartAudioElement,
    allControlElements,

    resetOriginalState
    } 
from './main.js'

let audioSource = "./recording.mp3";

let newAudio = {
    state: '0'
};

export function playAudioFunc() {
    // newAudio.addEventListener('ended', () => {
    //     resetOriginalState()

    //     playAudioElement.classList.add('hide-feature');
    //     restartAudioElement.classList.remove('hide-feature');
    // });

    // playAudioElement.classList.add('hide-feature');
    // pauseAudioElement.classList.remove('hide-feature');
}

export function pauseAudioFunc() {
    // pauseAudioElement.classList.add('hide-feature');
    // playAudioElement.classList.remove('hide-feature');
}