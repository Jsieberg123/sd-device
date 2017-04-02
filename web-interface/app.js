const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const https = require('https');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
console.log(__dirname);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded());
app.use(cookieParser());

require("./routes/setup.js")(app);

app.use(express.static('web-interface/css'))
app.listen(80, () => { console.log("Started Webserver") });