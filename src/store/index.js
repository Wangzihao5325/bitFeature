import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import accountReducer from './reducers/accountReducer';
import marketReducer from './reducers/marketReducer';
import customServiceReducer from './reducers/customServiceReducer';
import capitalDetailReducer from './reducers/capitalDetailReducer';
import tradeAccountReducer from './reducers/tradeAccountReducer';
import classifyReducer from './reducers/classifyReducer';
import marketDetailsReducer from './reducers/markDetailsReducer';
import KReducer from './reducers/chartReducers/KReducer';

const rootReducer = combineReducers({
  test: testReducer,
  account: accountReducer,
  market: marketReducer,
  customService: customServiceReducer,
  capitalDetail: capitalDetailReducer,
  tradeAccount: tradeAccountReducer,
  contractClassify: classifyReducer,
  marketDetail: marketDetailsReducer,
  KStore:KReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;