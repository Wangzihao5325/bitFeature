import { createStore } from 'redux';
import reducer from './reducer';
/*  试验后发现android暂时不支持 redux-thunk ,先注销掉
 import {createStore, applyMiddleware} from 'redux';
 import thunkMiddleware from 'redux-thunk';
 const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
 const store = createStoreWithMiddleware(reducer);
*/
const store = createStore(reducer);

export default store;