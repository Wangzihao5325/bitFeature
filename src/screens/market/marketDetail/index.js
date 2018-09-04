import React, { Component } from 'react';
import { View, Text } from 'react-native';
import VectorIconBtn from '../../../components/IconBtn';
import CommonStyle from '../../../global/common_styles';
import { TAB_NAVI_NAME, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../global/config';
export default class MarketDetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: null,
      headerRight: (<VectorIconBtn name={'list'} onPress={()=>{console.log('12345')}} />),
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };

  render() {
    return (
      <View style={CommonStyle.absoluateCenterStyle}>
        <Text>MarketDetail</Text>
      </View>
    );
  }
}