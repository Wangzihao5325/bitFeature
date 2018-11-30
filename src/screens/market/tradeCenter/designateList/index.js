import React, { Component } from 'react';
import { View, FlatList, ScrollView, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { DEVICE_WIDTH } from '../../../../global/config';
import { contractMap2Config } from '../../../../global/commodity_list';
import TradeSocket from '../../../../socket/tradeSocket';
import store from '../../../../store/index';
import { order_change_pop_show } from '../../../../store/actions/popAction'
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARK_BGCOLOR = '#17191E';
class Item extends Component {
  state = {
    isBtnShow: false
  }
  _btnClick = () => {
    this.setState(function (preSate, props) {
      return {
        isBtnShow: !preSate.isBtnShow
      }
    });
  }
  _delete = () => {
    let orderSysId = this.props.item.orderSysID;
    let orderId = this.props.item.orderId;
    let contractStructure = contractMap2Config[this.props.item.productName].structure;
    let exchangeNo = contractStructure.exchange_no;
    let commodityNo = contractStructure.commodity_no;
    let contractNo = contractStructure.contract_no;
    let orderNum = this.props.item.orderNum;
    let direction = this.props.item.direction.value;
    let orderPrice = this.props.item.orderPrice;
    TradeSocket.cancelOrder(orderSysId, orderId, exchangeNo, commodityNo, contractNo, orderNum, direction, orderPrice);
  }
  _change = () => {
    store.dispatch(order_change_pop_show());
  }
  render() {
    let contractCode = this.props.item.productName;
    let contractName = contractMap2Config[contractCode].fullName;
    let direction = this.props.item.direction;
    let directionText = direction.text;
    let directionColor = direction.color;
    let orderPrice = this.props.item.orderPrice;
    let dotSize = contractMap2Config[contractCode].dotSize;
    let orderNum = this.props.item.orderNum;
    let designateNum = this.props.item.designateNum;
    let insertDateTime = this.props.item.insertDateTime;
    return (
      <View>
        <TouchableHighlight onPress={this._btnClick}>
          <View style={{ height: 30, width: 550, display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{contractName}</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: directionColor }}>{directionText}</Text></View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{orderPrice}</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{orderNum}</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{designateNum}</Text></View>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{insertDateTime}</Text></View>
          </View>
        </TouchableHighlight>
        {this.state.isBtnShow &&
          <View style={{ height: 30, width: 550, display: 'flex', flexDirection: 'row', backgroundColor: DARK_BGCOLOR }}>
            <View style={{ height: 30, width: DEVICE_WIDTH / 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text onPress={this._delete} style={{ color: NORMAL_TEXTCOLOR }}>撤单</Text></View>
            <View style={{ height: 30, width: DEVICE_WIDTH / 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text onPress={this._change} style={{ color: NORMAL_TEXTCOLOR }}>改单</Text></View>
          </View>
        }
      </View>
    );
  }
}
class Header extends Component {
  render() {
    return (
      <View style={{ height: 30, width: 550, display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>合约名称</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>多空</Text></View>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>委托价</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>委托量</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>挂单量</Text></View>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>挂单时间</Text></View>
      </View>
    );
  }
}
class DesignateList extends Component {
  render() {
    return (
      <View style={{ width: DEVICE_WIDTH, height: 150, backgroundColor: NORMAL_BACKGROUNDCOLOR }} >
        <ScrollView
          contentContainerStyle={{ width: 550 }}
          horizontal={true}
          directionalLockEnabled={false}
          nestedScrollEnabled={true}
        >
          <View>
            <Header />
            {this.props.designates.length > 0 && <FlatList
              data={this.props.designates}
              renderItem={({ item }) => <Item item={item} />}
            />}
          </View>
        </ScrollView>
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    designates: store.nowTradeAccount.designates//挂单
  }
}

export default connect(mapState2Props)(DesignateList);