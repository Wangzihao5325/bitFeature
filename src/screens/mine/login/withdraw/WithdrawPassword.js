import React, { Component } from 'react';
import { View } from 'react-native';
import VerificationCode from '../../../../components/VerificationCode';
import SecurityInput from '../../../../components/SecurityInput';
import Variables from '../../../../global/Variables';
import NormalBtn from '../../../../components/NormalBtn';
import Api from '../../../../socket/platform/api';
import ToastRoot from '../../../../components/ToastRoot';
import { DEVICE_WIDTH, PLATFORM_DOMAIN, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../../global/config';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARK_BGCOLOR = '#17191E';

let reg = { tradePassword: '', imageCode: '' };
export default class WithdrawPassword extends Component {
  static navigationOptions = {
    title: "提现密码",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  _passwordChange = (text) => {
    reg.tradePassword = text;
  }
  _getMessageCode = () => {
    Api.sendMessageWithToken(Variables.account.mobileAccount, 2, this._getMessageSuccess, this._getMessageFailed);
  }
  _getMessageSuccess = () => {
    ToastRoot.show('发送验证码成功');
  }
  _getMessageFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  _messageCodeChange = (text) => {
    reg.imageCode = text;
  }
  _setTradePassword = () => {
    Api.setWithdrawPassword(reg.tradePassword, reg.imageCode, this._setPasswordSuccess, this._setPasswordFailed);
  }
  _setPasswordSuccess = () => {
    this.props.navigation.pop();
    ToastRoot.show('设置／修改交易密码成功');
  }
  _setPasswordFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  render() {
    const imgUri = `${PLATFORM_DOMAIN}/sendImageCode?1=${Math.random() * 1000}&mobile=${Variables.account.mobileAccount}`;
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        {/*新密码*/}
        <SecurityInput title={'提现密码'} onChangeText={this._passwordChange} />
        {/*验证码*/}
        <VerificationCode onChangeText={this._messageCodeChange} getMessageCode={this._getMessageCode} />
        <NormalBtn
          disabled={false}
          title='确认'
          style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
          titleStyle={{ color: 'black' }}
          unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
          onPress={this._setTradePassword}
        />
      </View>
    );
  }
}