import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from '../store/index';
import Api from '../socket/platform/api';
import MarketSocket from '../socket/marketSocket/index';
import { MarketStack, TradeStack, NewsStack, MineStack } from './register_screens';
import { TAB_NAVI_BOTTOM_BGCOLOR, TAB_NAVI_ACTIVE_TINT_COLOR } from '../global/config';
import { recommendContractMap, classifyContractMap, initContractList } from '../global/commodity_list';
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
    console.log(recommendContractMap);
    console.log(classifyContractMap);
    console.log(initContractList);
  }
  componentDidMount() {
    Api.getClassifyInfo(this._getClassifySuccess);
    MarketSocket.connectSocket();
  }
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}