import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { DEVICE_WIDTH } from '../global/config';
import PropTypes from 'prop-types';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARK_BGCOLOR = '#17191E';
export default class MaterialInput extends Component {
  static propTypes = {
    title: PropTypes.string,
    onChangeText: PropTypes.func,
    footerStr: PropTypes.string,
  }
  render() {
    return (
      <View style={{ height: 60, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
          <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>{this.props.title}</Text>
        </View>
        <View style={{ flex: 1, height: 40, marginLeft: 10, marginRight: 15, backgroundColor: DARK_BGCOLOR, flexDirection: 'row', borderRadius: 5, alignItems: 'center' }}>
          <TextInput style={{ flex: 1, color: 'white', marginLeft: 10, fontSize: 18 }} onChangeText={this.props.onChangeText} />
          {this.props.footerStr && <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: 20, marginRight: 5 }}>{this.props.footerStr}</Text>}
        </View>
      </View>
    );
  }
}