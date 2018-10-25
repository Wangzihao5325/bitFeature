import * as types from '../actionType';

export function trade_socket_login(rtnData) {
  let clientNo = rtnData.Parameters.ClientNo;
  let forceLine = rtnData.Parameters.ForceLine;
  let initBalance = rtnData.Parameters.InitBalance;
  return (dispatch) => {
    dispatch({
      type: types.TRADE_ACCOUNT_LOGIN,
      loginAccountNum: clientNo,
      forceLine: forceLine,
      initBalance: initBalance
    });
  }
}

export function trade_socket_queryAccount(balanceReg, canUseReg, depositReg) {
  return (dispatch) => {
    dispatch({
      type: types.TRADE_QUERY_ACCOUNT,
      initBalance: balanceReg,
      canUse: canUseReg,
      deposit: depositReg
    });
  }
}