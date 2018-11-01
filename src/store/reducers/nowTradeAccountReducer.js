import * as types from '../actionType';
import _ from 'lodash';
import HoldPosition from '../../model/HoldPosition';
import ArrayUtil from '../../global/util/ArrayUtil';
import TradeUtil from '../../global/util/TradeUtil';
import { contractMap2Config } from '../../global/commodity_list'
const initialState = {
  isTradeAccountLogin: false,
  loginAccountNum: '',
  forceLine: 0,
  initBalance: 0,             //初始资产
  balance: 0,                  //总资产
  canUse: 0,                  //余额
  deposit: 0,                 //保证金
  orders: [],                 //委托
  designates: [],             //挂单
  deals: [],                  //成交
  holdPositions: {},   //持仓
  nowList: '挂单',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRADE_ACCOUNT_LOGIN:
      return {
        ...state,
        loginAccountNum: action.loginAccountNum,
        forceLine: action.forceLine,
        initBalance: action.initBalance,
        isTradeAccountLogin: true
      };
    case types.TRADE_QUERY_ACCOUNT:
      return {
        ...state,
        balance: action.balance,
        canUse: action.canUse,
        deposit: action.deposit,
      };
    case types.TRADE_ADD_ORDER_INSERT:
      {
        let order = action.order;
        console.log('ddddd');
        console.log(state.orders);
        let orders = state.orders.concat();
        orders.unshift(order);
        return {
          ...state,
          orders: orders
        };
      }
    case types.TRADE_ADD_ORDER_UNINSERT:
      {
        let order = action.order;
        let orders = state.orders.concat();
        orders.push(order);
        return {
          ...state,
          orders: orders
        };
      }
    case types.TRADE_ADD_DESIGNATE_INSERT:
      {
        let designate = action.designate;
        let designates = state.designates.concat();
        designates.unshift(designate);
        return {
          ...state,
          designates: designates
        };
      }
    case types.TRADE_ADD_DESIGNATE_UNINSERT:
      {
        let designate = action.designate;
        let designates = state.designates.concat();
        designates.push(designate);
        return {
          ...state,
          designates: designates
        };
      }
    case types.TRADE_ADD_DEAL_INSERT:
      {
        let deal = action.deal;
        let deals = state.deals.concat();
        deals.unshift(deal);
        return {
          ...state,
          deals: deals
        };
      }
    case types.TRADE_ADD_DEAL_UNINSERT:
      {
        let deal = action.deal;
        let deals = state.deals.concat();
        deals.push(deal);
        return {
          ...state,
          deals: deals
        };
      }
    case types.TRADE_DELETE_HOLD:
      {
        let productName = action.productName;
        let holdPositions = state.holdPositions;
        _.unset(holdPositions, productName);
        /* holdPositions.delete(productName);*/
        let newHold = _.assign({}, holdPositions);
        return {
          ...state,
          holdPositions: newHold
        };
      }
    case types.TRADE_UPDATE_AND_ADD_HOLD:
      {
        let productName = action.productName;
        let holdPositions = state.holdPositions;
        let direction = action.direction;
        let holdNum = action.holdNum;
        let holdAvgPrice = action.holdAvgPrice;
        /*if (holdPositions.has(productName)) {*/
        if (_.has(holdPositions, productName)) {
          let hold = holdPositions[productName];
          hold.update(direction, holdNum, holdAvgPrice);
        } else {
          let contractCode = action.contractCode;
          let hold = new HoldPosition(contractCode, direction, holdNum, holdAvgPrice);
          holdPositions[productName] = hold;
        }
        let newHold = _.assign({}, holdPositions);
        return {
          ...state,
          holdPositions: newHold,
        };
      }
    case types.TRADE_LIST_CHANGE:
      {
        let nowList = action.nowList;
        return {
          ...state,
          nowList: nowList
        }
      }
    case types.TRADE_UPDATE_ORDER:
      {
        let param = action.param;
        let orderPrice = param.OrderPrice;
        let orderStatus = param.OrderStatus;
        let tradeNum = param.TradeNum;
        let orderNum = param.OrderNum;
        let contractCode = param.ContractCode;
        let dotSize = contractMap2Config[contractCode].dotSize;
        let orderId = param.OrderID;
        let orders = state.orders;
        const order = orders.find((o) => {
          return o.orderId === orderId;
        });
        if (order.orderPrice !== '市价') {
          order.orderPrice = orderPrice.toFixed(dotSize);
        }
        order.orderStatus = TradeUtil.getOrderStatusText(orderStatus);
        if (orderStatus === 4) {
          order.cdNum = orderNum - tradeNum;
        }
        order.orderNum = orderNum;
        order.tradeNum = tradeNum;

        let newOrders = _.assign([], orders);
        return {
          ...state,
          orders: newOrders,
        }
      }
    case types.TRADE_DELETE_DESIGNATE:
      {
        let designates = state.designates;
        let param = action.param;
        if (designates.length === 0) {
          return state;
        }
        if (typeof param === 'string') {
          ArrayUtil.remove(designates, (designate) => {
            return designate.orderId === param;
          });
          let newDes = _.assign([], designates);
          return {
            ...state,
            designates: newDes
          }
        }
        let contractCode = param.ContractCode;
        ArrayUtil.remove(designates, (designate) => {
          return designate.productName === contractCode;
        });
        let newDes = _.assign([], designates);
        return {
          ...state,
          designates: newDes,
        }
      }
    case types.TRADE_LIST_CHANGE:
      {
        let designates = state.designates;
        let param = action.param;
        let contractCode = param.ContractCode;
        let dotSize = contractMap2Config[contractCode].dotSize;
        const orderPriceText = TradeUtil.getOrderPriceText(param, dotSize);
        const orderId = param.OrderID;
        const orderNum = param.OrderNum;          // 委託量
        const tradeNum = param.TradeNum;          // 已成交
        const designateNum = orderNum - tradeNum; // 掛單量
        const designate = designates.find((d) => {
          return d.orderId === orderId;
        });
        designate.update(orderPriceText, orderNum, designateNum);
        if (designate.isUpdate) {
          ToastRoot.show(`改单成功:合约【${designate.productName}】,委托价【${designate.orderPrice}】,委托量【${designate.orderNum}】`);
          designate.isUpdate = false;
        }
        let newDes = _.assign([], designates);
        return {
          ...state,
          designates: newDes,
        }
      }
    default: return state;
  }
};

export default reducer;