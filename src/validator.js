import fs from 'fs';
import readline from 'readline';

import Position from './position.js';

/**
 * Given a map, output log file, and a final score, validates that the steps
 * taken are valid, as well that the final score is correct.
 *
 * @param  {array} map - A n x m multidimensional array respresenting the map.
 * @param  {string} logFile - A file location where moves of the miner were recorded.
 * @param  {Number} mapScore - The final score to validate against the moves made.
 *
 * @return {Boolean} Whether the moves made and final score are valid.
 */
const validate = async (map, logFile, mapScore) => {
  if (!map) throw new Error('a map is required')
  if (!logFile) throw new Error('a logFile is required')

  const lineReader = readline.createInterface({
    input: fs.createReadStream(logFile)
  });

  let position;

  let valid = true;
  let score = 0;

  for await (const line of lineReader) {
    const step = line.split(',').map((v) => +v);

    if (!position) {
      position = new Position(step[0], step[1]);
    } else {
      // The must always move forward
      if (step[0] !== position.x + 1) valid = false;

      const validY = [
        position.y + 1,
        position.y,
        position.y - 1,
      ];

      // The must only move +1, 0 or -1 vertically in any given move
      if (!validY.includes(step[1])) valid = false

      // They can't go out of bounds
      if (step[0] > map[0].length -1) valid = false;
      if (step[1] > map.length -1) valid = false;
    }

    // Breaks out of file reading
    if (!valid) lineReader.close();

    score += map[step[1]][step[0]]

    // Move up to the valid position
    position.x = step[0];
    position.y = step[1];
  }

  return valid && mapScore === score;
};

export default {
  validate,
};
