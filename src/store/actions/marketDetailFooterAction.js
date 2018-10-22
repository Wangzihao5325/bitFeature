import * as types from '../actionType';

export function market_detail_footer_screen_change(screenName) {
  return (dispatch) => {
    dispatch({
      type: types.MARKET_DETAIL_SCREEN_CHANGE,
      nowScreen: screenName
    });
  }
}