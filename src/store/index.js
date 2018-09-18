import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import accountReducer from './reducers/accountReducer';
import marketReducer from './reducers/marketReducer';

const rootReducer = combineReducers({
  test: testReducer,
  account: accountReducer,
  market: marketReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;