import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { TAB_NAVI_NAME, TAB_ICON_KEY_STR, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DRAW_BGCOLOR, DEVICE_WIDTH } from './config';
import { iconMake } from './vector_icons';

import MarketScreen from '../screens/market/index';
import TradeScreen from '../screens/trade/index';
import NewsScreen from '../screens/news';
import MineScreen from '../screens/mine';

import MarketDetailScreen from '../screens/market/marketDetail/index';
import DrawList from '../screens/draw/index';
/*
  4个一级页面注册（行情，模拟交易，资讯，我的），这四个页面要放入tab-navi.
*/
let MarketStack = createStackNavigator(                      //行情
  {
    MarketScreen,
    MarketDetailScreen
  },
  {
    navigationOptions: { gesturesEnabled: false }
  });
MarketStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: TAB_NAVI_NAME[0],  //bottom标题
    tabBarIcon: iconMake(TAB_ICON_KEY_STR[0]),
    tabBarVisible
  }
};
let TradeStack = createStackNavigator({ TradeScreen }, {    //模拟交易
  navigationOptions: {
    title: TAB_NAVI_NAME[1],
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR
    },
    headerTintColor: HEADER_TINT_COLOR
  }
});
TradeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: TAB_NAVI_NAME[1],
    tabBarIcon: iconMake(TAB_ICON_KEY_STR[1]),
    tabBarVisible
  }
};
let NewsStack = createStackNavigator({ NewsScreen }, {      //资讯
  navigationOptions: {
    title: TAB_NAVI_NAME[2],
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR
    },
    headerTintColor: HEADER_TINT_COLOR
  }
});
NewsStack.navigationOptions = {
  tabBarLabel: TAB_NAVI_NAME[2],
  tabBarIcon: iconMake(TAB_ICON_KEY_STR[2])
};
let MineStack = createStackNavigator({ MineScreen }, {      //我的
  navigationOptions: {
    title: TAB_NAVI_NAME[3],
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR
    },
    headerTintColor: HEADER_TINT_COLOR
  }
});
MineStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: TAB_NAVI_NAME[3],
    tabBarIcon: iconMake(TAB_ICON_KEY_STR[3]),
    tabBarVisible
  }
};

export {
  MarketStack,
  TradeStack,
  NewsStack,
  MineStack,
}