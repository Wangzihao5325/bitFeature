import * as types from '../actionType';

const initialState = {
  isHaveAccount: false,
  onTradingAccountList: [],
  endedAccountList: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NO_TRADE_ACCOUNT:
      return {
        ...state,
        isHaveAccount: action.isHaveAccount,
      };
    case types.UPDATE_TRADE_ACCOUNT_LIST:
    console.log('!!!!!!_______!!!!!!!!');
    console.log(action);
      return {
        ...state,
        isHaveAccount: action.isHaveAccount,
        onTradingAccountList: action.onTradingAccountList,
        endedAccountList: action.endedAccountList
      };
    default: return state;
  }
};
export default reducer;