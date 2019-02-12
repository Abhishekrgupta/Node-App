console.log("Node.js");

var Employee = {
  EmpNo: 101,
  EmpName: "ABC"
};
add(2, 3);
console.log(JSON.stringify(Employee));

function add(x, y) {
  var res = parseInt(x) + parseInt(y);

  console.log(res);
}
