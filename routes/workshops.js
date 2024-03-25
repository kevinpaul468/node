const express = require('express')
const router = express.Router()

router.get('/workshops',(req,res)=>{
    res.render('workshops', {sessionUser : req.session.user})
});


module.exports = router;