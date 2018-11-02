import store from '../../../store/index';
import * as types from '../../actionType';
import { contractMap2Config } from '../../../global/commodity_list';
export function action_startLightningStore(productName) {
  let dotSize = contractMap2Config[productName].dotSize;
  let contractCodeStr = `${contractMap2Config[productName].structure.security_type}_${contractMap2Config[productName].structure.commodity_no}_${contractMap2Config[productName].structure.contract_no}`
  //没有初始信息，只取dotsize
  //   if (product.time_flag) {
  //     this.data.prices.push(product.last);
  //     this.data.times.push((product.time_flag).split(/[' '|'.']/)[1]);
  // }
  return (dispatch) => {
    dispatch({
      type: types.LIGHTNING_STORE_START,
      dotSize: dotSize,
      contractCodeStr: contractCodeStr
    });
  }
}

export function action_updateLightningStore(result) {
  let data = result.data;
  // let LightningStoreSnap = store.getState().LightningStore;
  // let snapDotSize = LightningStoreSnap.dotSize;
  // snapDotSize || (snapDotSize = product.dotSize);
  if (data[1]) {
    return (dispatch) => {
      dispatch({
        type: types.LIGHTNING_STORE_UPDATE,
        addLast: data[3],
        addTime: (data[1]).split(/[' '|'.']/)[1]
      });
    }
  } else {
    return (dispatch) => {
      dispatch({
        type: types.LIGHTNING_STORE_DEFALUT,
      });
    }
  }

}