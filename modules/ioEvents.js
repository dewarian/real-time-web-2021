
const docCache = require('./docCache.js');


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
