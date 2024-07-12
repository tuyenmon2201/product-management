module.exports.createPost = async (req, res, next) => {
    if(!req.body.title){
        req.flash("error", "Tieu de khong duoc de trong!");
        res.redirect("back");
        return;
    }

    next(); // cho next sang controller
}