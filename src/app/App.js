import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { MarketStack, TradeStack, NewsStack, MineStack } from '../global/register_screens';
import { TAB_NAVI_BOTTOM_BGCOLOR, TAB_NAVI_ACTIVE_TINT_COLOR } from '../global/config';
import { Provider } from 'react-redux';
import store from '../store/index';
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
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}