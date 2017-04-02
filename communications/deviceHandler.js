const settings = require("utils").Settings;
const socket = require("./sockets.js");
const fs = require('fs');

const tempAddrsPos = {
    1: true,
    2: false
}

socket.on("get-cards", () => {
    console.log("here");
    socket.Send("resp-get-cards", {
        "time1": { "display": "time.html", "addr": -1 },
        "pos1": { "display": "switch.html", "addr": 1 }
    });
});

socket.on("get-time", addr => {
    socket.Send("resp-get-time", { addr: addr, time: new Date((new Date() - addr)) });
});

socket.on("get-pos", addr => {
    socket.Send("resp-get-pos", { addr: addr, pos: tempAddrsPos[addr] })
});

socket.on("set-pos", obj => {
    tempAddrsPos[obj.addr] = obj.pos;
});