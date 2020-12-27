# gold-mine

Riipen's technical interview "Gold Mine" problem.

# Problem

Given a gold mine of n * m dimensions, each field in this mine contains a positive integer
which is the amount of gold. Initially the miner is at first column but can be at any row.
The miner can only move right, diagonally right and up, or diagonally right and down.

Design an algorithm to collect the most gold possible on any given mine.

If the miner leaves the mine for any reason (goes outside the dimensions of the mine), the run
will cease and the final score will be the current score.

If the miner lands on a section of the mine that has zero gold (an integer value of 0), the
run will cease and the final score will be the current score.

# Setup

## Node

1. Install `nvm` via the instructions [here](https://github.com/nvm-sh/nvm#installation-and-update), something like:

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/${VERSION}/install.sh | bash
```

2. Install `node 10.16.3` (currently latest LTS):

```bash
nvm install --lts
nvm use --lts
```

4. Upgrade npm and install local dependencies:

```bash
npm install npm@latest -g
npm install
```

## Run

To run the miner through the mine:

```bash
$ npm start
```

This will give you your score per mine, as well as your final score.

# Your Work

The current naive approach to mining can be found in `src/runner.js` inside of the
`move` function. Your job will be to improve upon the existing implementation in order
to collect as much gold as possible.

Feel free to add any technologies you wish to the code base. This could include:

1. New `npm` packages
2. Testing frameworks
3. Documentation generation tools
4. Linting tools
5. etc.

You will be judged not only on your final score, but your ability to explain your logic
behind choices you make in implementation, as well as code quality.
