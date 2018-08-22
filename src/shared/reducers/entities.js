import { combineReducers } from 'redux';

const createReducer = (state = {}, action, name) => {
  if (action.payload && action.payload.entities && action.payload.entities[name]) {
    return action.payload.entities[name];
  }

  return state;
};

const users = (state = {}, action) => createReducer(state, action, 'users');

const entities = combineReducers({
  users,
});

export default entities;
