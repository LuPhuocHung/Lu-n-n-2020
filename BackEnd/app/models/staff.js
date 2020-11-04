const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema staff
const staffSchema = new Schema({
  email: { 
    type: String,
     required: true
    },
  username: {
    type: String,
    required: true
  },
  password: { 
    type: String, 
    required: true
  },
  admin: {
    type:Boolean, 
    default: false
  }
});


module.exports = mongoose.model('Staff', staffSchema);
