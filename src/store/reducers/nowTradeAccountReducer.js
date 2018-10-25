import * as types from '../actionType';

const initialState = {
  isTradeAccountLogin: false,
  loginAccountNum: '',
  forceLine: 0,
  initBalance: 0,             //总资产
  canUse: 0,                  //余额
  deposit: 0,                 //保证金
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
    case types.TRADE_QUERY_ACCOUNT:
      return {
        ...state,
        initBalance: action.initBalance,
        canUse: action.canUse,
        deposit: action.deposit,
      };
    default: return state;
  }
};
export default reducer;