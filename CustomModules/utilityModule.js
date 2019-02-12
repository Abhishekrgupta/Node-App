exports.caseUtility = function(str, choice) {
  if (choice == "L") {
    return str.toLowerCase();
  }
  if (choice == "U") {
    return str.toUpperCase();
  }
  return str;
};

exports.reverseCase = function(str) {
  var res = "";
  for (var i = str.length - 1; i > 0; i--) {
    res += str[i];
  }
  return res;
};
