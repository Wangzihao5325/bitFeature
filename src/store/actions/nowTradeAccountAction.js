import * as types from '../actionType';
import TradeUtil from '../../global/util/TradeUtil';
import Order from '../../model/Order';
import { contractMap2Config } from '../../global/commodity_list';
import { TRADE_DIRECTION, PRICE_TYPE } from '../../global/config';
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

export function add_order(param, isInsert) {
  let productName = `${param.CommodityNo}${param.ContractNo}`;
  let productInfo = contractMap2Config[productName];
  if (!productInfo) {
    return (dispatch) => {
      dispatch({
        type: types.TRADE_ADD_ORDER_DEFALUT,
      });
    }
  }
  const directionObj = TRADE_DIRECTION[param.Drection];
  const openCloseType = param.OpenCloseType;
  const orderPriceText = getOrderPriceText(param, productInfo.dotSize);
  const orderStatus = param.OrderStatus;
  const ordreStatusText = TradeUtil.getOrderStatusText(orderStatus);
  const orderNum = param.OrderNum;    // 委託量
  const tradeNum = param.TradeNum;    // 已成交
  let cdNum = 0; //撤單
  if (orderStatus === 4) {
    cdNum = orderNum - tradeNum;
  }
  let order = new Order(productName, ordreStatusText, directionObj, orderPriceText, orderNum, tradeNum, cdNum, param.InsertDateTime, param.OrderID, openCloseType);
  if (isInsert) {
    return (dispatch) => {
      dispatch({
        type: types.TRADE_ADD_ORDER_INSERT,
        order: order
      });
    }
  } else {
    return (dispatch) => {
      dispatch({
        type: types.TRADE_ADD_ORDER_UNINSERT,
        order: order
      });
    }
  }
}
function getOrderPriceText(param, dotSize) {
  let orderPriceText = param.OrderPrice.toFixed(dotSize);
  const orderPriceType = param.OrderPriceType;
  if (orderPriceType === 1) {
    orderPriceText = PRICE_TYPE.market.text;
  }
  return orderPriceText;
}