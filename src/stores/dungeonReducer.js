const genInitialState = () => ({
  characters: Array(6).fill(null),
  dungeonMap: [],
  dungeonMapCurrentRoom: 0,
  isDungeonCleared: false
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
        dungeonMap: action.payload,
        dungeonMapCurrentRoom: 0,
        characters: [...state.characters.slice(0, 3), ...action.payload[0].enemies]
      };
    case 'GO_TO_NEXT_ROOM': {
      const newCharacters = [
        ...state.characters.slice(0, 3).map(i => ({ ...i, shields: i.maxShields })),
        ...state.dungeonMap[state.dungeonMapCurrentRoom + 1].enemies
      ];
      // do we need to manipulate hpDifferential/shieldDifferential here?
      return {
        ...state,
        dungeonMapCurrentRoom: state.dungeonMapCurrentRoom + 1,
        characters: newCharacters,
      };
    }
    case 'SET_IS_DUNGEON_CLEARED':
      return {
        ...state,
        isDungeonCleared: action.payload
      };
    default:
      return state;
  }
};
