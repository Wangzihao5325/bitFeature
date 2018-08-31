import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MarketScreen from '../screens/market';
import TradeScreen from '../screens/trade';
import NewsScreen from '../screens/news';
import MineScreen from '../screens/mine';

export default createBottomTabNavigator ({
  Market: MarketScreen,
  Trade: TradeScreen,
  News: NewsScreen,
  Mine: MineScreen,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
