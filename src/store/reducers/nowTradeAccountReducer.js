import * as types from '../actionType';

const initialState = {
  isTradeAccountLogin: false,
  loginAccountNum: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NO_TRADE_ACCOUNT:
      return {
        ...state,
        isHaveAccount: action.isHaveAccount,
      };
    default: return state;
  }
};
export default reducer;