const firebase = require('firebase');
require('firebase/firestore');

// Firebase initialisations
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/**
 * @description Add user to firestore,  Get data you want to push to firestore, require the service.
 * @param {Object} data Custom object of users containing info about user.
 * @example
  const User = require('./models/userModel');
  const newUser = new User('FirstName', 'LastName', YearBorn);
  const userService = require('./service/userService');
  userService.insertUserDB(data)
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

module.exports = {insertUserDb};
