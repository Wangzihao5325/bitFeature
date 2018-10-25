/**
 *  Copyright © 2017 - 2018 Zihao . All rights reserved.
 *  Author: Zihao Wong
 *  E-mail: zihao_coding@qq.com
 */
import * as types from '../actionType';

export function update_trade_account_list(tradeList) {
  if (tradeList.length == 0) {
    return (dispatch) => {
      dispatch({
        type: types.NO_TRADE_ACCOUNT,
        isHaveAccount: false
      });
    }
  }
  let onTradingAccountList = [];
  let endedAccountList = [];
  tradeList.map(function (item) {
    if (item.stateType == 4) {
      onTradingAccountList.push(item);
    } else {
      endedAccountList.push(item);
    }
  })
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_TRADE_ACCOUNT_LIST,
      isHaveAccount: true,
      onTradingAccountList,
      endedAccountList
    });
  }
}

export function page_change(keyValue) {
  return (dispatch) => {
    dispatch({
      type: types.ACCOUNT_LIST_PAGE_CHANGE,
      page: keyValue
    });
  }
}

export function page_reset() {
  return (dispatch) => {
    dispatch({
      type: types.ACCOUNT_LIST_PAGE_RESET,
      page: '已结算'
    });
  }
}