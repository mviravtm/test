import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

const devTools = '__REDUX_DEVTOOLS_EXTENSION__';

export const composeEnhancers = () => {
  if (process.env.NODE_ENV === 'production' || !window || !window[devTools]) {
    return compose(applyMiddleware(thunkMiddleware));
  }

  return compose(applyMiddleware(thunkMiddleware), window[devTools]());
};

export const configureStore = () => createStore(rootReducer, composeEnhancers());

export default configureStore();
