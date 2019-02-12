var fs = require("fs");
var data = [
  {
    url: "/",
    path: "./index.html"
  },
  {
    url: "/home",
    path: "./home.html"
  },
  {
    url: "/about",
    path: "./about.html"
  },
  {
    url: "/project",
    path: "./project.html"
  },
  {
    url: "/profile",
    path: "./profile.html"
  }
];

var search = function(requrl) {
  var res = "";
  for (var i = 0; i < data.length; i++) {
    if (requrl === data[i].url) {
      this.res = fs.readFileSync(data[i].path, err => {
        if (err) {
          console.log("Error");
        }
      });
    }
  }
  return this.res;
};

module.exports = {
  search
};
