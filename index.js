
const express = require('express');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;
const port = 3000;
const expressSession = require('express-session');
const bodyParser = require('body-parser');

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

    res.render("index", { sessionActive, variable });
});

// app.get('/login',checkSession,(req,res)=>{

// });

app.get('/register',(req,res)=>{
    res.render("register")
})

app.post('/register',(req,res)=>{
    const {name,email, password} = req.body;
    client.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`connected successfully to database`);
    });
    const db = client.db(database);
    const collection = db.collection("user_details");
    collection.findOne({email: email},(err,document)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            if(document){
                res.send('User already exists');
                return;
            }
            collection.insertOne({name,email,password},(err,result)=>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log(result);
                res.redirect('/');
            })
        res.redirect('/');
        }
    });
});


app.listen(port,()=>{
    console.log(`app running at http://localhost:${port}`);
})