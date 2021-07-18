import { every } from 'lodash';

/*
takes an array of arrays containing nodes like this:
{
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
and a startpoint { x, y }
outputs an array of coordinates { x, y } representing a path between:
startpoint and the nearest tile with an event,
or, if all events are completed, between startpoint and endpoint.

traversal is breadth-first, to return the shortest possible distance between startpoint and nearest event.
*/
export const traverseDungeonMap = (nodes, startpoint) => {
  const paths = [[startpoint]];
  const shouldSeekEndpoint = every(nodes, col => every(col, i => !i.event || (i.event && i.event.isComplete)));
  const endpoint = { x: nodes.length - 1, y: nodes.length - 1 }; // assume map is a square
  const traversedNodes = {};
  for (let i = 0; i < nodes.length; i++) {
    traversedNodes[i] = {};
  }

  let counter = 0;

  while (counter < 100) {
    counter++;
    const path = paths.shift();
    const lastNodeX = path[path.length - 1].x;
    const lastNodeY = path[path.length - 1].y;
    const lastNodeWalls = nodes[lastNodeY][lastNodeX].walls;

    const possibleMoves = [
      !lastNodeWalls.top && !traversedNodes[lastNodeY - 1][lastNodeX] && { x: lastNodeX, y: lastNodeY - 1 },
      !lastNodeWalls.right && !traversedNodes[lastNodeY][lastNodeX + 1] && { x: lastNodeX + 1, y: lastNodeY },
      !lastNodeWalls.bottom && !traversedNodes[lastNodeY + 1][lastNodeX] && { x: lastNodeX, y: lastNodeY + 1 },
      !lastNodeWalls.left && !traversedNodes[lastNodeY][lastNodeX - 1] && { x: lastNodeX - 1, y: lastNodeY }
    ].filter(Boolean);

    for (let i = 0; i < possibleMoves.length; i++) {
      const newNode = { x: possibleMoves[i].x, y: possibleMoves[i].y };
      traversedNodes[newNode.y][newNode.x] = true;
      const newPath = [...path, newNode];
      paths.push(newPath);
      if (
        (shouldSeekEndpoint && endpoint.x === newNode.x && endpoint.y === newNode.y)
        || (!shouldSeekEndpoint && nodes[newNode.y][newNode.x].event && !nodes[newNode.y][newNode.x].event.isComplete)
      ) {
        return newPath;
      }
    }
  }
};
