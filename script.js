var dico_values = {};
var dico_rows = {};
var table = document.getElementById("key-pasta-copy-delete");

// Association des modals
document.getElementById("import-btn").onclick = function() {
    openModal("import-modal");
}
document.getElementById("export-btn").onclick = function() {
    openModal("export-modal");
}
document.getElementById("values-btn").onclick = function() {
    openModal("values-modal");
}
document.getElementById("info-btn").onclick = function() {
    openModal("info-modal");
}

// Fonctions d'ajout/supression de lignes
function addFromForm() {
    var keyForm = document.getElementById("add-key");
    var valueForm = document.getElementById("add-value");

    if(keyForm.value && valueForm.value){
        addRow(keyForm.value, valueForm.value);
        keyForm.value = "";
        valueForm.value = "";
    } else {
        alert("Veuillez remplir les champs.");
    }
}

function addRow(key, value) {
    dico_values[key] = value;

    var raw_row = 
        "<td>"+key+"</td>"+
        "<td>"+value+"</td>"+
        "<td><button onclick='navigator.clipboard.writeText(\""+value+"\")'>🧾</button></td>"+
        "<td><button onclick='removeRow(\""+key+"\")'>🗑️</button></td>";

    var row = document.createElement("tr");
    row.innerHTML = raw_row;
    table.appendChild(row);

    dico_rows[key] = row;
}

function removeRow(key) {
    table.removeChild(dico_rows[key]);

    delete dico_values[key];
    delete dico_rows[key];
}

// Recording button
var recording = false;
var record_button = document.getElementById("toggle-speech");

function toggleRecording() {
    if (recording)
        stopRecording();
    else
        startRecording();
}

// Recording functions
function startRecording() {
    if(!recognition){
        alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
        return;
    }

    record_button.classList="on";
    console.log("start recording");
    
    recording = true;
    recognition.start();
}

function stopRecording() {
    record_button.classList="off";
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