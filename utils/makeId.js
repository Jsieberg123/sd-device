var settings = require("./settings.js");

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function createId() {
    if (!("id" in settings)) {
        settings.id = makeid();
        settings.Save();
    }
}

module.exports = createId;