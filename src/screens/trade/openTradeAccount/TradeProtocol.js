import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../global/config';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
export default class TradeProtocol extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '操盘合作协议',  //header标题
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: NORMAL_TEXTCOLOR }}>暂无协议文本，后续添加</Text>
      </View>
    );
  }
}