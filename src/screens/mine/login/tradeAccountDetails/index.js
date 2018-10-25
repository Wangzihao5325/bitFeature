import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import store from '../../../../store/index';
import { update_trade_account_list, page_change, page_reset } from '../../../../store/actions/tradeAccountAction';
import Api from '../../../../socket/platform/api';
import UsualTabBar from '../../../../components/NormalTabBar';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../../global/config';
import TradingAccountList from './TradingAccountList';
class TradeAccountDetailScreen extends Component {
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
  componentWillUnmount() {
    store.dispatch(page_reset());
  }
  _getTradeAccountSuccess = (result) => {
    let tradeList = result.tradeList ? result.tradeList : [];
    store.dispatch(update_trade_account_list(tradeList));
  }
  _pageChange = (keyValue) => {
    store.dispatch(page_change(keyValue));
  }
  render() {
    let data = this.props.onTradingAccountList;
    if (this.props.page === '已结算') {
      data = this.props.endedAccountList;
    }
    return (
      <View style={{ flex: 1 }}>
        <UsualTabBar tabNames={['交易中', '已结算']} isDefault={false} tabTap={this._pageChange} />
        {!this.props.isHaveAccount && <View><Text>12345</Text></View>}
        {this.props.isHaveAccount && <TradingAccountList data={data} />}
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    page: store.tradeAccount.page,
    isHaveAccount: store.tradeAccount.isHaveAccount,
    onTradingAccountList: store.tradeAccount.onTradingAccountList,
    endedAccountList: store.tradeAccount.endedAccountList
  }
}

export default connect(mapState2Props)(TradeAccountDetailScreen);