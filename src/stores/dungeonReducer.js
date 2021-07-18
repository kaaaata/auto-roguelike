import { cloneDeep } from "lodash";
import { traverseDungeonMap } from "../gameplay/traverseDungeonMap";

const genInitialState = () => ({
  characters: Array(6).fill(null),
  dungeonMap: [],
  dungeonLevel: 1,
  path: [],
  dungeonMapRewards: [],
  combatRewards: []
});

export const dungeonReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'SET_ALLIES':
      return {
        ...state,
        characters: [...action.payload, state.characters.slice(3)]
      };
    case 'SET_ENEMIES':
      return {
        ...state,
        characters: [...state.characters.slice(0, 3), ...action.payload]
      };
    case 'SET_CHARACTER_STATS': {
      // action.payload: { [index]: { hp, shields, etc. } }
      const newCharacters = state.characters.map(i => ({
        ...i,
        hpDifferential: 0,
        shieldsDifferential: 0
      }));
      Object.keys(action.payload).forEach(index => {
        newCharacters[index] = { ...newCharacters[index], ...action.payload[index] };
        if (action.payload[index].hasOwnProperty('hp')) {
          newCharacters[index].hpDifferential = action.payload[index].hp - state.characters[index].hp;
        }
        if (action.payload[index].hasOwnProperty('shields')) {
          newCharacters[index].shieldsDifferential = action.payload[index].shields - state.characters[index].shields;
        }
      });
      return {
        ...state,
        characters: newCharacters
      };
    }
    case 'SET_MAP':
      return {
        ...state,
        dungeonMap: action.payload.map,
        dungeonLevel: action.payload.level,
        characters: [...state.characters.slice(0, 3), null, null, null],
        path: traverseDungeonMap(action.payload.map, { x: 0, y: 0 })
      };
    case 'SET_MAP_EVENT_COMPLETE': {
      if (state.dungeonMap[action.payload.y][action.payload.x].event) {
        const newMap = cloneDeep(state.dungeonMap);
        newMap[action.payload.y][action.payload.x].event.isComplete = true;
        return {
          ...state,
          dungeonMap: newMap
        };
      } else {
        return state;
      }
    }
    case 'SET_PLAYER_MAP_PATH':
      return {
        ...state,
        path: traverseDungeonMap(state.dungeonMap, state.path[state.path.length - 1])
      };
    case 'ADD_DUNGEON_MAP_REWARDS':
      return {
        ...state,
        dungeonMapRewards: [...state.dungeonMapRewards, ...action.payload]
      };
    case 'INITIALIZE_COMBAT': {
      const { x, y } = state.path[state.path.length - 1];
      const enemies = state.dungeonMap[y][x].event.value.enemies;
      const rewards = state.dungeonMap[y][x].event.value.rewards;
      return {
        ...state,
        characters: [...state.characters.slice(0, 3), ...enemies],
        combatRewards: rewards
      };
    }
    default:
      return state;
  }
};
