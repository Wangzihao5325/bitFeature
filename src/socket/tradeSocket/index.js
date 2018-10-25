import base64 from 'base-64';
import ToastRoot from '../../components/ToastRoot';
import store from '../../store/index';
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
        case 'OnRspLogin':                                      //登陆成功 -> 查询登陆账号信息
          this.loginRtn(data, onSuccess, onFailed);
          break;
        case 'OnRspQryAccount':                             //查询成功 -> 订阅合约
          // let subscribe_list = this.contractFilter(data, true);
          // this.marketStoreInit(subscribe_list);
          // this._subscribe(subscribe_list);
          break;

          break;
      }
    }
  }
  loginRtn(rthData, onSuccess, onFailed) {
    ToastRoot.show(rthData.Parameters.Message);
    if (rthData.Parameters.Code === 0) {

      onSuccess(rthData);
    } else {
      onFailed();
    }
  }
}
export default new TradeSocket();