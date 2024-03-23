const MongoClient = require('mongodb').MongoClient;

const databaseURL = 'mongodb://localhost:27017';

const database = 'backend_masters';

const client = new MongoClient(databaseURL);

emailExists("kevin@gmail.com")


async function emailExists(email) {
    await client.connect();
    const db = await client.db(database);
    const collection = await db.collection("user_details");
    const document = await collection.findOne({ email: email });
    console.log(document);
    return document;
}

