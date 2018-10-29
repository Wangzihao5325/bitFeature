import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { DEVICE_WIDTH } from '../../../../global/config';
import { contractMap2Config } from '../../../../global/commodity_list';
import { cache } from '../../../../global/trade_list';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
class Item extends Component {
  render() {
    let contractCode = this.props.contractCode;
    let contractName = contractMap2Config[contractCode].fullName;
    let direction = this.props.direction;
    let directionText = direction === 0 ? '多' : '空';
    let directionColor = direction === 0 ? 'rgb(216, 92, 97)' : 'rgb(89, 165, 87)';
    let currencyNo = contractMap2Config[contractCode].currencyNo;
    let dotSize = contractMap2Config[contractCode].dotSize;
    let currencyRate = cache.get(currencyNo).currencyRate;
    let last = this.props.market[contractCode].last;
    let floatValue = this.props.value.floatProfit(last);
    let floatShow = floatValue.value * currencyRate;
    let floatColor = floatShow >= 0 ? 'rgb(216, 92, 97)' : 'rgb(89, 165, 87)';
    return (
      <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{contractName}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: directionColor }}>{directionText}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.holdNum}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.holdAvgPrice}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: floatColor }}>{floatShow.toFixed(dotSize)}</Text></View>
      </View>
    );
  }
}
class DesignateList extends Component {
  render() {
    let dataArr = [];
    this.props.holdPositions.forEach(function (value) {
      dataArr.push(value);
    });
    return (
      <View style={{ width: DEVICE_WIDTH, height: 150, backgroundColor: NORMAL_BACKGROUNDCOLOR }} >
        {/* <FlatList
          data={dataArr}
          renderItem={({ item }) => <Item value={item} contractCode={item.contractCode} direction={item.direction} holdNum={item.holdNum} holdAvgPrice={item.holdAvgPrice} market={this.props.market} />}
        /> */}
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    designates: store.nowTradeAccount.designates,
    market: store.market
  }
}

export default connect(mapState2Props)(HoldPositionList);