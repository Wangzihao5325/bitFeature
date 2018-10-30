import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { DEVICE_WIDTH } from '../../../../global/config';
import { contractMap2Config } from '../../../../global/commodity_list';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
class Item extends Component {
  render() {
    let contractCode = this.props.item.productName;
    let contractName = contractMap2Config[contractCode].fullName;
    let orderStatus = this.props.item.orderStatus;
    let direction = this.props.item.direction;
    let directionText = direction === 0 ? '多' : '空';
    let directionColor = direction === 0 ? 'rgb(216, 92, 97)' : 'rgb(89, 165, 87)';
    let orderPrice = this.props.item.orderPrice;
    let dotSize = contractMap2Config[contractCode].dotSize;
    let orderNum = this.props.item.orderNum;
    let tradeNum = this.props.item.tradeNum;
    let cdNum = this.props.item.cdNum;
    let insertDateTime = this.props.item.insertDateTime;
    return (
      <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{contractName}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{orderStatus}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: directionColor }}>{directionText}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{orderPrice}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{orderNum}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{tradeNum}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{cdNum}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{insertDateTime}</Text></View>
      </View>
    );
  }
}
class OrderList extends Component {
  render() {
    return (
      <View style={{ width: DEVICE_WIDTH, height: 150, backgroundColor: NORMAL_BACKGROUNDCOLOR }} >
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>合约</Text></View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>状态</Text></View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>多空</Text></View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>委托价</Text></View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>委托量</Text></View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>已成交</Text></View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>已撤单</Text></View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>下单时间</Text></View>
        </View>
        <FlatList
          data={this.props.orders}
          renderItem={({ item }) => <Item item={item} />}
        />
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    orders: store.nowTradeAccount.orders//委托
  }
}

export default connect(mapState2Props)(OrderList);