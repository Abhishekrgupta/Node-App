var Products = [
{id: 101, name : "p1"},
{id: 102, name : "p2"},
{id: 103, name : "p3"},
{id: 104, name : "p4"}
];

module.exports={
getData: function(){
return Products;
},
addData: function(prd){
    Products.push(prd);
    return Products;
},
deleteData: function(id){
    for(let i=0; i<=Products.length; i++){
        if(Products[i].id == id){
            Products.splice(i,1);
            break;
        }
    }
    return Products;
},

updateData: function(id, prd){
    for(let i=0; i<=Products.length; i++){
        if(Products[i].id == id){
            Products[i] = prd;
            break;
        }
    }
    return Products;
}

};