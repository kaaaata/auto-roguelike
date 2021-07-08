import { random, sample } from 'lodash';
import { characters } from '../constants';

const enemies = Object.values(characters).filter(i => i.isEnemy);

export const genDungeonEnemy = (level) => {
  const enemy = sample(enemies);

  let enemyHp = enemy.maxHp;
  let enemyDamage = enemy.damage;

  // simulate leveling up and gaining random stats
  for (let i = 1; i < level; i++) {
    enemyHp += random(enemy.hpGrowth, enemy.hpGrowth + 2);
    enemyDamage += random(enemy.damageGrowth, enemy.damageGrowth + 1);
  }
  
  return {
    ...enemy,
    hp: enemyHp,
    maxHp: enemyHp,
    damage: enemyDamage,
    level
  };
};
