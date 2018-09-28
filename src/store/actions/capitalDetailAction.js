import * as types from '../actionType';
import { valueSecurity } from '../../global/util/index';
import moment from 'moment';
export function action_init_capital_detail_store(result) {
  const incomeMoney = valueSecurity(result.incomeMoney, 0);
  const incomeNum = valueSecurity(result.incomeNum, 0);
  const outlayMoney = valueSecurity(result.outlayMoney, 0);
  const outlayNum = valueSecurity(result.outlayNum, 0);
  let fundList = result.fundList.map(function (item) {
    let money = item.money >= 0 ? '+' + item.money : String(item.money);
    let remark = item.remark;
    let payTime = moment(item.payTime * 1000).format('YYYY-MM-DD HH:mm');
    return {
      money,
      remark,
      payTime
    }
  });
  return (dispatch) => {
    dispatch({
      type: types.INIT_CAPITAL_DETAILS_STORE,
      incomeMoney: incomeMoney,
      incomeNum: incomeNum,
      outlayMoney: outlayMoney,
      outlayNum: outlayNum,
      fundList: fundList
    });
  }
}