import * as types from '../actionType';

const initialState = {
  isTradeAccountLogin: false,
  loginAccountNum: '',
  forceLine: 0,
  initBalance: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRADE_ACCOUNT_LOGIN:
      return {
        ...state,
        loginAccountNum: action.loginAccountNum,
        forceLine: action.forceLine,
        initBalance: action.initBalance,
        isTradeAccountLogin: true
      };
    default: return state;
  }
};
export default reducer;