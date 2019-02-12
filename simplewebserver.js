var http = require("http");
var fs = require("fs");
var data = [
  {
    EmpNo: 101,
    EmpName: "ABC"
  },
  {
    EmpNo: 102,
    EmpName: "CDS"
  },
  {
    EmpNo: 103,
    EmpName: "CDCDF"
  }
];
var server = http.createServer(function(request, response) {
  // response.writeHead(200,{'Content-Type':' text/html'});
  // response.write('hello ');
  // response.writeHead(200,{'Content-Type':' application/json'});
  // response.write(JSON.stringify(data));
  // response.end();
  fs.readFile("./home.html", (err, data) => {
    if (err) {
      response.writeHead(404, { "Content-Type": " text/html" });
      response.write("error");
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": " text/html" });
      response.write(data.toString());
      response.end();
    }
  });
});

server.listen(4050);
console.log("Server up on 4050");
