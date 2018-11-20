import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../../global/config';
export default class InnerDeatil extends Component {
  static navigationOptions = {
    title: "详情",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  componentDidMount() {
    const accountInfo = this.props.navigation.getParam('tranAccount', 'undefine_tranAccount');
    console.log(accountInfo.appTime)
  }
  render() {
    return (
      <View>
        <Text>this is a innerDetail</Text>
      </View>
    );
  }
}