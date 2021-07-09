import { keyBy } from 'lodash';

const allies = [
  {
    name: 'Minotaur',
    isEnemy: false,
    maxHp: 25,
    hpGrowth: 5,
    maxShields: 0,
    shieldsGrowth: 0,
    damage: 6,
    damageGrowth: 1,
    description: 'A minotaur. Beefy and strong, but unarmored.'
  },
  {
    name: 'Arriette',
    isEnemy: false,
    maxHp: 10,
    hpGrowth: 2,
    maxShields: 5,
    shieldsGrowth: 1,
    damage: 4,
    damageGrowth: 1,
    description: 'A heavily armored fighter.'
  },
  {
    name: 'Tiamat',
    isEnemy: false,
    maxHp: 15,
    hpGrowth: 3,
    maxShields: 2,
    shieldsGrowth: 1,
    damage: 5,
    damageGrowth: 1,
    description: 'A lightly armored fighter.'
  },
];

const enemies = [
  {
    name: 'Bat',
    isEnemy: true,
    maxHp: 7,
    hpGrowth: 2,
    maxShields: 0,
    shieldsGrowth: 0,
    damage: 3,
    damageGrowth: 2
  },
  {
    name: 'Plant',
    isEnemy: true,
    maxHp: 10,
    hpGrowth: 3,
    maxShields: 0,
    shieldsGrowth: 0,
    damage: 2,
    damageGrowth: 1
  },
  {
    name: 'Golem',
    isEnemy: true,
    maxHp: 15,
    hpGrowth: 4,
    maxShields: 0,
    shieldsGrowth: 0,
    damage: 1,
    damageGrowth: 1
  }
// ];
].map(i => ({ ...i, maxHp: 1 }));

export const characters = keyBy(
  [...allies, ...enemies].map(i => ({
    ...i,
    hp: i.maxHp,
    shields: i.maxShields,
    level: 1,
    hpDifferential: 0,
    shieldsDifferential: 0,
    needToFlipImage: !i.isEnemy
  })
), 'name');
