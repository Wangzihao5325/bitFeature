import * as types from '../actionType';
import _ from 'lodash';

export function update_classify(mapObj) {
  let classifyArr = _.keys(mapObj);
  classifyArr.unshift('自选');
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_CLASSIFY,
      data: classifyArr,
    });
  }
}

/*行情类别切换（不包括自选行情，自选行情单独处理） */
export function market_page_change(pageText) {
  return (dispatch) => {
    dispatch({
      type: types.MARKET_PAGE_CHANGE,
      page: pageText,
    });
  }
}