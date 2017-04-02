var fs = require("fs");

try {
    jsonInfo = fs.readFileSync("app.json", { encoding: "utf8" });
} catch (e) {
    jsonInfo = "{}";
}
if (jsonInfo == "") {
    jsonInfo = "{}";
}

var settings = JSON.parse(jsonInfo);

module.exports = settings;