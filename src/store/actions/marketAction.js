/**
 *  Copyright © 2017 - 2018 Zihao . All rights reserved.
 *  Author: Zihao Wong
 *  E-mail: zihao_coding@qq.com
 */
import * as types from '../actionType';

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
  let contract_name = data.contract_info.commodity_no + data.contract_info.contract_no;
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_MARKET_STORE,
      contractName: contract_name,
      newData: {                      //此处与marketReducer中的objCreate结构相对应，后面直接合并
        height: data.high,
        low: data.low,
        last: data.last,
        volume: data.volume,
        position: data.position,
        last_volume: data.last_vol,
        pre_close: data.pre_closing,
        pre_settle: data.pre_settle,
        ask: data.ask,
        bid: data.bid,
        change_rate:data.change_rate,
        change_value:data.change_value
      }
    });
  }
}