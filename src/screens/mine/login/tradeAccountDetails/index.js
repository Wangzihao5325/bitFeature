import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../../../store/index';
import { update_trade_account_list, page_change, page_reset } from '../../../../store/actions/tradeAccountAction';
import Api from '../../../../socket/platform/api';
import UsualTabBar from '../../../../components/NormalTabBar';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../../global/config';
import TradingAccountList from './TradingAccountList';
import { NavigationEvents } from 'react-navigation';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const TAB_ARR = ['已结算', '交易中'];
class TradeAccountDetailScreen extends Component {
  static navigationOptions = {
    title: "开户记录",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };

  static childContextTypes = {
    mineNavigation: PropTypes.object
  }
  getChildContext() {
    return {
      mineNavigation: this.props.navigation
    }
  }

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
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <UsualTabBar tabNames={TAB_ARR} isDefault={false} tabTap={this._pageChange} />
        {!this.props.isHaveAccount && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>请先开户</Text></View>}
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