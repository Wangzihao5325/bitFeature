import * as types from '../actionType';

const initialState = {
  isLogin: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN: 
      return {
        ...initialState,
        isLogin:true
      };
    case types.LOG_OUT: 
      return {
        ...initialState,
        isLogin:false
      };
    default: return state;
  }
};
export default reducer;