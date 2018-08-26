import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers/reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));
  return store;
};