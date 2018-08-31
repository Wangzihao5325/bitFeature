import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CommonStyle from '../global/common_styles';

export default class MarketScreen extends Component {
  render() {
    return (
      <View style={CommonStyle.absoluateCenterStyle}>
        <Text>market</Text>
      </View>
    );
  }
}