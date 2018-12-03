import React, { Component } from 'react';
import { View, FlatList, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { DEVICE_WIDTH } from '../../global/config';
import PropTypes from 'prop-types';
import ToastRoot from '../../components/ToastRoot';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARK_BGCOLOR = '#17191E';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
class ListHeader extends Component {
  render() {
    return (
      <View style={{ height: 60, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ height: 60, width: 90, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>期货产品</Text></View>
        <View style={{ height: 60, width: 70, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>交易手续费</Text></View>
        <View style={{ height: 60, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>初始可持仓手数</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>交易时间段</Text></View>
      </View>
    );
  }
}
class Items extends Component {
  render() {
    let choose = this.props.choose;
    let itemData = this.props.item;
    let key = choose + 'initialAmount';
    let fullName = itemData.fullName;
    let fullNum = itemData.fullNum;
    let showInit = itemData[key];
    let price = itemData.price;
    let tradTime = itemData.tradTime;
    let index = itemData.index;
    let bgColor = index % 2 === 0 ? NORMAL_BACKGROUNDCOLOR : DARK_BGCOLOR;
    return (
      <View style={{ height: 60, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: bgColor }}>
        <View style={{ height: 60, width: 90, display: 'flex', justifyContent: 'center', paddingLeft: 5 }}><Text style={{ color: 'white' }}>{fullName}</Text><Text style={{ color: NORMAL_TEXTCOLOR }}>{fullNum}</Text></View>
        <View style={{ height: 60, width: 70, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{price + ' 元／手'}</Text></View>
        <View style={{ height: 60, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{showInit + '手'}</Text></View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ScrollView horizontal={true} nestedScrollEnabled={true}>
            <View style={{ height: 60, width: DEVICE_WIDTH, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Text style={{ color: 'white' }}>{tradTime}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
class ContractInfoList extends Component {
  static contextTypes = {
    tradeNavigation: PropTypes.object
  }
  _toTradeAccountList = () => {
    const { tradeNavigation } = this.context;
    if (this.props.login) {
      tradeNavigation.navigate('TradeAccountDetailScreen');
    } else {
      ToastRoot.show('请首先登录平台账户');
    }
  }
  render() {
    return (
      <View style={{ height: 290, width: DEVICE_WIDTH, display: 'flex', backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 20, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
          <Text onPress={this._toTradeAccountList} style={{ color: NORMAL_TEXTCOLOR, fontSize: 10 }}>查看全部开户记录 >></Text>
        </View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: DARK_BGCOLOR }}>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>-可交易品种-</Text>
        </View>
        <ListHeader />
        {this.props.contract &&
          <FlatList
            nestedScrollEnabled={true}
            style={{ flex: 1 }}
            data={this.props.contract}
            renderItem={({ item }) => <Items item={item} choose={this.props.choose} />}
          />}
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    contract: store.depositStore.contract,
    choose: store.depositStore.choose,
    login: store.account.isLogin,
  }
}

export default connect(mapState2Props)(ContractInfoList);