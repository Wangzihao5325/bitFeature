/**
 *  Copyright © 2017 - 2018 Zihao . All rights reserved.
 *  Author: Zihao Wong
 *  E-mail: zihao_coding@qq.com
 */
import { MARKET_DOMAIN, MARKET_USER_NAME, MARKET_PASSWORDS, MARKET_VERSION } from '../../global/config'
import store from '../../store/index';
import { action_storeinit, action_updateStore, action_updateAskAndBid } from '../../store/actions/marketAction';
import { update_classify } from '../../store/actions/classifyAction';
import { contractMap2Config, aliveContractList, aliveContractSnapShot, recommendContractMap, classifyContractMap, initContractList, subscribeObjList } from '../../global/commodity_list';
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
    let json = { 'method': 'req_commodity_list', 'data': { 'security_type': null } };
    this.ws.send(JSON.stringify(json));
  }
  _subscribe(listObj) {
    let storeState = store.getState();
    let classifyPage = storeState.contractClassify.page;
    let subscribeList = classifyContractMap[classifyPage];
    let subscribeObj = [];
    listObj.map(function (item) {
      let name = item.commodity_no + item.contract_no;
      if (_.indexOf(subscribeList, name) >= 0) {
        let wsObj = item.security_type + '_' + item.commodity_no + '_' + item.contract_no;
        subscribeObj.push(wsObj);
      }
    });
    let json = { 'method': 'req_subscribe', 'data': { 'mode': 'MODE_TRADE_TICK', 'contract_list': subscribeObj } };
    this.ws.send(JSON.stringify(json));
  }
  _unsubscribe(listObj) {
    let reg = [];
    listObj.map(function (item) {
      let wsObj = item.security_type + '_' + item.commodity_no + '_' + item.contract_no;
      reg.push(wsObj);
    });
    let json = { 'method': 'req_unsubscribe', 'data': { 'contract_list': reg } };
    this.ws.send(JSON.stringify(json));
  }
  _subscribe_depth(listObj) {
    let reg = [];
    listObj.map(function (item) {
      let wsObj = item.security_type + '_' + item.commodity_no + '_' + item.contract_no;
      reg.push(wsObj);
    });
    let json = { 'method': 'req_subscribe_depth', 'data': { 'level': 5, 'contract_list': reg } };
    this.ws.send(JSON.stringify(json));
  }
  _unsubscribe_depth(listObj) {
    let reg = [];
    listObj.map(function (item) {
      let wsObj = item.security_type + '_' + item.commodity_no + '_' + item.contract_no;
      reg.push(wsObj);
    });
    let json = { 'method': 'req_unsubscribe_depth', 'data': { 'contract_list': reg } };
    this.ws.send(JSON.stringify(json));
  }
  /*查找需要订阅的合约，返回对应的结构体集合 */
  contractFilter(rtnData, isMain, index) {
    let subscribe_list = [];
    let commodity_list = rtnData.data.commodity_list;

    for (let i = 0; i < commodity_list.length; i++) {// to do ... 此处暂时只订阅2条合约
      let commodity_details = commodity_list[i];
      if (_.indexOf(initContractList, commodity_details.commodity_no) < 0) {
        continue;
      }
      let contract_no_obj = isMain ? commodity_details.contract_no_list.filter(function (item) { return (item.flags === 1); }) : commodity_details.contract_no_list[index];
      /*此处配置信息分为两部分处理structure／others，因为structure是后台约定的合约标识,others为配置信息 */
      let contract_structure = {
        'security_type': commodity_details.security_type,
        'exchange_no': commodity_details.exchange_no,
        'commodity_no': commodity_details.commodity_no,
        'contract_no': contract_no_obj[0].contract_no
      };
      let contractName = commodity_details.commodity_no + contract_no_obj[0].contract_no;
      //分类列表加入期数信息
      let regKey = _.findKey(classifyContractMap, function (o) { return _.indexOf(o, commodity_details.commodity_no) >= 0; });
      _.pull(classifyContractMap[regKey], commodity_details.commodity_no);
      classifyContractMap[regKey].push(contractName);

      //推荐列表加入期数信息
      let regKeyTwo = _.findKey(recommendContractMap, function (o) { return _.indexOf(o, commodity_details.commodity_no) >= 0; });
      if (regKeyTwo) {
        _.pull(recommendContractMap[regKeyTwo], commodity_details.commodity_no);
        recommendContractMap[regKeyTwo].push(contractName);
      }

      contractMap2Config[contractName] = { fullName: commodity_details.commodity_name, dotSize: commodity_details.dot_size, structure: contract_structure };
      subscribe_list.push(contract_structure);
    }
    store.dispatch(update_classify(classifyContractMap));
    subscribeObjList.data = subscribe_list
    return subscribe_list;
  }
  marketStoreInit(list) {
    store.dispatch(action_storeinit(list));
  }
  updateMarketStoreData(rtnObj) {
    store.dispatch(action_updateStore(rtnObj));
  }
  updateMarketDepthData(rtnObj) {
    store.dispatch(action_updateAskAndBid(rtnObj));
  }
  managerAliveContractList(rtnObj) {
    let successArr = rtnObj.data.succ_list;
    successArr.map(function (item) {
      let regArr = item.split('_');
      regArr.shift();
      let name = _.join(regArr, '');
      aliveContractList.push(name);
    })
  }
  managerAliveContractList2(rtnObj) {
    let successArr = rtnObj.data.contract_list;
    successArr.map(function (item) {
      let regArr = item.split('_');
      regArr.shift();
      let name = _.join(regArr, '');
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
        case 'on_rtn_depth':                                      //收到深度订阅ticker -> 更新数据  
          this.updateMarketDepthData(data);
          break;
      }
    }
  }

  /*退订其他合约，只保留正在查看的一条,同时为该条订阅深度行情(to do 需要保留有持仓的行情)*/
  otherContractPause(contract, isSnap) {
    let reg = [];
    let deepReg = [];
    aliveContractList.map(function (item) {
      if (item !== contract) {
        let structure = contractMap2Config[item].structure;
        reg.push(structure);
      } else {
        let structure = contractMap2Config[item].structure;
        deepReg.push(structure);
      }
    });
    if (isSnap) {
      _.pullAll(aliveContractSnapShot, aliveContractSnapShot);
      _.assign(aliveContractSnapShot, aliveContractList);
    }
    this._subscribe_depth(deepReg);
    this._unsubscribe(reg);
  }
  /*恢复快照中合约的订阅,同时退订深度行情*/
  contractGoingOn() {
    let reg = [];
    let arr = aliveContractSnapShot.concat();
    _.pullAll(arr, aliveContractList);
    arr.map(function (item) {
      let structure = contractMap2Config[item].structure;
      reg.push(structure);
    });
    this._subscribe(reg);
    let deepReg = [];
    aliveContractList.map(function (item) {
      let structure = contractMap2Config[item].structure;
      deepReg.push(structure);
    });
    this._unsubscribe_depth(deepReg);
  }
  /*合约类别切换 */
  contractChange(beforeClass) {
    if (subscribeObjList.data) {
      let objList = subscribeObjList.data;
      this._subscribe(objList);
      let unsubscribeObj = [];
      objList.map(function (item) {
        let name = item.commodity_no + item.contract_no;
        let beforeArr = classifyContractMap[beforeClass];
        if (_.indexOf(beforeArr, name) >= 0) {
          unsubscribeObj.push(item);
        }
      });
      this._unsubscribe(unsubscribeObj);
    }
  }
}

export default new MarketSocket(MARKET_DOMAIN);