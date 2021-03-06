import React, { Component } from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import store from '../../../store/index';
import { action_custom_service_model_show } from '../../../store/actions/customServiceAction';
import { action_getbalancerate, action_login } from '../../../store/actions/accountAction';
import Api from '../../../socket/platform/api';
import NormalInput from '../../../components/NormalInput';
import NormalBtn from '../../../components/NormalBtn';
import VectorIconBtn from '../../../components/IconBtn';
import Variables from '../../../global/Variables';
import ToastRoot from '../../../components/ToastRoot';
import Dialog from '../../../components/ImageVerification/Dialog';
import ImageVerification from '../../../components/ImageVerification/index';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, PLATFORM_DOMAIN, DEVICE_WIDTH } from '../../../global/config';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
const NORMAL_TEXTCOLOR = '#7E829B';
let reg = { passwordInput: '', codeInput: null };
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
  state = {
    accountInput: '',
    isShow: false
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
  _loginSuccess = (result, code, message) => {
    AsyncStorage.setItem('LoginFailedTimes', '0');
    Variables.account.token = result.token;
    Variables.account.secret = result.secret;
    Variables.account.mobileAccount = this.state.accountInput.concat();
    AsyncStorage.setItem('PlatformAccount', this.state.accountInput);
    AsyncStorage.setItem('PlatformPassword', reg.passwordInput);
    ToastRoot.show('登录成功');
    //init account data
    Api.getbalancerate(4, null, this._getbalancerateSuccess);
  }
  _loginFailed = async (result, code, message) => {
    let timesStr = await AsyncStorage.getItem('LoginFailedTimes');
    if (timesStr) {
      let times = parseInt(timesStr);
      times = times + 1;
      AsyncStorage.setItem('LoginFailedTimes', times.toString());
    } else {
      AsyncStorage.setItem('LoginFailedTimes', '1');
    }
    ToastRoot.show(message);
  }
  _login = () => {
    this.setState({
      isShow: false
    })
    Api.login(this.state.accountInput, reg.passwordInput, reg.codeInput, this._loginSuccess, this._loginFailed);
  }
  _accountChange = (text) => {
    this.setState({
      accountInput: text
    });
  }
  _passwordChange = (text) => {
    reg.passwordInput = text;
  }
  _imageCodeChange = (text) => {
    reg.codeInput = text;
  }
  _showDialog = async () => {
    let times = await AsyncStorage.getItem('LoginFailedTimes');
    if (times && parseInt(times) >= 2) {
      this.setState({
        isShow: true
      });
    } else {
      Api.login(this.state.accountInput, reg.passwordInput, null, this._loginSuccess, this._loginFailed);
    }
  }
  _unshowDialog = () => {
    this.setState({
      isShow: false
    })
  }
  _gotoRegister = () => {
    this.props.navigation.replace('RegisterScreen');
  }
  _lostPassword = () => {
    this.props.navigation.navigate('LostPassword');
  }
  render() {
    const imgUri = `${PLATFORM_DOMAIN}/sendImageCode?1=${Math.random() * 1000}&mobile=${this.state.accountInput}`;
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <NormalInput secureTextEntry={false} onChangeText={this._accountChange} style={{ marginTop: 20 }} headerTitle='手机' tips='请输入正确手机号码' />
        <NormalInput secureTextEntry={true} onChangeText={this._passwordChange} style={{ marginTop: 20 }} headerTitle='密码' tips='密码由6-16位数字和字母组成' />
        <View style={{ marginTop: 10, height: 20, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}><Text onPress={this._lostPassword} style={{ color: NORMAL_TEXTCOLOR, marginRight: 5 }}>忘记密码</Text></View>
        <NormalBtn
          disabled={false}
          title='登录'
          style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
          titleStyle={{ color: 'black' }}
          unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
          onPress={this._showDialog}
        />
        <View style={{ marginTop: 10, height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}><Text onPress={this._gotoRegister} style={{ color: NORMAL_TEXTCOLOR, marginRight: 5 }}>用户注册>></Text></View>
        <Dialog
          visible={this.state.isShow}
          header={'请先输入图形验证码'}
          renderContent={() => <ImageVerification url={imgUri} textChange={this._imageCodeChange} />}
          onConfirm={this._login}
          onCancel={this._unshowDialog}
        />
      </View>
    );
  }
}