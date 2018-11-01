import React, { Component } from 'react';
import { View, FlatList, Text, ScrollView } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { DEVICE_WIDTH } from '../../../../global/config';
import { contractMap2Config } from '../../../../global/commodity_list';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
class Item extends Component {
  render() {
    let contractCode = this.props.item.productName;
    let contractName = contractMap2Config[contractCode].fullName;
    let direction = this.props.item.direction.text;
    let directionColor = direction === '多' ? 'rgb(216, 92, 97)' : 'rgb(89, 165, 87)';
    let price = this.props.item.tradePrice;
    let num = this.props.item.tradeNum;
    let time = this.props.item.tradeTime;
    return (
      <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{contractName}</Text></View>
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: directionColor }}>{direction}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{price}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{num}</Text></View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{time}</Text></View>
      </View>
    );
  }
}
class DealList extends Component {
  render() {
    return (
      <View style={{ width: DEVICE_WIDTH, height: 150, backgroundColor: NORMAL_BACKGROUNDCOLOR }} >
        <View style={{ height: 150, width: DEVICE_WIDTH }}>
          <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>合约</Text></View>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>多空</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>成交价</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>成交量</Text></View>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>成交时间</Text></View>
          </View>
          {this.props.deals.length > 0 && <FlatList
            data={this.props.deals}
            renderItem={({ item }) => <Item item={item} contractCode={item.contractCode} direction={item.direction} holdNum={item.holdNum} holdAvgPrice={item.holdAvgPrice} market={this.props.market} />}
          />}
        </View>
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    deals: store.nowTradeAccount.deals
  }
}

export default connect(mapState2Props)(DealList);