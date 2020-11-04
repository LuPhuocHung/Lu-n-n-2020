const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema book
const bookSchema = new Schema({
  title: { 
    type: String,
     required: true
    },
  description: {
    type: String
  },
  publishDate: {
    type: Date , 
    required: false
  },
  pageCount: {
    type: Number,
     required: true
    },
  price: { 
    type: Number, 
    required: true
  },
  availableQuantity: {
    type:Number, 
    required: true
  },
  imageUrl: {
    type: String
  },
  imageId: {
    type: String
    },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher'
  },
  author: {
     type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  discount: {
    type: String
  }
});


module.exports = mongoose.model('Book', bookSchema);
