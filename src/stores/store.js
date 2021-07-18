import { createStore, combineReducers } from 'redux';
import { dungeonReducer } from './dungeonReducer';
import { sceneReducer } from './sceneReducer';
import { playerReducer } from './playerReducer';

export const store = createStore(combineReducers({
  dungeonReducer,
  sceneReducer,
  playerReducer
}));
