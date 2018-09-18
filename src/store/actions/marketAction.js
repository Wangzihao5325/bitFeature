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