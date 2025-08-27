var model=require('../model/bikecenter')
 



module.exports.addbikecenter =async(req,res)=>{
    try {

        let{Center,district}=req.body;


        if(!Center||!district){
            return res.send({
                result: false,
                message: "insufficent parameter"
            });
        }
        let addbike=await model.AddBikeCenterQuery(Center,district);
         if (addbike.affectedRows > 0) {
            return res.send({
                result: true,
                message: "Bike center added successfully"
            });
        } else {
            return res.send({
                result: false,
                message: "Failed to add bike center"
            });
        }

        
    } catch (error) {
       
        console.log(error);
        return res.send({
            result: false,
            message: "Internal server error",
            data: error.message
        })
    }

}
module.exports.listcenter =async(req,res)=>{
    try{
        let{bc_id} = req.body;

       var condition=""
       if(bc_id){
        condition=`where bc_id='${bc_id}'`
       }


     let listcenter = await model.listcenterQuery(condition);
           if (listcenter.length > 0) {
               return res.send({
                   result: true,
                   message: "data retrieved",
                   list:  listcenter

   
   
               });
   
           } else {
               return res.send({
                   result: false,
                   messsage: "data not found",
               });
           }
   
   
       } 
       catch (error) {
           return res.send({
               result: false,
               message: error.message,
           });
   
       }
    }
    module.exports.deletecenter=async(req,res)=>{
        try {
            let bc_id=req.body.bc_id;

            if(bc_id){
                let checkcenter=await model.checkcenterQuery(bc_id);
                if(checkcenter.length==0){
                    return res.send({
                        result:false,
                        message:"Center details not found"
                    })
                }else{
                    var deletesection=await model.removecenterQuery(bc_id);
                    if(deletesection.affectedRows>0)
                        return res.send({
                    result:true,
                    message:"center list deleted successfully"
                })
                }


                }
            
            
        } catch (error) {
            return res.send({
                result:false,
                message:error.message,

            })
            
        }
        
    }
    module.exports.editcenter = async (req, res) => {
    try {
        let { bc_id, Center, district } = req.body;

        // Check required parameters
        if (!bc_id || !Center || !district) {
            return res.send({
                result: false,
                message: "Insufficient parameters"
            });
        }

        // Check if center exists
        let checkcenter = await model.checkcenterQuery(bc_id);
        if (checkcenter.length === 0) {
            return res.send({
                result: false,
                message: "Center details not found"
            });
        }

        // Update center
        let updatecenter = await model.updatecenterQuery(bc_id, Center, district);
        if (updatecenter.affectedRows > 0) {
            return res.send({
                result: true,
                message: "Center updated successfully"
            });
        } else {
            return res.send({
                result: false,
                message: "Failed to update center"
            });
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        });
    }
};
