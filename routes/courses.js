const express =require('express');
const router = express.Router();

router.get('/courses', (req,res)=>{
    res.render("courses.ejs", {sessionUser: req.session.user})
});


module.exports = router;