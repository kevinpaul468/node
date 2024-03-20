const express = require('express');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;
const port = 3000;

const databaseURL = 'mongodb://localhost:27017';
const database = 'kvn';

const client = new MongoClient(databaseURL);
const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,'templates'));

app.get('/',(req,res)=>{
    client.connect((err)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(`connected sucessfully to database`)
    })
    const db = client.db(database);
    const collection = db.collection("collection");
    const data = collection.find();
    res.render("index",{data})
})


app.listen(port,()=>{
    console.log(`app running at http://localhost:${port}`)
})