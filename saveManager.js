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

function readFile(callback) {
    // Create a file input element
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/x-ljs'; // Only accept .ljs files

    // Add an event listener to the file input element that will call the callback function with the file contents when a file is selected
    fileInput.addEventListener('change', function () {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            callback(reader.result);
        };
        reader.onerror = function (error) {
            console.log(error);
        };
        reader.readAsText(file);
    });

    // Trigger the file input element to open the file selector dialog
    fileInput.click();
}

function loadFromFile(){
    readFile(function (result) {
        setDico(parseSaveString(result));
        alert("Fichier chargé avec succès !")
    });
}

function saveToFile(){
    download("lojistik.ljs", gen_save_string(getDico()), "application/x-ljs");
}