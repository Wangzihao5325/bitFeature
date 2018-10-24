import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store/index';
import { action_chooseScheme } from '../../store/actions/depositAction';
import { DEVICE_WIDTH } from './../../global/config';
const LIGHT_BGCOLOR = '#17191E';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
class BtnItem extends Component {
  constructor(props) {
    super(props);
    this.money = this.props.moneyStr;
  }
  _onPress = () => {
    store.dispatch(action_chooseScheme(this.money));
  }
  render() {
    const textColor = this.props.nowChoose === this.props.moneyStr ? HIGHLIGHT_TEXTCOLOR : NORMAL_TEXTCOLOR
    return (
      <View style={{ backgroundColor: NORMAL_BACKGROUNDCOLOR, height: 50, width: DEVICE_WIDTH / 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableHighlight style={{ backgroundColor: LIGHT_BGCOLOR, height: 30, width: DEVICE_WIDTH / 4 - 16, borderRadius: 2 }} onPress={this._onPress}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: textColor }}>{'¥ ' + this.props.moneyStr}</Text></View>
        </TouchableHighlight>
      </View>
    );
  }
}
class SecletBtns extends Component {
  render() {
    return (
      <View style={{ height: 100, width: DEVICE_WIDTH }}>
        {this.props.scheme &&
          <FlatList
            style={{ flex: 1 }}
            horizontal={false}
            numColumns={4}
            data={Object.keys(this.props.scheme)}
            renderItem={({ item }) => <BtnItem moneyStr={item} nowChoose={this.props.nowChoose} />}
          />}
      </View>
    );
  }
}
class MoneyShow extends Component {
  render() {
    return (
      <View style={{ height: 120, width: DEVICE_WIDTH }}>
        {this.props.scheme && <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>操盘保证金</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.nowChoose + ' 元'}</Text></View></View>}
        {this.props.scheme && <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>总操盘资金</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.scheme[this.props.nowChoose]['traderTotal'] + ' 元'}</Text></View></View>}
        {this.props.scheme && <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>亏损平仓线</Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.scheme[this.props.nowChoose]['lineLoss'] + ' 元'}</Text></View></View>}
        {this.props.scheme && <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: LIGHT_BGCOLOR, borderBottomWidth: 1 }}><View style={{ height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}> 总 计 </Text></View><View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: HIGHLIGHT_TEXTCOLOR }}>{this.props.nowChoose + ' 元'}</Text></View></View>}
      </View>
    );
  }
}
class DepositSelect extends Component {
  render() {
    return (
      <View style={{ height: 280, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT_BGCOLOR }}>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>-选择保证金-</Text>
        </View>
        <SecletBtns scheme={this.props.scheme} nowChoose={this.props.nowChoose} />
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT_BGCOLOR }}>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>-操盘资金-</Text>
        </View>
        <MoneyShow scheme={this.props.scheme} nowChoose={this.props.nowChoose} />
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    scheme: store.depositStore.scheme,
    nowChoose: store.depositStore.choose
  }
}

export default connect(mapState2Props)(DepositSelect);