const express = require('express');
const router = express.Router();

const {emailExists, verified} = require('../utils/users.js');
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
        if(await verified(email,password) === true){
            req.session.user = email;
            return res.redirect('/');
        }
        else{
            return res.redirect('/login');
        }
    }
});

    

module.exports = router;