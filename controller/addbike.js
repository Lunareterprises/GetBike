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
            let { name, ratings, review, description, rate } = fields;


            if (!name || !ratings || !review || !description || !rate) {
                return res.send({
                    result: false,
                    message: "insufficent parameter",

                })
            }
            if (files.image) {
                var oldpath = files.image.filepath;
                var newpath =
                    process.cwd() + "/uploads/addbike/" +
                    files.image.orginalfilename;
                let rawData = fs.readFileSync(oldpath);
                fs.writeFile(newpath, rawData, async function (err) {
                    if (err) console.log(err);
                    let imagepath = "/uploads/addbike/" + files.image.originalFilename;
                    console.log(name, ratings, review, description, rate);

                    let addbike = await model.addbikeaddQuery(name, ratings, review, description, rate, imagepath);
                    if (addbike.affectedRows > 0) {
                        return res.send({
                            result: true,
                            message: "   bike details added successfully",

                        })
                    } else {
                        return res.send({
                            result: true,
                            message: "failed to added bike details"

                        })

                    }
                })


            } else {
                return res.send({
                    result: true,
                    message: "image required"

                })

            }

        })
    } catch (error) {
        console.log(error);
        return res.send({
            result: false,
            message: error.message,

        });
    }
}
module.exports.listbike = async (req, res) => {
    try {
        let { b_id } = req.body || {}
        var condition = ''
        if (b_id) {
            condition = `where b_id='${b_id}'`
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
            const { b_id, name, ratings, review, description, rate } = fields;

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


            if (updates.length > 0) {
        const updateQuery = `SET ${updates.join(', ')}`;
        var updateResult = await model.UpdateBikesDetails(updateQuery, b_id);
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

};










        








