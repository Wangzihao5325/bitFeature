import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { DEVICE_WIDTH } from '../global/config';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARKER_BGCOLOR = '#17191E';
export default class VerificationCode extends Component {
  state = {
    text: '获取验证码',
    disable: false,
  }
  _getMessageCode = () => {
    this.props.getMessageCode();
    let time = 59;
    this.setState((preState, props) => {
      return {
        text: time + ' s',
        disable: true
      }
    });
    this.interval = setInterval(() => {
      if (time === 0) {
        clearInterval(this.interval);
        this.setState((preState, props) => {
          return {
            text: '获取验证码',
            disable: false
          }
        });
        return;
      }
      time = time - 1;
      this.setState((preState, props) => {
        return {
          text: time + ' S'
        }
      });
    }, 1000);
  }
  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }
  render() {
    return (
      <View style={{ height: 60, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ height: 40, width: 0.25 * DEVICE_WIDTH, alignItems: 'center', flexDirection: 'row-reverse' }}>
          <Text style={{ fontSize: 18, marginRight: 10, color: NORMAL_TEXTCOLOR }}>验证码</Text>
        </View>
        <View style={{ height: 40, width: 0.75 * DEVICE_WIDTH - 10, alignItems: 'center', flexDirection: 'row', backgroundColor: DARKER_BGCOLOR, borderRadius: 5 }}>
          <TextInput onChangeText={this.props.onChangeText} style={{ flex: 1, color: 'white', fontSize: 18, marginLeft: 10 }} />
          <TouchableHighlight disabled={this.state.disable} onPress={this._getMessageCode} style={{ backgroundColor: 'transparent', borderLeftColor: NORMAL_TEXTCOLOR, borderLeftWidth: 1 }}>
            <Text style={{ color: NORMAL_TEXTCOLOR, marginHorizontal: 10 }}>{this.state.text}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}