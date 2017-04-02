var fs = require("fs");

try
{
  jsonInfo = fs.readFileSync("node.json", {encoding: "utf8"});
}
catch(e)
{
  jsonInfo = "{}";
}
 if(jsonInfo == "")
{
  jsonInfo = "{}";
}

var settings = JSON.parse(jsonInfo);
settings.Save = save;
settings.SaveAsync = saveAsync;
console.log("Settings loaded")
module.exports = settings

function save()
{
  fs.writeFileSync("node.json", JSON.stringify(settings, null, 2));
}

function saveAsync()
{
    return new Promise(function(fulfill, reject){
          fs.writeFile("node.json", JSON.stringify(settings, null, 2), function(err){
            if(err)
            {
              reject(err);
              return;
            }
            fulfill();
            });
    });

}