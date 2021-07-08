import { createStore, combineReducers } from 'redux';
import { dungeonReducer } from './dungeonReducer';
import { sceneReducer } from './sceneReducer';
import { playerReducer } from './playerReducer';
import { rewardsReducer } from './rewardsReducer';

export const store = createStore(combineReducers({
  dungeonReducer,
  sceneReducer,
  playerReducer,
  rewardsReducer
}));
