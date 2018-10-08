import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../../global/config';
export default class BindCardScreen extends Component {
  static navigationOptions = {
    title: "绑定银行卡",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>BindCard</Text>
      </View>
    );
  }
}