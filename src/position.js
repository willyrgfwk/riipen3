/**
 * Represents the miner's position on the map.
 */
class Position {
  /**
   * Initializes a new position.
   *
   * @param  {Number} x - The x dimensional position.
   * @param  {Number} y - The y dimensional position.
   *
   * @return {Object} The newly initialized Position.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Moves the miner's position up and to the right (diagonally).
   *
   * @return {undefined}
   */
  up() {
    this.x++;
    this.y++;
  }

  /**
   * Moves the miner's position down and to the right (diagonally).
   *
   * @return {undefined}
   */
  down() {
    this.x++;
    this.y--;
  }

  /**
   * Moves the miner's position to the right.
   *
   * @return {undefined}
   */
  right() {
    this.x++;
  }

  /**
   * Verifies that the position is valid on the given map.
   *
   * Invalid positions include:
   *   1. Being out of bounds
   *   2. Being on a "0" value position on the map
   *
   * @param  {array} map - A n x m multidimensional array respresenting the map.
   *
   * @return {Boolean} Whether the position is valid for the map.
   */
  isValid(map) {
    if (typeof map[this.y] === 'undefined' || typeof map[this.y][this.x] === 'undefined' || map[this.y][this.x] === 0) {
      return false;
    }

    return true;
  }

  /**
   * Writes the position's x and y values to a string.
   *
   * @return {String} The strigified version of the position.
   */
  toString() {
    return `${this.x},${this.y}`;
  }
}

export default Position;
