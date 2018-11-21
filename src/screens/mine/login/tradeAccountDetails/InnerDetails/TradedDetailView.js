import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, FlatList } from 'react-native';
import UsualTabBar from '../../../../../components/NormalTabBar';
import { DEVICE_WIDTH } from '../../../../../global/config';
import Api from '../../../../../socket/platform/api';

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
class DetailItem extends Component {
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
        <Item style={{ marginTop: 10 }} headerText='操盘账户' contentText={tradeAccount} />
        <Item style={{ marginBottom: 10 }} headerText='操盘密码' contentText={password} />
        <Item headerText='方案申请时间' contentText={appTime} />
        <Item headerText='最大持仓手数' contentText='参考初级可持仓手数' />
        <Item headerText='交易保证金' contentText={traderBond} />
        <Item headerText='追加保证金' contentText={appendTraderBond} />
        <Item headerText='总操盘资金' contentText={traderTotal} />
        <Item headerText='亏损平仓线' contentText={lineLoss} />
        <Item headerText='账户管理费' contentText='免费' />
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: NORMAL_BACKGROUNDCOLOR, marginTop: StyleSheet.hairlineWidth }}>
          <View
            style={{ height: 50, width: DEVICE_WIDTH, backgroundColor: '#7D7D7D', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ color: 'white' }}>该方案已终结</Text>
          </View>
        </View>
      </View>
    );
  }
}
class FlatItem extends Component {
  render() {
    let openCloseText = this.props.item.openCloseType === 1 ? '开仓' : '平仓';
    return (
      <View style={{ height: 30, width: 950, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ height: 30, width: 150, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>{this.props.item.tradeDate}</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>{this.props.item.userNo}</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>{this.props.item.currencyNo}</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>{this.props.item.exchangeNo}</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>{this.props.item.commodityNo}</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>{openCloseText}</Text>
        </View>
        <View style={{ height: 30, width: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>{this.props.item.buyNum}</Text>
        </View>
        <View style={{ height: 30, width: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>{this.props.item.sellNum}</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>{this.props.item.tradePrice}</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>{this.props.item.free}</Text>
        </View>
      </View>
    );
  }
}

class FlatHeader extends Component {
  render() {
    return (
      <View style={{ height: 30, width: 950, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#36394C' }}>
        <View style={{ height: 30, width: 150, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#A1A8C8' }}>成交日期</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#A1A8C8' }}>客户号</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#A1A8C8' }}>币种</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#A1A8C8' }}>交易所</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#A1A8C8' }}>品种</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#A1A8C8' }}>开/平</Text>
        </View>
        <View style={{ height: 30, width: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#A1A8C8' }}>买</Text>
        </View>
        <View style={{ height: 30, width: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#A1A8C8' }}>卖</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#A1A8C8' }}>成交价</Text>
        </View>
        <View style={{ height: 30, width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#A1A8C8' }}>手续费</Text>
        </View>
      </View>
    );
  }
}

class TradeList extends Component {
  state = {
    data: null
  }
  componentDidMount() {
    Api.getHistoryTradeList(this.props.id, this._getHistoryTradeSuccess);
  }
  _getHistoryTradeSuccess = (e, code, message) => {
    this.setState({
      data: e
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ width: 950 }}
          horizontal={true}
          directionalLockEnabled={false}
          nestedScrollEnabled={true}
        >
          <View >
            <FlatHeader />
            {this.state.data && <FlatList
              style={{ flex: 1 }}
              data={this.state.data}
              renderItem={({ item }) => <FlatItem item={item} />}
            />}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default class TradedDetailView extends Component {
  _pageChange = () => {
    console.log('page change');
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <UsualTabBar tabNames={['方案明细', '历史成交记录']} tabTap={this._pageChange} />
        {/* <DetailItem data={this.props.data} /> */}
        <TradeList id={this.props.data.id} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});