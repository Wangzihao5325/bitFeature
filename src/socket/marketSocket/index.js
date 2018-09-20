/**
 *  Copyright © 2017 - 2018 Zihao . All rights reserved.
 *  Author: Zihao Wong
 *  E-mail: zihao_coding@qq.com
 */
import { MARKET_DOMAIN, MARKET_USER_NAME, MARKET_PASSWORDS, MARKET_VERSION } from '../../global/config'
import store from '../../store/index';
import { action_storeinit, action_updateStore } from '../../store/actions/marketAction';
import { contractMap2I18nName } from '../../global/commodity_list';
class MarketSocket {
  constructor(url) {
    this.url = url;
  }

  ws = null;
  url = null;

  _login() {
    let json = { 'method': 'req_login', 'data': { 'user_name': MARKET_USER_NAME, 'password': MARKET_PASSWORDS, 'protoc_version': MARKET_VERSION } };
    this.ws.send(JSON.stringify(json));
  }
  _queryComList() {
    let json = { 'method': 'req_commodity_list', 'data': { 'security_type': 'FUT_OUT' } };
    this.ws.send(JSON.stringify(json));
  }
  _subscribe(listObj) {
    let json = { 'method': 'req_subscribe', 'data': listObj };
    this.ws.send(JSON.stringify(json));
  }

  /*查找需要订阅的合约，返回对应的结构体集合 */
  contractFilter(rtnData, isMain, index) {
    let subscribe_list = [];
    let commodity_list = rtnData.data.commodity_list;
    for (let i = 0; i < 2; i++) {// to do ... 此处暂时只订阅2条合约
      let commodity_details = commodity_list[i];
      let contract_no_obj = isMain ? commodity_details.contract_no_list.filter(function (item) { return (item.flags === 1); }) : commodity_details.contract_no_list[index];
      /*此处配置信息分为两部分处理structure／others，因为structure是后台约定的合约标识 */
      let contract_structure = {
        'security_type': commodity_details.security_type,
        'exchange_no': commodity_details.exchange_no,
        'commodity_no': commodity_details.commodity_no,
        'contract_no': contract_no_obj[0].contract_no
      };
      let contractName = commodity_details.commodity_no + contract_no_obj[0].contract_no
      contractMap2I18nName[contractName] = commodity_details.commodity_name;
      //console.log(contractMap2I18nName); // ... debug log
      subscribe_list.push(contract_structure);
    }
    return subscribe_list;
  }
  marketStoreInit(list) {
    store.dispatch(action_storeinit(list));
  }
  updateMarketStoreData(rtnObj) {
    store.dispatch(action_updateStore(rtnObj));
  }

  connectSocket() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this._login();
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
      console.log(data);  // ... debug log
      switch (data.method) {
        case 'on_rsp_login':                                      //登陆成功 -> 查询合约品种
          this._queryComList();
          break;
        case 'on_rsp_commodity_list':                             //查询成功 -> 订阅合约
          let subscribe_list = this.contractFilter(data, true);
          this.marketStoreInit(subscribe_list);
          this._subscribe(subscribe_list);
          break;
        case 'on_rtn_quote':                                      //收到ticker -> 更新数据
          this.updateMarketStoreData(data);
          break;
      }
    }
  }
}

export default new MarketSocket(MARKET_DOMAIN);