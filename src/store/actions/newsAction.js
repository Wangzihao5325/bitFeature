import * as types from '../actionType';
export function news_page_change(page) {
  return (dispatch) => {
    dispatch({
      page: page,
      type: types.NEWS_PAGE_CHANGE
    });
  }
}