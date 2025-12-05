import http from "http";
import url from "url";
import fs from "fs";

const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
  if (err) throw err;
  return data;
});

http
  .createServer(function (req, res) {
    let navigateTo = url.parse(req.url, true);
    let fileName = "";

    if (navigateTo.pathname === "/") {
      fileName = "." + "/index.html";
    } else {
      fileName = "." + navigateTo.pathname;
    }

    fs.readFile(fileName, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-type": "text/html" });
        res.write(page404);
        return res.end();
      } else {
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
