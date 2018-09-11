import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import accountReducer from './reducers/accountReducer';

const rootReducer = combineReducers({
  test: testReducer,
  account: accountReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;