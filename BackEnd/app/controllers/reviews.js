const Review = require('./../models/review');
const Book = require('./../models/book');
const mongoose = require('mongoose');

module.exports = {

    getListReview: (req, res, next) => {
        Review.find({})
            .exec()
            .then(docs => {
                // const response = {
                //     reviews: docs.map(doc => {
                //         return doc
                //     })
                // };
                if (docs.length >= 0) {
                    res.status(200).json(docs);
                } else {
                    res.status(404).json({
                        message: "No Entries Found"
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    },

    createReview: (req, res, next) => {
        Book.findById(req.body.bookId, (err, book) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            } else {
                const review = new Review();
                review.review = req.body.review;
                review.comment = req.body.comment;
                review.bookId =req.body.bookId;
                Review.create(review, (err, review) => {
                    if (err) {
                        console.log("Error creating Review: ", err);
                        res
                            .status(400)
                            .json(err)
                    } else {
                        review.save();
                        book.reviews.push(review);
                        book.save();
                        console.log("Review Created: ", review);
                        res
                            .status(201)
                            .json(review)
                    }
                });

            }
        });

    },

    getReviewId: (req, res, next) => {
        const id = req.params.reviewId;
        Review.findById(id)
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({ message: "No valid entry found for provided ID" });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });

    },

    updateReview: (req, res, next) => {
        Review.findByIdAndUpdate(req.params.reviewId, { $set: req.body }, { new: true }, (err, review) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            } else {
                return res.status(200).json({
                    message: 'Review updated',
                    review: review
                });
            }
        });
    },

    deleteReview: (req,res, next) => {
        const id = req.params.reviewId;
        Review.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Review deleted',
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        
    }
   
}