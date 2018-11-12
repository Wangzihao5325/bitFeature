import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import VectorIconBtn from './IconBtn';
import { DEVICE_WIDTH } from '../global/config';
import CommonStyles from '../global/common_styles';
import { SCREEN_BGCOLOR } from '../global/config';
import RNTextInput from 'react-native-text-input-enhance';  //处理textinput clear（）问题 - https://github.com/facebook/react-native/pull/18278
const NORMAL_BACKGROUNDCOLOR = '#323442';//323442
const NORMAL_TEXTCOLOR = '#7E829B';
const DARKER_BGCOLOR = '#17191E';
export default class NormalVerificationCode extends Component {
  constructor(props) {
    super(props);
    this._onChangeText = this._onChangeText.bind(this);
  }
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
  _onChangeText(text) {
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  }
  render() {

    return (
      <View style={[styles.container, { ...this.props.style }]}>
        <View style={[CommonStyles.innerLineCenterStyle, styles.inputContainer, { backgroundColor: NORMAL_BACKGROUNDCOLOR, borderRadius: 5 }]}>
          <View style={[CommonStyles.innerAbsCenterStyle, styles.headerTitleContainer]}>
            <Text style={{ fontSize: 20, color: '#909090', fontWeight: 'bold' }}>{this.props.headerTitle}</Text>
          </View>
          {/* <RNTextInput secureTextEntry={this.props.secureTextEntry && this.state.security} hasRef={ref => (this.textInputRef = ref)} onChangeText={this._onChangeText} maxLength={20} style={{ height: 36, width: 200, color: 'white' }} />
          {!this.props.secureTextEntry && <VectorIconBtn name='close' onPress={this._clear} />}
          {this.props.secureTextEntry && <VectorIconBtn name={this.state.iconName} onPress={this._changeSecurity} />} */}
          <View style={{ height: 40, width: 0.75 * DEVICE_WIDTH - 20, alignItems: 'center', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderRadius: 5 }}>
            <TextInput onChangeText={this.props.onChangeText} style={{ flex: 1, color: 'white', fontSize: 18, marginLeft: 10 }} />
            <TouchableHighlight disabled={this.state.disable} onPress={this._getMessageCode} style={{ backgroundColor: 'transparent', borderLeftColor: NORMAL_TEXTCOLOR, borderLeftWidth: 1 }}>
              <Text style={{ color: NORMAL_TEXTCOLOR, marginHorizontal: 10 }}>{this.state.text}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: DEVICE_WIDTH,
    paddingHorizontal: 10,
    backgroundColor: 'transparent'
  },
  inputContainer: {
    flex: 5,
    justifyContent: 'space-between',

  },
  headerTitleContainer: {
    height: 24,
    width: 90
  }
});