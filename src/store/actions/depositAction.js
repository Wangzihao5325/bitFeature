import * as types from '../actionType';
import _ from 'lodash';

export function action_depositStoreInit(rtnData) {
  let contractList = rtnData.contractList.concat();
  let schemeList = rtnData.paramList;
  let schemeDic = {};
  schemeList.map(function (schemeItem) {
    let traderBond = schemeItem.traderBond;
    let traderTotal = schemeItem.traderTotal;
    let lineLoss = schemeItem.lineLoss;
    let contractInit = JSON.parse(schemeItem.inMultiple);
    contractInit.map(function (item) {
      for (let i = 0; i < contractList.length; i++) {
        if (item.commodityNo == contractList[i].mainContract) {
          let key = traderBond + 'initialAmount';
          contractList[i][key] = item.initialAmount;
        }
      }
    });
    schemeDic[traderBond] = { traderBond, traderTotal, lineLoss };
  })
  return (dispatch) => {
    dispatch({
      type: types.DEPOSIT_STORE_INIT,
      scheme: schemeDic,
      contract: contractList
    });
  }
}

export function action_chooseScheme(money) {
  return (dispatch) => {
    dispatch({
      type: types.DEPOSIT_CHOOSE_SCHEME,
      choose: money
    });
  }
}