import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import VectorIconBtn from '../IconBtn';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARKER_BGCOLOR = '#17191E';
export default class NumberInput extends Component {
  state = {
    inputValue: this.props.defaultValue ? this.props.defaultValue : 0
  }
  _plus = () => {
    this.setState((preState, props) => {
      let value = preState.inputValue + 1;
      return {
        inputValue: value
      }
    })
  }
  _sub = () => {
    this.setState((preState, props) => {
      let value = preState.inputValue - 1;
      return {
        inputValue: value
      }
    })
  }
  _onChangeText = (text) => {
    if (text == '') {
      return
    }
    let value = parseFloat(text);
    if (typeof value === 'number') {
      this.setState({
        inputValue: value
      });
      this.props.textChange(value);
    }
  }
  render() {

    return (
      <View style={[{ height: 30, width: 150, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: DARKER_BGCOLOR }, this.props.style]}>
        <VectorIconBtn name='minus' size={20} color={NORMAL_TEXTCOLOR} onPress={this._sub} />
        <TextInput onChangeText={this._onChangeText} keyboardType='numeric' style={{ height: 30, width: 60, color: 'white' }} value={this.state.inputValue.toString()} />
        <VectorIconBtn name='plus' size={20} color={NORMAL_TEXTCOLOR} onPress={this._plus} />
      </View>
    );
  }
}