import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { DEVICE_WIDTH } from '../../../../global/config';
import Icon from 'react-native-vector-icons/FontAwesome';
const fontSize = 12;
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const ITEM_HEIGHT = 120;
class ListItem extends Component {
  static contextTypes = {
    mineNavigation: PropTypes.object
  }
  _toDetail = () => {
    const { mineNavigation } = this.context;
    mineNavigation.navigate('InnerDetail');
  }
  render() {
    let quarterHeight = ITEM_HEIGHT * 0.25;
    let threeQuarterHeight = ITEM_HEIGHT * 0.75;
    let contentHeight = ITEM_HEIGHT * 0.375;
    return (
      <TouchableHighlight style={{ height: ITEM_HEIGHT, width: DEVICE_WIDTH }} onPress={this._toDetail}>
        <View style={{ height: ITEM_HEIGHT, width: DEVICE_WIDTH }}>
          <View style={{ height: quarterHeight, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', borderBottomColor: '#17191E', borderBottomWidth: StyleSheet.hairlineWidth, backgroundColor: NORMAL_BACKGROUNDCOLOR, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <Text style={{ color: NORMAL_TEXTCOLOR }}>{this.props.state}</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={{ color: NORMAL_TEXTCOLOR, marginRight: 10 }}>{this.props.applyTime}</Text>
              <Icon name='chevron-right' size={20} color={NORMAL_TEXTCOLOR} />
            </View>
          </View>
          <View style={{ height: threeQuarterHeight, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
            <View style={{ height: contentHeight, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row' }}>
              <View style={{ height: contentHeight, width: DEVICE_WIDTH / 2, display: 'flex', flexDirection: 'row', borderRightColor: '#17191E', borderRightWidth: StyleSheet.hairlineWidth, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}><Text style={{ color: NORMAL_TEXTCOLOR }}>交易保证金</Text><Text style={{ color: 'white' }}>{`¥${this.props.traderBond}`}</Text></View>
              <View style={{ height: contentHeight, width: DEVICE_WIDTH / 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}><Text style={{ color: NORMAL_TEXTCOLOR }}>总操盘资金</Text><Text style={{ color: 'white' }}>{`${this.props.traderTotal}美元`}</Text></View>
            </View>
            <View style={{ height: contentHeight, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row' }}>
              <View style={{ height: contentHeight, width: DEVICE_WIDTH / 2, display: 'flex', flexDirection: 'row', borderRightColor: '#17191E', borderRightWidth: StyleSheet.hairlineWidth, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}><Text style={{ color: NORMAL_TEXTCOLOR }}>交易账号</Text><Text style={{ color: 'white' }}>{this.props.tranAccount}</Text></View>
              <View style={{ height: contentHeight, width: DEVICE_WIDTH / 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}><Text style={{ color: NORMAL_TEXTCOLOR }}>亏损平仓线</Text><Text style={{ color: 'white' }}>{`${this.props.lineLoss}美元`}</Text></View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
export default class TradingAccountList extends Component {
  render() {
    return (
      <FlatList
        style={{ flex: 1, backgroundColor: '#17191E' }}
        data={this.props.data}
        renderItem={({ item }) => <ListItem state={item.stateTypeStr} applyTime={item.appTimeStr} traderBond={item.traderBond} traderTotal={item.traderTotal} lineLoss={item.lineLoss} tranAccount={item.tranAccount} />}
        ItemSeparatorComponent={() => <View style={{ height: 10, width: DEVICE_WIDTH, backgroundColor: '#17191E' }} />}
      />

    );
  }
}