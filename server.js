const http = require('http');
const fs = require("fs");
const { json } = require('stream/consumers');

// После каждого npm run build названия js файлов меняются
let distJsFiles = []
fs.readdirSync('./dist/js').forEach(element => {
    element = `/js/${element}`
    distJsFiles.push(element)
});
let server = new http.Server(function (req, res) {
    if (req.url == "/json") {
        let jsonString = fs.readFileSync('./src/tasks.json', "utf-8")
        res.setHeader('Content-Type', 'application/json');
        res.end(jsonString)
    } else if (req.url == "/savejson") {
        let data = "";
        req.on("data", chunk => {
            data += chunk;
        });
        req.on("end", () => {
            fs.writeFileSync("./src/tasks.json", data);
        });
        res.statusCode = 200;
        res.statusMessage = "OK"
    } else if (req.url == "/") {
        // Тут можно было бы сделать Apache Alias
        res.setHeader("Content-Type", "text/html; charset=utf-8;");
        fs.readFile("dist/index.html", "utf8", function (error, data) {
            res.end(data);
        });
    } else if (req.url == "/favicon.ico") {
        res.setHeader("Content-Type", "image/x-icon; charset=utf-8;");
        fs.readFile("dist/favicon.ico", "utf8", function (error, data) {
            res.end(data);
        });
    } else if (req.url.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript; charset=utf-8;");
        fs.readFile(`dist/${req.url}`, "utf8", function (error, data) {
            res.end(data);
        });
    } else if (req.url.endsWith(".map")) {
        res.setHeader("Content-Type", "application/octet-stream; charset=utf-8;");
        fs.readFile(`dist/${req.url}`, "utf8", function (error, data) {
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.statusMessage = ":("
    }
});

server.listen(8080);