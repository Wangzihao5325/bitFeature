/**
 *  Copyright © 2017 - 2018 Zihao . All rights reserved.
 *  Author: Zihao Wong
 *  E-mail: zihao_coding@qq.com
 */
import * as types from '../actionType';
import _ from 'lodash';

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
      change_rate: 0,                      //价格变化率
      change_value: 0,                     //价格变化量
      ask1: [0, 0],                        //1档卖价
      bid1: [0, 0],                        //1档买价
      ask2: [0, 0],                        //2档卖价
      bid2: [0, 0],                        //2档买价
      ask3: [0, 0],                        //3档卖价
      bid3: [0, 0],                        //3档买价
      ask4: [0, 0],                        //4档卖价
      bid4: [0, 0],                        //4档买价
      ask5: [0, 0],                        //5档卖价
      bid5: [0, 0],                        //5档买价
    }
  );
}
/*数据分为两部分变化部分和 配置部分（contractMap2Config）两边在初始状态要对齐 */
const initialState = {
  undefine_contract: objCreate('undefine_contract'),
  undefine_contract1: objCreate('undefine_contract1'),
  undefine_contract2: objCreate('undefine_contract2')
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_MARKET_STORE:
      let originState = {};
      let originDate = action.data;
      originDate.forEach(function (item) {
        let obj = _.set({}, item, objCreate(item));
        //_.assign(obj[item], { contract_i18n_name: contractMap2Config[item].fullName }); 不要取消注释！！
        _.assign(originState, obj);
      });
      return originState;
    case types.UPDATE_MARKET_STORE:
      {
        let contractName = action.contractName;
        _.update(state, `${contractName}`, function (itemObj) { return (_.assign(itemObj, action.newData)); });
        return Object.assign({}, state);
      }
    case types.UPDATE_MARKET_STORE_ASKANDBID:
      {
        let contractName = action.contractName;
        _.update(state, `${contractName}`, function (itemObj) { return (_.assign(itemObj, action.newData)); });
        return Object.assign({}, state);
      }
    default:
      return state;
  }
}

export default reducer;