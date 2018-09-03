import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { TAB_NAVI_NAME, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from './config';
import MarketScreen from '../screens/market';
import TradeScreen from '../screens/trade';
import NewsScreen from '../screens/news';
import MineScreen from '../screens/mine';

let MarketStack = createStackNavigator({ MarketScreen }, {  //行情
  navigationOptions: {
    title: TAB_NAVI_NAME[0],
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR
    },
    headerTintColor: HEADER_TINT_COLOR
  }
});
MarketStack.navigationOptions = {
  tabBarLabel: TAB_NAVI_NAME[0],
  tabBarIcon: <Image source={require('../image/test_default.png')} />
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
  tabBarIcon: <Image source={require('../image/test_default.png')} />
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
  tabBarIcon: <Image source={require('../image/test_default.png')} />
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
  tabBarIcon: <Image source={require('../image/test_default.png')} />
};

export {
  MarketStack,
  TradeStack,
  NewsStack,
  MineStack
}