import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from '../store/index';
import Api from '../socket/platform/api';
import MarketSocket from '../socket/marketSocket/index';
import { MarketStack, TradeStack, NewsStack, MineStack } from './register_screens';
import { TAB_NAVI_BOTTOM_BGCOLOR, TAB_NAVI_ACTIVE_TINT_COLOR } from '../global/config';
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
  componentDidMount() {
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