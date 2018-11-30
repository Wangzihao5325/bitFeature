import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { DEVICE_WIDTH } from '../global/config';
import VectorIconBtn from '../components/IconBtn';

const DARK_BGCOLOR = '#17191E';
const NORMAL_TEXTCOLOR = '#7E829B';
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.reg = '';
  }

  _textChange = (text) => {
    this.reg = text;
  }
  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.reg);
    }
  }
  render() {
    return (
      <View style={{ height: 40, width: DEVICE_WIDTH, backgroundColor: DARK_BGCOLOR, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <TextInput onChangeText={this._textChange} style={{ flex: 1, color: 'white',marginLeft:10 }} />
        <VectorIconBtn color={NORMAL_TEXTCOLOR} name='search' onPress={this._onPress} />
      </View>
    );
  }
}