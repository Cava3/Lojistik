// This module manages the save/load format for Lojistick

function gen_save_string(dico) {
    var str = "";
    for (var key in dico) {
        str += key + "📿" + dico[key] + "🎐";
    }
    return str;
}

function parseSaveString(str) {
    var dico = {};
    var lines = str.split("🎐");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        if(! line.includes("📿"))
            continue;
        
        var parts = line.split("📿");
        if (parts.length == 2) {
            dico[parts[0]] = parts[1];
        }
    }
    return dico;
}

function download(filename, content, type) {
    var a = document.createElement('a');
    a.href = 'data:' + type + ',' + encodeURIComponent(content);
    a.download = filename;
    a.click();
}

function fileToText(callback, files){
    var file = files.files[0];
    var reader = new FileReader();
    reader.onload = function () {
        callback(reader.result);
    };
    reader.onerror = function (error) {
        console.log(error);
    };
    reader.readAsText(file);
}

function askFile(callback) {
    // Create a file input element
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/x-ljs'; // Only accept .ljs files

    // Add an event listener to the file input element that will call the callback function with the file contents when a file is selected
    fileInput.addEventListener('change', function (e) {
        fileToText(callback, fileInput);
    });

    // Trigger the file input element to open the file selector dialog
    fileInput.click();
}

//File dropping
const dropArea = document.getElementById('drop-area');
dropArea.ondragover = function() {return false;};
dropArea.ondragleave = function() {return false;};
dropArea.ondragend = function() {return false;};

dropArea.ondrop = function (e) {
    e.preventDefault();

    fileToText(function (result) {
        setDico(parseSaveString(result));
        alert("Fichier chargé avec succès !");
    }, e.dataTransfer);

    return false;
};

// Interface with front
function loadFromFile(){
    askFile(function (result) {
        setDico(parseSaveString(result));
        alert("Fichier chargé avec succès !");
    });
}

function saveToFile(){
    download("lojistik.ljs", gen_save_string(getDico()), "application/x-ljs");
}

function copyToClipboard(){
    if(!navigator.clipboard){
        alert("Votre navigateur ne supporte pas le presse-papier.");
        return;
    }

    navigator.clipboard.writeText(gen_save_string(getDico()));
}

function loadFromClipboard(){
    if(!navigator.clipboard){
        alert("Votre navigateur ne supporte pas le presse-papier.");
        return;
    }

    if(!navigator.clipboard.readText){
        alert("Votre navigateur est nul.");
        return;
    }

    navigator.clipboard.readText().then(function (text) {
        setDico(parseSaveString(text));
        alert("Collé avec succès !");
    });
}

async function writeNFC() {
    if ("NDEFReader" in window) {
        const ndef = new NDEFReader();
        try {
            await ndef.write(gen_save_string(getDico()));
            alert("Écriture réussie.");
        } catch (error) {
            console.log(error);
        }
    } else {
        alert("Votre navigateur ne supporte pas les cartes NFC.");
    }
}

async function readNFC() {
    if ("NDEFReader" in window) {
        const ndef = new NDEFReader();
        try {
            await ndef.scan();
            ndef.onreading = event => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    setDico(parseSaveString(decoder.decode(record.data)));
                    break;
                }
                alert("Lecture réussie.");
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        alert("Votre navigateur ne supporte pas les cartes NFC.");
    }
}

