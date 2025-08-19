const { error } = require('console');
var model = require('../model/documents')
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");
function ensureDirExist(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}


module.exports.documents = async (req, res) => {
    try {
         var form = new formidable.IncomingForm({ multiplies: true })
        form.parse(req, async function (err, fields, files) {
            if (err) {
                return res.send({
                    result: false,
                    message: "file upload failed!",
                    data: err,

                });
            }
            let{u_id}=fields;

            if(!u_id){
                 return res.send({
                    result: false,
                    message: "User ID is required.",
                });
            }
            
            if (!files.adhar || !files.license) {
                return res.send({
                    result: false,
                    message: "Insufficient parameter"
                });
            }
            console.log(u_id);

            // ✅ Handle Aadhar Upload
            if (files.adhar) {
                const oldPath = files.adhar.filepath;
                const fileName = files.adhar.originalFilename;
                const saveDir = path.join(process.cwd(), "uploads", "adharcard");
                 ensureDirExist(saveDir);
                 const newPath = path.join(saveDir, fileName);

                try {
                   
                    const rawData = fs.readFileSync(oldPath);
                    fs.writeFileSync(newPath, rawData);

                    const adharPath = "uploads/adharcard/" + fileName;
                    await model.AddadharQuery(adharPath,u_id);
                } catch (error) {
                    console.log( error);
                    return res.send({
                        result: false,
                        message: "Failed to save Aadhar file.",
                        data: error
                    });
                }
            }

            // ✅ Handle License Upload
            if (files.license) {
                const oldPath = files.license.filepath;
                const fileName = files.license.originalFilename;
                const saveDir = path.join(process.cwd(), "uploads", "licensecard");
                ensureDirExist(saveDir);
                const newPath = path.join(saveDir, fileName);


                try {
                    
                    const rawData = fs.readFileSync(oldPath);
                    fs.writeFileSync(newPath, rawData);

                    const licensePath = "uploads/licensecard/" + fileName;
                    await model.AddlicenseQuery(licensePath,u_id);
                } catch (error) {
                    console.log(error);
                    return res.send({
                        result: false,
                        message: "Failed to save License file.",
                        data: error
                       
                    });
                }
            }
            

            return res.send({
                result: true,
                message: "Documents uploaded successfully"
            });
        });
        
    } catch (error) {
        console.log(error);
        return res.send({
            result: false,
            message: error.message
        });
    }
};


        
 