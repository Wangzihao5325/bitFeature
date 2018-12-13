import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DEVICE_WIDTH } from '../../../global/config';
import ToastRoot from '../../../components/ToastRoot';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
class Item extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableHighlight style={{ flex: 1 }} onPress={this.props.onPress}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={this.props.iconName} size={18} color='white' />
            <Text style={{ color: 'white' }}>{this.props.title}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
export default class BottomBtn extends Component {
  render() {
    return (
      <View style={{ height: 50, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderTopColor: 'black', borderTopWidth: 1 }}>
        <View style={{ flex: 1, backgroundColor: HIGHLIGHT_BGCOLOR }}><TouchableHighlight onPress={function () { console.log('1') }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 18 }}>交易</Text></TouchableHighlight></View>
        <Item iconName='flash' title='快捷' onPress={function () { ToastRoot.show('研发中,敬请期待...') }} />
        <Item iconName='bell-o' title='提醒' onPress={function () { ToastRoot.show('研发中,敬请期待...') }} />
        <Item iconName='heart-o' title='自选' onPress={function () { ToastRoot.show('研发中,敬请期待...') }} />
      </View>
    );
  }
}