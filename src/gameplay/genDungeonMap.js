import { flatten, random, range, sampleSize, shuffle, some } from 'lodash';
import { genDungeonEnemy } from './genDungeonEnemy';

const dungeonContentsBySize = {
  5: {
    coins: 5,
  },
  7: {
    coins: 7,
  },
  9: {
    coins: 9
  }
};

// generates a maze of length and width = size, with encounters of chosen level.
// every tile in the maze is reachable, and there are no loops.
export const genDungeonMap = (size, level) => {
  // null indicates there's nothing there. at the end of the algorithm, there will be no nulls.
  const nodes = Array(size).fill(null).map(i => Array(size).fill(null));
  // misc. variables to keep track of game logic. not necessary for maze algo

  // initialize first node
  nodes[0][0] = {
    walls: {
      top: true,
      right: true,
      bottom: true,
      left: true,
    },
    isTerminal: false,
    depth: 0,
    event: null
  };

  // primary iteration mechanism
  const nodesToCreate = [];

  // inner loop creates one single path through the maze, until it reaches a dead end.
  // outer loop "breaks a wall" whenever inner loop reaches a dead end,
  // and then executes inner loop repeatedly, until all tiles are filled.
  while (some(nodes, col => col.includes(null))) {
    // find a tile with an open adjacent tile
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (
          // if there is at least one open adjacent tile
          (
            y - 1 >= 0 && !nodes[y - 1][x])
          || (x + 1 < size && !nodes[y][x + 1])
          || (y + 1 < size && !nodes[y + 1][x])
          || (x - 1 >= 0 && !nodes[y][x - 1])
        ) {
          nodesToCreate.push({ x, y, depth: 0 });
          // break loop
          y = size;
          x = size;
        }
      }
    }

    // starting at that tile, draw a path until a dead end is reached
    while (nodesToCreate.length) {
      const { x, y, depth } = nodesToCreate.shift();

      let possibleMoves = [
        (y - 1 >= 0 && !nodes[y - 1][x]) ? { direction: 'top', x, y: y - 1 } : null,
        (x + 1 < size && !nodes[y][x + 1]) ? { direction: 'right', x: x + 1, y } : null,
        (y + 1 < size && !nodes[y + 1][x]) ? { direction: 'bottom', x, y: y + 1 } : null,
        (x - 1 >= 0 && !nodes[y][x - 1]) ? { direction: 'left', x: x - 1, y } : null
      ].filter(Boolean);

      // if no possible moves, or if it's the final node, mark it as terminal.
      // end node being terminal ensures no content is blocked off by the final node.
      if (!possibleMoves.length || (x === size - 1 && y === size - 1)) {
        nodes[y][x].isTerminal = true;
        continue;
      }

      // randomly determine whether a tile has 0, 1, or 2 walls.
      // doing this creates a more "open" maze layout,
      // compared to if you only "opened" the maze layout from the outer loop.
      let numMoves;
      const rng = Math.random();
      if (rng < 0.05 && possibleMoves.length <= 3) {
        numMoves = 3;
      } else if (rng < 0.2 && possibleMoves.length <= 2) {
        numMoves = 2;
      } else {
        numMoves = 1;
      }
      possibleMoves = sampleSize(possibleMoves, numMoves);

      // utilize breadth first traversal to fill tiles
      // breadth first allows for more "open" layouts.
      // depth first causes single paths to be longer, causing the layout to appear more "closed".
      possibleMoves.forEach(move => {
        nodes[y][x].walls[move.direction] = false;
        nodes[move.y][move.x] = {
          walls: {
            top: move.direction !== 'bottom',
            right: move.direction !== 'left',
            bottom: move.direction !== 'top',
            left: move.direction !== 'right',
          },
          isTerminal: false,
          depth: depth + 1,
          event: null
        };
        nodesToCreate.push({ x: move.x, y: move.y, depth: depth + 1 });
      });
    }
  }

  // put random events on the map
  const availableEventNodes = shuffle(flatten(range(0, size).map(x => range(0, size).map(y => ({ x, y })))))
    .filter(i => !(i.x === 0 && i.y === 0) && !(i.x === size - 1 && i.y === size - 1));
  // coins
  for (let i = 0; i < dungeonContentsBySize[size].coins; i++) {
    const { x, y } = availableEventNodes.pop();
    nodes[y][x].event = { type: 'coins', value: random(5, 10), isComplete: false };
  }
  // test battle tile
  nodes[0][1].event = {
    type: 'combat',
    value: {
      enemies: [genDungeonEnemy(level), genDungeonEnemy(level), genDungeonEnemy(level)],
      rewards: [{ type: 'coins', value: random(15, 30) }]
    },
    isComplete: false
  };
  nodes[1][0].event = {
    type: 'combat',
    value: {
      enemies: [genDungeonEnemy(level), genDungeonEnemy(level), genDungeonEnemy(level)],
      rewards: [{ type: 'coins', value: random(15, 30) }]
    },
    isComplete: false
  };
  
  return nodes;
};
