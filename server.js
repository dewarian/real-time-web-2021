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

APP.get('/', ( request, result ) => {
  insertUserDb('nathan', 'bommezijn', 1997);
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
    // console.log(event);
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
function insertUserDb(first, last, born) {
  db.collection('users').add({
    first: first,
    last: last,
    born: born,
  })
    .then((docRef) => {
      console.log(`Doc written with ID: ${docRef.id}`);
    })
    .catch((error) => {
      console.error(`Error adding documents: ${error}`);
    });
}
