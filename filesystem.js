//Create a file and add data in it

//Load fs module
var fs = require('fs');

//write file as Sync call 
fs.writeFileSync("./myfile.txt","Text file for node fs");
console.log("file is wrtten");


//Read file with sync call

var data = fs.readFileSync("./myfile.txt");
console.log(data.toString())