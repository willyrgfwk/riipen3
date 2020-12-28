import Position from './position.js';

/**
 * Replace the logic in this function with your own custom movement algorithm.
 *
 * This function should run in a reasonable amount of time and should attempt
 * to collect as much gold as possible.
 *
 * Remember, invalid moves, or landing on a "0" on the mine will result in the run
 * completing.
 *
 * @param  {array} mine - A n x m multidimensional array respresenting the mine.
 * @param  {object} position - The current position of the miner.
 *
 * @return {Position} The new position of the miner.
 */
const move = (mine, position) => {
  // TODO: write logic for miner. The current approach is as naive as possible, simply
  // moving the miner to the right.
  return new Position(position.x + 1, position.y);
};

export default move;
