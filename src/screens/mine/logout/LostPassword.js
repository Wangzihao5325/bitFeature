import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../global/config';
import Variables from '../../../global/Variables';
import NormalBtn from '../../../components/NormalBtn';
import VerificationCode from '../../../components/VerificationCode';
import SecurityInput from '../../../components/SecurityInput';
import Api from '../../../socket/platform/api';
import ToastRoot from '../../../components/ToastRoot';
import store from '../../../store/index';
import * as types from '../../../store/actionType';
import MaterialInput from '../../../components/MaterialInput';

const NORMAL_COMPONENT_BACKGROUNDCOLOR = '#323442';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const HIGHLIGHT_BGCOLOR = '#FED330';
let reg = { mobile: '', pwd: '', pwdConfirm: '', code: '' };
export default class LostPassword extends Component {
  static navigationOptions = {
    title: "重置密码",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  _changePassword = () => {
    if (reg.pwd === reg.pwdConfirm) {
      Api.resetPassword(reg.mobile, reg.pwd, reg.code, this._changePasswordSuccess, this._changePasswordFailed);
    } else {
      ToastRoot.show('两次输入密码不一致');
    }
  }
  _changePasswordSuccess = () => {
    ToastRoot.show('更换密码成功,请重新登录');
    this.props.navigation.pop();
  }
  _changePasswordFailed = (data, code, message) => {
    ToastRoot.show(message);
  }
  _getMessageCode = () => {
    Api.sendMessageWithoutToken(reg.mobile, 2, null, this._getMessageSuccess, this._getMessageFailed);
  }
  _getMessageSuccess = () => {
    ToastRoot.show('验证码已发送');
  }
  _getMessageFailed = (e, code, message) => {
    ToastRoot.show(message);
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
  _mobileTextChange = (text) => {
    reg.mobile = text;
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View>
          {/*手机号*/}
          <MaterialInput title={'手机账号'} onChangeText={this._mobileTextChange} />
          {/*验证码*/}
          <VerificationCode onChangeText={this._codeTextChange} getMessageCode={this._getMessageCode} />
          {/*新密码*/}
          <SecurityInput placeholder={'请输入6-16 位字母数字'} title={'新密码'} onChangeText={this._newPasswordTextChange} />
          {/*确认密码*/}
          <SecurityInput title={'确认密码'} onChangeText={this._newPasswordConfirmTextChange} />
          {/*确认按钮*/}
          <NormalBtn
            disabled={false}
            title='重置密码'
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