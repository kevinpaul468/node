
const express = require('express');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;
const port = 3000;
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const session = require('express-session');

const databaseURL = 'mongodb://localhost:27017';
const database = 'backend_masters';

const client = new MongoClient(databaseURL);
const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,'templates'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    expressSession({
        secret: 'keyboard',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }
));

sessionActive = false;




// function checkSession(req, res, next) {
//     if (req.session.user) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// }

app.get('/', (req, res) => {
    let variable = req.session.variable || 0;
    req.session.variable = variable + 1;

    res.render("index", { sessionUser:req.session.user, variable });
});

app.get('/login',(req,res)=>{
    res.render("login");
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (await emailExists(email) === false) {
        return res.redirect('/login');
    }
    else{
        req.session.user = email;
        return res.redirect('/');
    }
});

app.get('/register',(req,res)=>{
    res.render("register");
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (await emailExists(email) === false) {
        await addEmail(name, email, password);
        return res.redirect('/register');
    }
    return res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


async function emailExists(email) {
    await client.connect();
    const db = await client.db(database);
    const collection = await db.collection("user_details");
    const document = await collection.findOne({ email: email });
    console.log(document);
    if (document === null) {
        return false;
    }
    return true;
}


async function addEmail(name,email, password) {
    await client.connect();
    const db = await client.db(database);
    const collection = await db.collection("user_details");
    const document = await collection.insertOne({ name: name, email: email, password: password });
    console.log("inserted sucessfully");
    return;
}


app.listen(port,()=>{
    console.log(`app running at http://localhost:${port}`);
});
