import fs from "fs";
import path from "path";
import requireDirectory from "require-directory";

import config from "./config.js";
import runner from "./src/runner.js";
import validator from "./src/validator.js";

const LOG_DIR = "logs";

/**
 * Given a file name, deletes any existing file and creates a new blank one.
 *
 * @param  {string} logFile - The name of the file to delete and re-create.
 *
 * @return {undefined}
 */
const resetLogFile = logFile => {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
  }

  fs.writeFileSync(logFile, "");
};

/**
 * Given a mine, a name, and a logFile, runs the miner through the mine.
 *
 * @param  {array} mine - A n x m multidimensional array respresenting the mine.
 * @param  {string} name - The name of the mine.
 *
 * @return {number} The score achieved in the mine.
 */
const runMine = async (mine, name) => {
  const logFile = path.join(__dirname, LOG_DIR, `${name}.txt`);

  resetLogFile(logFile);

  const mineScore = await runner.run(mine, logFile, config.yStart[name] || 0);
  const valid = await validator.validate(mine, logFile, mineScore);

  if (valid) {
    console.log(`Mine '${name}' score:`, mineScore);
    return mineScore;
  }

  console.log("No cheating!");
  return 0;
};

(async () => {
  console.log("Riipen Gold Miner");

  // Keep track of the total score.
  let totalScore = 0;

  if (process.argv.slice(2).length > 0) {
    // Run a single mine
    const name = process.argv.slice(2)[0];

    try {
      const mine = require(`./mines/${name}.js`).default;

      totalScore += await runMine(mine, name);
    } catch (error) {
      console.error("Invalid mine name");
    }
  } else {
    // Run all mines
    const mines = requireDirectory(module, "./mines");

    await Promise.all(
      Object.keys(mines).map(async key => {
        const mine = mines[key].default;

        totalScore += await runMine(mine, key);
      })
    );
  }

  console.log("Final score:", totalScore);
})();
