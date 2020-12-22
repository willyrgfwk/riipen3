import fs from 'fs';

import Position from './position.js';

/**
 * Given a map, runs the miner through the map collecting gold along the way.
 *
 * @param  {array} map - A n x m multidimensional array respresenting the map.
 * @param  {string} logFile - A file location where moves of the miner should be logged to.
 * @param  {Number} yStart - The y dimension starting position for the miner.
 *
 * @return {Number} The total gold collected by the miner.
 */
const run = async (map, logFile, yStart = 0) => {
  if (!map) throw new Error('a map is required')

  // A running tally of the score
  let score = 0;

  // The starting position for the miner
  const position = new Position(0, yStart);

  // Log the starting position because we only log again after each move
  log(logFile, position);

  while(position.x < map[0].length - 1 && position.isValid(map)) {
    score += map[position.y][position.x];

    await move(map, position);

    log(logFile, position);
  }

  return score;
};

/**
 * Replace the logic in this function with your own custom movement algorithm.
 *
 * This function can only invoke the given position's functions in order to
 * move the miner (right, up, down).
 *
 * This function should run in a reasonable amount of time and should attempt
 * to collect as much gold as possible.
 *
 * Remember, invalid moves, or landing on a "0" on the map will result in the run
 * completing.
 *
 * @param  {array} map - A n x m multidimensional array respresenting the map.
 * @param  {object} position - The position of the miner.
 *
 * @return {undefined}
 */
const move = async (map, position) => {
  // TODO: write logic for miner. The current approach is as naive as possible, simply
  // moving the miner to the right.
  position.right();
};

/**
 * Logs the miner's current position to a log file. This file is used for validation
 * of all moves in the run.
 *
 * @param  {string} logFile - A file location where the given position should be logged to.
 * @param  {Object} position - The current location of the miner.
 *
 * @return {undefined}
 */
const log = (logFile, position) => {
  fs.appendFileSync(logFile, `${position.toString()}\n`);
}

export default {
  run,
};
