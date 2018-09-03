import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { MarketStack, TradeStack, NewsStack, MineStack } from '../global/register_screens';

// TabNavigator.navigationOptions = ({ navigation }) => {
//   let { routeName } = navigation.state.routes[navigation.state.index];

//   // You can do whatever you like here to pick the title based on the route name
//   let headerTitle = routeName;

//   return {
//     headerTitle,
//   };
// };

export default createBottomTabNavigator(
  {
    MarketStack,
    TradeStack,
    NewsStack,
    MineStack
  },{
    navigationOptions: {title: null},
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
