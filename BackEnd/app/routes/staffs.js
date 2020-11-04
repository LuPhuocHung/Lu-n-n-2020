// define dependence
const express = require('express');
const router = express.Router();
const staffController = require('./../controllers/staffs');




router.use((req, res, next) => {
    // authorize here
    next();
});






router.get('/', staffController.getListStaff);

router.post('/signup', staffController.createStaff);

router.route('/:staffId')
    .get(staffController.getStaffId)
    .patch(staffController.updateStaff )
    .put(staffController.updateStaff)
    .delete(staffController.deleteStaff);

module.exports = router;