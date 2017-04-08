const settings = require("utils").Settings;
const socket = require("./sockets.js");
const fs = require('fs');
const spi = require("../tools/spi.js");

const typeDefs = ["", "current.html", "voltage.html", "relay.html"];

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
    //read pp volts
    var phaseA = spi.ReadUInt(addrs[id], 10);
    var phaseB = spi.ReadUInt(addrs[id], 16);
    var phaseC = spi.ReadUInt(addrs[id], 22);
    socket.Send("resp-get-current", { id: id, phaseA: phaseA, phaseB: phaseB, phaseC: phaseC, temp1: 100, temp2: 100 });
});

socket.on("get-voltage", id => {
    //read max volts
    var aread = spi.ReadUInt(addrs[id], 28);
    var bread = spi.ReadUInt(addrs[id], 34);
    var cread = spi.ReadUInt(addrs[id], 40);
    var phaseA = "bad";
    if (aread > 100) {
        phaseA = "good";
    }
    var phaseB = "bad";
    if (spi.ReadUInt(addrs[id], 36) > 100) {
        phaseB = "good";
    }
    var phaseC = "bad";
    if (spi.ReadUInt(addrs[id], 42) > 100) {
        phaseC = "good";
    }
    socket.Send("resp-get-voltage", { id: id, phaseA: phaseA, phaseB: phaseB, phaseC: phaseC, temp1: 100, temp2: 100 });
});

socket.on("set-off", id => {
    var addr = addrs[id];
    spi.WriteByte(addr, 11, 0xFF);
});

socket.on("set-on", id => {
    var addr = addrs[id];
    spi.WriteByte(addr, 10, 0xFF);
});