import { AppState } from 'react-native';
import base64 from 'base-64';
import ToastRoot from '../../components/ToastRoot';
import store from '../../store/index';
import { trade_socket_login, trade_socket_logout, trade_socket_queryAccount, add_order, add_designate, add_deal, manage_hold, update_order, delete_designate, update_designate } from '../../store/actions/nowTradeAccountAction';
import { contractMap2Config } from '../../global/commodity_list';
import { cache } from '../../global/trade_list';
import Cache from '../../model/Cache';
import { action_waiting_trade_socket_restart, action_trade_socket_restart_done } from '../../store/actions/customServiceAction';
class TradeSocket {
  constructor() {
    //重连
    AppState.addEventListener('change', (appState) => {
      if (appState === 'active') {
        let state = store.getState();
        let isTradeLogin = state.nowTradeAccount.isTradeAccountLogin;
        if (isTradeLogin) {
          store.dispatch(action_waiting_trade_socket_restart());
          this._backForHeartBeat(true);
        }
      }
    });
  }

  _backForHeartBeat(isBack) {
    const time = isBack ? 5000 : 10000;
    if (!this.ws) {
      return;
    }
    this.isHeartBeating = false;
    this.tradeHeartBeatTimeoutId && clearTimeout(this.tradeHeartBeatTimeoutId);

    this.tradeHeartBeatTimeoutId = setTimeout(() => {
      clearTimeout(this.tradeHeartBeatTimeoutId);
      let state = store.getState();
      let isTradeLogin = state.nowTradeAccount.isTradeAccountLogin;
      if (isTradeLogin && this.isHeartBeating && (this.ws.readyState === 0 || this.ws.readyState === 1)) {
        this._backForHeartBeat();
        store.dispatch(action_trade_socket_restart_done());
      } else if (isTradeLogin) {
        this.restartTradeSocket();
      }
    }, time);
  }

  restartTradeSocket() {
    let json = { 'Method': 'Logout', 'Parameters': { 'ClientNo': this._account } };
    this.ws.send(JSON.stringify(json));
    this.ws.close();
    if (!this._account) {
      store.dispatch(action_trade_socket_restart_done());
      return;
    }
    setTimeout(() => {
      //success时插入model show
      this.connectSocket(this._url, this._account, this._password, () => { store.dispatch(action_trade_socket_restart_done()); });
    }, 1500);
  }



  _login(account, password) {//登录
    let json = { 'Method': 'Login', 'Parameters': { 'ClientNo': account, 'PassWord': base64.encode(password), 'IsMock': 1, 'Version': '2.0.0', 'Source': 'app' } };
    this.ws.send(JSON.stringify(json));
  }
  _queryTradeAccount(account) {//获取账户信息
    let json = { 'Method': 'QryAccount', 'Parameters': { 'ClientNo': account } };
    this.ws.send(JSON.stringify(json));
  }
  _queryOrder(account) {//获取订单信息
    let json = { 'Method': 'QryOrder', 'Parameters': { 'ClientNo': account } };
    this.ws.send(JSON.stringify(json));
  }
  _queryTrade(account) {//查询成交记录信息
    let json = { 'Method': 'QryTrade', 'Parameters': { 'ClientNo': account } };
    this.ws.send(JSON.stringify(json));
  }
  _queryHold(account) {//查询持仓信息
    let json = { 'Method': 'QryHoldTotal', 'Parameters': { 'ClientNo': account } };
    this.ws.send(JSON.stringify(json));
  }
  _queryStopLoss(account) {// 获取止损单请求
    let json = { 'Method': 'QryStopLoss', 'Parameters': { 'ClientNo': account } };
    this.ws.send(JSON.stringify(json));
  }
  _queryCondition(account) {// 条件单查询
    let json = { 'Method': 'QryCondition', 'Parameters': { 'ClientNo': account } };
    this.ws.send(JSON.stringify(json));
  }
  insertOrder(contractCode, orderNum, direction, priceType, openCloseType, limitPrice) {
    let contract_structure = contractMap2Config[contractCode].structure;
    let commodity_no = contract_structure.commodity_no;
    let contract_no = contract_structure.contract_no;
    let exchange_no = contract_structure.exchange_no;
    let type = contract_structure.security_type === 'FO' ? 1 : 2;
    let orderRef = new Date().getTime();
    let json = {
      'Method': 'InsertOrder',
      'Parameters': {
        'CommodityType': type,
        'ExchangeNo': exchange_no,
        'CommodityNo': commodity_no,
        'ContractNo': contract_no,
        'OrderNum': orderNum,
        'Drection': direction, //Drection 是接口的错别字，一直保留下来了
        'PriceType': priceType,
        'OpenCloseType': openCloseType,
        'LimitPrice': limitPrice,
        'OrderRef': orderRef.toString()
      }
    };
    this.ws.send(JSON.stringify(json));
  }
  cancelOrder(OrderSysID, OrderID, ExchangeNo, CommodityNo, ContractNo, OrderNum, Direction, OrderPrice) {
    let json = {
      'Method': 'CancelOrder',
      'Parameters': {
        'OrderSysID': OrderSysID,
        'OrderID': OrderID,
        'ExchangeNo': ExchangeNo,
        'CommodityNo': CommodityNo,
        'ContractNo': ContractNo,
        'OrderNum': OrderNum,
        'Direction': Direction,
        'OrderPrice': OrderPrice
      }
    };
    this.ws.send(JSON.stringify(json));
  }
  connectSocket(url, account, password, onSuccess, onFailed) {
    this._url = url;
    this._account = account;
    this._password = password;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this._login(account, password);
    }

    this.ws.onclose = (evt) => {
      console.log(evt);
    }
    this.ws.onmessage = (evt) => {
      let data = JSON.parse(evt.data);
      //console.log(data);  // ... debug log
      switch (data.Method) {
        case 'OnRspLogin':                                      //登录成功 
          this.loginRtn(data, onSuccess, onFailed);
          break;
        case 'OnRspQryAccount':                                 //查询账户信息成功 
          this.updateAccountInfo(data);
          break;
        case 'OnRspQryOrder':                                 //查询订单信息成功 
          this.addDesignateAndOrder(data, false);
          break;
        case 'OnRspQryTrade':                                 //查询成交记录成功  
          this.addDeal(data, false);
          break;
        case 'OnRspQryHoldTotal':                                 //查询持仓成功 
          this.manageHold(data);
          break;
        case 'OnRspOrderInsert':                                 //报单请求回复 
          this.addDesignateAndOrder(data, true);
          this.addDesignateAndOrderMessage(data);
          break;
        case 'OnRtnOrderTraded':                                 //订单成交回复 
          this.addDeal(data, true);
          this.addDealMessage(data);
          break;
        case 'OnRtnOrderState':                                 //订单状态通知(成交完成后处理挂单) 
          this.manageDesignateAndOrder(data);
          break;
        case 'OnRtnHoldTotal':                                 //更新持仓
          this.manageHold(data);
          break;
        case 'OnRtnMoney':                                 //更新持仓
          this.updateAccountInfo(data);
          break;
        case 'OnRspHeartBeat':                                 //心跳
          this.isHeartBeating = true;
          break;
      }
    }
  }
  manageDesignateAndOrder(rtnData) {
    let param = rtnData.Parameters;
    const orderStatus = param.OrderStatus;
    const orderNum = param.OrderNum;          // 委託量
    const tradeNum = param.TradeNum;          // 已成交
    const designateNum = orderNum - tradeNum; // 掛單量
    const orderId = param.OrderID;
    store.dispatch(update_order(param));
    if (orderStatus === 0 || orderStatus === 1 || orderStatus === 2) {
      if (designateNum === 0) {
        store.dispatch(delete_designate(param));
      } else {
        store.dispatch(update_designate(param));
      }
    } else if (orderStatus === 3) {
      store.dispatch(delete_designate(orderId));
    } else if (orderStatus === 4) {
      store.dispatch(delete_designate(orderId));
      ToastRoot.show(`撤单成功:合约【${param.ContractCode}】,订单号【${orderId}】`);
    } else if (orderStatus === 5) {
      store.dispatch(delete_designate(orderId));
      if (param.ContractCode == undefined) {
        ToastRoot.show(`交易失败:合约【${param.ContractCode}】,原因【${param.StatusMsg}】`);
      } else {
        ToastRoot.show(`交易失败:原因【${param.StatusMsg}】`);
      }
    }
  }
  manageHold(rtnData) {
    if (!rtnData.Parameters) {
      return;
    }
    store.dispatch(manage_hold(rtnData.Parameters));
  }
  addDeal(rtnData, isInsert) {
    if (!rtnData.Parameters) {
      return;
    }
    store.dispatch(add_deal(rtnData.Parameters, isInsert));
  }
  addDealMessage(data) {
    ToastRoot.show('交易成功');
    // console.log(data);
    // const { dotSize } = this.tradeStore.product
    // //parameters.TradePrice.toFixed(2) 保留两位小数
    // ToastRoot.show(`交易成功：合约【${0}】,交易手数:【${1}】,交易价格:【${2}】`);
  }
  addDesignateAndOrder(rtnData, isInsert) {
    if (!rtnData.Parameters) {
      return;
    }
    const orderStatus = rtnData.Parameters.OrderStatus;
    store.dispatch(add_order(rtnData.Parameters, isInsert));
    //this.addOrder(rtnData.Parameters, isInsert);
    if (orderStatus < 3) {
      store.dispatch(add_designate(rtnData.Parameters, isInsert));
      // this.addDesignate(rtnData.Parameters, isInsert);
    }
  }
  addDesignateAndOrderMessage(param) {
    const orderStatus = param.Parameters.OrderStatus;
    if (orderStatus === 5) {
      if (param.Parameters.ContractCode == undefined) {
        ToastRoot.show(`交易失败:原因【${param.Parameters.StatusMsg}】`);
      } else {
        ToastRoot.show(`交易失败:合约【${param.Parameters.ContractCode}】,原因【${param.Parameters.StatusMsg}】`);
      }
    } else {
      ToastRoot.show('提交成功,等待交易');
    }
  }
  updateAccountInfo(rtnData) {
    if (!rtnData.Parameters) {
      return;
    }
    const currencyNo = rtnData.Parameters.CurrencyNo;  // 当前币种 : USD, EUR, JPY, CNY, HKD-HKFE
    const currencyRate = rtnData.Parameters.CurrencyRate;  // 汇率
    const todayAmount = rtnData.Parameters.TodayAmount;
    const deposit = rtnData.Parameters.Deposit;
    const frozenMoney = rtnData.Parameters.FrozenMoney;

    const balance = todayAmount;
    const canUse = balance - deposit - frozenMoney;
    const closeProfit = rtnData.Parameters.CloseProfit;
    // 有時候後端傳回來的資料會有undefined, null...，這時候放棄此筆資料
    if (isNaN(balance) || isNaN(canUse) || isNaN(deposit)) {
      return;
    }
    // 只有第一次updateAccountMoney會傳currentRate，之後沒傳
    if (cache.has(currencyNo)) {
      const existCache = cache.get(currencyNo);
      existCache.balance = balance;
      existCache.canUse = canUse;
      existCache.deposit = deposit;
      existCache.closeProfit = closeProfit;
      cache.set(currencyNo, existCache);
    } else {
      cache.set(currencyNo, new Cache(currencyRate, balance, canUse, deposit, closeProfit));
    }
    // 每一次都重新匯總
    let balanceReg = 0;
    let canUseReg = 0;
    let depositReg = 0;
    let closeProfitReg = 0;
    // iterate c: [key, value]
    for (const c of cache) {
      const value = c[1];
      balanceReg = balanceReg + (value.balance * value.currencyRate);
      canUseReg = canUseReg + (value.canUse * value.currencyRate);
      depositReg = depositReg + (value.deposit * value.currencyRate);
      closeProfitReg = closeProfitReg + (value.closeProfit * value.currencyRate);
    }
    store.dispatch(trade_socket_queryAccount(balanceReg, canUseReg, depositReg, closeProfitReg));
  }
  loginRtn(rtnData, onSuccess, onFailed) {
    ToastRoot.show(rtnData.Parameters.Message);
    if (rtnData.Parameters.Code === 0) {
      store.dispatch(trade_socket_login(rtnData));
      let nowAccount = rtnData.Parameters.ClientNo;
      this._queryTradeAccount(nowAccount);
      this._queryOrder(nowAccount);
      this._queryTrade(nowAccount);
      this._queryHold(nowAccount);
      // this._queryStopLoss(nowAccount);//止盈止损单初始化
      // this._queryCondition(nowAccount);//条件单初始化
      onSuccess(rtnData);
    } else {
      onFailed();
    }
  }
  logout(account, onSuccess) {
    let json = { 'Method': 'Logout', 'Parameters': { 'ClientNo': account } };
    this.ws.send(JSON.stringify(json));
    store.dispatch(trade_socket_logout());
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  }
}
export default new TradeSocket();