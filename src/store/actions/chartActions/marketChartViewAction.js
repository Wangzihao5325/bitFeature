import * as types from '../../actionType';

export function market_chart_view_screen_change(chartName) {
  return (dispatch) => {
    dispatch({
      type: types.CHART_VIEW_SCREEN_CHANGE,
      nowChart: chartName
    });
  }
}