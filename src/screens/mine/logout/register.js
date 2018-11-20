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
import ToastRoot from '../../../components/ToastRoot';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, PLATFORM_DOMAIN, SCREEN_BGCOLOR, DEVICE_WIDTH } from '../../../global/config';
import NormalVerificationCode from '../../../components/NormalVerificationCode';
import Dialog from '../../../components/ImageVerification/Dialog';
import ImageVerification from '../../../components/ImageVerification/index';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
let reg = { accountInput: '', passwordInput: '', code: '', imageCode: '' };
export default class RegisterScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '注册',  //header标题
      //headerRight: (<VectorIconBtn name='headphones' onPress={navigation.getParam('customService')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
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
    isShowDialog: false
  }
  componentDidMount() {
    //this.props.navigation.setParams({ customService: this._customService });
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
    Variables.account.token = result.token;
    Variables.account.secret = result.secret;
    ToastRoot.show('登录成功');
    //init account data
    Api.getbalancerate(4, null, this._getbalancerateSuccess);
  }
  _loginFailed = (result, code, message) => {
    ToastRoot.show(message);
  }
  _login = () => {
    // Variables.account.mobileAccount = reg.accountInput.concat();
    // Api.login(reg.accountInput, reg.passwordInput, this._loginSuccess, this._loginFailed);
    this.setState({
      isShowDialog: true
    })
  }
  _onConfirm = () => {
    console.log(reg);//处理开户
    this.setState({
      isShowDialog: false
    })
  }
  _onCancel = () => {
    this.setState({
      isShowDialog: false
    })
  }
  _accountChange = (text) => {
    reg.accountInput = text;
  }
  _passwordChange = (text) => {
    reg.passwordInput = text;
  }
  _getMessageCode = () => {
    Api.sendMessageWithToken(reg.accountInput, 1, this._getMessageSuccess);//此处修改 
  }
  _codeTextChange = (text) => {
    reg.code = text;
  }
  _imageCodeChange = (text) => {
    reg.imageCode = text;
  }
  render() {
    const imgUri = `${PLATFORM_DOMAIN}/sendImageCode?1=${Math.random() * 1000}&mobile=${reg.accountInput}`;
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <NormalInput secureTextEntry={false} onChangeText={this._accountChange} style={{ marginTop: 20 }} headerTitle='手机' tips='请输入正确手机号码' />
        <NormalVerificationCode style={{ marginTop: 20 }} headerTitle='验证码' onChangeText={this._codeTextChange} getMessageCode={this._getMessageCode} />
        <NormalInput secureTextEntry={true} onChangeText={this._passwordChange} style={{ marginTop: 20 }} headerTitle='密码' tips='密码由6-16位数字和字母组成' />
        <NormalBtn
          disabled={false}
          title='注册'
          style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
          titleStyle={{ color: 'black' }}
          unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
          onPress={this._login}
        />
        <Dialog
          visible={this.state.isShowDialog}
          header={'请先输入图形验证码'}
          renderContent={() => <ImageVerification url={imgUri} textChange={this._imageCodeChange} />}
          onConfirm={this._onConfirm}
          onCancel={this._onCancel}
        />
      </View>
    );
  }
}