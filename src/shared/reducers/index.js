import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import entities from './entities';
import users from './serviceUsers';

export default combineReducers({
  entities,
  users,
  form: formReducer,
});
