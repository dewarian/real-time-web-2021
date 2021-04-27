/**
 * Import statement for database operations.
 */
const docCache = require('./docCache.js');


/**
 * @title socket.io events
 * @description socket.io events in a modularized format.
 * Client is the event and server are the server side operations.
 * @param {Object} client socket instance, the comm. between client and server.
 * @param {Object} server Server sided instance of socket.io
 */
exports.ioEvents = (client, server) => {
  client.on('createDoc', (room) => {
    client.join(room.room);
    server.to(room.room).emit('getCache', docCache.getCache(room.room));
  });

  client.on('message', (event) => {
    server.broadcast.emit('message', event);
  });

  client.on('setText', (event) => {
    server.to(event.room).emit('getText', event);
  });

  client.on('getListings', () => {
    server.emit('setListings', Object.keys(docCache.getAllCaches()));
  });

  client.on('setCache', (event) => {
    docCache.setCache(event.room, event);
  });

  client.on('disconnect', (room) => {
    client.leave(room);
  });
};
