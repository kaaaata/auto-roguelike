import { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from './stores/actions';
import { FlexContainer, Spacer, Text } from './particles'
import { random, sum } from 'lodash';
import { CombatVictoryModal } from './CombatVictoryModal';
import { CombatCharacter } from './CombatCharacter';
import { controls } from './constants/controls';

// combat positioning of characters by characters array index:
//   1  3
// 0      5
//   2  4
const genTurnOrder = () => [1, 2, 0, 3, 4, 5];
const genDamageWithVolatility = (damage) => {
  const volatility = 1 + ~~(damage / 5);
  return random(damage - volatility, damage + volatility);
};
let turnOrder = genTurnOrder();

const CombatComponent = ({ characters, dungeonMapCurrentRoom, didYouWin, didEnemyWin }) => {
  const dispatch = useDispatch();

  const [attackerIndex, setAttackerIndex] = useState(turnOrder[0]);
  const [spriteActions, setSpriteActions] = useState(Array(6).fill('idle'));

  useEffect(() => {
    turnOrder = genTurnOrder();
    setAttackerIndex(turnOrder[0]);
  }, [dungeonMapCurrentRoom]);

  // this is the combat loop
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!didYouWin && !didEnemyWin) {
        const damageDealt = genDamageWithVolatility(characters[attackerIndex].damage);
        const isAttackerEnemy = characters[attackerIndex].isEnemy;
        let targetIndex;
        if (isAttackerEnemy) {
          if (characters[1].hp && characters[2].hp) {
            targetIndex = random(1, 2);
          } else if (!characters[1].hp && !characters[2].hp) {
            targetIndex = 0;
          } else {
            targetIndex = characters[1].hp ? 1 : 2
          }
        } else {
          if (characters[3].hp && characters[4].hp) {
            targetIndex = random(3, 4);
          } else if (!characters[3].hp && !characters[4].hp) {
            targetIndex = 5;
          } else {
            targetIndex = characters[3].hp ? 3 : 4;
          }
        }
        const targetShieldDamage = characters[targetIndex].shields
          ? Math.min(characters[targetIndex].shields, damageDealt)
          : 0;
        const newTargetShields = characters[targetIndex].shields - targetShieldDamage;
        const newTargetHp = Math.max(0, characters[targetIndex].hp - damageDealt + targetShieldDamage);
        if (!newTargetHp) {
          turnOrder = turnOrder.filter(i => i !== targetIndex);
        }
        const newSpriteActions = Array(6).fill('idle');
        newSpriteActions[attackerIndex] = 'attack';
        setSpriteActions(newSpriteActions);
        dispatch(actions.dungeonSetCharacterStats({
          [targetIndex]: { hp: newTargetHp, shields: newTargetShields }
        }));
        setAttackerIndex(attackerIndex === turnOrder[turnOrder.length - 1]
          ? turnOrder[0]
          : turnOrder[turnOrder.indexOf(attackerIndex) + 1]
        );
      } else {
        setSpriteActions(Array(6).fill('idle'));
      }
    }, controls.msPerTick);
    return () => clearTimeout(timeout);
  }, [attackerIndex, characters, didEnemyWin, didYouWin, dispatch]);

  const spriteActionOverrides = spriteActions;
  characters.forEach((i, index) => {
    if (!i.hp) {
      spriteActionOverrides[index] = 'death';
    }
  });

  return (
    <FlexContainer justifyContent='center'>
      <FlexContainer justifyContent='center' alignItems='center'>
        <CombatCharacter spriteAction={spriteActionOverrides[0]} {...characters[0]} />
        <div>
          <CombatCharacter spriteAction={spriteActionOverrides[1]} {...characters[1]} />
          <CombatCharacter spriteAction={spriteActionOverrides[2]} {...characters[2]} />
        </div>
      </FlexContainer>
      <FlexContainer className='p2_container' justifyContent='center' alignItems='center'>
        <div>
          <CombatCharacter spriteAction={spriteActionOverrides[3]} {...characters[3]} />
          <CombatCharacter spriteAction={spriteActionOverrides[4]} {...characters[4]} />
        </div>
        <CombatCharacter spriteAction={spriteActionOverrides[5]} {...characters[5]} />
      </FlexContainer>
    </FlexContainer>
  );
};

export const Combat = () => {
  const dispatch = useDispatch();
  const { characters, dungeonMapCurrentRoom, dungeonMap, isInLastRoom } = useSelector(state => ({
    characters: state.dungeonReducer.characters,
    dungeonMapCurrentRoom: state.dungeonReducer.dungeonMapCurrentRoom,
    dungeonMap: state.dungeonReducer.dungeonMap,
    isInLastRoom: state.dungeonReducer.dungeonMapCurrentRoom === state.dungeonReducer.dungeonMap.length - 1
  }), shallowEqual);
  const room = dungeonMap[dungeonMapCurrentRoom];

  const [showCombatVictoryModal, setShowCombatVictoryModal] = useState(false);

  const didYouWin = !sum(characters.slice(3).map(i => i.hp));
  const didEnemyWin = !sum(characters.slice(0, 3).map(i => i.hp));

  const collectBattleRewards = () => {
    if (room.gold) {
      dispatch(actions.playerAdjustGold(room.gold));
    }
    if (didYouWin && isInLastRoom) {
      console.log('You beat the dungeon!');
    } else {
      setShowCombatVictoryModal(false);
      dispatch(actions.dungeonGoToNextRoom());
    }
  };

  useEffect(() => {
    if (didYouWin || didEnemyWin) {
      dispatch(actions.dungeonSetCharacterStats({})); // kind of a hack, to reset damage numbers
      setTimeout(() => setShowCombatVictoryModal(true), 1000);
    }
  }, [didEnemyWin, didYouWin, dispatch]);

  return (
    <>
      <Text type='title' centered>Room {dungeonMapCurrentRoom + 1} / {dungeonMap.length}</Text>
      <Spacer height={20} />
      <CombatComponent
        characters={characters}
        didYouWin={didYouWin}
        didEnemyWin={didEnemyWin}
        dungeonMapCurrentRoom={dungeonMapCurrentRoom}
      />
      {showCombatVictoryModal ? (
        <CombatVictoryModal
          text={didYouWin ? 'Victory!' : 'Defeat!'}
          room={room}
          closeModal={collectBattleRewards}
        />
      ) : null}
    </>
  );
};
