import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../../global/config';
export default class ChangePasswordScreen extends Component {
  static navigationOptions = {
    title: "修改密码",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>ChangePassword</Text>
      </View>
    );
  }
}