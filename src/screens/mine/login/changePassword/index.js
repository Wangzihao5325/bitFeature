import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../../global/config';
import Variables from '../../../../global/Variables';
import NormalBtn from '../../../../components/NormalBtn';
import VerificationCode from '../../../../components/VerificationCode';
import SecurityInput from '../../../../components/SecurityInput';
import Api from '../../../../socket/platform/api';
import ToastRoot from '../../../../components/ToastRoot';
import store from '../../../../store/index';
import * as types from '../../../../store/actionType';

const NORMAL_COMPONENT_BACKGROUNDCOLOR = '#323442';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const HIGHLIGHT_BGCOLOR = '#FED330';
let reg = { pwd: '', pwdConfirm: '', code: '' };
export default class ChangePasswordScreen extends Component {
  static navigationOptions = {
    title: "修改密码",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  _changePassword = () => {
    Api.updateLoginPwd(reg.pwd, reg.code, this._changePasswordSuccess, this._changePasswordFailed)
  }
  _changePasswordSuccess = () => {
    ToastRoot.show('更换密码成功,请重新登录');
    this.props.navigation.pop();
    store.dispatch({ type: types.LOG_OUT });
  }
  _changePasswordFailed = (data, code, message) => {
    ToastRoot.show(message);
  }
  _getMessageCode = () => {
    Api.sendMessageWithToken(Variables.account.mobileAccount, 1, this._getMessageSuccess);
  }
  _getMessageSuccess = () => {
    ToastRoot.show('验证码已发送');
  }
  _newPasswordTextChange = (text) => {
    reg.pwd = text;
  }
  _newPasswordConfirmTextChange = (text) => {
    reg.pwdConfirm = text;
  }
  _codeTextChange = (text) => {
    reg.code = text;
  }
  render() {
    let phoneNum = Variables.account.mobileAccount.concat();
    let partA = phoneNum.slice(0, 3);
    let partB = phoneNum.slice(7);
    let showPhoneNum = partA + '****' + partB;
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View>
          {/*手机号*/}
          <View style={{ height: 60, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 40, width: 0.25 * DEVICE_WIDTH, alignItems: 'center', flexDirection: 'row-reverse' }}><Text style={{ fontSize: 18, marginRight: 10, color: NORMAL_TEXTCOLOR }}>手机号</Text></View>
            <View style={{ height: 40, width: 0.75 * DEVICE_WIDTH - 10, alignItems: 'center', flexDirection: 'row', backgroundColor: NORMAL_COMPONENT_BACKGROUNDCOLOR, borderRadius: 5 }}><Text style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>{showPhoneNum}</Text></View>
          </View>
          {/*验证码*/}
          <VerificationCode onChangeText={this._codeTextChange} getMessageCode={this._getMessageCode} />
          {/*新密码*/}
          <SecurityInput placeholder={'请输入6-16 位字母数字'} title={'新密码'} onChangeText={this._newPasswordTextChange} />
          {/*确认密码*/}
          <SecurityInput title={'确认密码'} onChangeText={this._newPasswordConfirmTextChange} />
          {/*确认按钮*/}
          <NormalBtn
            disabled={false}
            title='确认修改'
            style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
            titleStyle={{ color: 'black' }}
            unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
            onPress={this._changePassword}
          />
        </View>
      </View>
    );
  }
}