import React, { Component } from 'react';
import { View } from 'react-native';
import NormalBtn from '../../components/NormalBtn';
import { DEVICE_WIDTH } from '../../global/config';
const COM_BTN_HEIGHT = 35;
const COM_BTN_WIDTH = DEVICE_WIDTH - 40;
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
export default class MiddleContent extends Component {
  _openTradeAccount() {
    console.log('open trade account');
  }
  _tradeAccountLogin() {
    console.log('trade account login');
  }
  render() {
    return (
      <View style={{ height: 90, width: DEVICE_WIDTH, display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <NormalBtn
          title={'马上开户'}
          onPress={this._openTradeAccount}
          titleStyle={{ color: 'black' }}
          style={{ height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: HIGHLIGHT_TEXTCOLOR }}
        />
        <NormalBtn
          title={'已经开户,直接登陆'}
          onPress={this._tradeAccountLogin}
          titleStyle={{ color: 'black' }}
          style={{ height: COM_BTN_HEIGHT, width: COM_BTN_WIDTH, backgroundColor: HIGHLIGHT_TEXTCOLOR }}
        />
      </View>
    );
  }
}