/**
 *  Copyright © 2017 - 2018 Zihao . All rights reserved.
 *  Author: Zihao Wong
 *  E-mail: zihao_coding@qq.com
 */
import * as types from '../actionType';
import { valueSecurity } from '../../global/util/index';
import Variables from '../../global/Variables';

export function action_login() {
  return { type: types.LOG_IN };
}
export function action_getbalancerate(result) {
  const balance = valueSecurity(result.balance, 0);
  const drawHandleFee = valueSecurity(result.drawHandleFee, 0);
  const frozenCapital = valueSecurity(result.frozenCapital, 0);
  const isCertification = valueSecurity(result.isCertification, false);
  const isSetDrawPwd = valueSecurity(result.isSetDrawPwd, false);
  const operateMoney = valueSecurity(result.operateMoney, 0);
  const userVerified = result.userVerified === 'true' ? true : false;//实名认证开关,由于是字符串‘true’特殊处理
  let defalutName = 'UserName';
  if (Variables.account.mobileAccount) {
    let phoneArr = Variables.account.mobileAccount.split('');
    let headerReg = phoneArr.slice(0, 3).join('');
    let tailReg = phoneArr.slice(7).join('');
    defalutName = `${headerReg}****${tailReg}`;
  }
  const username = valueSecurity(result.username, defalutName);
  const wxAccount = valueSecurity(result.wxAccount, '未绑定');

  return (dispatch) => {
    dispatch({
      type: types.GET_ACCOUNT_INFO,
      balance: balance,
      user: username,
      userVerified: userVerified,
      isCertification: isCertification,
      isSetDrawPwd: isSetDrawPwd,
      operateMoney: operateMoney,
      frozenCapital: frozenCapital,
      drawHandleFee: drawHandleFee,
      wxAccount: wxAccount
    });
  }
}