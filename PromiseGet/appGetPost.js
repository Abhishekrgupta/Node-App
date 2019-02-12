//1.
var http = require("http");

var emp = [];

//2.
var extServerOptions = {
  host: "apiapptrainingservice.azurewebsites.net",
  path: "/api/Products",
  method: "GET"
};
//3.
function get() {
  http
    .request(extServerOptions, function(res) {
      res.setEncoding("utf8");
      res.on("data", function(data) {
        emp = JSON.parse(data);
        // emp.foreach(function(e) {

        // });
        console.log(emp);
      });
    })
    .end();
}

// get();

console.log("Doing the Post Operations....");
//4
var employee = JSON.stringify({
    "BasePrice": 12356,
    "CategoryName": "MIT",
    "Description": "SNS",
    "Manufacturer": "MITT",
    "ProductId": "1212",
    "ProductName": "ABC"
});

//5
var extServerOptionsPost = {
    host: "apiapptrainingservice.azurewebsites.net",
    path: "/api/Products",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": employee.length
  }
};

//6
var reqPost = http.request(extServerOptionsPost, function(res) {
  console.log("response statusCode: ", res.statusCode);
  res.on("data", function(data) {
    console.log("Posting Result:\n");
    process.stdout.write(data);
    console.log("\n\nPOST Operation Completed");
  });
});

// 7
reqPost.write(employee);
reqPost.end();
reqPost.on("error", function(e) {
  console.error(e);
});

get();
