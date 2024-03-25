
const express = require('express');
const path = require('path');
const port = 3000;
const expressSession = require('express-session');
const bodyParser = require('body-parser');


const app = express();


const login = require('../routes/login');
const register = require('../routes/register');
const courses = require('../routes/courses');
const workshops = require('../routes/workshops');
const community = require('../routes/community');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,'../templates'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    expressSession({
        secret: 'keyboard',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }
));

app.use(login);
app.use(register);
app.use(courses);
app.use(workshops);
app.use(community);



app.get('/', (req, res) => {
    let variable = req.session.variable || 0;
    req.session.variable = variable + 1;

    res.render("index", { sessionUser:req.session.user, variable });
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});





app.listen(port,()=>{
    console.log(`app running at http://localhost:${port}`);
});


