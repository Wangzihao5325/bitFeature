import React, { Component } from 'react';
import { View } from 'react-native';
import UsualTabBar from '../../../../components/NormalTabBar';
import { connect } from 'react-redux';
import store from './../../../../store/index';
import { market_chart_view_screen_change } from './../../../../store/actions/chartActions/marketChartViewAction';
import KView from './KView';
import LightningView from './LightningView';
import TimeView from './TimeView';
import marketSocket from './../../../../socket/marketSocket/index';
import { action_startLightningStore } from '../../../../store/actions/chartActions/LightningAction';
class MarketChartView extends Component {
  componentDidMount() {
    let name = this.props.nowContract;
    marketSocket.getHistoryData(name, 0);//1查询k线数据 0时序图
    // store.dispatch(action_startLightningStore(name));//开启闪电图
  }
  chartChange = (keyValue) => {

    let name = this.props.nowContract;
    if (keyValue === '闪电') {
      store.dispatch(action_startLightningStore(name));//开启闪电图
    } else if (keyValue === '分时') {
      marketSocket.getHistoryData(name, 0);//1查询k线数据 0时序图
    } else if (keyValue === '日k') {
      marketSocket.getHistoryData(name, 1440);
    } else if (keyValue === '1分') {
      marketSocket.getHistoryData(name, 1);
    } else if (keyValue === '5分') {
      marketSocket.getHistoryData(name, 5);
    } else if (keyValue === '15分') {
      marketSocket.getHistoryData(name, 15);
    } else if (keyValue === '30分') {
      marketSocket.getHistoryData(name, 30);
    }
    store.dispatch(market_chart_view_screen_change(keyValue));
  }
  render() {
    console.log('zxczxczxc');
    console.log(this.props.nowChart);
    console.log(this.props.nowChart === '闪电');
    return (
      <View>
        <UsualTabBar tabNames={['闪电', '分时', '日k', '1分', '5分', '15分', '30分']} tabTap={this.chartChange} />
        {this.props.nowChart === '闪电' && <LightningView />}
        {this.props.nowChart === '分时' && <TimeView />}
        {this.props.nowChart === '日k' && <KView />}
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    nowChart: store.marketChartView.nowChart,
    nowContract: store.marketDetail.nowContract
  }
}

export default connect(mapState2Props)(MarketChartView);