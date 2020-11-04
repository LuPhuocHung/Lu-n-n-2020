// const jwt = require('jsonwebtoken');
// const { appKey } = require('./../utils/helper');
// const { ErrorResult } = require('./../utils/base_response'); 

// module.exports = (req, res, next) => {
//     if(req.url == '/users/login')
//     {
//         // anonymous apis
//         next();
//     }else {
//         const authHeader = req.get('Authorization');
//         if(!authHeader)
//         {
//             return res.status(401).json(ErrorResult(401, 'Not authenticated!'));
//         } 
//         const token = authHeader.split(' ')[1];
//         let decodedToken;
//         try{
//             decodedToken = jwt.verify(token,appKey);
//         }catch(err){
//             return res.status(401).json(ErrorResult(401, err.message));
//         }
//         if (!decodedToken) {
//             return res.status(401).json(ErrorResult(401, 'Not authenticated!'));
//         }
//         // assign info back to Request object
//         req.userId = decodedToken.userId;
//         next();
//     }

// };

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Not authenticated!'
        });
    }
};