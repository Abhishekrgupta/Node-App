//1. Load express 
var express = require("express");
    //Load the path module ,this will be used by static middleware of express. The path is standard node module.
var path = require("path");
    //Import the datamodule
    var dataModel = require("./datamodel");
    var productModel = require("./ProductModel");
    var UserModel = require("./userModel");
    //load body parser
 var bodyParser = require("body-parser");

 //loading mongoose driver
 var mongoose = require("mongoose");
 //set the global promise to match the async call made by app using mongoose driver
 mongoose.Promise = global.Promise;


//2. Define instance of express
var app_instance = express();

//3.Configure all middlewares, call use() on express instance
    //Middleware for static files
app_instance.use(express.static(path.join(__dirname , "./../node_modules/jquery/dist/")));

//3.b Define express Routers for segregating urls and html web pages request and rest api request

var router = express.Router();
// 3.c Add the router object in express middleware
app_instance.use(router);

// 3d configure the body parser
    //1.use url encoded as false to read the datafrom http url as querystring, form model etc
app_instance.use(bodyParser.urlencoded({extended: false}));
    //2 use the json() parser for body parser
    app_instance.use(bodyParser.json());
//4.Create Web request handlers
    //This will return the home.html from views folder
router.get("/home", (request, response) => {
    response.sendFile("home.html",{
        root: path.join(__dirname, "./../Views")
    });
});

// model schema mapping with collection on mongoDB and establishing collection with it.
mongoose.connect("mongodb://localhost/ProductsAppDb",
{useNewUrlParser: true}
);

// get the connection object
var dbConnect = mongoose.connection;
if(!dbConnect){
    console.log("connection not established");
    return;
}

//define schema(to have same attribute as per collection)


//MAp the schema with the collection
// var productModel = mongoose.model("Products", ProductsSchema ,"Product" );
//5. Create REST API request APi handlers
var check="";
app_instance.get("/api/products", (request,response)=>{

    var authValues = request.headers.authorization;
    var credentials = authValues.split(" ")[1];
    // console.log(credentials);
    var data = credentials.split(":");
    var username = data[0];
    // console.log(username);    
    var password = data[1];
    // console.log(password);
    
    // if (username == "abhishek" && password == "abhi"){
    // response.send(JSON.stringify(dataModel.getData()));
    // }else{
    //     response.statusCode = 401;
    //     response.send({
    //         status: response.statusCode,
    //         message:"Unauthorized access"
    //     })
    // }
    
    UserModel.validateUser(username,password,function(res){
        console.log('check  ' + res);
        if(res){
            productModel.find().exec((err, res) => {
                if(err){
                    response.statusCode= 500;
                    response.send({
                        status: response.statusCode, 
                        error: err
                    })
                }
                response.send({status:200, data: res});
            });
        }else{
            console.log("User not valid");
        }
    });
    console.log("++++" + check);
    // console.log("++" + validate);

});

app_instance.post("/api/products", (request,response)=>{
    // var data = request.body; // read the request body
    // console.log(data);
    // var resData = dataModel.addData(data);
    // response.send(JSON.stringify(resData));

    var prod ={
        Product_id: request.body.Product_id,
        ProductName: request.body.ProductName,
        CategoryName: request.body.CategoryName,
        Manufacturer: request.body.Manufacturer,
        Price: request.body.Price
    };

    productModel.create(prod, (err, res) => {
        if(err){
            response.statusCode= 500;
            response.send({
                status: response.statusCode, 
                error: err
            })
        }
        response.send({status:200, data: res});

    });
});


app_instance.post("/api/users", (request,response)=>{
    var user ={
        UserId: request.body.UserId,
        Password: request.body.Password
    };
    UserModel.register(user, response);
    
});

app_instance.get("/api/products/:id", (request,response)=>{
    var id = request.params.id; // read the request params

    productModel.findById({"Product_id":id}).exec((err, res) => {
        if(err){
            response.statusCode= 500;
            response.send({
                status: response.statusCode, 
                error: err
            })
        }
        response.send({status:200, data: res});
    })
    // console.log("ID : " + id);
    // var record = dataModel.getData().filter(function(v,idx){
    //     return v.id == id;
    // });
    // response.send(JSON.stringify(record));
});

app_instance.delete("/api/products/:id", (request,response)=>{
    var id = request.params.id; // read the request params
    console.log("ID : " + id);
    var record = dataModel.deleteData(id);
    response.send(JSON.stringify(record));
});

app_instance.put("/api/products/:id", (request,response)=>{
    var id = request.params.id; // read the request params
    console.log("ID : " + id);
    prd = request.body;
    console.log("body : " + prd);
    var record = dataModel.updateData(id, prd);
    response.send(JSON.stringify(record));
});
//6. start listening

app_instance.listen(4070, () => {
console.log("Start listing on 4070");

});