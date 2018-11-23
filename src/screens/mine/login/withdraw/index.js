import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import NormalInput from '../../../../components/NormalInput';
import NormalBtn from '../../../../components/NormalBtn';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../../global/config';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const DARK_BGCOLOR = '#17191E';
const NORMAL_TEXTCOLOR = '#7E829B';
const HIGHLIGHT_BGCOLOR = '#FED330';

let reg = { money: '', password: '' }
class WithdrawCashScreen extends Component {
  static navigationOptions = {
    title: "提现",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  _goToBindCard = () => {
    this.props.navigation.popToTop();
    this.props.navigation.navigate('BindCardScreen');
  }
  _withDrawMoneyChanged = (text) => {
    reg.money = text;
  }
  _passwordChanged = (text) => {
    reg.password = text;
  }
  _onConfirm = () => {
    console.log('with draw');
  }
  _setWithdrawPassword = () => {
    this.props.navigation.navigate('WithdrawPassword');
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: DARK_BGCOLOR }}>
        <TouchableHighlight onPress={this._goToBindCard} style={{ height: 40, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10 }}>我的银行卡</Text>
            <Text style={{ color: 'white', marginRight: 10 }}>绑定银行卡></Text>
          </View>
        </TouchableHighlight>
        <View style={{ height: 60, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
          <Text style={{ color: HIGHLIGHT_TEXTCOLOR, fontSize: 18 }}>{`余额:${this.props.balance}元`}</Text>
        </View>
        <View style={{ height: 60, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
          <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: 18 }}>{`累计免提现手续费金额:${this.props.operateMoney}元`}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR, marginTop: 10 }}>
          <NormalInput secureTextEntry={false} onChangeText={this._withDrawMoneyChanged} style={{ marginTop: 20 }} headerTitle='提现金额' tips='' />
          <NormalInput secureTextEntry={true} onChangeText={this._passwordChanged} style={{ marginTop: 20 }} headerTitle='提现密码' tips='' />
          <NormalBtn
            disabled={false}
            title='确认提现'
            style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
            titleStyle={{ color: 'black' }}
            unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
            onPress={this._onConfirm}
          />
          <Text onPress={this._setWithdrawPassword} style={{ marginTop: 10, color: NORMAL_TEXTCOLOR, alignSelf: 'center' }}>设置／修改提现密码</Text>
        </View>
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    balance: store.account.balance,
    operateMoney: store.account.operateMoney
  }
}

export default connect(mapState2Props)(WithdrawCashScreen);