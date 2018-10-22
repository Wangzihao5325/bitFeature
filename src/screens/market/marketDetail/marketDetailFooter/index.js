import React, { Component } from 'react';
import { View } from 'react-native';
import UsualTabBar from '../../../../components/NormalTabBar';
import { connect } from 'react-redux';
import store from './../../../../store/index';
import { market_detail_footer_screen_change } from './../../../../store/actions/marketDetailFooterAction';
import FiveLevels from './FiveLevels';
import OneByOne from './OneByOne';
import TradeRules from './TradeRules';
class MarketDetailFooter extends Component {
  screenChange = (keyValue) => {
    store.dispatch(market_detail_footer_screen_change(keyValue));
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UsualTabBar tabNames={['五档行情', '逐笔明细', '合约规则']} tabTap={this.screenChange} />
        {this.props.nowScreen === '五档行情' && <FiveLevels />}
        {this.props.nowScreen === '逐笔明细' && <OneByOne />}
        {this.props.nowScreen === '合约规则' && <TradeRules />}
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    nowScreen: store.MarketDetailFooter.nowScreen
  }
}

export default connect(mapState2Props)(MarketDetailFooter);