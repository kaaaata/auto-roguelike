const genInitialState = () => ({
  gold: null
});

export const rewardsReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'SET_REWARDS':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
