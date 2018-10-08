import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import accountReducer from './reducers/accountReducer';
import marketReducer from './reducers/marketReducer';
import customServiceReducer from './reducers/customServiceReducer';
import capitalDetailReducer from './reducers/capitalDetailReducer';
import tradeAccountReducer from './reducers/tradeAccountReducer';

const rootReducer = combineReducers({
  test: testReducer,
  account: accountReducer,
  market: marketReducer,
  customService: customServiceReducer,
  capitalDetail: capitalDetailReducer,
  tradeAccount: tradeAccountReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;