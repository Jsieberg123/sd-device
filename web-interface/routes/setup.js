const rp = require('request-promise');
const utils = require("utils")
const settings = utils.Settings;
utils.MakeId();

module.exports = (app) => {
    app.get("/login", (req, res) => {
        res.render("login.ejs", { message: req.query.message });
    });

    app.post("/login", (req, res) => {
        var options = {
            method: 'POST',
            uri: `${utils.App.apiUrl}/login`,
            body: req.body,
            json: true, // Automatically stringifies the body to JSON
            resolveWithFullResponse: true
        };
        rp(options).then(response => {
            res.set("set-cookie", response.headers["set-cookie"]);
            res.redirect("/");
        }, err => { res.redirect("/login?message=Invalid username or password."); });
    });

    app.get("/", (req, res) => {
        if (!("access_token" in req.cookies)) {
            res.redirect("/login");
        } else {
            res.render("setup.ejs", { id: settings.id });
        }
    });

    app.get('/logout', function(req, res) {
        cookie = req.cookies;
        for (var prop in cookie) {
            if (!cookie.hasOwnProperty(prop)) {
                continue;
            }
            res.cookie(prop, '', { expires: new Date(0) });
        }
        res.redirect('/login');
    });


    app.get('/done', function(req, res) {
        if (!("access_token" in req.cookies)) {
            res.redirect("/login");
        } else {
            res.render("finished.ejs", { message: req.query.message });
        }
    });

    app.post("/", (req, res) => {
        var options = {
            method: 'POST',
            uri: `${utils.App.apiUrl}/addDevice`,
            body: req.body,
            json: true, // Automatically stringifies the body to JSON
            headers: {
                cookie: req.headers.cookie
            }
        };
        rp(options).then(body => {
            console.log(body);
            res.redirect("/done?message=Setup Complete");
        }, err => { res.redirect("/done?message=Setup Failed"); });
    });
}