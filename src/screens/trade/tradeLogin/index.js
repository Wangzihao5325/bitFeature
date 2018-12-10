import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TradeSocket from '../../../socket/tradeSocket/index';
import NormalInput from '../../../components/NormalInput';
import NormalBtn from '../../../components/NormalBtn';
import ToastRoot from '../../../components/ToastRoot';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH, TRADE_DOMAIN } from '../../../global/config';

const DARK_BGCOLOR = '#17191E';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const NORMAL_TEXTCOLOR = '#7E829B';
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
  state = {
    accountDefault: '',
    passwordDefault: '',
  }
  componentDidMount() {
    const account = this.props.navigation.getParam('tradeAccount', '_ws_undefined');
    const password = this.props.navigation.getParam('password', '_ws_undefined');
    if (account !== '_ws_undefined' && password !== '_ws_undefined') {
      reg.accountInput = account;
      reg.passwordInput = password;
      this.setState({
        accountDefault: account,
        passwordDefault: password,
      })
    }
  }
  _login_success = (e) => {
    ToastRoot.show('交易账号登录成功');
    this.props.navigation.pop();
  }
  _login_failed = () => {
    ToastRoot.show('交易账号登录失败');
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
  _gotoProtal = () => {
    this.props.navigation.navigate('WSProtocol');
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <NormalInput secureTextEntry={false} onChangeText={this._accountChange} defaultValue={this.state.accountDefault} style={{ marginTop: 20 }} headerTitle='交易账号' tips='请输入正确交易账号' />
        <NormalInput secureTextEntry={true} onChangeText={this._passwordChange} defaultValue={this.state.passwordDefault} style={{ marginTop: 20 }} headerTitle='交易密码' tips='请输入正确交易密码' />
        <NormalBtn
          disabled={false}
          title='交易登录'
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
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>点击登录表示同意</Text>
          <Text onPress={this._gotoProtal} style={{ color: HIGHLIGHT_TEXTCOLOR, marginTop: 4 }}>《期货大赛用户协议》</Text>
        </View>
        <View style={{ backgroundColor: DARK_BGCOLOR, height: 10, width: DEVICE_WIDTH, marginTop: 10 }}></View>
        <View>
          <Text style={{ color: NORMAL_TEXTCOLOR, marginTop: 10, marginLeft: 15, marginRight: 15 }}>操盘交易账号 ≠ 注册登录账号</Text>
          <Text style={{ color: NORMAL_TEXTCOLOR, marginTop: 10, marginLeft: 15, marginRight: 15 }}>交易账号:申请方案后系统自动发放，用于实盘交易的账号。可查询交易明细，结算后将会更换。</Text>
          <Text style={{ color: NORMAL_TEXTCOLOR, marginTop: 10, marginLeft: 15, marginRight: 15 }}>登录账号:使用手机注册后的平台账号，用于登录APP和网站，进行充值提现查看资金明细等。</Text>
        </View>
      </View>
    );
  }
}