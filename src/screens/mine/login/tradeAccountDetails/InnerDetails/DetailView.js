import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { DEVICE_WIDTH } from '../../../../../global/config';
const DARK_BGCOLOR = '#17191E';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const BTN_BGCOLOR = '#CCD6FD';
class Item extends Component {
  render() {
    return (
      <View style={[{ height: 40, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, marginVertical: StyleSheet.hairlineWidth }, this.props.style]}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>{this.props.headerText}</Text></View>
        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.contentText}</Text></View>
      </View>
    );
  }
}
class BtnItem extends Component {
  render() {
    return (
      <View style={[{ height: 40, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, marginVertical: StyleSheet.hairlineWidth }, this.props.style]}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>{this.props.headerText}</Text></View>
        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: 'white' }}>{this.props.contentText}</Text>
          <TouchableHighlight onPress={this.props.btnPress} style={{ height: 30, width: 70, backgroundColor: BTN_BGCOLOR, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginRight: 10 }}><Text style={{ color: 'black' }}>{this.props.btnText}</Text></TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default class DetailView extends Component {
  _goTrade = () => {
    console.log('go to trade');
  }
  _tradeAccountRecharge = () => {
    console.log('go to recharge');
  }
  render() {
    let tradeAccount = this.props.data.tranAccount;
    let password = this.props.data.tranPassword;
    let appTime = this.props.data.appTimeStr;
    let traderBond = this.props.data.traderBond;
    let traderTotal = this.props.data.traderTotal;
    let appendTraderBond = this.props.data.appendTraderBond;
    let lineLoss = this.props.data.lineLoss;
    return (
      <View style={{ flex: 1, backgroundColor: DARK_BGCOLOR }}>
        <Item style={{ marginTop: 0 }} headerText='投资标的' contentText='所有可交易合约' />
        <Item headerText='交易时间' contentText='9:05-23:55 不同期货不同交易时间段' />
        {/* <Item style={{ marginTop: 10 }} headerText='操盘账户' contentText={tradeAccount} /> */}
        <BtnItem style={{ marginTop: 10 }} headerText='操盘账户' contentText={tradeAccount} btnText='立即操盘' btnPress={this._goTrade} />
        <Item style={{ marginBottom: 10 }} headerText='操盘密码' contentText={password} />
        <Item headerText='方案申请时间' contentText={appTime} />
        <Item headerText='最大持仓手数' contentText='参考初级可持仓手数' />
        <Item headerText='交易保证金' contentText={traderBond} />
        {/* <Item headerText='追加保证金' contentText={appendTraderBond} /> */}
        <BtnItem headerText='追加保证金' contentText={appendTraderBond} btnText='追加资金' btnPress={this._goTrade} />
        <Item headerText='总操盘资金' contentText={traderTotal} />
        <Item headerText='亏损平仓线' contentText={lineLoss} />
        <Item headerText='账户管理费' contentText='免费' />
      </View>
    );
  }
}