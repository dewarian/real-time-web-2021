/* eslint-disable max-len */
/**
 * TODO Split logic into separate modules to keep it clear
 * TODO Connect Database to React frontend
 *  TODO CRUD functionality, Save document pushes content to firestore.
 *  ? Does this also store tabs and spaces? What about template literals?
 * TODO Create socket.io rooms, the room id is the name of the document
 * If user creates a new document, create a modal that asks for the name of the document, upon creation create room
 * Click event on document item: Enter socketIO room.
 */

/**
 * ! installation isn't clear (push to top)
 * ! Socket events have to be described. 2x
 * ! Work in modules, service for db logic, Persistence for logic related to an entity in db, controllers and services for app and domain logic
 * ! About description of the repo
 * ! External API data description, also describe how to obtain a key
 * ! Describe Firestore
 */

/* eslint-enable max-len */

const express = require('express');
const APP = express();
const compression = require('compression');
const dotenv = require('dotenv');
const firebase = require('firebase');
require('firebase/firestore');
const httpServer = require('http').createServer(APP);
const io = require('socket.io')(httpServer);

dotenv.config();
const PORT = process.env.PORT || 8080;

// Basic Express setup
APP.use(compression({level: 6}));
APP.use(express.static(__dirname + '/public'));
APP.set('view engine', 'ejs');
APP.set('views', 'views');

const User = require('./models/userModel');
const test = new User('nadine', 'meijers', 1996);

APP.get('/', (request, result) => {
  insertUserDb(test);
  result.render('index', {
    title: 'Markeer',
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
});

// Socket IO connections
io.on('connection', (socket) => {
  console.log('connected');
  socket.on('message', (event) => {
    socket.broadcast.emit('message', event);
  });
});

io.on('disconnect', (event) => {
  console.log('user disconnected');
});

// Firebase initialisations
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCEKT,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/**
 * @description Add user to firestore
 * @param {*} first firstname
 * @param {*} last lastname
 * @param {*} born YearOfBirth
 */
function insertUserDb (data) {
  db.collection('users')
    .withConverter(userConverter)
    .add(data)
    .then((docRef) => {
      console.log(`Doc written with ID: ${docRef.id}`);
    })
    .catch((error) => {
      console.error(`Error adding documents: ${error}`);
    });
}

const userConverter = {
  toFirestore: function (user) {
    return {
      first: user.first,
      last: user.last,
      born: user.born,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new User(data.first, data.last, data.born);
  },
};
