//require("./web-interface/app.js");
//require("./communications/deviceHandler.js");

const spi = require("./tools/spi.js");

setInterval(function() {
    spi.WriteByte(5, 15, 1)
    var id = spi.ReadByte(5, 0);
    console.log(`${id}`);
}, 5000);