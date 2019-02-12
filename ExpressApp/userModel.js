var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/ProductsAppDb",
{useNewUrlParser: true}
);
// get the connection object
var dbConnect = mongoose.connection;
if(!dbConnect){
    console.log("connection not established");
    return;
}
var UsersSchema = mongoose.Schema({
    UserId : String,
    Password: String
});
var userModel = mongoose.model("Users", UsersSchema ,"Users" );
module.exports = {
    register: function(user,resp){
        userModel.create(user, (err, res) => {
            if(err){
                resp.statusCode= 500;
                resp.send({
                    status: resp.statusCode, 
                    error: err
                });
            }
            resp.send({status:200, data: res});
            console.log("User data entered in DB");
            
        });
    },

    validateUser:  function(userid,pwd,done){
        
        console.log("--->"+JSON.stringify(userid));
        console.log("--->"+JSON.stringify(pwd));
       userModel.findOne({
            $and: [
                   { UserId : userid },
                   { Password: pwd }
                 ]
          }
          ,function(err ,res) {
              if(res){
                  console.log(">>>>>>>");
                  
               return done(true);
              }
                  return done(false);
          }
          );
          //console.log("--->"+JSON.stringify(data));
        //   if(data == null){
        //       return false;
        //   }else{
        //       return true;
        //   }
        //   console.log("--->"+JSON.stringify(valid));
          
    },

    userModel
}