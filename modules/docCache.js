const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('docCache.json');
const db = low(adapter);

/**
 * Function set key:value pair
 * @param {String} room - key
 * @param {Object} value - value
 */
exports.setCache = async (room, value) => {
  db.set(room, value).write();
};

/**
 * Function gets value for given key
 * @param {String} room - key
 * @return {Object} key's value
 */
exports.getCache = (room) => {
  return db.has(room).value() ? db.get(room).value() : undefined;
};

/**
 * Function returns all entries
 */
exports.getAllCaches = () => {
  return db.getState();
};
