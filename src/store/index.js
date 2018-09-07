import { createStore, combineReducers } from 'redux';
import testReducer from './reducers/testReducer';
import accountReducer from './reducers/accountReducer';
/*  试验后发现android暂时不支持 redux-thunk ,先注销掉
 import {createStore, applyMiddleware} from 'redux';
 import thunkMiddleware from 'redux-thunk';
 const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
 const store = createStoreWithMiddleware(reducer);
*/

const rootReducer = combineReducers({
  test:testReducer,
  account:accountReducer
});

const store = createStore(rootReducer);

export default store;