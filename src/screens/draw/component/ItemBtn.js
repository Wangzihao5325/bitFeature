import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, DEVICE_WIDTH } from '../../../global/config';
import Icon from 'react-native-vector-icons/FontAwesome';

const WIDTH = DEVICE_WIDTH * 0.6;
const BORDER_COLOR = '#17191E';
export default class ItemBtn extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={{
          height: 40,
          width: WIDTH,
          borderBottomColor: BORDER_COLOR,
          borderBottomWidth: 1
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
          <View style={{ height: 22, width: 22, marginLeft: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={this.props.icon} size={20} color='white' />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>{this.props.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}