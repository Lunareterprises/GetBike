var model = require('../model/addbike');
var formidable = require("formidable");
var fs = require("fs");
const path = require("path");


module.exports.addbike = async (req, res) => {

    try {
        const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.send({
                    result: false,
                    message: 'File Upload Failed!',
                    data: err,
                })
            }
            let { name, ratings, description, rate, location, extras, milage, geartype, fueltype, bhp, distance, max_speed,maintaince_status } = fields;


            if (!name || !ratings || !description || !rate || !location || !extras || !milage || !geartype || !fueltype || !bhp || !distance || !max_speed||!maintaince_status) {
                return res.send({
                    result: false,
                    message: "insufficent parameter",

                })
            }
             // 1️⃣ Insert bike details first
            const bikeResult = await model.AddBikeQuery(name, ratings, description, rate, location, extras, milage, geartype, fueltype, bhp, distance, max_speed,maintaince_status);
            const bike_id = bikeResult.insertId; // get new bike id


            
           if(files &&files.image){
               // Normalize to array: handles both single and multiple image uploads
            const imageFiles =Array.isArray(files.image)?files.image :[files.image];

            for (const file of imageFiles) {
                    if (!file || !file.filepath || !file.originalFilename) continue;

                    const oldPath = file.filepath;
                    const newPath = path.join(process.cwd(), '/uploads/bikes', file.originalFilename);

                    const rawData = fs.readFileSync(oldPath);
                    fs.writeFileSync(newPath, rawData);

                    const imagePath = "/uploads/bikes/" + file.originalFilename;

                    var insertResult = await model.AddBikeimageQuery( bike_id, imagePath);
                    // console.log(insertResult, "image insert result");
                    console.log("Insert result:", insertResult);
                }
                 
           if (insertResult.affectedRows > 0) {

                return res.status(200).json({
                    result: true,
                    message: 'bike added successfully',
                });
            } else {
                return res.status(500).json({
                    result: false,
                    message: 'Failed to add bike deatils',
                });
            }
           }
           

          
    } )

}catch (error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            message: 'Internal server error.',
            data: error.message,
        });
    }
}


module.exports.listbike = async (req, res) => {
    try {
        let { b_id ,search,most_rated} = req.body || {}
        var condition = ''
        if (b_id) {
            condition = `where b_id='${b_id}'`
        }
        if(search){
            condition=`where (b_name LIKE '%${search}%')`;
        }
        if(most_rated){
            orderby=`ORDER BY b_ratings DESC`;
        }
        let listbike = await model.listbikeQuery(condition);

        if (listbike.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: listbike
            });
        } else {
            return res.send({
                result: false,
                message: "data not found",
            });
        }
    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });


    }
}
module.exports.deleteBikes = async (req, res) => {
    try {
        let b_id = req.body.b_id;
        if (b_id) {
            let checkbikes = await model.checkbikesQuery(b_id);
            if (checkbikes.length == 0) {
                return res.send({
                    result: false,
                    message: "bikes not found"
                });
            } else {
                var deletesection = await model.RemoveBikesQuery(b_id);
                if (deletesection.affectedRows > 0) {
                    return res.send({
                        result: true,
                        message: "bikes list deleted successfully"
                    });

                }
            }
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message,

        });
    }
}
module.exports.editbikes = async (req, res) => {
    try {
        const form = new formidable.IncomingForm({ multiples: false });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.send({
                    result: false,
                    message: 'File Upload Failed!',
                    data: err,
                });
            }
            const { b_id, name, ratings, description, rate, location, extras, milage, geartype, fueltype, bhp, distance, max_speed,delete_old_images } = fields;

            if (!b_id) {
                return res.send({
                    result: false,
                    message: 'Insufficient parameters',
                });
            }
            const bikesExists = await model.checkbikesQuery(b_id);
            if (bikesExists.length === 0) {
                return res.send({
                    result: false,
                    message: ' bikes does not exist',
                });
            }

            let updates = [];

if (name) updates.push(`b_name='${name}'`);
if (ratings) updates.push(`b_ratings='${ratings}'`);
if (review) updates.push(`b_reviews='${review}'`);
if (description) updates.push(`b_description='${description}'`);
if (rate) updates.push(`b_price='${rate}'`);
if (location) updates.push(`b_location='${location}'`);
if (extras) updates.push(`b_extras='${extras}'`);
if (milage) updates.push(`b_milage='${milage}'`);
if (geartype) updates.push(`b_geartype='${geartype}'`);
if (fueltype) updates.push(`b_fueltype='${fueltype}'`);
if (bhp) updates.push(`b_bhp='${bhp}'`);
if(distance)updates.push(`distance='${distance}'`);
if(max_speed)updates.push(`max_speed='${max_speed}'`);



            if (updates.length > 0) {
                const updateQuery = `SET ${updates.join(', ')}`;
                var updateResult = await model.UpdateBikesDetails(updateQuery, b_id);
            }
             // 2️⃣ Delete old images if requested
            if (delete_old_images === 'true') {
                await model.DeleteBikeImages(b_id); 
            }

      if (files.image) {
        const oldPath = files.image.filepath;
        const fileName = files.image.originalFilename;
        const newPath = path.join(process.cwd(), '/uploads/addbike/', fileName);

        const rawData = fs.readFileSync(oldPath);
        fs.writeFileSync(newPath, rawData);

        const imagePath = `/uploads/addbike/${fileName}`;
        const imageUpdate = await model.UpdateBikesImage(imagePath, b_id);

        if (!imageUpdate.affectedRows) {
          return res.send({
            result: false,
            message: 'Failed to update bikes image',
          });
        }
      }

      return res.send({
        result: true,
        message: 'bikes  updated successfully',
      });
    });
  } catch (error) {
    return res.send({
      result: false,
      message: error.message
    });
  }

}










        






