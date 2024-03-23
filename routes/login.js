const express = require('express');
const router = express.Router();

const {emailExists} = require('../utils/emails.js');
const checkSession = require('../utils/checkSession.js');

router.get('/login',checkSession,(req,res)=>{
    res.render("login");
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (await emailExists(email) === false) {
        return res.redirect('/login');
    }
    else{
        req.session.user = email;
        return res.redirect('/');
    }
});


module.exports = router;