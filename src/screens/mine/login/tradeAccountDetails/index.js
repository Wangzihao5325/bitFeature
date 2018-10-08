import React, { Component } from 'react';
import { View, Text } from 'react-native';
import store from '../../../../store/index';
import { update_trade_account_list } from '../../../../store/actions/tradeAccountAction';
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
  _getTradeAccountSuccess = (result) => {
    console.log(result);
    let tradeList = result.tradeList ? result.tradeList : [];
    store.dispatch(update_trade_account_list(tradeList));
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UsualTabBar tabNames={['交易中', '已结算']} isDefault={false} tabTap={(keyValue) => { console.log('!!!!____' + keyValue) }} />
        
      </View>
    );
  }


}