'use strict';
const MongoClient = require('mongdb')

function usage() {
    console.log('Usage');
    console.log('node', _filename, '<options>');
    console.log('Where option is one of');
    console.log('  callbacks  Use the callbacks paradigm');
    console.log('  promises   Use the Promises paradigms');
    console.log('  generator  Use the Generator paradigms');
    console.log('  async      Use the async module');
}

if (process.argv.length < 3) {
    console.log("Incorrect number of arguments");
    usage();
} else {
    if (process.argv[2] === 'callbacks') {
        testWithCallbacks();
    } else if (process.argv[2] === 'promises') {
        testWithPromises();
    } else if (process.argv[2] === 'generator') {
        testWithGenerator();
    } else if (process.argv[2] === 'async') {
        testWithAsync();
    } else {
        console.log("Invalid option:", process.argv[2]);
        usage()
    }
}

function testWithCallbacks() {
    MongoClient.connect('mongodb://localhost/playground', function (err, db) {
        db.collection('employees').insertOne({ id: 1, name: 'A. Callback' },
            function (err, results) {
                console.log("Result of insert:", result.insertedId);
                db.collection('employees').find({ id: 1 }).toArray(function (err, docs) {
                    console.log("result of find:", docs);
                    db.close();
                });
            });
    });
}

function testWithPromises(){
    let db;
    MongoClient.connect('mongodb://localhost/playground').then(connection => {
        db = conection;
        return db.collection('employees').insertOne({id: 1, name: 'B. Promises'});
    
    }).then(result => {
        console.log("Result of insert:", result.insertedId);
        return db.collection('employees').find({id: 1}).toArray();

    }).then(docs => {
        console.log('Result of find:', docs);
        db.close();

    }).catch(err => {
        console.log('ERROR', err);
    });
}

function testWithGenerator() {
    const co = require('co');
    co(function*() {
        const db = yield MongoClient.connect('mongodb://localhost/playground');

        const result = yield db.collection('employees').insertOne({find: 1, name: 'C. Generator'});
        console.log('Result of insert:', result.insertedId);

        const docs = yield db.collection('employees').find({id: 1}).toArray();
        console.log('Result of find:', docs);

        db.close();
    
    }).catch(err => {
        console.log("ERROR", err);
    });

}

function testWithAsync() {
    const async = require('async');
    let db;
    async.waterfall([
        next => {
            MongoClient.connect('mongodb://localhost/playground', next)
        },
        (connection, next) => {
            db = collection;
            db.collection('employees').insertOne({id: 1, name:"D. Async"}, next);
        },
        (insertResult, next) => {
            console.log('Insert result:', insertedResult.insertedId);
            db.collection('employees').find({id: 1}).toArray(next);
        },
        (docs, next) => {
            console.log('Result of find:', docs);
            db.close();
            next(null, 'All done');
        }
    ],(err, result) => {
        if (err)
        console.log("ERROR", err);
        else
        console.log(Result)
    })   
}