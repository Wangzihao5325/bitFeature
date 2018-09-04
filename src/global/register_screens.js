import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { TAB_NAVI_NAME, TAB_ICON_KEY_STR, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from './config';
import { iconMake } from './vector_icons';
import VectorIconBtn from '../components/IconBtn';

import MarketScreen from '../screens/market/index';
import TradeScreen from '../screens/trade';
import NewsScreen from '../screens/news';
import MineScreen from '../screens/mine';

import MarketDetailScreen from '../screens/market/marketDetail/index';
/*
  4个一级页面注册（行情，模拟交易，资讯，我的），这四个页面要放入tab-navi.
*/
let MarketStack = createStackNavigator({ MarketScreen, MarketDetailScreen }, {  //行情
  navigationOptions: ({ navigation }) => {
    return {
      title: TAB_NAVI_NAME[0],  //header标题
      headerRight: (<VectorIconBtn name='search' onPress={navigation.getParam('search')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  }
});
MarketStack.navigationOptions = {
  tabBarLabel: TAB_NAVI_NAME[0],  //bottom标题
  tabBarIcon: iconMake(TAB_ICON_KEY_STR[0])
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
TradeStack.navigationOptions = {
  tabBarLabel: TAB_NAVI_NAME[1],
  tabBarIcon: iconMake(TAB_ICON_KEY_STR[1])
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
MineStack.navigationOptions = {
  tabBarLabel: TAB_NAVI_NAME[3],
  tabBarIcon: iconMake(TAB_ICON_KEY_STR[3])
};

export {
  MarketStack,
  TradeStack,
  NewsStack,
  MineStack,
}