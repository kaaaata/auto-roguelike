const genInitialState = () => ({
  rewards: []
});

export const rewardsReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'RECEIVE_REWARDS':
      return {
        ...state,
        rewards: [...state.rewards, ...action.payload]
      };
    default:
      return state;
  }
};
