import React, { Component } from 'react';
import { View } from 'react-native';
import Api from '../../../socket/platform/api';
import NormalInput from '../../../components/NormalInput';
import NormalBtn from '../../../components/NormalBtn';
import ToastRoot from '../../../components/ToastRoot';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, PLATFORM_DOMAIN, SCREEN_BGCOLOR, DEVICE_WIDTH } from '../../../global/config';
import NormalVerificationCode from '../../../components/NormalVerificationCode';
import Dialog from '../../../components/ImageVerification/Dialog';
import ImageVerification from '../../../components/ImageVerification/index';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
let reg = { passwordInput: '', code: '', imageCode: '' };
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

  state = {
    isShowDialog: false,
    accountInput: ''
  }
  componentDidMount() {
    //this.props.navigation.setParams({ customService: this._customService });
  }
  _onConfirm = () => {
    this.setState({
      isShowDialog: false
    });
    Api.sendMessageWithoutToken(this.state.accountInput, 1, reg.imageCode, this._getMessageSuccess, this._getMessageFailed);//此处修改 
  }
  _onCancel = () => {
    this.setState({
      isShowDialog: false
    })
  }
  _accountChange = (text) => {
    this.setState({
      accountInput: text
    });
  }
  _passwordChange = (text) => {
    reg.passwordInput = text;
  }
  _getMessageCode = () => {
    this.setState({
      isShowDialog: true
    })
  }
  _getMessageSuccess = (e, code, message) => {
    ToastRoot.show(message);
  }
  _getMessageFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  _codeTextChange = (text) => {
    reg.code = text;
  }
  _imageCodeChange = (text) => {
    reg.imageCode = text;
  }
  _login = () => {
    Api.register(this.state.accountInput, reg.passwordInput, reg.code, this._registerSuccess, this._registerFailed);
    // resignter
  }
  _registerSuccess = (data, code, message) => {
    ToastRoot.show('注册成功');
    this.props.navigation.pop();
  }
  _registerFailed = (data, code, message) => {
    ToastRoot.show(message);
  }
  render() {
    const imgUri = `${PLATFORM_DOMAIN}/sendImageCode?1=${Math.random() * 1000}&mobile=${this.state.accountInput}`;
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <NormalInput secureTextEntry={false} onChangeText={this._accountChange} style={{ marginTop: 20 }} headerTitle='手机' tips='请输入正确手机号码' />
        <NormalVerificationCode style={{ marginTop: 20 }} headerTitle='验证码' onChangeText={this._codeTextChange} getMessageCode={this._getMessageCode} />
        <NormalInput placeholder={'密码为 6-16 位字母数字组合'} secureTextEntry={true} onChangeText={this._passwordChange} style={{ marginTop: 20 }} headerTitle='密码' tips='密码由6-16位数字和字母组成' />
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