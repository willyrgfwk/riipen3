import fs from 'fs';

import move from './move.js';
import Position from './position.js';

/**
 * Given a mine, runs the miner through the mine collecting gold along the way.
 *
 * @param  {array} mine - A n x m multidimensional array respresenting the mine.
 * @param  {string} logFile - A file location where moves of the miner should be logged to.
 * @param  {Number} yStart - The y dimension starting position for the miner.
 *
 * @return {Number} The total gold collected by the miner.
 */
const run = async (mine, logFile, yStart = 0) => {
  if (!mine) throw new Error('a mine is required')
  if (!logFile) throw new Error('a logFile is required')

  // The starting position for the miner
  let position = new Position(0, yStart);

  // A running tally of the score
  let score = mine[position.y][position.x];

  // Log the starting position because we only log again after each move
  log(logFile, position);

  while(position.x < mine[0].length - 1 && position.isValid(mine)) {
    position = await move(mine, position);

    score += mine[position.y][position.x];

    log(logFile, position);
  }


  return score;
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
