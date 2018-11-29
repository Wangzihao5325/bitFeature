import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { DEVICE_WIDTH } from '../../../../../global/config';
import Api from '../../../../../socket/platform/api';
import ToastRoot from '../../../../../components/ToastRoot';
import store from '../../../../../store/index';
import { action_getbalancerate } from '../../../../../store/actions/accountAction';

const DARK_BGCOLOR = '#17191E';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const BTN_BGCOLOR = '#CCD6FD';
const HIGHLIGHT_BGCOLOR = '#FED330';
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
  static contextTypes = {
    mineNavigation: PropTypes.object
  }
  _goTrade = () => {
    const { mineNavigation } = this.context;
    mineNavigation.popToTop();
    mineNavigation.navigate('TradeAccountLogScreenInMarket');
  }
  _tradeAccountRecharge = () => {
    const { mineNavigation } = this.context;
    let id = this.props.data.id;
    mineNavigation.navigate('TradeAccountRecharge', { id: `${id}` });
  }
  _overTradeAccount = () => {
    let id = this.props.data.id;
    Api.endTradeAccount(id, this._endSuccess, this._endFailed);
  }
  _endSuccess = (data, code, message) => {
    Api.getbalancerate(4, null, this._getbalancerateSuccess);
    ToastRoot.show('方案结算成功');
    const { mineNavigation } = this.context;
    mineNavigation.popToTop();
  }
  _getbalancerateSuccess = (result) => {
    store.dispatch(action_getbalancerate(result));
  }
  _endFailed = (data, code, messgae) => {
    ToastRoot.show(messgae);
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
        <BtnItem style={{ marginTop: 10 }} headerText='操盘账户' contentText={tradeAccount} btnText='立即操盘' btnPress={this._goTrade} />
        <Item style={{ marginBottom: 10 }} headerText='操盘密码' contentText={password} />
        <Item headerText='方案申请时间' contentText={appTime} />
        <Item headerText='最大持仓手数' contentText='参考初级可持仓手数' />
        <Item headerText='交易保证金' contentText={traderBond} />
        <BtnItem headerText='追加保证金' contentText={appendTraderBond} btnText='追加资金' btnPress={this._tradeAccountRecharge} />
        <Item headerText='总操盘资金' contentText={traderTotal} />
        <Item headerText='亏损平仓线' contentText={lineLoss} />
        <Item headerText='账户管理费' contentText='免费' />
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: NORMAL_BACKGROUNDCOLOR, marginTop: StyleSheet.hairlineWidth }}>
          <TouchableHighlight
            style={{ height: 50, width: DEVICE_WIDTH, backgroundColor: HIGHLIGHT_BGCOLOR, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onPress={this._overTradeAccount}
          >
            <Text>申请终结方案</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}