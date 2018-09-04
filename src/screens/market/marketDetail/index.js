import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CommonStyle from '../../../global/common_styles';
import { TAB_NAVI_NAME, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../global/config';
export default class MarketDetailScreen extends Component {
  static navigationOptions = {
    title: TAB_NAVI_NAME[1],
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR
    },
    headerTintColor: HEADER_TINT_COLOR
  };

  render() {
    return (
      <View style={CommonStyle.absoluateCenterStyle}>
        <Text>MarketDetail</Text>
      </View>
    );
  }
}