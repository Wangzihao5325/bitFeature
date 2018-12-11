import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from '../store/index';
import { action_getbalancerate, action_login } from '../store/actions/accountAction';
import Api from '../socket/platform/api';
import MarketSocket from '../socket/marketSocket/index';
import { MarketStack, TradeStack, NewsStack, MineStack } from './register_screens';
import { TAB_NAVI_BOTTOM_BGCOLOR, TAB_NAVI_ACTIVE_TINT_COLOR, TRADE_DOMAIN } from '../global/config';
import { recommendContractMap, classifyContractMap, initContractList } from '../global/commodity_list';
import CustomChooseModel from '../screens/mine/customerService/CustomChooseModel';
import Variables from '../global/Variables';
import TradeFlashLogin from '../screens/trade/TradeFlashLogin';
const Router = createBottomTabNavigator(
  {
    MarketStack,
    TradeStack,
    NewsStack,
    MineStack
  },
  {
    tabBarOptions: {
      activeTintColor: TAB_NAVI_ACTIVE_TINT_COLOR,
      style: {
        backgroundColor: TAB_NAVI_BOTTOM_BGCOLOR
      }
    }
  }
);
export default class App extends Component {
  _getClassifySuccess = (e) => {
    MarketSocket.connectSocket();
    e.map(function (item) {
      let classifyData = item.classifyData;
      let recommedArr = [];
      let classifyArr = [];
      classifyData.map(function (innerItem) {
        initContractList.push(innerItem.commodityCode);
        classifyArr.push(innerItem.commodityCode);
        if (innerItem.isRecommend == '1') {
          recommedArr.push(innerItem.commodityCode);
        }
      });
      recommendContractMap[item.classifyName] = recommedArr;
      classifyContractMap[item.classifyName] = classifyArr;
    });
  }
  _getTradeURLSuccess = (e) => {
    TRADE_DOMAIN.url = e.socketUrl;
  }
  _loginSuccess = (result, code, message) => {
    Variables.account.token = result.token;
    Variables.account.secret = result.secret;
    //init account data
    Api.getbalancerate(4, null, this._getbalancerateSuccess);
  }
  _getbalancerateSuccess = (result) => {
    store.dispatch(action_getbalancerate(result));
    store.dispatch(action_login());
  }
  platformLogin = async () => {
    let account = await AsyncStorage.getItem('PlatformAccount');
    let password = await AsyncStorage.getItem('PlatformPassword');
    if (account && password) {
      Variables.account.mobileAccount = account.concat();
      Api.login(account, password, null, this._loginSuccess);
    }
  }
  componentDidMount() {
    //  this._getClassifySuccess(classify);//mock数据
    Api.getClassifyInfo(this._getClassifySuccess);
    Api.getTradeURL(this._getTradeURLSuccess);
    this.platformLogin();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomChooseModel />
          <TradeFlashLogin />
          <Router />
        </View>
      </Provider>
    );
  }
}