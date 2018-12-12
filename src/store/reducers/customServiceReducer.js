import * as types from '../actionType';

const initialState = {
  isShow: false,
  navi: null,
  tradeFlashLoginIsshow: false,
  tradeFlashLoginWithNaviIsshow: false,
  isMarketRestart: false,
  isTradeRestart: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CUSTOM_CHOOSE_MODEL_SHOW:
      return {
        ...state,
        isShow: true,
        navi: action.navi
      };
    case types.CUSTOM_CHOOSE_MODEL_UNSHOW:
      return {
        ...state,
        isShow: false,
        navi: null
      };
    case types.TRADE_FLASH_LOGIN_SHOW:
      return {
        ...state,
        tradeFlashLoginIsshow: true
      };
    case types.TRADE_FLASH_LOGIN_UNSHOW:
      return {
        ...state,
        tradeFlashLoginIsshow: false
      };
    case types.TRADE_FLASH_LOGIN_WITH_NAVI_UNSHOW:
      return {
        ...state,
        tradeFlashLoginWithNaviIsshow: false
      };
    case types.TRADE_FLASH_LOGIN_WITH_NAVI_SHOW:
      return {
        ...state,
        tradeFlashLoginWithNaviIsshow: true
      };
    case types.WAITING_MARKET_SOCKET_RESTART:
      return {
        ...state,
        isMarketRestart: true
      };
    case types.MARKET_SOCKET_RESTART_DONE:
      return {
        ...state,
        isMarketRestart: false
      };
    case types.WAITING_TRADE_SOCKET_RESTART:
      return {
        ...state,
        isTradeRestart: true
      };
    case types.TRADE_SOCKET_RESTART_DONE:
      return {
        ...state,
        isTradeRestart: false
      };
    default: return state;
  }
};
export default reducer;