// Learning to use mongodb with MongoDB's drivers for NODEJS
// CRUD : Create, Read, Update and Delete
//
// Also using Robo3T to play with the collections and documents.
// Can be installed for Linux, Windows or Mac.
//

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to Connect to the database.');
    } 

    const db = client.db(databaseName);

    // INSERTING MANY USERS IN ONE GO USING insertMany:
    db.collection('users').insertMany([
        {
            name: 'Ted',
            age: 54
        },
        {
            name: 'Juliana',
            age: 18,
            sex: 'F'
        }
    ], (error, result) => {
        if (error) {
            return console.log('Error while adding documents to the database.');
        }
        console.log('Added: ' + result.insertedCount);
    });


    // FINDING ONE DOCUMENT USING findOne:
    // db.collection('users').findOne({ name: 'Matt' }, (error, user) => {
    //     if (error) {
    //         return console.log('Couldn\'t fetch the name');
    //     }
    //
    //     console.log(user);
    // });

    // FINDING MANY DOCUMENTS USING find:
    // db.collection('users').find({name: 'Matt' }).toArray((error, users) => {
    //     if (error){
    //         return console.log('Could\'t find a match');
    //     }
    //        
    //     console.log(users);
    // });

    // FINDING MULTIPLE DOCUMENTS AND COUNTING THE NUMBER USING A CURSOR
    // METHOD CALLED count:
    // db.collection('users').find({ name: 'Matt' }).count((error, users) => {
    //     if (error){
    //         return console.log('Could\'t find a match');
    //     }
    //
    //     console.log(users);
    // });

    // FINDING MULTIPLE DOCUMENTS USING count AGAIN:
    // db.collection('tasks').find({ completed: true }).count((error, tasks) => {
    //     if (error){
    //         return console.log('Could\'t find a match');
    //     }
    //
    //     console.log(tasks);
    // });

    // UPDATING A DOCUMENT USING A PROMISE AND THE updateOne METHOD
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('5e9de02bef75de1a805f65b3')
    // },
    // {
    //     $set: {
    //         name: 'William'
    //     }
    // });
    //
    // updatePromise.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // UPDATING THE DOCUMENT WITHOUT CREATING A VARIABLE
    // LIKE updatePromise:
    // db.collection('users').updateOne({
    //     _id: new ObjectID('5e9de02bef75de1a805f65b3')
    // },
    // {
    //     $set: {
    //         name: 'Robert'
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // UPDATING MANY DOCUMENTS WITH updateMany
    //
    // db.collection('tasks').updateMany({
    //     completed: false
    // },
    // {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // DELETING MULTIPLE DOCUMENTS USING deleteMany AND A CALLBACK:
    // db.collection('users').deleteMany({age: 42}, (error, result) => {
    //     if (error){
    //         return console.log('Error: ' + error);
    //     }

    //     console.log('Deleted: ' + result.deletedCount);
    // });

    // DELETING MULTIPLE DOCUMENTS USING deleteMany AND A PROMISE:
    // db.collection('users').deleteMany({age: 42})
    //     .then((result) => {
    //         console.log('Deleted: ' + result.deletedCount)
    //     })
    //     .catch((error) => {
    //         console.log('Error: ' + error)
    //     });

    // DELETING ONE DOOCUMENT USING deleteOne:
    db.collection('users').deleteOne({age: 15})
        .then((result) => {
            console.log('Deleted ' + result.deletedCount + ' document.')
        })
        .catch((error) => {
            console.log('Error: ' + error)
        })

});