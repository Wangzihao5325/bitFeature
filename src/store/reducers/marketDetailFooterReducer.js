import * as types from '../actionType';

const initialState = {
  nowScreen: '逐笔明细',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MARKET_DETAIL_SCREEN_CHANGE:
      return {
        ...state,
        nowScreen: action.nowScreen,
      };
    default: return state;
  }
};
export default reducer;