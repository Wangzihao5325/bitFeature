import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import VectorIconBtn from '../IconBtn';
const NORMAL_TEXTCOLOR = '#7E829B';
export default class NumberInput extends Component {
  state = {
    inputValue: 0
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
  render() {

    return (
      <View style={{ height: 30, width: 150, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
        <VectorIconBtn name='minus' size={20} color={NORMAL_TEXTCOLOR} onPress={this._sub} />
        <TextInput style={{ height: 30, width: 60 }} value={this.state.inputValue.toString()} />
        <VectorIconBtn name='plus' size={20} color={NORMAL_TEXTCOLOR} onPress={this._plus} />
      </View>
    );
  }
}