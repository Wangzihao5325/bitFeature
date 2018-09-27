import React, { Component } from 'react';
import { View } from 'react-native';
import store from '../../../store/index';
import { action_custom_service_model_show } from '../../../store/actions/customServiceAction';
import { action_getbalancerate, action_login } from '../../../store/actions/accountAction';
import Api from '../../../socket/platform/api';
import NormalInput from '../../../components/NormalInput';
import NormalBtn from '../../../components/NormalBtn';
import VectorIconBtn from '../../../components/IconBtn';
import Variables from '../../../global/Variables';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, BTN_BGCOLOR_RED, SCREEN_BGCOLOR, DEVICE_WIDTH } from '../../../global/config';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
let reg = { accountInput: '', passwordInput: '' };
export default class AccountLogScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '登录',  //header标题
      headerRight: (<VectorIconBtn name='headphones' onPress={navigation.getParam('customService')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  constructor() {
    super();
    this._loginSuccess = this._loginSuccess.bind(this);
    this._getbalancerateSuccess = this._getbalancerateSuccess.bind(this);
  }
  componentDidMount() {
    this.props.navigation.setParams({ customService: this._customService });
  }
  _customService = () => {
    store.dispatch(action_custom_service_model_show());
  }
  _getbalancerateSuccess = (result) => {
    store.dispatch(action_getbalancerate(result));
    store.dispatch(action_login());
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
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <NormalInput secureTextEntry={false} onChangeText={this._accountChange} style={{ marginTop: 20 }} headerTitle='手机' tips='请输入正确手机号码' />
        <NormalInput secureTextEntry={true} onChangeText={this._passwordChange} style={{ marginTop: 20 }} headerTitle='密码' tips='密码由6-16位数字和字母组成' />
        <NormalBtn
          disabled={false}
          title='登陆'
          style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: BTN_BGCOLOR_RED, alignSelf: 'center', marginTop: 40 }}
          titleStyle={{ color: 'white' }}
          unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
          onPress={this._login}
        />
      </View>
    );
  }
}