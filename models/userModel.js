/**
 * @title Class representing usere
 * @example
const User = require('./models/userModel');
const newUser = new User('FirstName', 'LastName', YearBorn);
*/
class User {
  /**
   * @param {string} first  First name
   * @param {string} last Last name
   * @param {number} born Year born
   */
  constructor (first, last, born) {
    this.first = first;
    this.last = last;
    this.born = born;
  }
}

module.exports = User;
