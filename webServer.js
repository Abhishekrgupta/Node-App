// var http = require("http");
// var fs = require("fs");

//Create server Object with listener

// var data = [
//   {
//     url: "/home",
//     path: "./home.html"
//   },
//   {
//     url: "/about",
//     path: "./about.html"
//   },
//   {
//     url: "/project",
//     path: "./project.html"
//   },
//   {
//     url: "/profile",
//     path: "./profile.html"
//   }
// ];
// var Server = http.createServer((request, response) => {
//   //Pass request and read URL
//   //   if (request.url === "/home") {
//   //     fs.readFile("./home.html", (err, data) => {
//   //       if (err) {
//   //         response.writeHead(401, { "Content-Type": "text/html" });
//   //         response.write("File not fount  for URL");
//   //         response.end();
//   //       }

//   //       response.writeHead(200, { "Content-Type": "text/html" });
//   //       response.write(data);
//   //       response.end();
//   //     });
//   //   } else {
//   //     if (request.url === "/about") {
//   //       fs.readFile("./about.html", (err, data) => {
//   //         if (err) {
//   //           response.writeHead(401, { "Content-Type": "text/html" });
//   //           response.write("File not fount for URL");
//   //           response.end();
//   //         }

//   //         response.writeHead(200, { "Content-Type": "text/html" });
//   //         response.write(data);
//   //         response.end();
//   //       });
//   //     }
//   //   }

//   //   JSONObject JsonObj = new JSONObject();
//   for (var i = 0; i < data.length; i++) {
//     // if (JsonObj.has(data[i].url)) {

//     if (request.url === data[i].url) {
//       fs.readFile(data[i].path, (err, data) => {
//         if (err) {
//           response.writeHead(404, { "Content-Type": "text/html" });
//           response.write("File not found");
//           response.end();
//         }

//         response.writeHead(200, { "Content-Type": "text/html" });
//         response.write(data);
//         response.end();
//       });
//     }
//     // } else {
//     //   response.writeHead(404, { "Content-Type": "text/html" });
//     //   response.write("URL not found");
//     //   response.end();
//     // }
//   }
// });

var http = require("http");
//var fs = require("fs");
var web = require("./webExports");
var Server = http.createServer((request, response) => {
  var url = request.url;
  var data = web.search(url);

  if (data === "") {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("File not found");
    response.end();
  }

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(data);
  response.end();
});

Server.listen(4060);
console.log("Server up on 4060");
