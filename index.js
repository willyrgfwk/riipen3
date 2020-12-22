import fs from 'fs';
import requireDirectory from 'require-directory';

import config from './config.js';
import runner from './src/runner.js';

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

  // Key track of the total score.
  let totalScore = 0;

  // Load all maps
  const maps = requireDirectory(module, './maps');

  // Run each map
  await Promise.all(Object.keys(maps).map(async (key) => {
    const map = maps[key].default;

    const logFile = `./logs/${key}.txt`;

    resetLogFile(logFile);

    const mapScore = await runner.run(map, logFile, config.yStart[key] || 0);

    console.log(`Map '${key}' score:`, mapScore);

    totalScore += mapScore;
  }));

  console.log('Final score:', totalScore);
})();
