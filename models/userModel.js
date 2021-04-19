/** Class representing usere */
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
