import {
    playAudioFunc,
    pauseAudioFunc,
    stopAudioFunc,
    restartAudioFunc
} from './audioPlayer.js'

// Before Recording
export const startRecordingElement = document.getElementById('startRecording');
export const playAudioElement = document.getElementById('playAudio');

// During Recording
export const stopRecordingElement = document.getElementById('stopRecording');
export const pauseRecordingElement = document.getElementById('pauseRecording');

// While playing the record itself
export const downloadAudioElement = document.getElementById('downloadRecord');
export const stopAudioElement = document.getElementById('stopAudio');
export const pauseAudioElement = document.getElementById('pauseAudio');
export const restartAudioElement = document.getElementById('restartAudio');

// All controls
export const allControlElements = document.querySelectorAll('.control');

// Pre recorded Audio
export const preRecordedAudioElement = document.getElementById('recorded-audio')

export function resetAllButtons() {
    allControlElements.forEach(element => {
        element.classList.add('hide-feature');
    })

    downloadAudioElement.classList.remove('hide-feature');
    startRecordingElement.classList.remove('hide-feature');
    playAudioElement.classList.remove('hide-feature');
}

playAudioElement.addEventListener('click', playAudioFunc);