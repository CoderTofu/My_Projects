// ALL CONTROLS
const ALL_CONTROLS = document.querySelectorAll('.control');

// Recorder
const startRecordingElement = document.getElementById('startRecording');
const pauseRecordingElement = document.getElementById('pauseRecording');
const stopRecordElement = document.getElementById('stopRecording');
const downloadRecordElement = document.getElementById('downloadRecord');

// To record
let mediaRecorder;

