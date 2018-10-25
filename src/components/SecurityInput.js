import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import VectorIconBtn from '../components/IconBtn';
import { DEVICE_WIDTH } from '../global/config';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARKER_BGCOLOR = '#17191E';
export default class SecurityInput extends Component {
  static propTypes = {
    title: PropTypes.string,
    onChangeText: PropTypes.func
  }
  state = {
    security: true,
    iconName: 'eye'
  }
  _changeSecurity = () => {
    this.setState((preState, props) => {
      let name = preState.iconName === 'eye' ? 'eye-slash' : 'eye';
      return {
        security: !preState.security,
        iconName: name
      }
    })
  }
  render() {
    return (
      <View style={{ height: 60, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ height: 40, width: 0.25 * DEVICE_WIDTH, alignItems: 'center', flexDirection: 'row-reverse' }}>
          <Text style={{ fontSize: 18, marginRight: 10, color: NORMAL_TEXTCOLOR }}>{this.props.title}</Text>
        </View>
        <View style={{ height: 40, width: 0.75 * DEVICE_WIDTH - 10, alignItems: 'center', flexDirection: 'row', backgroundColor: DARKER_BGCOLOR, borderRadius: 5 }}>
          <TextInput onChangeText={this.props.onChangeText} secureTextEntry={this.state.security} style={{ flex: 1, color: 'white', fontSize: 18, marginLeft: 10 }} />
          <VectorIconBtn color={NORMAL_TEXTCOLOR} name={this.state.iconName} onPress={this._changeSecurity} />
        </View>
      </View>
    );
  }
}