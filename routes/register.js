const express = require('express');
const router = express.Router();
const { addEmail, emailExists } = require('../utils/users.js');
const checkSession = require('../utils/checkSession.js');

router.get('/register',checkSession,(req,res)=>{
    res.render("register");
})

router.post('/register', async (req, res) => {

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,64}$/;
    const { name, email, password } = req.body;
    if(!pattern.test(password)){
        console.log("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and must be between 8 and 64 characters long.");
        return res.redirect('/register');
    }
    else
    {
        if (await emailExists(email) === false) {
            await addEmail(name, email, password);
            console.log("User registered");
            return res.redirect('/login');
        }
        console.log("Email already exists");
        return res.redirect('/register');
    }
});

module.exports = router;



