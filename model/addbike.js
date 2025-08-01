var db=require('../config/db');
var util=require("util");
const query =util.promisify(db.query).bind(db);

module.exports.SelectImage=async()=>{
    var Query=`select  * from bikes;`
    var data=query(Query);
    return data;

}
module.exports.addbikeaddQuery=async(name,ratings,review,description,rate,imagepath)=>{
    var Query=`insert into bikes(b_name,b_ratings,b_reviews,b_description,b_price,b_image) values(?,?,?,?,?,?);`
    var data=query(Query,[name,ratings,review,description,rate,imagepath]);
    return data;

}
module.exports.listbikeQuery =async(condition)=>{
    var Query =`SELECT * FROM  bikes ${condition}`;
    var data =query(Query);
    return data;
}
module.exports.RemoveBikesQuery =async(b_id)=>{
    var Query =`delete from bikes where b_id=?`;
    var data = await query(Query,[b_id]);
    return data;
}
module.exports.checkbikesQuery =async(b_id)=>{
    var Query =`select * from bikes where b_id =?`;
    var data=await query(Query,[b_id]);
    return data;

}
module.exports.UpdateBikesDetails=async (updateQuery,b_id) => {
    var Query= ` update bikes ${updateQuery} where b_id = ?`;
    var data=await query(Query,[b_id]);
    return data;
  }

  module.exports.UpdateBikesImage=async (imagePath, b_id) => {
    var Query= ` update bikes set b_image=? where b_id = ?`;
    var data=await query(Query,[imagePath, b_id]);
    return data;
  }


  
