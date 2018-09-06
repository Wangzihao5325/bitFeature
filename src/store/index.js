import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

export default store;