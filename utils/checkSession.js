function checkSession(req, res, next) {
    if (req.session.user === '' || req.session.user === undefined) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = checkSession;