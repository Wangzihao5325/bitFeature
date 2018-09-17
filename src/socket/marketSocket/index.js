import { MARKET_DOMAIN, MARKET_USER_NAME, MARKET_PASSWORDS, MARKET_VERSION } from '../../global/config'
class MarketSocket {
  constructor(url) {
    this.url = url;
  }

  ws = null;
  url = null;
  // heartCheck = {
  //   time: 60000,
  //   timeoutObj: null,
  //   serverTimeoutObj: null,
  //   reset: function () {
  //     clearTimeout(this.timeoutObj);
  //     clearTimeout(this.serverTimeoutObj);
  //     this.start();
  //   },
  //   start: function () {

  //   }
  // }

  login() {
    let json = { 'method': 'req_login', 'data': { 'user_name': MARKET_USER_NAME, 'password': MARKET_PASSWORDS, 'protoc_version': MARKET_VERSION } };
    this.ws.send(JSON.stringify(json));
  }
  queryComList() {
    let json = { 'method': 'req_commodity_list', 'data': { 'security_type': 'FUT_OUT' } };
    this.ws.send(JSON.stringify(json));
  }
  subscribe() {
    let json = { 'method': 'req_subscribe', 'data': [{ 'security_type': 'FUT_OUT', 'exchange_no': 'HKEX', 'commodity_no': 'MHI', 'contract_no': '1809' }] };
    this.ws.send(JSON.stringify(json));
  }

  connectSocket() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.login();
    }
    /* to do ... learn
    this.ws.onopen = function (evt) {
      this.login();
    }
    */
    this.ws.onclose = (evt) => {
      console.log(evt);
    }
    this.ws.onmessage = (evt) => {
      let data = JSON.parse(evt.data);
      console.log(data);
      switch (data.method) {
        case 'on_rsp_login':
          this.queryComList();                    //登陆成功 - 查询合约品种
          break;
        case 'on_rsp_commodity_list':
          this.subscribe();                       //查询成功 - 订阅合约
          break;
      }
    }
  }
}

export default new MarketSocket(MARKET_DOMAIN);