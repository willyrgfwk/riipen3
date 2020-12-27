import fs from 'fs';
import requireDirectory from 'require-directory';

import config from './config.js';
import runner from './src/runner.js';
import validator from './src/validator.js';

/**
 * Given a file name, deletes any existing file and creates a new blank one.
 *
 * @param  {string} logFile - The name of the file to delete and re-create.
 *
 * @return {undefined}
 */
const resetLogFile = (logFile) => {
  try {
    fs.unlinkSync(logFile);
  } catch (error) {
    // Do nothing
  }

  fs.closeSync(fs.openSync(logFile, 'w'));
}

(async () => {
  console.log('Riipen Gold Miner');

  // Keep track of the total score.
  let totalScore = 0;

  // Load all mines
  const mines = requireDirectory(module, './mines');

  // Run each mine
  await Promise.all(Object.keys(mines).map(async (key) => {
    const mine = mines[key].default;

    const logFile = `./logs/${key}.txt`;

    resetLogFile(logFile);

    const mineScore = await runner.run(mine, logFile, config.yStart[key] || 0);
    const valid = await validator.validate(mine, logFile, mineScore);

    if (valid) {
      console.log(`Map '${key}' score:`, mineScore);
      totalScore += mineScore;
    } else {
      console.log('No cheating!');
    }
  }));

  console.log('Final score:', totalScore);
})();
