import { genDungeonEnemy } from './genDungeonEnemy';

const genDungeonRoom = (level, index) => {
  const rng = Math.random() * 100;
  const room = { index };

  if (false /* rng < 25 */) {
    // treasure room
    room.type = 'treasure';
    room.enemies = null;
  } else {
    // combat room
    room.type = 'combat';
    room.enemies = [genDungeonEnemy(level), genDungeonEnemy(level), genDungeonEnemy(level)];
    room.gold = 3 * (5 + level * 5);
  }

  return room;
}

export const genDungeonMap = (
  level, // number 1-10
  length // 'short'|'medium'|'long'
) => {
  const map = [];
  let totalRooms;
  if (length === 'short') {
    totalRooms = 3;
  } else if (length === 'medium') {
    totalRooms = 5;
  } else if (length === 'long') {
    totalRooms = 7;
  }

  for (let i = 0; i < totalRooms; i++) {
    map.push(genDungeonRoom(level, i));
  }

  return map;
};
