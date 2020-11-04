const Category = require('../models/category');
const mongoose = require('mongoose');

module.exports = {

    
    createCategory :  (req, res, next) => {
        console.log(req.file);
        const category = new Category({
            name: req.body.name
        });
      category.save()
      .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created category successfully',
                createdCategory: {
                    category: result,
                }
            });
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

    },

    

    getListCategory:  (req, res, next) => {
         Category.find({})
            .exec()
            .then(docs => {
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


    getCategoryID:  (req, res, next) => {
        const id = req.params.bookId;
         Category.findById(id)
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

    
    updateCategory: (req, res, next) => {
        const id = req.params.bookId;
        Category.findByIdAndUpdate(id, {$set: req.body}, { new: true }, (err, category) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            } else {
                return res.status(200).json({
                    message: 'Category updated',
                    category: category
                });
            }
        });
    },

    deleteCategory: (req, res, next) => {
        const id = req.params.bookId;
        Category.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Category deleted',
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

