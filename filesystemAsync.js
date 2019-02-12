var fs = require('fs');

//write file using async call 
fs.writeFile("./myAsyncFile.txt", "Async File data", (err) => {
    if(err){
        console.log(err.message);
        return;
    }
    console.log("file written successfully");

    fs.readFile("./myAsyncFile.txt", (err, data) => {
        if(err){
            console.log(err.message);
            return;
        }
        console.log(data.toString());
    });
});

console.log("Done");

fs.mkdir("./mkdir/",(err) => {
    if(err){
        console.log(err.message);
        
    }

    fs.appendFile("./mkdir/myAsyncFile.txt","File appended", (err) => {
        if(err){
            console.log(err.message);
            return;
        }
        
    });
})