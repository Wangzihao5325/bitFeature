/**
 *  Copyright © 2017 - 2018 Zihao . All rights reserved.
 *  Author: Zihao Wong
 *  E-mail: zihao_coding@qq.com
 */
import { MARKET_DOMAIN, MARKET_USER_NAME, MARKET_PASSWORDS, MARKET_VERSION } from '../../global/config'
import store from '../../store/index';
import { action_storeinit, action_updateStore } from '../../store/actions/marketAction';
import { contractMap2Config, aliveContractList, aliveContractSnapShot } from '../../global/commodity_list';
import _ from 'lodash';
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
  _unsubscribe(listObj) {
    let json = { 'method': 'req_unsubscribe', 'data': listObj };
    this.ws.send(JSON.stringify(json));
  }

  /*查找需要订阅的合约，返回对应的结构体集合 */
  contractFilter(rtnData, isMain, index) {
    let subscribe_list = [];
    let commodity_list = rtnData.data.commodity_list;
    for (let i = 0; i < 2; i++) {// to do ... 此处暂时只订阅2条合约
      let commodity_details = commodity_list[i];
      let contract_no_obj = isMain ? commodity_details.contract_no_list.filter(function (item) { return (item.flags === 1); }) : commodity_details.contract_no_list[index];
      /*此处配置信息分为两部分处理structure／others，因为structure是后台约定的合约标识,others为配置信息 */
      let contract_structure = {
        'security_type': commodity_details.security_type,
        'exchange_no': commodity_details.exchange_no,
        'commodity_no': commodity_details.commodity_no,
        'contract_no': contract_no_obj[0].contract_no
      };
      let contractName = commodity_details.commodity_no + contract_no_obj[0].contract_no;
      contractMap2Config[contractName] = { fullName: commodity_details.commodity_name, dotSize: commodity_details.dot_size, structure: contract_structure };
      //console.log(contractMap2Config); // ... debug log
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
  managerAliveContractList(rtnObj) {
    console.log(rtnObj);
    let successArr = rtnObj.data.succ_list;
    successArr.map(function (item) {
      let name = item.commodity_no + item.contract_no;
      aliveContractList.push(name);
    })
  }
  managerAliveContractList2(rtnObj) {
    console.log(rtnObj);
    let successArr = rtnObj.data.contract_list;
    successArr.map(function (item) {
      let name = item.commodity_no + item.contract_no;
      _.pull(aliveContractList, name);
    })
  }

  /*初次链接socket*/
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
      //console.log(data);  // ... debug log
      switch (data.method) {
        case 'on_rsp_login':                                      //登陆成功 -> 查询合约品种
          this._queryComList();
          break;
        case 'on_rsp_commodity_list':                             //查询成功 -> 订阅合约
          let subscribe_list = this.contractFilter(data, true);
          this.marketStoreInit(subscribe_list);
          this._subscribe(subscribe_list);
          break;
        case 'on_rsp_subscribe':                                  //订阅成功 -> 维护合约状态列表
          this.managerAliveContractList(data);
          break;
        case 'on_rsp_unsubscribe':                                //取消订阅成功 -> 维护合约状态列表
          this.managerAliveContractList2(data);
          break;
        case 'on_rtn_quote':                                      //收到ticker -> 更新数据
          this.updateMarketStoreData(data);
          break;
      }
    }
  }

  /*退订其他合约，只保留正在查看的一条(to do 需要保留有持仓的行情)*/
  otherContractPause(contract, isSnap) {
    let reg = [];
    aliveContractList.map(function (item) {
      if (item !== contract) {
        let structure = contractMap2Config[item].structure;
        reg.push(structure);
      }
    });
    if (isSnap) {
      _.pullAll(aliveContractSnapShot, aliveContractSnapShot);
      _.assign(aliveContractSnapShot, aliveContractList);
    }
    this._unsubscribe(reg);
  }
  /*恢复快照中合约的订阅*/
  contractGoingOn() {
    let reg = [];
    let arr = aliveContractSnapShot.concat();
    _.pullAll(arr, aliveContractList);
    arr.map(function (item) {
      let structure = contractMap2Config[item].structure;
      reg.push(structure);
    });
    this._subscribe(reg);
  }
}

export default new MarketSocket(MARKET_DOMAIN);