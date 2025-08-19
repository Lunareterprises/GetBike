var db=require('../config/db');
var util=require("util");

const query =util.promisify(db.query).bind(db);

module.exports.SelectImage=async()=>{
    var Query=  `SELECT 
            b_id, b_name, b_ratings, b_description, b_price, b_location, 
            b_extras, b_milage, b_geartype, b_fueltype, b_bhp, distance, max_speed, b_image
        FROM bikes
        ORDER BY b_id DESC
    `;
    var data= await query(Query);
    return data;

}
module.exports.AddImagesQuery=async(name, ratings, description, rate,location,extras,milage,geartype,fueltype,bhp ,distance, max_speed,imagePath)=>{
    var Query=`insert into bikes(b_name,b_ratings,b_description,b_price,b_location,b_extras,b_milage,b_geartype,b_fueltype,b_bhp,distance,max_speed,b_image) values(?,?,?,?,?,?,?,?,?,?,?,?,?);`
    var data= await query(Query,[name, ratings, description, rate,location,extras,milage,geartype,fueltype,bhp ,distance, max_speed,imagePath]);
    return data;

}
module.exports.AddBikeimageQuery=async(bike_id, imagePath)=>{
    var Query= `INSERT INTO bike_images(bike_id, image_path) VALUES (?, ?)`;
    var data=await query(Query, [bike_id, imagePath]);
    return data;
}



module.exports.listbikeQuery =async(condition)=>{
    var Query =`SELECT * FROM  bikes ${condition}`;
    var data =query(Query);
    return data;
}

module.exports.getbikeReview =async(bike_id)=>{
    var Query =`SELECT * FROM  bike_reviews where br_bike_id =?`;
    var data =query(Query,[bike_id]);
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
  module.exports.DeleteBikeImages = async (b_id) => {
    var Query= `DELETE FROM bike_images WHERE bike_id = ?`;
    var data=await query(Query, [b_id]);
    return data;
  }
    

  module.exports.UpdateBikesImage=async (imagePath, b_id) => {
    var Query= ` update bikes set b_image=? where b_id = ?`;
    var data=await query(Query,[imagePath, b_id]);
    return data;
  }


  
