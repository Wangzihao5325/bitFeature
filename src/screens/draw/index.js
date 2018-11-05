import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import TradeContent from './TradeContent';
const BGCOLOR = '#17191E';
export default class DrawScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: BGCOLOR }}>
        <Header/>
        <TradeContent drawer={this.props.drawer}/>
      </View>
    );
  }
}