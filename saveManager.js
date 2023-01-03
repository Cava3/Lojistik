// This module manages the save/load format for Lojistick

function gen_save_string(dico) {
    var str = "";
    for (var key in dico) {
        str += key + "📿" + dico[key] + "🎐";
    }
    return str;
}

function parse_save_string(str) {
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

