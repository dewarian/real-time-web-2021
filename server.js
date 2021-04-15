import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import firebase from '@firebase/app';
import '@firebase/firestore';
import {createServer} from 'http';
import {Server} from 'socket.io';

dotenv.config();
const APP = express();
const PORT = process.env.PORT || 8080;
const __dirname = fileURLToPath(import.meta.url);


const httpServer = createServer(APP);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  io.emit('connected');
});


const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCEKT,
};

firebase.default.initializeApp(firebaseConfig);
const db = firebase.default.firestore();

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

httpServer.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
});
