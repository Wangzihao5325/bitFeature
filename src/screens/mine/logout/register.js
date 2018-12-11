import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Api from '../../../socket/platform/api';
import NormalInput from '../../../components/NormalInput';
import NormalBtn from '../../../components/NormalBtn';
import ToastRoot from '../../../components/ToastRoot';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, PLATFORM_DOMAIN, SCREEN_BGCOLOR, DEVICE_WIDTH } from '../../../global/config';
import NormalVerificationCode from '../../../components/NormalVerificationCode';
import Dialog from '../../../components/ImageVerification/Dialog';
import ImageVerification from '../../../components/ImageVerification/index';
import VectorIconBtn from '../../../components/IconBtn';
import store from '../../../store/index';
import { action_custom_service_model_show } from '../../../store/actions/customServiceAction';

const NORMAL_TEXTCOLOR = '#7E829B';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
let reg = { passwordInput: '', code: '', imageCode: '' };
export default class RegisterScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '注册',  //header标题
      headerRight: (<VectorIconBtn name='headphones' onPress={navigation.getParam('customService')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
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
    this.props.navigation.setParams({ customService: this._customService });
  }
  _customService = () => {
    store.dispatch(action_custom_service_model_show(this.props.navigation));
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
  _getMessageCode = async () => {
    let times = await AsyncStorage.getItem('getMessageTimes');
    if (times && parseInt(times) >= 3) {
      this.setState({
        isShowDialog: true
      });
    } else {
      Api.sendMessageWithoutToken(this.state.accountInput, 1, null, this._getMessageSuccess, this._getMessageFailed);
    }
  }
  _getMessageSuccess = async (e, code, message) => {
    let timesStr = await AsyncStorage.getItem('getMessageTimes');
    if (timesStr) {
      let times = parseInt(timesStr);
      times = times + 1;
      AsyncStorage.setItem('getMessageTimes', times.toString());
    } else {
      AsyncStorage.setItem('getMessageTimes', '1');
    }
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
    AsyncStorage.setItem('getMessageTimes', '0');
    this.props.navigation.pop();
  }
  _registerFailed = (data, code, message) => {
    ToastRoot.show(message);
  }
  _gotoLogin = () => {
    this.props.navigation.replace('AccountLogScreen');
  }
  _gotoDoc = () => {
    this.props.navigation.navigate('WSDoc');
  }
  render() {
    const imgUri = `${PLATFORM_DOMAIN}/sendImageCode?1=${Math.random() * 1000}&mobile=${this.state.accountInput}`;
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <NormalInput secureTextEntry={false} onChangeText={this._accountChange} style={{ marginTop: 20 }} headerTitle='手机' tips='请输入正确手机号码' />
        <NormalVerificationCode style={{ marginTop: 20 }} headerTitle='验证码' onChangeText={this._codeTextChange} getMessageCode={this._getMessageCode} />
        <NormalInput placeholder={'请输入6-16 位字母数字'} secureTextEntry={true} onChangeText={this._passwordChange} style={{ marginTop: 20 }} headerTitle='密码' tips='密码由6-16位数字和字母组成' />
        <NormalBtn
          disabled={false}
          title='注册'
          style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
          titleStyle={{ color: 'black' }}
          unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
          onPress={this._login}
        />
        <View style={{ marginTop: 10, height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR, marginRight: 5 }} onPress={this._gotoLogin}>已有账号？立即登录>></Text></View>
        <View style={{ marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>提交申请表示阅读并同意</Text>
          <Text onPress={this._gotoDoc} style={{ color: HIGHLIGHT_BGCOLOR }}>《期货大赛注册协议》</Text>
        </View>
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