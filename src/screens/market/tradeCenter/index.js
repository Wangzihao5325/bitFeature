import React, { Component } from 'react';
import { View, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import store from '../../../store/index';
import * as types from '../../../store/actionType';
import CommonStyle from '../../../global/common_styles';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH, DEVICE_HEIGHT } from '../../../global/config';
import TradeCenterHeader from './TradeCenterHeader';
import TradeCenterBottom from './TradeCenterBottom';
import TradeContent from './TradeContent';
import NumberInput from '../../../components/NumberInput/index';
export default class TradeCenter extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '交易中心',  //header标题
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  render() {
    return (
      <ScrollView style={{ height: DEVICE_HEIGHT, width: DEVICE_WIDTH }} >
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <TradeCenterHeader />
          <TradeContent />
          <NumberInput />
          <TradeCenterBottom />
        </View>
      </ScrollView>
    );
  }
}