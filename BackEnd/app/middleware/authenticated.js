module.exports.isAdmin = (req, res, next) => {
    if (req.user.role === 1) {
        return next(); 
    } else {
        req.flash('errors', {
            message: 'Bạn không đủ quyền vào Signup, vui lòng liên hệ Admin để thực hiện thao tác!',
        })
        return res.redirect('/dashboard/overview')
    } 
};