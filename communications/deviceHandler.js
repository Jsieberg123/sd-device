const settings = require("utils").Settings;
const socket = require("./sockets.js");
const fs = require('fs');
const spi = require("../tools/spi.js");

const typeDefs = ["", "current.html", "voltage.html", "", "relay.html"];

const addrs = {}

socket.on("get-cards", () => {
    var cards = spi.Scan();
    var carddisps = {
        "time1": { "display": "time.html", "id": -1 }
    };

    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        addrs[card.id] = card.addr;

        carddisps[card.id.toString()] = {
            display: typeDefs[card.type],
            id: card.id,
            name: settings[`name-${card.id}`] || "Name"
        }
    }

    socket.Send("resp-get-cards", carddisps);
});

socket.on("get-time", id => {
    socket.Send("resp-get-time", { id: id, time: new Date() });
});

socket.on("set-name", req => {
    console.log(`name of card ${req.id} set to ${req.name}.`)
    settings[`name-${req.id}`] = req.name
    settings.SaveAsync();
});

socket.on("get-current", id => {
    //read pp current
    var phaseA = spi.ReadUInt(addrs[id], 14);
    var phaseB = spi.ReadUInt(addrs[id], 20);
    var phaseC = spi.ReadUInt(addrs[id], 26);
    socket.Send("resp-get-current", { id: id, phaseA: phaseA * 0.005692, phaseB: phaseB * 0.005692, phaseC: phaseC * 0.005692, temp1: 100, temp2: 100 });
});

socket.on("get-voltage", id => {
    //read max volts
    var aread = spi.ReadUInt(addrs[id], 28);
    var bread = spi.ReadUInt(addrs[id], 34);
    var cread = spi.ReadUInt(addrs[id], 40);
    var phaseA = "bad";
    if (aread > 500) {
        phaseA = "good";
    }
    var phaseB = "bad";
    if (bread > 500) {
        phaseB = "good";
    }
    var phaseC = "bad";
    if (cread > 500) {
        phaseC = "good";
    }
    socket.Send("resp-get-voltage", { id: id, phaseA: phaseA, phaseB: phaseB, phaseC: phaseC, temp1: 100, temp2: 100 });
});

socket.on("set-off", id => {
    var addr = addrs[id];
    console.log("Turning off.")
    spi.WriteByte(addr, 11, 0xFF);
});

socket.on("set-on", id => {
    var addr = addrs[id];
    console.log("Turning on.")
    spi.WriteByte(addr, 10, 0xFF);
});