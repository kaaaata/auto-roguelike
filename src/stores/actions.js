export const dungeonSetAllies = payload => ({ type: 'SET_ALLIES', payload });
export const dungeonSetEnemies = payload => ({ type: 'SET_ENEMIES', payload });
export const dungeonSetCharacterStats = payload => ({ type: 'SET_CHARACTER_STATS', payload });
export const dungeonSetMap = payload => ({ type: 'SET_MAP', payload });
export const dungeonSetMapEventComplete = payload => ({ type: 'SET_MAP_EVENT_COMPLETE', payload });
export const dungeonSetPlayerMapPath = payload => ({ type: 'SET_PLAYER_MAP_PATH', payload });
export const dungeonAddMapRewards = payload => ({ type: 'ADD_DUNGEON_MAP_REWARDS', payload });
export const dungeonInitializeCombat = payload => ({ type: 'INITIALIZE_COMBAT', payload });

export const sceneSetScene = payload => ({ type: 'SET_SCENE', payload });
export const sceneDrawCurtain = payload => ({ type: 'DRAW_CURTAIN', payload });

export const playerAdjustGold = payload => ({ type: 'ADJUST_GOLD', payload });
export const playerRevealWorldMapTiles = payload => ({ type: 'REVEAL_WORLD_MAP_TILES', payload });
export const playerCompleteWorldMapTile = payload => ({ type: 'COMPLETE_WORLD_MAP_TILE', payload });
export const playerSetPlayerTile = payload => ({ type: 'SET_PLAYER_TILE', payload });
