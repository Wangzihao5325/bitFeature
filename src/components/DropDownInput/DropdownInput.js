import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { DEVICE_WIDTH } from '../../global/config';
import Icon from 'react-native-vector-icons/FontAwesome';

const INPUT_HEIGHT = 50;
const NORMAL_TEXTCOLOR = '#7E829B';
const NORMAL_BACKGROUNDCOLOR = '#323442';
export default class DropdownInput extends Component {
  state = {
    input: ''
  }
  _setValue = (value) => {
    this.setState({
      input: value
    });
  }
  _selectInput = (index, value) => {
    if (typeof this.props.textChange === 'function') {
      this.props.textChange(value);
    }
    if (typeof this.props.selected === 'function') {
      this.props.selected(index, value);
    }
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
  render() {
    return (
      <View style={{ borderRadius: 5, height: INPUT_HEIGHT, width: DEVICE_WIDTH - 20, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, alignSelf: 'center' }}>
        <View style={{ height: INPUT_HEIGHT, width: 100, display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: '#909090', fontSize: 18, marginLeft: 10 }}>{this.props.title}</Text></View>
        <View style={{ height: INPUT_HEIGHT, width: DEVICE_WIDTH - 120 }}>
          <ModalDropdown
            style={{ height: INPUT_HEIGHT, width: DEVICE_WIDTH - 120 }}
            onSelect={this._selectInput}
            options={this.props.options}
            dropdownStyle={{
              width: DEVICE_WIDTH - 155,
              height: 100,
            }}
          >
            <View style={{ height: INPUT_HEIGHT, width: DEVICE_WIDTH - 120, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TextInput onChangeText={this._textChange} value={this.state.input} style={{ height: INPUT_HEIGHT, width: DEVICE_WIDTH - 150, color: 'white' }} />
              <Icon name={'chevron-down'} size={25} color={'#909090'} />
            </View>
          </ModalDropdown>
        </View>
      </View>
    );
  }
}