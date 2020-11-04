const Publisher = require('../models/publisher');
const mongoose = require('mongoose');

module.exports = {

    
    createPublisher :  (req, res, next) => {
        console.log(req.file);
        const publisher = new Publisher({
            name: req.body.name
        });
      publisher.save()
      .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created publisher successfully',
                createdPublisher: {
                    publisher: result,
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

    

    getListPublisher:  (req, res, next) => {
         Publisher.find({})
            .exec()
            .then(docs => {
                // const response = {
                //     count: docs.length,
                //     publishers: docs.map(doc => {
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


    getPublisherID:  (req, res, next) => {
        const id = req.params.publisherId;
         Publisher.findById(id)
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

    
    updatePublisher: (req, res, next) => {
        const id = req.params.publisherId;
        Publisher.findByIdAndUpdate(id, {$set: req.body}, { new: true }, (err, publisher) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            } else {
                return res.status(200).json({
                    message: 'Publisher updated',
                    publisher: publisher
                });
            }
        });
    },

    deletePublisher: (req, res, next) => {
        const id = req.params.publisherId;
        Publisher.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Publisher deleted',
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

