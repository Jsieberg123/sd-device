const settings = require("utils").Settings;
const socket = require("./sockets.js");
const fs = require('fs');

socket.on("get-cards", () => {
    socket.Send("resp-get-cards", {
        "time1": { "display": "time.html", "id": -1 },
        "pos1": { "display": "switch.html", "id": 1, name: settings[`name-${1}`] || "Name" },
        "c1": { "display": "current.html", "id": 2, name: settings[`name-${2}`] || "Name" },
        "v1": { "display": "voltage.html", "id": 3, name: settings[`name-${3}`] || "Name" },
    });
});

socket.on("get-time", id => {
    socket.Send("resp-get-time", { id: id, time: new Date() });
});

socket.on("set-name", req => {
    console.log(`name of card ${req.id} set to ${req.name}.`)
    settings[`name-${req.id}`] = req.name
});

socket.on("get-current", id => {
    socket.Send("resp-get-current", { id: id, phaseA: 0, phaseB: 1, phaseC: 2 });
});

socket.on("get-voltage", id => {
    socket.Send("resp-get-voltage", { id: id, phaseA: "good", phaseB: "good", phaseC: "bad" });
});

socket.on("get-pos", id => {
    socket.Send("resp-get-pos", { id: id, pos: tempidsPos[id] })
});