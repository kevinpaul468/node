const express = require('express');
const router = express.Router();

router.get('/community',(req,res)=>{
    res.render('community',{sessionUser : req.session.user})
});


module.exports = router;