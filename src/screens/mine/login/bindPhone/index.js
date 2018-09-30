import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../../global/config';
import NormalBtn from '../../../../components/NormalBtn';
import SecurityInput from '../../../../components/SecurityInput';
import VerificationCode from '../../../../components/VerificationCode';
import Variables from '../../../../global/Variables';
const NORMAL_TEXTCOLOR = '#7E829B';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_COMPONENT_BACKGROUNDCOLOR = '#323442';
const HIGHLIGHT_BGCOLOR = '#FED330';
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

  }
  _codeOldTextChange = () => {

  }
  _codeNewTextChange = () => {

  }
  _getMessageCodeOld = () => {

  }
  _getMessageCodeNew = () => {

  }
  _newMobileTextChange = () => {

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
          <SecurityInput title={'新手机号'} onChangeText={this._newMobileTextChange} />
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