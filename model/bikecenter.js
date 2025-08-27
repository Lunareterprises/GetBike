var db= require('../config/db')
var util = require("util");
const query = util.promisify(db.query).bind(db);


module.exports.AddBikeCenterQuery = async (center, district) => {
    
        var Query = `INSERT INTO bike_centers (center_name, b_district) VALUES (?, ?)`;
        var data = await query(Query, [center, district]);
        return data;
}
module.exports.listcenterQuery=async(condition)=>{
    var Query=`select * from bike_centers ${condition}`;
    var data=await query(Query,[condition]);
    return data;
}
module.exports.checkcenterQuery=async(bc_id)=>{
    var Query= `select * from bike_centers where bc_id=?`;
    var data= await query(Query,[bc_id]);
    return data;
}
module.exports.removecenterQuery=async(bc_id)=>{
    var Query=`delete from bike_centers where bc_id=?`;
    var data= await query(Query,[bc_id])
    return data;
}
module.exports.updatecenterQuery = async (bc_id, center, district) => {
    var Query = `UPDATE bike_centers 
                 SET center_name = ?, b_district = ? 
                 WHERE bc_id = ?`;
    var data = await query(Query, [center, district, bc_id]);
    return data;
};
