/**
 *  Copyright © 2017 - 2018 Zihao . All rights reserved.
 *  Author: Zihao Wong
 *  E-mail: zihao_coding@qq.com
 */
import * as types from '../actionType';
import _ from 'lodash';
import { contractMap2I18nName } from '../../global/commodity_list';

function objCreate(name) {
  return (
    {
      height: 0,                           //最高价
      low: 0,                              //最低价
      last: 0,                             //最新价
      volume: 0,                           //当日成交量
      position: 0,                         //持仓
      last_volume: 0,                      //现量
      pre_close: 0,                        //昨收盘
      pre_settle: 0,                       //昨结算
      contract_name: name,                 //合约编码
      contract_i18n_name: 'undefined',     //合约名
      ask: [[0, 0]],                       //多档买价
      bid: [[0, 0]]                        //多档卖价
    }
  );
}
const initialState = {
  undefine_contract: objCreate('undefine_contract')
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_MARKET_STORE:
      let originState = {};
      let originDate = action.data;
      originDate.forEach(function (item) {
        let obj = _.set({}, item, objCreate(item));
        _.assign(obj[item], { contract_i18n_name: contractMap2I18nName[item] });
        _.assign(originState, obj);
      });
      //console.log(originState);     // ... debug log
      return originState;
    case types.UPDATE_MARKET_STORE:
      let contractName = action.contractName;
      _.update(state, `${contractName}`, function (itemObj) { return (_.assign(itemObj, action.newData)); })
      //console.log(state);          // ... debug log
      return state;
    default:
      return state;
  }
}

export default reducer;