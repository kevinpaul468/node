const express = require('express');
const router = express.Router();
const { addEmail, emailExists } = require('../utils/emails.js');
const checkSession = require('../utils/checkSession.js');

router.get('/register',checkSession,(req,res)=>{
    res.render("register");
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (await emailExists(email) === false) {
        await addEmail(name, email, password);
        return res.redirect('/register');
    }
    return res.redirect('/');
});

module.exports = router;

