import React, { Component } from 'react';
import { View, Text,TouchableHighlight } from 'react-native';
import { DEVICE_WIDTH } from './../../global/config';
const LIGHT_BGCOLOR = '#17191E';
const NORMAL_TEXTCOLOR = '#7E829B';
class BtnItem extends Component {
  render(){
    return(
      <TouchableHighlight style={{backgroundColor:LIGHT_BGCOLOR}}>
      <View style={{flex:1}}><Text>{this.props.moneyStr}</Text></View>
      </TouchableHighlight>
    );
  }
}
class SecletBtns extends Component {

}
export default class DepositSelect extends Component {
  render() {
    return (
      <View style={{ height: 100, width: DEVICE_WIDTH }}>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT_BGCOLOR }}>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>-选择保证金-</Text>
        </View>
        <View style={{ height: 50, width: DEVICE_WIDTH }}></View>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT_BGCOLOR }}>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>-操盘资金-</Text>
        </View>
      </View>
    );
  }
}