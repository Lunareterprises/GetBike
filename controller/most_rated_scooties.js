// var model = require("../model/most_rated_scooties.js");
// const path = require('path');
// var fs = require("fs");
// var formidable = require("formidable");

// module.exports.addmostratedscooties = async (req, res) => {
//     try {
//         var form= new formidable.IncomingForm({ multiples: true });
//         form.parse(req, async function (err, fields, files) {
//             if (err) {
//                 return res.send({
//                     result: false,
//                     message: "file upload failed!",
//                     data: err,
//                 })
//             }
//             let {title} =fields
//             if(!title){
//                 return res.send({
//                     result:false,
//                     message:"title is required",
//                 })

//             }
//             if(files.image){
//                 var oldPath=files.image.filepath;
//                 var newPath=files.image.filepath;
//                 var newPath=
//                 process.cwd() +"/uploads/most_rated_scooties"+
//                 files.image.orginalfilename;
//                                 let rawData = fs.readFileSync(oldPath);
//                 fs.writeFile(newPath, rawData, async function (err) {
//                     if (err) console.log(err);
//                     let imagepath = "uploads/most_rated_scooties/" + files.image.originalFilename;

//                 await model.AddimageQuery(title,imagepath);

//             })
//              return res.send({
//                     result: true,
//                     message: "image added successfully"
//                 })

//             }
//             else{
                
//                 return res.send({
//                     result: false,
//                     message: "image required "
//                 })
//             }
//         })


                

//             } catch (error) {
//                 console.log(error);
//                 return res.send({
//                     result: false,
//                     message: error.message,

//                 })

//             }
//         }


//     module.exports.listmostratedscooties=async(req,res)=>{
//         try {
//             let{m_id}=req.body || {}
//             var condition =''
//             if(m_id){
//                 condition = `where m_id ='${m_id}'` 
//             }
//             let listmostratedscooties= await model.listmostratedscootiesQuery(condition);

//             if(listmostratedscooties.length >0){
//                  return res.send({
//                 result: true,
//                 message: "data retrieved",
//                 list:listmostratedscooties
//                  })

//             }else{
//                  return res.send({
//                 result: false,
//                 messsage: "data not found",
//             });
//         }

            
            
//         } catch (error) {
//             return res.send({
//                 result:false,
//                 message:error.message,
//             })
            
//         }
//     }
//     module.exports.deletemostratedscooties=async(req,res)=>{
//         try{
//             let m_id=req.body.
//         }
//     }
      