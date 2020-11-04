// define dependence
const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/categories');



// authentication
const checkauth = require('./../middleware/auth');
router.use((req, res, next) => {
    next();
});


router.get('/', categoryController.getListCategory);

router.post('/',categoryController.createCategory );

router.route('/:bookId')
    .get(categoryController.getCategoryID)
    .patch(categoryController.updateCategory )
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

module.exports = router;