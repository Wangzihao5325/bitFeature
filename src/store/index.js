import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import accountReducer from './reducers/accountReducer';
import marketReducer from './reducers/marketReducer';
import customServiceReducer from './reducers/customServiceReducer';

const rootReducer = combineReducers({
  test: testReducer,
  account: accountReducer,
  market: marketReducer,
  customService: customServiceReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;