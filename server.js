require('dotenv').config();
const express = require('express');
const APP = express();
const compression = require('compression');

const httpServer = require('http').createServer(APP);
const io = require('socket.io')(httpServer);

const PORT = process.env.PORT || 8080;

// Basic Express setup
APP.use(compression({level: 6}));
APP.use(express.static(__dirname + '/public'));
APP.set('view engine', 'ejs');
APP.use(express.json());
APP.use(express.urlencoded({extended: false}));
APP.set('views', 'views');

const events = require('./modules/ioEvents');
// Socket IO connections
io.on('connection', (socket) => {
  events.ioEvents(socket, io);
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
