// define dependence
const express = require('express');
const router = express.Router();
const reviewController = require('./../controllers/reviews');



// authentication
const checkauth = require('./../middleware/auth');
router.use((req, res, next) => {
    next();
});


router.get('/', reviewController.getListReview);
router.post('/',  reviewController.createReview);

router.route('/:reviewId')
    .get(reviewController.getReviewId)
//    .patch(reviewController.updateReview )
 //   .put(reviewController.updateReview)
    .delete(reviewController.deleteReview);

module.exports = router;