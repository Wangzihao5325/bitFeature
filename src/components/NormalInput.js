import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VectorIconBtn from './IconBtn';
import { DEVICE_WIDTH } from '../global/config';
import CommonStyles from '../global/common_styles';
import { SCREEN_BGCOLOR } from '../global/config';
import RNTextInput from 'react-native-text-input-enhance';  //处理textinput clear（）问题 - https://github.com/facebook/react-native/pull/18278
const NORMAL_BACKGROUNDCOLOR = '#323442';//323442
export default class NormalInput extends Component {
  constructor(props) {
    super(props);
    this._onChangeText = this._onChangeText.bind(this);
    this._clear = this._clear.bind(this);
  }
  state = {
    security: true,
    iconName: 'eye'
  }
  _clear() {
    this.textInputRef.clear();
  }
  _changeSecurity = () => {
    this.setState((preState, props) => {
      let name = preState.iconName === 'eye' ? 'eye-slash' : 'eye';
      return {
        security: !preState.security,
        iconName: name
      }
    })
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
          <RNTextInput secureTextEntry={this.props.secureTextEntry && this.state.security} hasRef={ref => (this.textInputRef = ref)} onChangeText={this._onChangeText} maxLength={11} style={{ height: 36, width: 200, color: 'white' }} />
          {!this.props.secureTextEntry && <VectorIconBtn name='close' onPress={this._clear} />}
          {this.props.secureTextEntry && <VectorIconBtn name={this.state.iconName} onPress={this._changeSecurity} />}
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