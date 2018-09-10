import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VectorIconBtn from './IconBtn';
import { DEVICE_WIDTH } from '../global/config';
import CommonStyles from '../global/common_styles';
import { SCREEN_BGCOLOR } from '../global/config';
import RNTextInput from 'react-native-text-input-enhance';  //处理textinput clear（）问题 - https://github.com/facebook/react-native/pull/18278
export default class NormalInput extends Component {
  state = {
    tips: this.props.tips
  }
  _clear() {
    this.textInputRef.clear();
  }
  _onChangeText(text) {
    if (text.length === 11) {
      this.setState({ tips: '' });
    } else {
      this.setState({ tips: this.props.tips })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={[CommonStyles.innerLineCenterStyle, styles.inputContainer, { borderColor: '#2C5387', borderWidth: 1, borderRadius: 5 }]}>
          <View style={[CommonStyles.innerAbsCenterStyle, styles.headerTitleContainer]}>
            <Text style={{ fontSize: 20, color: '#909090', fontWeight: 'bold' }}>{this.props.headerTitle}</Text>
          </View>
          <RNTextInput hasRef={ref => (this.textInputRef = ref)} onChangeText={this._onChangeText.bind(this)} maxLength={11} style={{ height: 36, width: 200, color: 'white' }} />
          <VectorIconBtn name='close' onPress={() => this._clear()} />
        </View>
        <View style={[CommonStyles.innerAbsCenterStyle, styles.tipsContainer]}><Text style={{ color: 'red' }}>{this.state.tips}</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50 + 20,
    width: DEVICE_WIDTH,
    paddingHorizontal: 10,
    backgroundColor: SCREEN_BGCOLOR
  },
  inputContainer: {
    flex: 5,
    justifyContent: 'space-between',

  },
  headerTitleContainer: {
    height: 24,
    width: 90
  },
  tipsContainer: {
    flex: 2,
  },
});