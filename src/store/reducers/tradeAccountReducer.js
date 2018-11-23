import * as types from '../actionType';

const initialState = {
  page: '已结算',
  isHaveAccount: false,
  onTradingAccountList: [],
  endedAccountList: [],
  tradedDetailPage: '历史成交记录',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NO_TRADE_ACCOUNT:
      return {
        ...state,
        isHaveAccount: action.isHaveAccount,
      };
    case types.UPDATE_TRADE_ACCOUNT_LIST:
      return {
        ...state,
        isHaveAccount: action.isHaveAccount,
        onTradingAccountList: action.onTradingAccountList,
        endedAccountList: action.endedAccountList
      };
    case types.ACCOUNT_LIST_PAGE_CHANGE:
      return {
        ...state,
        page: action.page,
      };
    case types.ACCOUNT_LIST_PAGE_RESET:
      return {
        ...state,
        page: action.page,
      };
    case types.ACCOUNT_LIST_TRADED_PAGE_CHANGE:
      return {
        ...state,
        tradedDetailPage: action.tradedDetailPage,
      };
    case types.ACCOUNT_LIST_TRADED_PAGE_RESET:
      return {
        ...state,
        tradedDetailPage: action.tradedDetailPage,
      };
    default: return state;
  }
};
export default reducer;