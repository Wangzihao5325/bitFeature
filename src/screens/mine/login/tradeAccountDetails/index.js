import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Api from '../../../../socket/platform/api';
import UsualTabBar from '../../../../components/NormalTabBar';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../../global/config';
export default class TradeAccountDetailScreen extends Component {
  static navigationOptions = {
    title: "开户记录",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  componentDidMount() {
    Api.getTradeAccount(this._getTradeAccountSuccess);
  }
  _getTradeAccountSuccess = (e) => {
    console.log(e);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UsualTabBar tabNames={['交易中', '已结算']} isDefault={false} tabTap={(keyValue) => { console.log('!!!!____' + keyValue) }} />
      </View>
    );
  }


}