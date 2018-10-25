import * as types from '../../actionType';
import { CHART_DATA_LIMITED } from '../../../global/config';
import _ from 'lodash';
import store from '../../../store/index';
import moment from 'moment';
let dotSize = 2;
let isReady = 0;
export function action_startTimeStore(data) {
  let dataSent = data.Lines;//400
  //to do .... 抽稀
  // let length = dataSent.length;
  // if (length > 400) {
  //   let rate = (length / (length - 400)).toFixed(0);
  //   _.forOwn(dataSent,)
  //   let dataSent = dataSent.filter(function (item, index) { return index % rate !== 0 })
  // }
  // console.log(dataSent);
  if (!dataSent) {
    return (dispatch) => {
      dispatch({
        type: types.TIME_STORE_DEFALUT
      });
    }
  }
  return (dispatch) => {
    dispatch({
      type: types.TIME_STORE_START,
      dataSent: dataSent,
    });
  }
}

export function action_updateTimeStore(rtnObj) {
  isReady++;
  if (isReady < 5) {
    return (dispatch) => {
      dispatch({
        type: types.TIME_STORE_DEFALUT
      });
    }
  }
  const dataSent = rtnObj.data;
  // 用來計算最新點的顏色
  let preSettlePrice = dataSent[10];
  return (dispatch) => {
    dispatch({
      type: types.TIME_STORE_UPDATE,
      dataSent: dataSent,
      preSettlePrice: preSettlePrice
    });
  }
}