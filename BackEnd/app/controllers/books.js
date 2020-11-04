const Book = require('../models/book');
const Author = require('./../models/author');
const Category = require('./../models/category');
const Publisher = require('./../models/publisher');
const User = require('./../models/user');
const comment = require('./../models/review');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

// configuration CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
module.exports = {

    // Create a Book
    // createBook: async (req, res, next) => {
    //     console.log(req.file);
    //     const book = new Book({
    //         title: req.body.title,
    //         description: req.body.description,
    //         publishDate: new Date(req.body.publishDate),
    //         pageCount: req.body.pageCount,
    //         price: req.body.price,
    //         availableQuantity: req.body.availableQuantity,
    //         bookImage: req.file.path,
    //         //      bookImage: req.body.bookImage,
    //         author: req.body.author,
    //         publisher: req.body.publisher,
    //         categories: req.body.categories,
    //         reviews: req.body.revews,
    //         discount: req.body.discount
    //     });
    //     await book.save().then(result => {
    //         console.log(result);
    //         res.status(201).json({
    //             message: 'Created book successfully',
    //             createdBook: {
    //                 title: result.title,
    //                 price: result.price,
    //                 _id: result._id,
    //                 request: {
    //                     type: 'POST',
    //                     url: 'http://localhost:8080/books/' + result._id
    //                 }
    //             }
    //         });
    //     })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json({
    //                 error: err
    //             });
    //         });

    // },


    createBook: (req, res, next) => {
        cloudinary.v2.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                //req.flash('error', err.message);
                return res.redirect('back');
            }
            const book = new Book();
            // add url for image object book 
            book.imageUrl = result.secure_url;
            // add public id for image object book
            book.imageId = result.public_id;
            // add title for book
            book.title = req.body.title;
            book.description = req.body.description;


            book.publishDate = req.body.publishDate;


            book.pageCount = req.body.pageCount;
            book.price = req.body.price;
            book.availableQuantity = req.body.availableQuantity;

            book.author = req.body.author;

            //    Category.findById(req.body.categories, async (err,cate) =>{
            //        if(err)
            //        {
            //            return res.status(500).json({
            //                error: err
            //            })
            //        }
            //        book.categories.push(cate._id);
            //    });
            book.categories.push(req.body.categories);
            book.publisher = req.body.publisher;
            book.discount = req.body.discount;

            book.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Created book successfully',
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({
                        error: err
                    });
                });

            // add book in books of Author
            Author.findById(req.body.author, (err, author) => {
                if (err) {
                    return res.status(204).json({
                        error: err
                    });
                }
                author.books.push(book);
                author.save();
            });

            // add book in books of Category
            Category.findById(req.body.categories, (err, cate) => {
                if (err) {
                    return res.status(204).json({
                        error: err
                    });
                }
                cate.books.push(book);
                cate.save();
            });
            // add book in books of Publisher
            Publisher.findById(req.body.publisher, (err, publisher) => {
                if (err) {
                    return res.status(204).json({
                        error: err
                    });
                }
                publisher.books.push(book);
                publisher.save();
            });
            res.status(201).json(book);
            // Book.create(book, (err, book) => {
            //     if (err) {
            //         console.log("Error creating Book: ", err);
            //         res
            //             .status(400)
            //             .json(err)
            //     } else {
            //         console.log("Book Created: ", book);
            //         res
            //             .status(201)
            //             .json(book)
            //     }
            // });
        });

    },

    // Get List Book
    getListBook: async (req, res, next) => {
        let query = Book.find()
        if (req.query.title != null && req.query.title != '') {
            query = query.regex('title', new RegExp(req.query.title, 'i'))
        }
        try {
            const books = await query.exec()
            res.status(200).json(books)
        } catch {
            res.redirect('/')
        }
    },

    // get book by bookID
    getBookID: async (req, res, next) => {
        const id = req.params.bookId;
        await Book.findById(id)
            // .select('title price _id bookImage')
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    return res.status(200).json(doc);
                } else {
                    res.status(404).json({ message: "No valid entry found for provided ID" });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });

    },

    // Get Comment by ID book
    getCommentBybookId: async (req, res, next) => {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId).populate('reviews');
        console.log('book', book);
        res.status(200).json(book.reviews);
    },

    // Get Author by ID book
    getAuthorBybookId: async (req, res, next) => {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId).populate('author');
        console.log('book', book);
        res.status(200).json(book.author);
    },

    // Get Category by ID book
    getCategoryBybookId: async (req, res, next) => {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId).populate('categories');
        console.log('book', book);
        res.status(200).json(book.categories);
    },

    // Get Category by ID book
    getCategoryBybookId: async (req, res, next) => {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId).populate('categories');
        console.log('book', book);
        res.status(200).json(book.categories);
    },


    // Get book by ID Category
    getBookByCategoryId: async (req, res, next) => {
        const cateId = req.params.cateId;
        const cate = await Category.findById(cateId).populate('books');
        res.status(200).json(cate.books);
    },

    // Get book by ID Author
    getBookByAuthorId: async (req, res, next) => {
        const authorId = req.params.authorId;
        const author = await Author.findById(authorId).populate('books');
        res.status(200).json(author.books);
    },

    // Get book by ID Publisher
    getBookByPublisherId: async (req, res, next) => {
        const publisherId = req.params.publisherId;
        const publisher = await Publisher.findById(publisherId).populate('books');
        res.status(200).json(publisher.books);
    },

    // Delete comment in reviews
    deleteReview: async (req, res, next) => {
        const reviewId = req.params.reviewId;
        const bookId = req.path.bookId;
        const book = await Book.findById(bookId);
        await book.reviews.id(reviewId).remove();
        await book.save();
        res.status(200).json({
            message: 'errorr'
        });
    },
    // delete Book
    deleteBook: (req, res, next) => {
        Book.findById(req.params.bookId, async (err, book) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            try {
                await cloudinary.v2.uploader.destroy(book.imageId);
                book.remove();
                return res.status(201).json({
                    message: 'Book deleted successfully!!!'
                });
            } catch (err) {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            }
        });

    },

    // update a book on PATCH
    updateBook: (req, res, next) => {
        const id = req.params.bookId;
        Book.findById(id, async (err, book) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                if (req.file) {
                    try {
                        await cloudinary.v2.uploader.destroy(book.imageId);
                        const result = await cloudinary.v2.uploader.upload(req.file.path);
                        book.imageId = result.public_id;
                        book.imageUrl = result.secure_url;
                    } catch (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    book.title = req.body.title;
                    book.description = req.body.description;
                    book.publishDate = req.body.publishDate;
                    book.pageCount = req.body.pageCount;
                    book.price = req.body.price;
                    book.availableQuantity = req.body.availableQuantity;

                    book.author = req.body.author;
                    book.categories.push(req.body.categories);
                    book.publisher = req.body.publisher;
                    book.discount = req.body.discount;
                    book.save();
                    //  res.redirect('/books/' + book._id);
                    return res.status(200).json(book);
                }
            }
        });
    },



    // Search Book By title
    searchBookByCategory: async (req, res, next) => {
        let searchOptions = {}
        if (req.query.title != null && req.query.title !== '') {
            searchOptions.title = new RegExp(req.query.title, 'i')
        }
        try {
            const books = await Book.find(searchOptions)
            res.status(200).json({
                books: books,
                searchOptions: req.query
            });
            // res.render('authors/index', {
            //     authors: authors,
            //     searchOptions: req.query
            // })
        } catch {
            res.redirect('/')
        }
    },


}

