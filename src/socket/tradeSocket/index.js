import base64 from 'base-64';
import ToastRoot from '../../components/ToastRoot';
import store from '../../store/index';
import { trade_socket_login, trade_socket_queryAccount, add_order, add_designate } from '../../store/actions/nowTradeAccountAction';
import { cache } from '../../global/trade_list';
import Cache from '../../model/Cache';
class TradeSocket {
  _login(account, password) {//登陆
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
        case 'OnRspLogin':                                      //登陆成功 
          this.loginRtn(data, onSuccess, onFailed);
          break;
        case 'OnRspQryAccount':                                 //查询账户信息成功 
          this.updateAccountInfo(data);
          break;
        case 'OnRspQryOrder':                                 //查询订单信息成功 
          this.addDesignateAndOrder(data, false);
          break;
      }
    }
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
    // 有時候後端傳回來的資料會有undefined, null...，這時候放棄此筆資料
    if (isNaN(balance) || isNaN(canUse) || isNaN(deposit)) {
      return;
    }
    // 只有第一次updateAccountMoney會傳currentRate，之後沒傳
    if (cache.has(currencyNo)) {
      const existCache = this.cache.get(currencyNo);
      existCache.balance = balance;
      existCache.canUse = canUse;
      existCache.deposit = deposit;
      cache.set(currencyNo, existCache);
    } else {
      cache.set(currencyNo, new Cache(currencyRate, balance, canUse, deposit));
    }
    // 每一次都重新匯總
    let balanceReg = 0;
    let canUseReg = 0;
    let depositReg = 0;
    // iterate c: [key, value]
    for (const c of cache) {
      const value = c[1];
      balanceReg = balanceReg + (value.balance * value.currencyRate);
      canUseReg = canUseReg + (value.canUse * value.currencyRate);
      depositReg = depositReg + (value.deposit * value.currencyRate);
    }
    store.dispatch(trade_socket_queryAccount(balanceReg, canUseReg, depositReg));
  }
  loginRtn(rtnData, onSuccess, onFailed) {
    ToastRoot.show(rtnData.Parameters.Message);
    if (rtnData.Parameters.Code === 0) {
      store.dispatch(trade_socket_login(rtnData));
      let nowAccount = rtnData.Parameters.ClientNo;
      this._queryTradeAccount(nowAccount);
      this._queryOrder(nowAccount);//需要验证
      // this._queryTrade(nowAccount);
      // this._queryHold(nowAccount);
      // this._queryStopLoss(nowAccount);
      // this._queryCondition(nowAccount);
      onSuccess(rtnData);
    } else {
      onFailed();
    }
  }
}
export default new TradeSocket();