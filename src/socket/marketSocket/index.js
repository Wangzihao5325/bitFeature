import { MARKET_DOMAIN, MARKET_USER_NAME, MARKET_PASSWORDS, MARKET_VERSION } from '../../global/config'
class MarketSocket {
  ws = null;
  url = null;
  constructor(url) {
    this.url = url;
  }
  login() {
    let json = { 'method': 'req_login', 'data': { 'user_name': MARKET_USER_NAME, 'password': MARKET_PASSWORDS, 'protoc_version': MARKET_VERSION } };
    this.ws.send(JSON.stringify(json));
  }
  connectSocket() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.login();
    }
    // this.ws.onopen = function (evt) {
    //   this.login();
    // }
    this.ws.onclose = function (evt) {
      console.log(evt);
    }
    this.ws.onmessage = function (evt) {
      console.log(evt.data);
    }
  }
}

export default new MarketSocket(MARKET_DOMAIN);