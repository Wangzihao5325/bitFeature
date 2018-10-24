import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../global/config';
export default class OpenTradeAccountScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '确认开户',  //header标题
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>12121212121</Text>
      </View>
    );
  }
}
