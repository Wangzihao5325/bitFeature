import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { DEVICE_WIDTH } from '../../global/config';
import VectorIconBtn from '../IconBtn';

const INPUT_HEIGHT = 50;
const NORMAL_TEXTCOLOR = '#7E829B';
const NORMAL_BACKGROUNDCOLOR = '#323442';

export default class DdSecrityInput extends Component {
  state = {
    input: '',
    isSecurity: true,
    icon: 'eye'
  }
  _setValue = (value) => {
    this.setState({
      input: value
    });
  }
  _textChange = (text) => {
    if (typeof this.props.textChange === 'function') {
      this.props.textChange(text);
    }
    this.setState({
      input: text
    });
  }
  _changeSecurity = () => {
    this.setState((preState, props) => {
      let name = preState.icon === 'eye' ? 'eye-slash' : 'eye';
      return {
        isSecurity: !preState.isSecurity,
        icon: name
      }
    })
  }
  render() {
    return (
      <View style={{ marginTop:10,borderRadius: 5, height: INPUT_HEIGHT, width: DEVICE_WIDTH - 20, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, alignSelf: 'center' }}>
        <View style={{ height: INPUT_HEIGHT, width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: '#909090', fontSize: 18, marginLeft: 10 }}>{this.props.title}</Text></View>
        <View style={{ height: INPUT_HEIGHT, width: DEVICE_WIDTH - 120, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TextInput secureTextEntry={this.state.isSecurity} onChangeText={this._textChange} value={this.state.input} style={{ height: INPUT_HEIGHT, width: DEVICE_WIDTH - 160, color: 'white' }} />
          <VectorIconBtn name={'eye'} size={25} color={'#909090'} onPress={this._changeSecurity} />
        </View>
      </View>
    );
  }
}