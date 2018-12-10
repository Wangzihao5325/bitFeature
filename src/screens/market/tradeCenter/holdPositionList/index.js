import React, { Component } from 'react';
import { View, FlatList, ScrollView, Text, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { DEVICE_WIDTH } from '../../../../global/config';
import { contractMap2Config } from '../../../../global/commodity_list';
import { cache } from '../../../../global/trade_list';
import TradeSocket from '../../../../socket/tradeSocket/index';
import ToastRoot from '../../../../components/ToastRoot';
import Dialog from '../../../../components/ImageVerification/Dialog';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARK_BGCOLOR = '#17191E';
class Item extends Component {
  state = {
    isBtnShow: false,
    isDialogShow: false,
  }
  _onCancel = () => {
    this.setState({
      isDialogShow: false
    });
  }
  _btnClick = () => {
    this.setState(function (preSate, props) {
      return {
        isBtnShow: !preSate.isBtnShow
      }
    });
  }
  _sellout = () => {
    this.setState({
      isDialogShow: true
    });
  }
  _onConfirm = () => {
    this.setState({
      isDialogShow: false
    });
    let contractCode = this.props.contractCode;
    let type = contractMap2Config[contractCode].structure.security_type;
    let direction = this.props.direction === 0 ? 1 : 0;
    let holdNum = this.props.holdNum;
    if (type === 'FO') {
      TradeSocket.insertOrder(contractCode, holdNum, direction, 1, 1, 0);//市价 开仓
    } else if (type === 'FI') {
      TradeSocket.insertOrder(contractCode, holdNum, direction, 1, 2, 0);//市价 平仓
    }
  }
  _changeDir = () => {
    let contractCode = this.props.contractCode;
    let type = contractMap2Config[contractCode].structure.security_type;
    let direction = this.props.direction === 0 ? 1 : 0;
    let holdNum = this.props.holdNum;
    if (type === 'FO') {
      TradeSocket.insertOrder(contractCode, holdNum * 2, direction, 1, 1, 0);//市价 反向买2倍
    } else if (type === 'FI') {
      TradeSocket.insertOrder(contractCode, holdNum, direction, 1, 2, 0);//市价 先平仓再开仓
      TradeSocket.insertOrder(contractCode, holdNum, direction, 1, 1, 0);
    }
  }
  _stopLoss = () => {
    ToastRoot.show('此功能暂未开放，敬请期待');
  }
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
    // let floatShow = floatValue.value * currencyRate;      //以人民币作为结算
    let floatShow = floatValue.value;                        //以合约本身币种作为结算
    let floatColor = floatShow >= 0 ? 'rgb(216, 92, 97)' : 'rgb(89, 165, 87)';
    return (
      <View>
        <TouchableHighlight onPress={this._btnClick}>
          <View style={{ height: 30, width: 400, display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{contractName}</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: directionColor }}>{directionText}</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.holdNum}</Text></View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.holdAvgPrice}</Text></View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: floatColor }}>{floatShow.toFixed(dotSize)}</Text></View>
          </View>
        </TouchableHighlight>
        {this.state.isBtnShow &&
          <View style={{ height: 30, width: 400, display: 'flex', flexDirection: 'row', backgroundColor: DARK_BGCOLOR }}>
            <View style={{ height: 30, width: DEVICE_WIDTH / 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }} onPress={this._sellout}>平仓</Text></View>
            <View style={{ height: 30, width: DEVICE_WIDTH / 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }} onPress={this._changeDir}>反手</Text></View>
            <View style={{ height: 30, width: DEVICE_WIDTH / 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }} onPress={this._stopLoss}>止盈止损</Text></View>
          </View>
        }
        <Dialog
          visible={this.state.isDialogShow}
          header={'确认平仓'}
          renderContent={() => <Text>{`提交订单: ${contractName}, 价格:市价, 手数(${this.props.holdNum})`}</Text>}
          onConfirm={this._onConfirm}
          onCancel={this._onCancel}
        />
      </View>
    );
  }
}
class Header extends Component {
  render() {
    return (
      <View style={{ height: 30, width: 400, display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>合约名称</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>多空</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>手数</Text></View>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>持仓均价</Text></View>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>浮动盈亏</Text></View>
      </View>
    );
  }
}
class HoldPositionList extends Component {
  render() {
    let dataArr = [];
    _.mapValues(this.props.holdPositions, function (value) {
      dataArr.push(value);
      return null;
    });
    // this.props.holdPositions.forEach(function (value) {
    //   dataArr.push(value);
    // });
    return (
      <View style={{ width: DEVICE_WIDTH, height: 150, backgroundColor: NORMAL_BACKGROUNDCOLOR }} >
        <ScrollView
          contentContainerStyle={{ width: 400 }}
          horizontal={true}
          directionalLockEnabled={false}
          nestedScrollEnabled={true}
        >
          <View>
            <Header />
            {dataArr.length > 0 && <FlatList
              data={dataArr}
              renderItem={({ item }) => <Item value={item} contractCode={item.contractCode} direction={item.direction} holdNum={item.holdNum} holdAvgPrice={item.holdAvgPrice} market={this.props.market} />}
            />}
          </View>
        </ScrollView>
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    holdPositions: store.nowTradeAccount.holdPositions,
    market: store.market
  }
}

export default connect(mapState2Props)(HoldPositionList);