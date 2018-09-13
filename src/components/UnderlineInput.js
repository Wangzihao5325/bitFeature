import React, { Component } from 'react';
import { View } from 'react-native';
import RNTextInput from 'react-native-text-input-enhance';
import VectorIconBtn from './IconBtn';
export default class UnderlineInput extends Component {
  _clear() {
    this.textInputRef.clear();
  }
  _onChangeText(text) {

  }
  render() {
    return (
      <View >
        <View>
          <Text>{this.props.title}</Text>
          <RNTextInput hasRef={ref => (this.textInputRef = ref)} onChangeText={this._onChangeText.bind(this)} maxLength={11} style={{ height: 36, width: 200, color: 'white' }} />
          <VectorIconBtn name='close' onPress={() => this._clear()} />
        </View>
        {this.props.addBottom ? <View /> : null}
      </View>
    );
  }
} 