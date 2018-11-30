import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../../global/config';
import NormalBtn from '../../../../components/NormalBtn';
import VerificationCode from '../../../../components/VerificationCode';
import MaterialInput from '../../../../components/MaterialInput';
import Variables from '../../../../global/Variables';
import Api from '../../../../socket/platform/api';
import ToastRoot from '../../../../components/ToastRoot';
const NORMAL_TEXTCOLOR = '#7E829B';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_COMPONENT_BACKGROUNDCOLOR = '#323442';
const HIGHLIGHT_BGCOLOR = '#FED330';

let reg = { oldCode: '', newCode: '', newPhone: '' };
export default class BindPhoneScreen extends Component {
  static navigationOptions = {
    title: "修改手机号",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  _changeMobile = () => {
    if (reg.newPhone === '' || reg.oldCode === '' || reg.newCode === '') {
      ToastRoot.show('请输入正确的信息');
      return;
    }
    Api.updatePhone(reg.newPhone, reg.oldCode, reg.newCode, this._changeMobileSuccess, this._changeMobileFailed);
  }
  _changeMobileSuccess = (e, code, message) => {
    ToastRoot.show('更换手机号码成功,请重新登录');
    this.props.navigation.pop();
    store.dispatch({ type: types.LOG_OUT });
  }
  _changeMobileFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  _codeOldTextChange = (text) => {
    reg.oldCode = text;
  }
  _codeNewTextChange = (text) => {
    reg.newCode = text;
  }
  _getMessageCodeOld = () => {
    Api.sendMessageWithToken(Variables.account.mobileAccount, 4, this._sendMessageSuccesss);
  }
  _getMessageCodeNew = () => {
    Api.sendMessageWithToken(reg.newPhone, 3, this._sendMessageSuccesss);
  }
  _sendMessageSuccesss = () => {

  }
  _newMobileTextChange = (text) => {
    reg.newPhone = text;
  }
  render() {
    let phoneNum = Variables.account.mobileAccount.concat();
    let partA = phoneNum.slice(0, 3);
    let partB = phoneNum.slice(7);
    let showPhoneNum = partA + '****' + partB;
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View>
          {/*原手机号*/}
          <View style={{ height: 60, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 40, width: 0.25 * DEVICE_WIDTH, alignItems: 'center', flexDirection: 'row-reverse' }}><Text style={{ fontSize: 18, marginRight: 10, color: NORMAL_TEXTCOLOR }}>原手机号</Text></View>
            <View style={{ height: 40, width: 0.75 * DEVICE_WIDTH - 10, alignItems: 'center', flexDirection: 'row', backgroundColor: NORMAL_COMPONENT_BACKGROUNDCOLOR, borderRadius: 5 }}><Text style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>{showPhoneNum}</Text></View>
          </View>
          {/*验证码*/}
          <VerificationCode onChangeText={this._codeOldTextChange} getMessageCode={this._getMessageCodeOld} />
          {/*新手机号*/}
          <MaterialInput title={'新手机号'} onChangeText={this._newMobileTextChange} />
          {/*验证码*/}
          <VerificationCode onChangeText={this._codeNewTextChange} getMessageCode={this._getMessageCodeNew} />
          {/*确认按钮*/}
          <NormalBtn
            disabled={false}
            title='确认修改'
            style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
            titleStyle={{ color: 'black' }}
            unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
            onPress={this._changeMobile}
          />
        </View>
      </View>
    );
  }
}