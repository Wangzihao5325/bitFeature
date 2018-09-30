import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../../global/config';
import Variables from '../../../../global/Variables';
import VectorIconBtn from '../../../../components/IconBtn';
import NormalBtn from '../../../../components/NormalBtn';
import VerificationCode from '../../../../components/VerificationCode';
import Api from '../../../../socket/platform/api';
const NORMAL_COMPONENT_BACKGROUNDCOLOR = '#323442';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARKER_BGCOLOR = '#17191E';
const HIGHLIGHT_BGCOLOR = '#FED330';
let reg = { pwd: '', pwdConfirm: '', code: '' };
class SecurityItem extends Component {
  state = {
    security: true,
    iconName: 'eye'
  }
  _changeSecurity = () => {
    this.setState((preState, props) => {
      let name = preState.iconName === 'eye' ? 'eye-slash' : 'eye';
      return {
        security: !preState.security,
        iconName: name
      }
    })
  }
  render() {
    return (
      <View style={{ height: 60, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ height: 40, width: 0.25 * DEVICE_WIDTH, alignItems: 'center', flexDirection: 'row-reverse' }}><Text style={{ fontSize: 18, marginRight: 10, color: NORMAL_TEXTCOLOR }}>{this.props.title}</Text></View>
        <View style={{ height: 40, width: 0.75 * DEVICE_WIDTH - 10, alignItems: 'center', flexDirection: 'row', backgroundColor: DARKER_BGCOLOR, borderRadius: 5 }}><TextInput onChangeText={this.props.onChangeText} secureTextEntry={this.state.security} style={{ flex: 1, color: 'white', fontSize: 18, marginLeft: 10 }} /><VectorIconBtn color={NORMAL_TEXTCOLOR} name={this.state.iconName} onPress={this._changeSecurity} /></View>
      </View>
    );
  }
}
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
    Api.updateLoginPwd(reg.pwd, reg.code, this._changePasswordSuccess)
  }
  _changePasswordSuccess = () => {
    console.log('更换密码成功');
  }
  _getMessageCode = () => {
    Api.sendMessageWithToken(Variables.account.mobileAccount, 1, this._getMessageSuccess);
  }
  _getMessageSuccess = () => {
    console.log('get message success');
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
          <SecurityItem title={'新密码'} onChangeText={this._newPasswordTextChange} />
          {/*确认密码*/}
          <SecurityItem title={'确认密码'} onChangeText={this._newPasswordConfirmTextChange} />
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