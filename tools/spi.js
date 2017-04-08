var SPI = require("spi-device")
var spi = SPI.openSync(0, 0);
var text = require("text-encoding");

function transfer(buffer) {
    var result = new Buffer(buffer.length);
    var message = [{
        sendBuffer: buffer,
        receiveBuffer: result,
        byteLength: buffer.length,
        speedHz: 10000
    }]
    spi.transferSync(message);
    var waitTill = new Date(new Date().getTime() + 50);
    while (waitTill > new Date()) {}
    return message[0].receiveBuffer;
}
module.exports.ReadByte = readByte;
module.exports.ReadUInt = readUInt;
module.exports.ReadString = readString;

function readBuffer(device, addr, length) {
    var buffer = new Buffer(length + 2);
    buffer[0] = device;
    buffer[1] = addr;
    var result = transfer(buffer);
    return result;
}

function readByte(device, addr) {
    var result = readBuffer(device, addr, 1);
    return result.readUInt8(2);
}

function readUInt(device, addr) {
    var result = readBuffer(device, addr, 2);
    return result.readUInt16LE(2);
}

function readString(device, addr, length) {
    var result = readBuffer(device, addr, length);
    return result.toString("UTF-8", 2, 2 + length);
}
module.exports.WriteByte = writeByte;
module.exports.WriteUInt = writeUInt;
module.exports.WriteString = writeString;
module.exports.Scan = scan;

function createWriteBuffer(device, addr, length) {
    var buffer = new Buffer(length + 2);
    buffer[0] = 0xE0 | device;
    buffer[1] = addr;
    return buffer;
}

function writeByte(device, addr, byte) {
    var buffer = createWriteBuffer(device, addr, 1);
    buffer.writeUInt8(byte, 2);
    transfer(buffer);
}

function writeUInt(device, addr, uint) {
    var buffer = createWriteBuffer(device, addr, 2);
    buffer.writeUInt16LE(uint, 2);
    transfer(buffer);
}

function writeString(device, addr, string) {
    var buffer = createWriteBuffer(device, addr, string.length);
    buffer.write(string, 2, string.length, "UTF-8");
    transfer(buffer);
}

function scan() {

    var cards = [];
    for (var i = 0; i < 8; i++) {
        var id = readUInt(i, 1);
        if (id != 0) {
            var type = readByte(i, 0);
            console.log(`Card found at ${i} type: ${type} id: ${id}`);
            cards.push({
                id: id,
                addr: i,
                type: type
            });
        }
    }

    return cards;
}