
////////////////////////////////////////////////////// 1 //////////////////////////////////////////////////////////

// 1 Install NodeJS (npm) => https://nodejs.org/en/
// 2 Install MongoDB and MongoDB Compass => https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

// Install express
// Express is a library that simplifies the usage of nodeJS http module (there are other modules such as fileSystem module ...)
// => npm install express body-parser (enables us to manipulate the request body (corps))

// Import express
const express = require('express');
// Import body-parser
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
app.use(bodyParser.json());

////////////////////////////////////////////////////// 1 //////////////////////////////////////////////////////////


// ************************************************** 2 *********************************************************//

// Install the mongoDB driver for nodeJS => https://docs.mongodb.com/ecosystem/drivers/
// => npm install mongodb =>  https://www.npmjs.com/package/mongodb 

// Import NodeJS mongoDB driver
const mongodb = require('mongodb');

// DataBase URL
const MongoDB_URL = 'mongodb://localhost:27017';

// Database Name
const dbName = "st-db";
// const dbName = "contacts-db";

// ************************************************** 2 *********************************************************//


////////////////////////////////////////////////////// 3 //////////////////////////////////////////////////////////
// Import cors
const cors = require('cors');
app.use(cors());
////////////////////////////////////////////////////// 3 //////////////////////////////////////////////////////////


// ************************************************** 2 *********************************************************//
//Establishing connection between the server and the db
mongodb.MongoClient.connect(MongoDB_URL, (err, client) => {
    if (err) {
     return console.log('Database connection has failed');
    }

    console.log('Database is connected successfully to the server');

    // Initialize the batabase
    const db = client.db(dbName);

    // Add a contact
    
    // Introduce POSTMAN (used to simulate the frontend requests and to test our backend api ...)
    // Say that we want to add a user to the DB
    // Do (SIMULATE) a POST Request with Postman (SIMULATION ...)

    /*
    app.post('url', function);
    app.post('http://localhost:4000/contacts', function)    
    app.post('/contacts', function)    
    app.post('/contacts', function(req, res) {
        // function Body ... 
        // ...
        res.send('naubfaibaibaibaiub')
    })


    function add(a, b) {
        return (a+b);
    } 


    let add = (a, b) => {
        return (a+b);
    }
    */

    app.post('/contacts', (req, res) => {
        const body = req.body;
        db.collection('contacts').insertOne(body, (err, data) => { // initialize the contacts collection
            if (err) {res.status(400).send('error the contact has not been added')}
            else {res.send(body)}
        })
    })

    // Get all contacts
    app.get('/contacts', (req, res) => {
        db.collection('contacts')
        .find()
        .toArray((err, data) => {
            if (err) {res.status(404).send('could not fetch contacts')}
            else {res.send(data)}
        })
    })

    // Get one specific contact
    app.get('/contacts/:id', (req, res) => {
        const id = req.params.id;
        db.collection('contacts').findOne({_id: mongodb.ObjectID(id)}, (err, data) => {
            if (err) {
                res.status(404).send('could not find the contact')
            } else {
                res.send(data);
            }
        })
    })

    // Modify ons contact
    app.put('/contacts/:id', (req, res) => {
        const body = req.body;
        const id = req.params.id;
        db.collection('contacts').findOneAndUpdate({_id: mongodb.ObjectID(id)}, {$set: body}, (err, data) => {
            if (err) {
                res.status(400).send('No the contact was not modified.' )
            } else {
                res.send(body)
            }
        })
    })

    // Remove one contact
    app.delete('/contacts/:id', (req, res) => {
        const id = req.params.id;
        db.collection('contacts').findOneAndDelete({_id: mongodb.ObjectID(id)}, (err, data) => {
            if (err) res.status(400).send('failed to delete contact')
            else res.send(data.value) 
        })
    })


})
// ************************************************** 2 *********************************************************//




////////////////////////////////////////////////////// 1 //////////////////////////////////////////////////////////

// send message for default URL
app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Welcome to the workshop')
});

// Launch app to listen to specified port
app.listen(4000, () => console.log('Server is listening on port 4000'));

////////////////////////////////////////////////////// 1 //////////////////////////////////////////////////////////
