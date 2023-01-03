var dico_values = {};
var dico_rows = {};
var table = document.getElementById("key-pasta-copy-delete");
var user_prompt = "";

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
    if(key in dico_values)
        removeRow(key)

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
    if(!(key in dico_values))
        return;
    
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
recognition.lang = "fr-FR";

recognition.onresult = function(event) {
    transcript = event.results[event.results.length-1][0].transcript;
    confidence = event.results[event.results.length-1][0].confidence;

    parseResult(transcript);
}

recognition.onend = function(event){
    if(recording){
        recognition.start()
        console.log("Restarting for inactivity...");
    }
}

function parseResult(result) {
    result = cleanReco(result);

    if(! result.includes("logistique ")){
        console.log("Nothing to see here...");
        return;
    }

    splitted = result.split("logistique ");
    user_prompt = splitted[splitted.length-1];

    console.log("Prompted : "+user_prompt);

    if(user_prompt.split(" ")[0] == "ajoute" && user_prompt.includes("pour")){
        row_to_add = user_prompt.split("ajoute ")[1];
        splitted = row_to_add.split(" ");
        separation = splitted.lastIndexOf("pour");

        value = splitted.slice(0, separation).join(" ");
        key = splitted.slice(separation+1).join(" ");
        addRow(key, value);

        console.log("Je rajoute "+value+" pour "+key);
    }else if(user_prompt.split(" ")[0] == "supprime"){
        key = user_prompt.split("supprime ")[1];
        removeRow(key);

        console.log("Je supprime "+key);
    }else if(user_prompt.split(" ")[0] == "copie"){
        console.log("Je copie");
    }else{
        console.log("Ordre inconnu");
    }
}

function cleanReco(prompt) {
    to_remove = "?!.,:/;"
    to_ret = "";

    for(var c of prompt){
        if(! to_remove.includes(c))
            to_ret += c;
    }

    return to_ret.toLowerCase()
}