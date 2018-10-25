import React, { Component } from 'react';
import { View } from 'react-native';
import TradeSocket from '../../../socket/tradeSocket/index';
import store from '../../../store/index';
import { action_custom_service_model_show } from '../../../store/actions/customServiceAction';
import { action_getbalancerate, action_login } from '../../../store/actions/accountAction';
import Api from '../../../socket/platform/api';
import NormalInput from '../../../components/NormalInput';
import NormalBtn from '../../../components/NormalBtn';
import VectorIconBtn from '../../../components/IconBtn';
import Variables from '../../../global/Variables';
import ToastRoot from '../../../components/ToastRoot';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, BTN_BGCOLOR_RED, SCREEN_BGCOLOR, DEVICE_WIDTH, TRADE_DOMAIN } from '../../../global/config';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
let reg = { accountInput: '', passwordInput: '' };
export default class TradeAccountLogScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '交易登录',  //header标题
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  // componentDidMount() {
  //   this.props.navigation.setParams({ customService: this._customService });
  // }
  // _customService = () => {
  //   store.dispatch(action_custom_service_model_show());
  // }
  _login_success = (e) => {
    console.log(e);
    this.props.navigation.pop();
  }
  _login_failed = () => {
    console.log('failed!!');
   }
  _login = () => {
    TradeSocket.connectSocket(TRADE_DOMAIN.url, reg.accountInput, reg.passwordInput, this._login_success, this._login_failed);
  }
  _naviPop = () => {
    this.props.navigation.navigate('TradeScreen');
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
        <NormalInput secureTextEntry={false} onChangeText={this._accountChange} style={{ marginTop: 20 }} headerTitle='交易账号' tips='请输入正确交易账号' />
        <NormalInput secureTextEntry={true} onChangeText={this._passwordChange} style={{ marginTop: 20 }} headerTitle='交易密码' tips='请输入正确交易密码' />
        <NormalBtn
          disabled={false}
          title='交易登陆'
          style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
          titleStyle={{ color: 'black' }}
          unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
          onPress={this._login}
        />
        <NormalBtn
          disabled={false}
          title='开户申请'
          style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
          titleStyle={{ color: 'black' }}
          unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
          onPress={this._naviPop}
        />
      </View>
    );
  }
}