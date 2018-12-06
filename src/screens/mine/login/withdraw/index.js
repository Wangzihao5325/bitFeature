import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import NormalInput from '../../../../components/NormalInput';
import NormalBtn from '../../../../components/NormalBtn';
import Dialog from '../../../../components/ImageVerification/Dialog';
import Api from '../../../../socket/platform/api';
import ToastRoot from '../../../../components/ToastRoot';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../../global/config';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const DARK_BGCOLOR = '#17191E';
const NORMAL_TEXTCOLOR = '#7E829B';
const HIGHLIGHT_BGCOLOR = '#FED330';

let reg = { money: '', password: '' }
class DialogContent extends Component {
  componentDidMount() {
    Api.getWithdrawFee(reg.money, this._getFeeSuccess, this._getFeeFailed);
  }
  state = {
    text: '',
    receiveMoney: ''
  }
  _getFeeSuccess = (data, code, message) => {
    let contentText = `提现手续费:${data.fee}元`;
    let receiveMoney = `实际到账金额:${reg.money - data.fee}元`
    this.setState({
      text: contentText,
      receiveMoney: receiveMoney
    });
  }
  _getFeeFailed = (data, code, message) => {
    this.setState({
      text: message
    });
  }
  render() {
    return (
      <View>
        <Text>{this.state.text}</Text>
        <Text>{this.state.receiveMoney}</Text>
      </View>
    );
  }
}
class WithdrawCashScreen extends Component {
  static navigationOptions = {
    title: "提现",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  state = {
    isShow: false,
    bankText: '',
  }
  _onDidFocus = () => {
    Api.getBindedBankCard(this.getDefalutBankSuccess, this.getDefalutBankFailed);
  }
  getDefalutBankSuccess = (e) => {
    if (e.length && e.length > 0) {
      let bankText = `${e[0].bankName}:   **** **** **** ${e[0].card.slice(12)}`
      this.setState({
        bankText: bankText
      });
    } else {
      this.setState({
        bankText: '未绑定提现银行卡'
      });
    }
  }
  getDefalutBankFailed = () => {

  }
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
  _showDialog = () => {
    this.setState({
      isShow: true
    })
  }
  _onConfirm = () => {
    this.setState({
      isShow: false
    })
    Api.getBindedBankCard(this._getBindCardSuccess, this._getBindCardFailed)
  }
  _getBindCardSuccess = (e, code, message) => {
    if (e.length && e.length > 0) {
      let defaultBank = e[0];
      Api.handleWithdraw(defaultBank.abbreviation, defaultBank.card, reg.money, reg.password, this._handleSuccess, this._handleFailed)
    } else {
      ToastRoot.show('没有银行卡信息，请先绑定银行卡');
    }
  }
  _handleSuccess = (e, code, message) => {
    ToastRoot.show('提现成功，稍后金额将进入您的账户');
    this.props.navigation.pop();
  }
  _handleFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  _getBindCardFailed = () => {
    ToastRoot.show('提现失败');
  }
  _onCancel = () => {
    this.setState({
      isShow: false
    })
  }
  _setWithdrawPassword = () => {
    this.props.navigation.navigate('WithdrawPassword');
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: DARK_BGCOLOR }}>
        <NavigationEvents
          onDidFocus={this._onDidFocus}
        />
        <TouchableHighlight onPress={this._goToBindCard} style={{ height: 40, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10 }}>{this.state.bankText}</Text>
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
            onPress={this._showDialog}
          />
          <Text onPress={this._setWithdrawPassword} style={{ marginTop: 10, color: NORMAL_TEXTCOLOR, alignSelf: 'center' }}>设置／修改提现密码</Text>
        </View>
        <Dialog
          visible={this.state.isShow}
          header={'确认提现'}
          renderContent={() => <DialogContent />}
          onConfirm={this._onConfirm}
          onCancel={this._onCancel}
        />
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