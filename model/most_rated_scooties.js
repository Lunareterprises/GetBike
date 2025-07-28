var db=require('../config/db');
var util=require("util");
const query=util.promisify(db.query).bind(db);




 module.exports.AddimageQuery=async(title,imagepath)=>{
    var Query=`insert into most_rated_scooties(m_name,m_image)values(?,?);`
    var data=query(Query,[title,imagepath]);
    return data;
 }
 module.exports.listmostratedscootiesQuery=async(condition)=>{
   var Query =`select * from most_rated_scooties  ${condition}`;
    var data= query(Query);
    return data;
 }