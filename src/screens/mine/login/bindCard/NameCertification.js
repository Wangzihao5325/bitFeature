import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../../global/config';
import MaterialInput from '../../../../components/MaterialInput';
import NormalBtn from '../../../../components/NormalBtn';
import Api from '../../../../socket/platform/api';
import ToastRoot from '../../../../components/ToastRoot';
import store from '../../../../store/index';
import { action_getbalancerate } from '../../../../store/actions/accountAction';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARK_BGCOLOR = '#17191E';

let reg = { name: '', id: '' };
export default class NameCertification extends Component {
  static navigationOptions = {
    title: "实名认证",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  _nameTextChanged = (text) => {
    reg.name = text;
  }
  _idTextChanged = (text) => {
    reg.id = text;
  }
  _certification = () => {
    Api.nameCertification(reg.name, reg.id, this._certificationSuccess, this._certificationFailed);
  }
  _certificationSuccess = () => {
    Api.getbalancerate(4, null, this._getbalancerateSuccess);
    ToastRoot.show('实名认证成功');
    this.props.navigation.pop();
  }
  _certificationFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  _getbalancerateSuccess = (result) => {
    store.dispatch(action_getbalancerate(result));
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <MaterialInput title={'真实姓名'} onChangeText={this._nameTextChanged} />
        <MaterialInput title={'身份证号'} onChangeText={this._idTextChanged} />
        <NormalBtn title='实名认证' style={{ backgroundColor: HIGHLIGHT_BGCOLOR, height: 45, width: DEVICE_WIDTH - 20, alignSelf: 'center', marginTop: 30 }} titleStyle={{ color: 'black' }} onPress={this._certification} />
      </View>
    );
  }
}