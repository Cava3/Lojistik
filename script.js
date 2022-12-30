// Association des modals
document.getElementById("import-btn").onclick = function() {
    openModal("import-modal");
}
document.getElementById("export-btn").onclick = function() {
    openModal("export-modal");
}


// Recording button
var recording = false;
var recordButton = document.getElementById("toggle-speech");

function toggleRecording() {
    if (recording) {
        stopRecording();
    } else {
        startRecording();
    }
}

// Recording functions
function startRecording() {
    if(!recognition){
        console.log("Speech recognition not supported");
        return;
    }

    recordButton.classList="on";
    console.log("start recording");
    
    recording = true;
    recognition.start();
}

function stopRecording() {
    recordButton.classList="off";
    console.log("stop recording");
    
    recording = false;
    recognition.stop();
}

// Speech recognition
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.continuous = true;

recognition.onspeechend = function() {
    console.log("Fin de phrase");
}

recognition.onresult = function(event) {
    transcript = event.results[-1][0].transcript;
    confidence = event.results[-1][0].confidence;

    console.log(confidence+" : "+transcript);
    console.log(event.results);
}