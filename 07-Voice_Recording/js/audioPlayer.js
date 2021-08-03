// import stuff
import {
    playAudioElement,
    pauseAudioElement,
    stopAudioElement,
    restartAudioElement,
    preRecordedAudioElement,

    resetAllButtons
} from './main.js'

const audioContext = new AudioContext();

export function playAudioFunc() {
    playAudioElement.classList.add('hide-feature');
    pauseAudioElement.classList.remove('hide-feature');
}

export function pauseAudioFunc() {

}

export function stopAudioFunc() {

}

export function restartAudioFunc() {

}