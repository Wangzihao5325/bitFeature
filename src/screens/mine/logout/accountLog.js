import React, { Component } from 'react';
import { View } from 'react-native';
import NormalInput from '../../../components/NormalInput';
import CommonStyles from '../../../global/common_styles';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../global/config';
export default class AccountLogScreen extends Component {
  static navigationOptions = {
    title: '登陆',
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR
    },
    headerTintColor: HEADER_TINT_COLOR
  };

  render() {
    return (
      <View style={[{ flex: 1 }, CommonStyles.innerAbsCenterStyle]}>
        <NormalInput headerTitle='手机' tips='warnning!!' />
      </View>
    );
  }
}