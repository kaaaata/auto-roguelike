const genInitialState = () => ({
  scene: null,
  combatTransitionFlipper: false
});

export const sceneReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'SET_SCENE':
      return {
        ...state,
        scene: action.payload
      };
    case 'DRAW_CURTAIN':
      return {
        ...state,
        combatTransitionFlipper: !state.combatTransitionFlipper
      };
    default:
      return state;
  }
};
