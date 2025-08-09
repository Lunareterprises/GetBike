var model = require("../model/review");
var util=require("util");

module.exports.reviewadd = async (req, res) => {
  try {
    let { bike_id, rating, review } = req.body;

    // Validate params
    if (!bike_id || !rating || !review) {
      return res.send({
        result: false,
        message: "Insufficient parameters"
      });
    }
   console.log(bike_id, rating, review);


    if (rating < 0 || rating > 5) {
      return res.send({
        result: false,
        message: "Rating should be between 0 and 5"
      });
    }

    // Insert review
    let insertResult = await model.addReviewQuery(bike_id, rating, review);

    if (insertResult.affectedRows > 0) {
      // Get all ratings for this bike
      let ratings = await model.getAllRatingsQuery(bike_id);

      if (ratings.length > 0) {
        let totalRating = ratings.reduce((acc, cur) => acc + cur.br_rating, 0);
        let avgRating = (totalRating / ratings.length).toFixed(1);

        // Update bike's average rating
        await model.updateBikeRatingQuery(bike_id, avgRating);
      }

      return res.send({
        result: true,
        message: "Review added successfully and rating updated"
      });
    } else {
      return res.send({
        result: false,
        message: "Failed to add review"
      });
    }
  } catch (error) {
    return res.send({
      result: false,
      message: error.message
    });
  }
};
