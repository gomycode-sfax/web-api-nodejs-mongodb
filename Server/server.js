
// 1 Install NodeJS (npm) => https://nodejs.org/en/
// 2 Install MongoDB and MongoDB Compass => https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

// Install express
// Express is a library that simplifies the usage of nodeJS http module (there are other modules such as fileSystem module ...)
// => npm install express
// => npm install body-parser


// Import express
const express = require('express');
// Import body-parser
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
app.use(bodyParser.json());




// Install the mongoDB driver for nodeJS => https://docs.mongodb.com/ecosystem/drivers/
// => npm install mongodb =>  https://www.npmjs.com/package/mongodb 

// Import NodeJS mongoDB driver
const mongodb = require('mongodb');

// DataBase URL
const MongoDB_URL = 'mongodb://localhost:27017';

// Database Name
const dbName = "contacts-db";


// Install cors
// => npm install cors

// Import cors
const cors = require('cors');
app.use(cors());


//Establishing connection between the server and the db
mongodb.MongoClient.connect(MongoDB_URL, (err, client) => {
    if (err) {
     return console.log('Database connection has failed');
    }

    console.log('Database is connected successfully to the server');

    // Initialize the batabase
    const db = client.db(dbName);

    // Add a contact
    
    // Install POSTMAN (used to simulate the frontend requests and to test our backend api ...)
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

    // Modify one contact
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


// send message for default URL
app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Welcome to the workshop')
});

// Launch app to listen to specified port
app.listen(5000, () => console.log('Server is listening on port 5000'));

