require('dotenv').config();
const compression = require('compression');
const express = require('express');
const APP = express();
const httpServer = require('http').createServer(APP);
const io = require('socket.io')(httpServer);
const PORT = process.env.PORT || 8080;

// Socket.io setup, imports events module and use those in io.on
const events = require('./modules/ioEvents');
io.on('connection', (socket) => {
  events.ioEvents(socket, io);
});

// Basic Express setup with compression and EJS
APP.use(express.json());
APP.use(express.urlencoded({extended: false}));
APP.use(express.static(__dirname + '/public'));
APP.use(compression({level: 6}));
APP.set('view engine', 'ejs');
APP.set('views', 'views');

// Route definition of the application
const indexRoute = require('./routes/indexRouter.js');
const docRoute = require('./routes/docRouter.js');
APP.use('/', indexRoute);
APP.use('/', docRoute);

httpServer.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
});
