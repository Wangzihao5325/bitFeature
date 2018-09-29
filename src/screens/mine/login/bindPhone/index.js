import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../../global/config';
export default class BindPhoneScreen extends Component {
  static navigationOptions = {
    title: "修改手机号",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>BindPhone</Text>
      </View>
    );
  }
}