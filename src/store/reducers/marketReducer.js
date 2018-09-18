/**
 *  Copyright © 2017 - 2018 Zihao . All rights reserved.
 *  Author: Zihao Wong
 *  E-mail: zihao_coding@qq.com
 */

const contractObj = {
  height: 0,                           //最高价
  low: 0,                              //最低价
  last: 0,                             //最新价
  volume: 0,                           //当日成交量
  position: 0,                         //持仓
  last_volume: 0,                      //现量
  pre_close: 0,                        //昨收盘
  pre_settle: 0,                       //昨结算
  contract_info: 'undefine',           //合约名
  ask: [[0, 0]],                       //多档买价
  bid: [[0, 0]]                        //多档卖价
};
const initialState = [
  contractObj
];

const reducer = (state = initialState, action) => {
  return{...state}
}

export default reducer;