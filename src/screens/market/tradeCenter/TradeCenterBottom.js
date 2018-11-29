import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import store from '../../../store/index';
import { list_change } from '../../../store/actions/nowTradeAccountAction';
import UsualTabBar from '../../../components/NormalTabBar';
import HoldPositionList from './holdPositionList/index';
import DealList from './dealList/index';
import DesignateList from './designateList/index';
import OrderList from './orderList/index';
import { DEVICE_WIDTH } from '../../../global/config';
class TradeCenterBottom extends Component {
  componentWillUnmount() {
    store.dispatch(list_change('持仓'));
  }
  pageChange = (keyValue, oldValue) => {
    store.dispatch(list_change(keyValue));
  }
  render() {
    return (
      <View style={{ height: 180, width: DEVICE_WIDTH }} >
        <UsualTabBar tabNames={['挂单', '持仓', '委托', '成交']} tabTap={this.pageChange} />
        {this.props.nowList === '持仓' && <HoldPositionList />}
        {this.props.nowList === '成交' && <DealList />}
        {this.props.nowList === '挂单' && <DesignateList />}
        {this.props.nowList === '委托' && <OrderList />}
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    nowList: store.nowTradeAccount.nowList,
  }
}

export default connect(mapState2Props)(TradeCenterBottom);