const express = require("express");
const User = require('../controllers/users');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helper = require('../utils/helper');
const { PagingResult } = require('./../utils/base_response');



// Phần dành cho Khách hàng
//.get('/dashboard/customers/register', User.getRegisterUserCustomer)
router.post('/dashboard/customers/register', User.postRegisterUserCustomer)
  //.get('/dashboard/customers/login',User.getLoginUserCustomer)
    .post('/dashboard/customers/login', User.postLoginUserCustomer)
  .get('/dashboard/customers/', User.getAllUserCustomer)

// router.get('/', (req, res, next) => {
//   User.find({})
//       .exec()
//       .then(docs => {
//           if (docs.length >= 0) {
//               res.status(200).json(docs);
//           } else {
//               res.status(404).json({
//                   message: "No Entries Found"
//               });
//           }
//       })
//       .catch(err => {
//           console.log(err);
//           res.status(500).json({
//               error: err
//           });
//       });
// });

// router.get('/:userId', (req, res, next) => {
//   const id = req.params.userId;
//    User.findById(id)
//       .exec()
//       .then(doc => {
//           console.log("From database", doc);
//           if (doc) {
//               return res.status(200).json(doc);
//           } else {
//               res.status(404).json({ message: "No valid entry found for provided ID" });
//           }
//       })
//       .catch(err => {
//           console.log(err);
//           res.status(500).json({ error: err });
//       });

// })
// router.post("/signup", (req, res, next) => {
//   User.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "Mail exists"
//         });
//       } else {
//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(req.body.password, salt, (err, hash) => {
//             if (err) {
//               return res.status(500).json({
//                 error: err
//               });
//             } else {
//               const user = new User({
//                 _id: new mongoose.Types.ObjectId(),
//                 email: req.body.email,
//                 password: hash
//               });
//               user
//                 .save()
//                 .then(result => {
//                   console.log(result);
//                   res.status(201).json({
//                     User: result,
//                     message: "User created"
//                   });
//                 })
//                 .catch(err => {
//                   console.log(err);
//                   res.status(500).json({
//                     error: err
//                   });
//                 });
//             }
//           });
//       });
//       }
//     });
// });




// router.post('/login', (req,res,next) => {
//   User.find({ email: req.body.email})
//   .exec()
//   .then(user => {
//     if(user.length < 1)
//     {
//       return res.status(404).json({
//         message: 'Mail not found, authentication  failed'
//       });
//     }
//     bcrypt.compare(req.body.password, user[0].password, (err,  result) => {
//       if(err){
//         // return res.status(401).json({
//         //   message: 'Authentication failed'
//         // });
//         return res.flash('error','Authentication failed');
//       }
//       else{
//         return res.status(200).json({
//           result,
//           message: 'Login successfully'
//         });
//       }
// if(result) {
//   const token = jwt.sign({
//     email: user[0].email,
//     userId: user[0]._id
//   }, process.env.JWT_KEY,
//  {
//    expiresIn: "2h"
//  }
//   );
//   return res.status(200).json({
//     message: 'Authentication successful',
//     _id: user[0]._id,
//     email: user[0].email,
//     password: user[0].password,
//     token: token
//   });
// }
//       return res.status(401).json({
//         message: 'Invalid username or password'
//       });
//     })

//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({
//       error: err
//     });
//   });
// });

// router.delete("/:userId", (req, res, next) => {
//   User.remove({ _id: req.params.userId })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "User deleted"
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

module.exports = router;