import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { contractMap2Config } from '../../../../global/commodity_list';
import { DEVICE_WIDTH } from '../../../../global/config';
import Api from './../../../../socket/platform/api';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const LIGHT_BGCOLOR = '#323442'
class Item extends Component {
  render() {
    return (
      <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: this.props.bgColor ? this.props.bgColor : NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ height: 30, width: 100, borderRightColor: 'black', borderRightWidth: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: 'white' }}>{this.props.title}</Text></View>
        <View style={{ height: 30, width: DEVICE_WIDTH - 100, display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Text numberOfLines={1} ellipsizeMode='tail' style={{ color: 'white', marginLeft: 5 }}>{this.props.contant}</Text></View>
      </View>
    );
  }
}
class TradeRules extends Component {
  state = {
    commodityName: '',
    currencyNo: '',
    contractSize: '',
    miniTikeSize: '',
    fee: '',
    time: '',
    startTime: '--',
    endTime: '--'
  };
  getRulesSuccess = (e) => {
    let closeTime = '';
    let timeStr = '';
    if (e.tradingTimeSeg) {
      console.log(e.tradingTimeSeg);
      let timeStrArr = e.tradingTimeSeg;
      timeStrArr.forEach(element => {
        let timeObj = JSON.parse(element);
        if (timeObj.TradingState === 3) {
          switch (timeObj.DateFlag) {
            case 0:
              timeStr = `${timeStr}昨日${timeObj.TimeBucketBeginTime}-`;
              break;
            case 1:
              timeStr = `${timeStr}${timeObj.TimeBucketBeginTime}-`;
              break;
            case 2:
              timeStr = `${timeStr}明日${timeObj.TimeBucketBeginTime}-`;
          }
        } else if (timeObj.TradingState === 4 || timeObj.TradingState === 5) {
          switch (timeObj.DateFlag) {
            case 0:
              timeStr = `${timeStr}昨日${timeObj.TimeBucketBeginTime} `;
              if (timeObj.TradingState === 5) {
                closeTime = `昨日${timeObj.TimeBucketBeginTime}`;
              }
              break;
            case 1:
              timeStr = `${timeStr}${timeObj.TimeBucketBeginTime} `;
              if (timeObj.TradingState === 5) {
                closeTime = `${timeObj.TimeBucketBeginTime}`;
              }
              break;
            case 2:
              timeStr = `${timeStr}明日${timeObj.TimeBucketBeginTime} `;
              if (timeObj.TradingState === 5) {
                closeTime = `明日${timeObj.TimeBucketBeginTime}`;
              }
          }
        }
      });
    }
    this.setState({
      commodityName: e.commodityName,
      currencyNo: e.currencyNo,
      contractSize: e.contractSize,
      miniTikeSize: e.miniTikeSize,
      fee: e.fee,
      time: closeTime,
      startTime: timeStr,
      endTime: timeStr
    });
  }
  componentDidMount() {
    let structure = contractMap2Config[this.props.nowDetail].structure;
    let wsObj = structure.commodity_no;
    Api.getCommodityTradeRules(wsObj, this.getRulesSuccess);
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }} >
        <ScrollView>
          <Item title='交易品种' contant={this.state.commodityName} bgColor={LIGHT_BGCOLOR} />
          <Item title='币种单位' contant={this.state.currencyNo} />
          <Item title='交易单位' contant={this.state.contractSize} bgColor={LIGHT_BGCOLOR} />
          <Item title='波动盈亏' contant={this.state.miniTikeSize} />
          <Item title='交易综合费用' contant={this.state.fee} bgColor={LIGHT_BGCOLOR} />
          <Item title='买入交易时间' contant={this.state.startTime} />
          <Item title='卖出交易时间' contant={this.state.endTime} bgColor={LIGHT_BGCOLOR} />
          <Item title='清仓时间' contant={this.state.time} />
        </ScrollView>
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    marketStore: store.market,
    nowDetail: store.marketDetail.nowContract
  }
}

export default connect(mapState2Props)(TradeRules);