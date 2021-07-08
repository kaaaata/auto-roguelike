const genInitialState = () => ({
  gold: 0
});

export const playerReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'ADJUST_GOLD':
      return {
        ...state,
        gold: Math.max(0, state.gold + action.payload)
      };
    default:
      return state;
  }
};
