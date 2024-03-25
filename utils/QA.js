const MongoClient = require('mongodb').MongoClient;
const databaseURL = 'mongodb://localhost:27017';
const database = 'backend_masters';

const client = new MongoClient(databaseURL);

async function addQuestion(email, question) {
    await client.connect();
    const db = await client.db(database);
    const collection = await db.collection('QA');
    const document = await collection.insertOne({ email: email, question: question});
    console.log('inserted successfully');
    return;
}

async function addComment(email,question,comment){
    await client.connect();
    const db = await client.db(database);
    const collection = await db.collection('comments');
    const document = await collection.insertOne({ email: email, comment: comment});
    const commentId = document.insertedId;
    joinCommentToQuestion(question, commentId);
}

async function joinCommentToQuestion(question, commentId){
    await client.connect();
    const db = await client.db(database);
    const collection = await db.collection('QA');
    const document = await collection.updateOne({ question: question }, { $push: { comments: commentId } });
    console.log(document);
    console.log('joined comment to question');
    return;
}

async function joinCommentToComment(comment, commentId){
    await client.connect();
    const db = await client.db(database);
    const collection = await db.collection('comments');
    const document = await collection.updateOne({ comment: comment }, { $push: { comments: commentId } });
    console.log(document);
    console.log('joined comment to comment');
    return;
}


moduld.exports = { addQuestion, addComment, joinCommentToQuestion, joinCommentToComment };