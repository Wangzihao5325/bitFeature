import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {TAB_NAVI_HEADER_BGCOLOR} from '../../global/config';

export default class DrawScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: TAB_NAVI_HEADER_BGCOLOR }}>
        <Text>MarketDetail</Text>
      </View>
    );
  }
}