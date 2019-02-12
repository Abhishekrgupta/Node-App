var util = require("./utilityModule");
var math = require("./moduleMath");

var str = "AVDDcds";

console.log(
  `${str} to Upper---${util.caseUtility(
    str,
    "U"
  )}  to Lower---${util.caseUtility(str, "L")} Reverse---${util.reverseCase(
    str
  )} for string`
);

console.log(math.add(1, 2));
