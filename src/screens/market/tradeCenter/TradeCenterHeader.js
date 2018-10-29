import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { DEVICE_WIDTH } from '../../../global/config';
import { classifyContractMap, contractMap2Config } from '../../../global/commodity_list';
import { cache } from '../../../global/trade_list';
const LIGHT_BGCOLOR = '#2E344C';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
let TOTALFLOAT = 0;
class TradeCenterHeader extends Component {
  riskText = (totalFloatProfit) => {
    const balanceWithFloatProfit = this.props.balance + totalFloatProfit;
    const diffBalance = this.props.initBalance - balanceWithFloatProfit;
    const diffBalanceWithForce = this.props.initBalance - this.props.forceLine;
    let riskText = '0.00%';

    if (!isNaN(diffBalance / diffBalanceWithForce)) {
      if (diffBalance / diffBalanceWithForce > 0) {
        riskText = `${((diffBalance * 100) / diffBalanceWithForce).toFixed(2)}%`;
      }
    }
    return riskText;
  }
  totalFloat = (value, key, map) => {
    let contract = value.contractCode;
    let currencyNo = contractMap2Config[contract].currencyNo;
    let currencyRate = cache.get(currencyNo).currencyRate;
    let last = this.props.market[contract].last;
    let floatValue = value.floatProfit(last);
    TOTALFLOAT = TOTALFLOAT + floatValue.value * currencyRate;
  }
  render() {
    TOTALFLOAT = 0;
    this.props.holdPositions.forEach(this.totalFloat);
    let totalColor = TOTALFLOAT >= 0 ? 'rgb(216, 92, 97)' : 'rgb(89, 165, 87)';
    let risk = this.riskText(TOTALFLOAT);
    let defalutContract = classifyContractMap[(this.props.classifyPage === '自选' ? '商品' : this.props.classifyPage)][0];
    let fullName = contractMap2Config[defalutContract].fullName;
    let dotSize = contractMap2Config[defalutContract].dotSize;
    let color = this.props.market[defalutContract].change_rate >= 0 ? 'rgb(216, 92, 97)' : 'rgb(89, 165, 87)';
    return (
      <View style={{ height: 100, height: DEVICE_WIDTH, display: 'flex' }}>
        <View style={{ height: 50, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: LIGHT_BGCOLOR }}>
          <View style={{ flex: 2, justifyContent: 'space-around', alignItems: 'center', borderRightColor: 'black', borderRightWidth: 1 }}><Text style={{ color: 'white' }}>总资产</Text><Text style={{ color: HIGHLIGHT_TEXTCOLOR }}>{this.props.balance.toFixed(0)}</Text></View>
          <View style={{ flex: 2, justifyContent: 'space-around', alignItems: 'center', borderRightColor: 'black', borderRightWidth: 1 }}><Text style={{ color: 'white' }}>持仓盈亏</Text><Text style={{ color: totalColor }}>{TOTALFLOAT.toFixed(2)}</Text></View>
          <View style={{ flex: 2, justifyContent: 'space-around', alignItems: 'center', borderRightColor: 'black', borderRightWidth: 1 }}><Text style={{ color: 'white' }}>平仓盈亏</Text><Text>无效</Text></View>
          <View style={{ flex: 3, justifyContent: 'space-around', alignItems: 'center' }}><Text style={{ color: 'white' }}>{`平仓线:${this.props.forceLine}`}</Text><Text style={{ color: 'white' }}>{`风险度:${risk}`}</Text></View></View>
        <View style={{ height: 50, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
          <View style={{ flex: 5, borderRightColor: 'black', borderRightWidth: 1, flexDirection: 'row' }}>
            <View style={{ flex: 2, justifyContent: 'space-around', alignItems: 'center' }}><Text style={{ color: 'white' }}>{fullName}</Text><Text style={{ color: color }}>{this.props.market[defalutContract].last}</Text></View>
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}><Text style={{ color: color }}>{`${this.props.market[defalutContract].change_rate.toFixed(2)}%`}</Text><Text style={{ color: color }}>{this.props.market[defalutContract].change_value.toFixed(dotSize)}</Text></View>
          </View>
          <View style={{ flex: 5 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}><Text style={{ color: 'white' }}>卖一</Text><Text style={{ color: 'rgb(89, 165, 87)' }}>{this.props.market[defalutContract].ask1[0].toFixed(dotSize)}</Text><Text style={{ color: 'white' }}>{this.props.market[defalutContract].ask1[1]}</Text></View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}><Text style={{ color: 'white' }}>买一</Text><Text style={{ color: 'rgb(216, 92, 97)' }}>{this.props.market[defalutContract].bid1[0].toFixed(dotSize)}</Text><Text style={{ color: 'white' }}>{this.props.market[defalutContract].bid1[1]}</Text></View>
          </View>
        </View>
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    classifyPage: store.contractClassify.page,
    holdPositions: store.nowTradeAccount.holdPositions,
    forceLine: store.nowTradeAccount.forceLine,
    initBalance: store.nowTradeAccount.initBalance,
    balance: store.nowTradeAccount.balance,
    market: store.market
  }
}

export default connect(mapState2Props)(TradeCenterHeader);