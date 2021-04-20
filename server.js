/* eslint-disable max-len */
/**
 * ! COULD || WOULD
 * TODO Connect Database to React frontend
 * TODO CRUD functionality, Save document pushes content to firestore.
 * ---
 * ! SHOULD
 * TODO Describe socket.io events and their use
 * What does each event do and what is it used for?
 * TODO Implement insertion of data attributes in the rendered HTML.
 * With data attr I can style the HTML or show HTML tags in the rendereed window.
 * TODO Describe Firestore / lowdb
 * What is it used for and what does it do in this project
 * TODO Update Repo description
 * ! COULD
 * TODO Split code further up
 */
/* eslint-enable max-len */

require('dotenv').config();
const express = require('express');
const APP = express();
const compression = require('compression');

const httpServer = require('http').createServer(APP);
const io = require('socket.io')(httpServer);

const PORT = process.env.PORT || 8080;

const docCache = require('./modules/docCache.js');
// Basic Express setup
APP.use(compression({level: 6}));
APP.use(express.static(__dirname + '/public'));
APP.set('view engine', 'ejs');
APP.use(express.json());
APP.use(express.urlencoded({extended: false}));
APP.set('views', 'views');

// Socket IO connections
io.on('connection', (socket) => {
  console.log(`${socket.id} Connected`);

  socket.on('createDoc', (room) =>{
    console.log(room.room);
    socket.join(room.room);
    console.log(io.sockets.adapter.rooms);

    io.to(room.room).emit('getCache', docCache.getCache(room.room));
    // io.to(room.room).emit('userJoin');

    // io.to(room.room).emit('onlineCount', io.sockets.adapter.rooms.get(room.room).size);s
  });

  socket.on('message', (event) => {
    socket.broadcast.emit('message', event);
  });

  socket.on('setText', (event) => {
    io.to(event.room).emit('getText', event);
  });

  socket.on('getListings', () =>{
    socket.emit('setListings', Object.keys(docCache.getAllCaches()));
  });

  socket.on('setCache', (event) =>{
    console.log(event);
    docCache.setCache(event.room, event);
  });

  // leave socket room
  socket.on('disconnect', (room) => {
    socket.leave(room);
  });
});


APP.get('/doc/:room', (req, res)=>{
  // dont forget to include document contents here, fetch em from firebase
  const prep = req.params.room;
  console.log(prep);
  return res.render('docViewer', {data: 'templateText', room: prep});
});

APP.post('/doc/handleDoc', (req, res) => {
  const room = req.body.docName;
  // console.log(room);
  res.redirect('/doc/' + room);
});

APP.get('/', (request, result) => {
  // userService.insertUserDb(newUser);
  return result.render('homepage');
});

httpServer.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
});
