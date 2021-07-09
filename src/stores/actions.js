export const dungeonSetAllies = payload => ({ type: 'SET_ALLIES', payload });
export const dungeonSetEnemies = payload => ({ type: 'SET_ENEMIES', payload });
export const dungeonSetCharacterStats = payload => ({ type: 'SET_CHARACTER_STATS', payload });
export const dungeonSetMap = payload => ({ type: 'SET_MAP', payload });
export const dungeonGoToNextRoom = payload => ({ type: 'GO_TO_NEXT_ROOM', payload });

export const sceneSetScene = payload => ({ type: 'SET_SCENE', payload });

export const playerAdjustGold = payload => ({ type: 'ADJUST_GOLD', payload });

export const rewardsReceiveRewards = payload => ({ type: 'RECEIVE_REWARDS', payload });
