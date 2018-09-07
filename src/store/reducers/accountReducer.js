import * as types from '../actionType';

const initialState = {
  isLogin: false,
  user: '请您先登陆',
  balance: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN:
      return {
        ...initialState,
        isLogin: true,
        user:'王子豪',
        balance:100000
      };
    case types.LOG_OUT:
      return {
        ...initialState,
        isLogin: false,
        user: '请您先登陆',
        balance: 0
      };
    default: return state;
  }
};
export default reducer;