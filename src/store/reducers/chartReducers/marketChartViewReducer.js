import * as types from '../../actionType';

const initialState = {
  nowChart: '分时',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHART_VIEW_SCREEN_CHANGE:
      return {
        ...state,
        nowChart: action.nowChart,
      };
    default: return state;
  }
};
export default reducer;