/**
 *  Copyright © 2017 - 2018 Zihao . All rights reserved.
 *  Author: Zihao Wong
 *  E-mail: zihao_coding@qq.com
 */
import * as types from '../actionType';
import _ from 'lodash';
/*根据list初始化store的数据结构
list:[{
      'security_type': 'FUT_OUT',
      'exchange_no': 'CME',
      'commodity_no': 'CD',
      'contract_no': '1812'
      }, ... ]
*/
export function action_storeinit(list) {
  let reg_list = list.map(function (item) { return (item.commodity_no + item.contract_no); });
  return (dispatch) => {
    dispatch({
      type: types.INIT_MARKET_STORE,
      data: reg_list
    });
  }
}

export function action_updateStore(rtnParams) {
  let data = rtnParams.data;
  let regArr = data[0].split('_');
  regArr.shift();
  let contract_name = _.join(regArr, '');
  let change_value = data[3] - data[10];
  let change_rate = change_value * 100 / data[10];
  let time = data[1];
  let open = data[2];
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_MARKET_STORE,
      contractName: contract_name,
      newData: {                      //此处与marketReducer中的objCreate结构相对应，后面直接合并
        height: data[4],
        low: data[5],
        last: data[3],
        volume: data[6],
        position: data[7],
        last_volume: data[8],
        pre_close: data[9],
        pre_settle: data[10],
        ask1: [data[11], data[12]],
        bid1: [data[13], data[14]],
        change_rate: change_rate,
        change_value: change_value,
        open: open,
        time: time
      }
    });
  }
}

export function action_updateAskAndBid(rtnParams) {
  let dataArr = rtnParams.data;
  let nameStr = dataArr[0];
  let regArr = nameStr.split('_');
  regArr.shift();
  let contract_name = _.join(regArr, '');
  let level = dataArr[2];
  let askKey = 'ask' + level;
  let bidKey = 'bid' + level;
  let obj = {};
  obj[askKey] = [dataArr[3], dataArr[4]];
  obj[bidKey] = [dataArr[5], dataArr[6]];
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_MARKET_STORE_ASKANDBID,
      contractName: contract_name,
      newData: obj
    });
  }
}