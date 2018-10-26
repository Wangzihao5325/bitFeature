import * as types from '../actionType';

const initialState = {
  isTradeAccountLogin: false,
  loginAccountNum: '',
  forceLine: 0,
  initBalance: 0,             //总资产
  canUse: 0,                  //余额
  deposit: 0,                 //保证金
  orders: [],                 //委托
  designates: [],             //挂单
  deals: [],                  //成交
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
        initBalance: action.initBalance,
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
    default: return state;
  }
};
export default reducer;