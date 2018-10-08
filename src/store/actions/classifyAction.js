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