const utils = require("utils");
const WebSocket = require("ws");
const emitter = new(require("events"));
var ws;
var open = false;

function connect() {
    ws = new WebSocket(`${utils.App.socketUrl}?topic=${utils.Settings.id}`)

    ws.on("close", () => {
        open = false;
        setTimeout(connect, 5000);
    });

    ws.on("message", message => {
        message = JSON.parse(message);

        emitter.emit(message.e, message.p);
    });

    ws.on("open", () => {
        open = true;
        console.log("Connected");
        emitter.emit("open");
    });

    ws.on("error", error => {
        console.log(error);
    });
}

function send(event, payload) {
    var message = JSON.stringify({ e: event, p: payload });
    try {
        ws.send(message);

    } catch (err) {
        console.log(err);
    }
}

connect();

emitter.Send = send;

module.exports = emitter;