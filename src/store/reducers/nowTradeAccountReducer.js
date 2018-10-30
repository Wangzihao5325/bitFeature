import * as types from '../actionType';
import _ from 'lodash';
import HoldPosition from '../../model/HoldPosition';
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
  holdPositions: new Map(),   //持仓
  nowList: '挂单'
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
        holdPositions.delete(productName);
        // let newHold = _.assign({}, holdPositions);
        return {
          ...state,
          holdPositions: holdPositions
        };
      }
    case types.TRADE_UPDATE_AND_ADD_HOLD:
      {
        let productName = action.productName;
        let holdPositions = state.holdPositions;
        let direction = action.direction;
        let holdNum = action.holdNum;
        let holdAvgPrice = action.holdAvgPrice;
        if (holdPositions.has(productName)) {
          let hold = holdPositions.get(productName);
          hold.update(direction, holdNum, holdAvgPrice);
        } else {
          let contractCode = action.contractCode;
          let hold = new HoldPosition(contractCode, direction, holdNum, holdAvgPrice);
          holdPositions.set(productName, hold);
        }
        // let newHold = _.assign({}, holdPositions);
        return {
          ...state,
          holdPositions: holdPositions
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
    default: return state;
  }
};
export default reducer;