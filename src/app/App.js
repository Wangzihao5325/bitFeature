import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from '../store/index';
import { MarketStack, TradeStack, NewsStack, MineStack } from './register_screens';
import { TAB_NAVI_BOTTOM_BGCOLOR, TAB_NAVI_ACTIVE_TINT_COLOR } from '../global/config';
import Api from '../socket/platform/api';
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
    let formData = new FormData();
    formData.append('appVersions','6.1');
    fetch('http://test.api.duokongtai.cn/socket/config/getVersions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      });
  }
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}