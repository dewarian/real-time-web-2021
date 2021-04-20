/**
 * @author Sjagoori
 * @link github.com/sjagoori
 * @description Storage implementation with lowdb by Sjagoori.
 * Stored data is a keyValue pair stored in json.
 */

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('docCache.json');
const db = low(adapter);

/**
 * @description Function set key:value pair to json file
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
 * @return {Function} getState function form lowdb.
 */
exports.getAllCaches = () => {
  return db.getState();
};
