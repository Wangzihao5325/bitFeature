import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TradeSocket from '../../../socket/tradeSocket/index';
import NormalInput from '../../../components/NormalInput';
import NormalBtn from '../../../components/NormalBtn';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH, TRADE_DOMAIN } from '../../../global/config';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
const HIGHLIGHT_TEXT_COLOR = '#FED330';
const DARK_BGCOLOR = '#17191E';
const NORMAL_TEXTCOLOR = '#7E829B';
let reg = { accountInput: '', passwordInput: '' };
export default class ApplyTradeAccountSuccessScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '开户成功',  //header标题
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  state = {
    account: '',
    password: ''
  }
  componentDidMount() {
    const account = this.props.navigation.getParam('tranAccount', '');
    const password = this.props.navigation.getParam('tranPassword', '');
    this.setState({
      account: account,
      password: password
    });
  }
  _login_success = (e) => {
    this.props.navigation.pop();
    this.props.navigation.navigate('MarketScreen');
  }
  _login_failed = () => {
    console.log('failed!!');
  }
  _login = () => {
    TradeSocket.connectSocket(TRADE_DOMAIN.url, reg.accountInput, reg.passwordInput, this._login_success, this._login_failed);
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: DARK_BGCOLOR }}>
          <Text style={{ fontSize: 20, color: HIGHLIGHT_TEXT_COLOR }}>开户申请成功</Text>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>{`账号:${this.state.account}`}</Text>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>{`密码:${this.state.password}`}</Text>
        </View>
        <View style={{ flex: 3 }}>
          <NormalInput secureTextEntry={false} onChangeText={this._accountChange} style={{ marginTop: 20 }} headerTitle='交易账号' tips='请输入正确交易账号' />
          <NormalInput secureTextEntry={true} onChangeText={this._passwordChange} style={{ marginTop: 20 }} headerTitle='交易密码' tips='请输入正确交易密码' />
          <NormalBtn
            disabled={false}
            title='交易登录'
            style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
            titleStyle={{ color: 'black' }}
            unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
            onPress={this._login}
          />
        </View>
      </View>
    );
  }
}