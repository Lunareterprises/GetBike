var model= require('../model/booking');
var util =require('../util/notification');
var moment=require("moment");

module.exports.bookings=async(req,res)=>{
    try{
        var { user_id, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time } = req.body;
        if(!user_id||!bike_id||!pickup_location||!pickup_date||!pickup_time||!drop_location||!drop_date||!drop_time){

        
       
        return res.send({
            result:false,
            message:"insufficent parameter"
        })
    }
       
    
const booking= await model.checkbooking(user_id, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time);

console.log("booking");




if(booking.affectedRows >0){

    await notify.createnotification(  user_id,
                "user",
                "Booking",
                "Booking confirmed successfully",
                "unread");
    return res.send({
        result:true,
        message:'booking conformed and notification added',

    })
}
else{
   return res.send({
    result:false,
    message:" booking not conformed"
   }) 
}

    }catch(error){
       
        return res.send({
            result:false,
            message:error.message
        })
    }
}
   
