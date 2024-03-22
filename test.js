const MongoClient = require('mongodb').MongoClient;

const databaseURL = 'mongodb://localhost:27017';

const database = 'backend_masters';

const client = new MongoClient(databaseURL);

client.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});