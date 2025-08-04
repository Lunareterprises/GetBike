const { error } = require('console');
var model = require('../model/documents')
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");
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
            let {adhar,license}=fields;
            if (!files.adhar || !files.license) {
                 return res.send({
                    result: false,
                    message: "Insufficient parameter",
                });
            }  if (!files.adhar || !files.license) {
                return res.send({
                    result: false,
                    message: "Insufficient parameter"
                });
            }
            console.log(adhar,license);

            // ✅ Handle Aadhar Upload
            if (files.adhar) {
                const oldPath = files.adhar.filepath;
                const fileName = files.adhar.originalFilename;
                const newPath = path.join(process.cwd(), "uploads", "adharcard", fileName);

                try {
                    const rawData = fs.readFileSync(oldPath);
                    fs.writeFileSync(newPath, rawData);

                    const adharPath = "uploads/adharcard/" + fileName;
                    await model.AddadharQuery(adharPath);
                } catch (error) {
                    console.log( error);
                    return res.send({
                        result: false,
                        message: "Failed to save Aadhar file.",
                        data: err
                    });
                }
            }

            // ✅ Handle License Upload
            if (files.license) {
                const oldPath = files.license.filepath;
                const fileName = files.license.originalFilename;
                const newPath = path.join(process.cwd(), "uploads", "licensecard", fileName);

                try {
                    const rawData = fs.readFileSync(oldPath);
                    fs.writeFileSync(newPath, rawData);

                    const licensePath = "uploads/licensecard/" + fileName;
                    await model.AddlicenseQuery(licensePath);
                } catch (err) {
                    console.log(error);
                    return res.send({
                        result: false,
                        message: "Failed to save License file.",
                        data: err
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


        
 