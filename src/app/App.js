import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { MarketStack, TradeStack, NewsStack, MineStack } from '../global/register_screens';
import { TAB_NAVI_BOTTOM_BGCOLOR, TAB_NAVI_ACTIVE_TINT_COLOR } from '../global/config';

export default createBottomTabNavigator(
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
