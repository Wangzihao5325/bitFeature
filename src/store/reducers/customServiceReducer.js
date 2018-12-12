import * as types from '../actionType';

const initialState = {
  isShow: false,
  navi: null,
  tradeFlashLoginIsshow: false,
  tradeFlashLoginWithNaviIsshow: false,
  waitModelIsshow: false
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
    default: return state;
  }
};
export default reducer;