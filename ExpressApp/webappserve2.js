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
//using token for Auth
var jwt = require("jsonwebtoken");
//set the global promise to match the async call made by app using mongoose driver
mongoose.Promise = global.Promise;
var cors = require("cors");

//2. Define instance of express
var app_instance = express();

//3.Configure all middlewares, call use() on express instance
//Middleware for static files
app_instance.use(
  express.static(path.join(__dirname, "./../node_modules/jquery/dist/"))
);

//3.b Define express Routers for segregating urls and html web pages request and rest api request

var router = express.Router();
// 3.c Add the router object in express middleware
app_instance.use(router);

// 3d configure the body parser
//1.use url encoded as false to read the datafrom http url as querystring, form model etc
app_instance.use(bodyParser.urlencoded({ extended: false }));
//2 use the json() parser for body parser
app_instance.use(bodyParser.json());
app_instance.use(cors());
//4.Create Web request handlers
//This will return the home.html from views folder
router.get("/home", (request, response) => {
  response.sendFile("home.html", {
    root: path.join(__dirname, "./../Views")
  });
});

// model schema mapping with collection on mongoDB and establishing collection with it.
mongoose.connect("mongodb://localhost/ProductsAppDb", {
  useNewUrlParser: true
});

// get the connection object
var dbConnect = mongoose.connection;
if (!dbConnect) {
  console.log("connection not established");
  return;
}

//define schema(to have same attribute as per collection)

//MAp the schema with the collection
// var productModel = mongoose.model("Products", ProductsSchema ,"Product" );
//5. Create REST API request APi handlers

app_instance.post("/api/users", (request, response) => {
  var user = {
    UserId: request.body.UserId,
    Password: request.body.Password
  };
  UserModel.userModel.findOne({ UserId: request.body.UserId }, (err, usr) => {
    if (err) {
      console.log("Some error Occered");
      throw error;
    }
    if (usr) {
      response.send({
        statusCode: 404,
        message: "User already exist"
      });
    } else if (!usr) {
      // console.log("In Else if User " + JSON.stringify(usr));
      UserModel.register(user, response);
    }
  });
});

app_instance.get("/api/users", (request, response) => {
  UserModel.userModel.find().exec((err, res) => {
    if (err) {
      response.statusCode = 500;
      response.send({
        status: response.statusCode,
        error: err
      });
    }
    response.send({ status: 200, data: res });
  });
});

var jwtSetting = {
  jwtSecret: "dbcsbiobc0708hdfcyesbombob"
};

app_instance.set("jwtSecret", jwtSetting.jwtSecret);

var tokenStore = "";

app_instance.post("/api/users/auth", (request, response) => {
  var user = {
    UserId: request.body.UserId,
    Password: request.body.Password
  };

  console.log("In Auth Usser" + JSON.stringify(user));

  UserModel.userModel.findOne({ UserId: request.body.UserId }, (err, usr) => {
    if (err) {
      console.log("Some error Occered");
      throw error;
    }

    if (!usr) {
      response.send({
        statusCode: 404,
        data: {
          authenticated: false,
          message: "User not found"
        }
      });
    } else if (usr) {
      console.log("In Else if User" + JSON.stringify(usr));
      if (usr.Password != user.Password) {
        response.send({
          statusCode: 404,
          data: {
            authenticated: false,
            message: "User and Password not Match"
          }
        });
      } else {
        console.log("Done " + JSON.stringify(usr));

        var token = jwt.sign({ usr }, app_instance.get("jwtSecret"), {
          expiresIn: 3600
        });
        tokenStore = token;
        response.send({
          status: 200,
          data: {
            authenticated: true,
            message: "Login Successful!!",
            token: token
          }
        });
      }
    }
  });
});

app_instance.get("/api/products", (request, response) => {
  // var tokenReceived = request.headers.authorization.split(" ")[1];
  // jwt.verify(tokenReceived, app_instance.get("jwtSecret"), (err, decoded) => {
  //   console.log("in verify");
  //   if (err) {
  //     response.send({
  //       success: false,
  //       message: "Token Identity failed"
  //     });
  //   } else {
  //     console.log("In Auth Success");
  //     request.decoded = decoded;
  productModel.find().exec((err, res) => {
    if (err) {
      response.statusCode = 500;
      response.send({
        status: response.statusCode,
        error: err
      });
    }
    response.send({ status: 200, data: res });
  });
  //   }
  // });
});

app_instance.post("/api/products", (request, response) => {
  // var data = request.body; // read the request body
  // console.log(data);
  // var resData = dataModel.addData(data);
  // response.send(JSON.stringify(resData));

  var prod = {
    Product_id: request.body.Product_id,
    ProductName: request.body.ProductName,
    CategoryName: request.body.CategoryName,
    Manufacturer: request.body.Manufacturer,
    Price: request.body.Price
  };

  // var tokenReceived = request.headers.authorization.split(" ")[1];
  // jwt.verify(tokenReceived, app_instance.get("jwtSecret"), (err, decoded) => {
  //   console.log("in verify");
  //   if (err) {
  //     response.send({
  //       success: false,
  //       message: "Token Identity failed"
  //     });
  //   } else {
  //     console.log("In Auth Success");
  //     request.decoded = decoded;
  // productModel.find().exec((err, res) => {
  //   if (err) {
  //     response.statusCode = 500;
  //     response.send({
  //       status: response.statusCode,
  //       error: err
  //     });
  //   }
  //   response.send({ status: 200, data: res });
  // });
  productModel.create(prod, (err, res) => {
    if (err) {
      response.statusCode = 500;
      response.send({
        status: response.statusCode,
        error: err
      });
    }
    response.send({ status: 200, data: res });
  });
  //   }
  // });
});

app_instance.get("/api/products/:id", (request, response) => {
  var id = request.params.id; // read the request params
  var tokenReceived = request.headers.authorization.split(" ")[1];
  jwt.verify(tokenReceived, app_instance.get("jwtSecret"), (err, decoded) => {
    console.log("in verify");
    if (err) {
      response.send({
        success: false,
        message: "Token Identity failed"
      });
    } else {
      console.log("In Auth Success");
      request.decoded = decoded;
      // productModel.find().exec((err, res) => {
      //     if(err){
      //         response.statusCode= 500;
      //         response.send({
      //             status: response.statusCode,
      //             error: err
      //         })
      //     }
      //     response.send({status:200, data: res});
      // });
      productModel.findById({ Product_id: id }).exec((err, res) => {
        if (err) {
          response.statusCode = 500;
          response.send({
            status: response.statusCode,
            error: err
          });
        }
        response.send({ status: 200, data: res });
      });
    }
  });

  // console.log("ID : " + id);
  // var record = dataModel.getData().filter(function(v,idx){
  //     return v.id == id;
  // });
  // response.send(JSON.stringify(record));
});

app_instance.delete("/api/products/:id", (request, response) => {
  // var id = request.params.id; // read the request params
  // console.log("ID : " + id);
  // var record = dataModel.deleteData(id);
  // response.send(JSON.stringify(record));
  var id = request.params.id; // read the request params
  // var tokenReceived = request.headers.authorization.split(" ")[1];
  // jwt.verify(tokenReceived, app_instance.get("jwtSecret"), (err, decoded) => {
  //   console.log("in verify");
  //   if (err) {
  //     response.send({
  //       success: false,
  //       message: "Token Identity failed"
  //     });
  //   } else {
  //     console.log("In Auth Success");
  //     request.decoded = decoded;
  // productModel.find().exec((err, res) => {
  //     if(err){
  //         response.statusCode= 500;
  //         response.send({
  //             status: response.statusCode,
  //             error: err
  //         })
  //     }
  //     response.send({status:200, data: res});
  // });
  productModel.remove({ Product_id: id }).exec((err, res) => {
    if (err) {
      response.statusCode = 500;
      response.send({
        status: response.statusCode,
        error: err
      });
    }
    response.send({ status: 200, data: res });
  });
  //   }
  // });
});

app_instance.put("/api/products/:id", (request, response) => {
  // read the request params
  // console.log("ID : " + id);
  // prd = request.body;
  // console.log("body : " + prd);
  // var record = dataModel.updateData(id, prd);
  // response.send(JSON.stringify(record));

  // var tokenReceived = request.headers.authorization.split(" ")[1];
  // jwt.verify(tokenReceived, app_instance.get("jwtSecret"), (err, decoded) => {
  // console.log("in verify");
  // if(err){
  //     response.send({
  //         success: false,
  //         message: "Token Identity failed"
  //     });
  // }else{
  //     console.log("In Auth Success");
  //     request.decoded = decoded;
  //     productModel.find().exec((err, res) => {
  //         if(err){
  //             response.statusCode= 500;
  //             response.send({
  //                 status: response.statusCode,
  //                 error: err
  //             })
  //         }
  //         response.send({status:200, data: res});
  //     });
  // }
  // if (err) {
  //   response.send({
  //     success: false,
  //     Message: "Token verification failed"
  //   });
  // } else {
  var prod = {
    Product_id: request.body.Product_id,
    ProductName: request.body.ProductName,
    CategoryName: request.body.CategoryName,
    Manufacturer: request.body.Manufacturer,
    Price: request.body.Price
  };
  //tid = parseInt(request.params.id);
  var condition = {
    Product_id: request.params.id
  };
  // console.log(condition);
  // console.log(JSON.stringify(prod));
  // request.decoded = decoded;
  productModel.updateOne(condition, prod, function(err, res) {
    if (err) {
      respose.status = 500;
      response.send({ status: respose.status, error: err });
    }
    console.log(JSON.stringify(res));
    response.send({ status: 200, Message: "Product Updated Successfully" });
  });
  //   }
  // });
});
//6. start listening

app_instance.listen(4070, () => {
  console.log("Start listing on 4070");
});
