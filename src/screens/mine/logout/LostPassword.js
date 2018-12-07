import React, { Component } from 'react';
import { View } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../global/config';
export default class LostPassword extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '忘记密码',  //header标题
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  render() {
    return (
      <View>

      </View>
    );
  }
}