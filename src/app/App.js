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
    // Api.getVersions((result)=>{console.log(result)});
    // let ws = new WebSocket('ws://quote.vs.com:9102');
    // console.log(ws);
    // ws.onopen = function (evt) {
    //   console.log(evt);
    //   let json = { "method": "req_login", "data": { "user_name": "fut_game_inner", "password": "a123456", "protoc_version": "6.2" } }
    //   ws.send(JSON.stringify(json));
    // }
    // ws.onclose = function (evt) {
    //   console.log(evt);
    // }
    // ws.onmessage = function (evt) {
    //   console.log(evt);
    //   console.log(evt.data);
    // }
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