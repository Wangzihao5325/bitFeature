import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import UsualTabBar from '../../../../components/NormalTabBar';
import { connect } from 'react-redux';
import store from './../../../../store/index';
import { market_chart_view_screen_change } from './../../../../store/actions/chartActions/marketChartViewAction';
import * as types from '../../../../store/actionType';
import KView from './KView';
import LightningView from './LightningView';
import TimeView from './TimeView';
import marketSocket from './../../../../socket/marketSocket/index';
import { action_startLightningStore } from '../../../../store/actions/chartActions/LightningAction';
import { classifyContractMap } from '../../../../global/commodity_list';

const TAB_ARR = ['闪电', '分时', '日k', '1分', '5分', '15分', '30分', '1小时', '2小时', '4小时', '12小时'];
class MarketChartView extends Component {
  constructor(props) {
    super(props);
    this.defalutHighlight = TAB_ARR.indexOf(props.nowChart);
  }
  componentDidMount() {
    this.name = this.props.nowContract ? this.props.nowContract : classifyContractMap[(this.props.classifyPage === '自选' ? '商品' : this.props.classifyPage)][0];
    marketSocket.getHistoryData(this.name, 0);//1查询k线数据 0时序图
    // store.dispatch(action_startLightningStore(name));//开启闪电图
  }
  componentWillUnmount() {
    let parent = this.props.navigation.dangerouslyGetParent();
    let routers = parent.state.routes;
    if (this.props.navigation.state.routeName === 'TradeCenter' &&
      routers[routers.length - 1].routeName === 'MarketDetailScreen') {
      //do nothing 处理页面跳转时chart加载不出的问题
      //在willmount调用的时候，该页面已经从routers中被删掉了
    } else {
      store.dispatch({ type: types.LIGHTNING_STORE_RESET });
      store.dispatch({ type: types.TIME_STORE_RESET });
      store.dispatch({ type: types.K_STORE_RESET });
      store.dispatch({ type: types.TIME_STORE_CLEAR_DATA });
      store.dispatch({ type: types.TIME_STORE_CLEAR_DATA });
      store.dispatch(market_chart_view_screen_change('分时'));
    }
  }
  chartChange = (keyValue, oldValue) => {
    if (oldValue === '闪电') {
      store.dispatch({ type: types.LIGHTNING_STORE_RESET });
      // store.dispatch({ type: types.CHART_CLAER_DATA });
    } else if (oldValue === '分时') {
      store.dispatch({ type: types.TIME_STORE_RESET });
      store.dispatch({ type: types.TIME_STORE_CLEAR_DATA });
    } else {
      store.dispatch({ type: types.K_STORE_RESET });
      store.dispatch({ type: types.K_STORE_CLEAR_DATA });
    }

    store.dispatch(market_chart_view_screen_change(keyValue));

    let name = this.name;
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
    } else if (keyValue === '1小时') {
      marketSocket.getHistoryData(name, 60);
    } else if (keyValue === '2小时') {
      marketSocket.getHistoryData(name, 120);
    } else if (keyValue === '4小时') {
      marketSocket.getHistoryData(name, 240);
    } else if (keyValue === '12小时') {
      marketSocket.getHistoryData(name, 720);
    }
  }
  render() {
    let highlightIndex = TAB_ARR.indexOf(this.props.nowChart);
    return (
      <View>
        <UsualTabBar tabNames={TAB_ARR} defalutHighlight={this.defalutHighlight} highLight={highlightIndex} tabTap={this.chartChange} />
        {this.props.nowChart === '闪电' && <LightningView />}
        {this.props.nowChart === '分时' && <TimeView />}
        {this.props.nowChart === '日k' && <KView />}
        {this.props.nowChart === '1分' && <KView />}
        {this.props.nowChart === '5分' && <KView />}
        {this.props.nowChart === '15分' && <KView />}
        {this.props.nowChart === '30分' && <KView />}
        {this.props.nowChart === '1小时' && <KView />}
        {this.props.nowChart === '2小时' && <KView />}
        {this.props.nowChart === '4小时' && <KView />}
        {this.props.nowChart === '12小时' && <KView />}
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    nowChart: store.marketChartView.nowChart,
    nowContract: store.marketDetail.nowContract,
    classifyPage: store.contractClassify.page,
  }
}

export default withNavigation(connect(mapState2Props)(MarketChartView));