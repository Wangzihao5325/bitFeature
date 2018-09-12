import React, { Component } from 'react';
import { View } from 'react-native';
import Api from '../../../socket/platform/api';
import NormalInput from '../../../components/NormalInput';
import NormalBtn from '../../../components/NormalBtn';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, BTN_BGCOLOR_RED, SCREEN_BGCOLOR, DEVICE_WIDTH } from '../../../global/config';
import store from '../../../store/index';
import * as types from '../../../store/actionType';
import Variables from '../../../global/Variables';
import { action_getbalancerate, action_login } from '../../../store/actions/accountAction';
let reg = { accountInput: '', passwordInput: '' };
export default class AccountLogScreen extends Component {
  static navigationOptions = {
    title: '登陆',
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  constructor() {
    super();
    this._loginSuccess = this._loginSuccess.bind(this);
    this._getbalancerateSuccess = this._getbalancerateSuccess.bind(this);
  }

  _getbalancerateSuccess = (result) => {
    store.dispatch(action_getbalancerate(result));
    store.dispatch({ type: types.LOG_IN });
    this.props.navigation.pop();
  }
  _loginSuccess = (result) => {
    Variables.account.token = result.token;
    Variables.account.secret = result.secret;

    //init account data
    Api.getbalancerate(4, null, this._getbalancerateSuccess);
  }
  _login = () => {
    Api.login(reg.accountInput, reg.passwordInput, this._loginSuccess);
  }
  _accountChange = (text) => {
    reg.accountInput = text;
  }
  _passwordChange = (text) => {
    reg.passwordInput = text;
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: SCREEN_BGCOLOR }}>
        <NormalInput onChangeText={this._accountChange} style={{ marginTop: 20 }} headerTitle='手机' tips='请输入正确手机号码' />
        <NormalInput onChangeText={this._passwordChange} headerTitle='密码' tips='密码由6-16位数字和字母组成' />
        <NormalBtn
          disabled={false}
          title='登陆'
          style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: BTN_BGCOLOR_RED, alignSelf: 'center' }}
          titleStyle={{ color: 'white' }}
          unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
          onPress={this._login}
        />
      </View>
    );
  }
}