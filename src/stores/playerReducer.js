// import { genWorldMap } from '../gameplay/genWorldMap';

const genInitialState = () => ({
  gold: 0,
  planningActivityCaps: {
    scavenge: 1,
    craft: 1,
    search: 1,
    train: 1
  },
  // worldMap: genWorldMap(),
  revealedWorldMapTiles: {},
  completedWorldMapTiles: {},
  playerTile: '0-0'
});

export const playerReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'ADJUST_GOLD':
      return {
        ...state,
        gold: Math.max(0, state.gold + action.payload)
      };
    case 'REVEAL_WORLD_MAP_TILES': {
      const newRevealedWorldMapTiles = { ...state.revealedWorldMapTiles };
      action.payload.forEach(key => {
        newRevealedWorldMapTiles[key] = true;
      });
      return {
        ...state,
        revealedWorldMapTiles: newRevealedWorldMapTiles
      };
    }
    case 'COMPLETE_WORLD_MAP_TILE':
      return {
        ...state,
        completedWorldMapTiles: { ...state.completedWorldMapTiles, [action.payload]: true }
      };
    case 'SET_PLAYER_TILE':
      return {
        ...state,
        playerTile: action.payload
      };
    default:
      return state;
  }
};
