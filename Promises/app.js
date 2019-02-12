//1.
var http = require("http");
var fs = require("fs");
var employee = [{
  "BasePrice": "",
  "CategoryName": "",
  "Description": "",
  "Manufacturer": "",
  "ProductId": "",
  "ProductName": ""
}];
//2. D:/MERN-MEAN-training/Session-2/node-apps/Promises/page.html
fs.readFile(
  "D:/MERN-MEAN-training/Session-2/node-apps/Promises/page.html",
  (err, productPage) => {
    if (err) {
      console.log(err);
    }
    //3.
    var server = http.createServer(function(req, resp) {
      //4.
      if (req.method === "GET") {
        resp.writeHead(200, { "content-type": "text/html" });
        resp.end(productPage);
      }
      //5.
      if (req.method === "POST") {
        var productData = "";
        //6.
        req
          .on("data", function(prd) {
            productData += prd;
          })
          .on("end", function() {
            console.log("--->" + productData.toString());
           // resp.end("Data received  from you is " + productData.toString());
            // employee.BasePrice = productData.BasePrice;
            // employee.CategoryName = productData.CategoryName;
            // employee.Description = productData.Description;
            // employee.Manufacturer = productData.Manufacturer;
            // employee.ProductId = productData.ProductId;
            // employee.ProductName = productData.ProductName;
            // console.log("--->The received data Emp " + employee);
            // res.end("Data given")
            // var str = productData.toString();
            // var str1 = str.split("&").toString();
            // console.log(str1);
            // var str2 = str1.split("=");
            // console.log(str2);
            // for(let i of str2){
            //   console.log(i);
              
            // }

            var arr = productData.toString();
            arr = arr.map(function (val) { 
              console.log('The val= '+val);
              var arr1 = val.split("=");
              arr1 = arr1.map(function (val1) { 
                  console.log('The val inner= '+val1);
                  
                  return val1; 
              });
              return val; });
              resp.end("Data received  from you is " + val1);
          });
      }
      // return employee;
    });
    
    server.listen(5050);
    console.log("Server started on  5050");
  }
  
);
