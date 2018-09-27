import React, { Component } from 'react';
import { View, Modal, Text } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../global/config';
import Icon from 'react-native-vector-icons/FontAwesome';
const marginH = 50;
const marginV = 150;
const contentHeight = DEVICE_HEIGHT - 2 * marginV;
const contentWidth = DEVICE_WIDTH - 2 * marginH;
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
class CustomServiceItem extends Component {
  render() {
    return (
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}>
        <Icon.Button name={this.props.name} backgroundColor={NORMAL_BACKGROUNDCOLOR} size={40} borderRadius={0} color={NORMAL_TEXTCOLOR} style={this.props.style}>
          <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white' }}>{this.props.text}</Text>
        </Icon.Button>
      </View>
    );
  }
}
export default class CustomChooseModel extends Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <View style={{ display: 'flex', width: contentWidth, marginTop: marginV, marginLeft: marginH, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
            <View style={{ height: contentHeight / 8, width: contentWidth, display: 'flex', justifyContent: 'center', borderBottomColor: 'black', borderBottomWidth: 2 }}><Text style={{ color: NORMAL_TEXTCOLOR, alignSelf: 'center' }}>请选择客服类型</Text></View>
            <CustomServiceItem name={'user'} text='电话客服 - 400-852-8008' style={{ height: contentHeight / 5, width: contentWidth }} />
            <CustomServiceItem name={'user'} text='在线客服 - 实时在线' style={{ height: contentHeight / 5, width: contentWidth }} />
            <CustomServiceItem name={'user'} text='QQ客服 - (暂未上线)' style={{ height: contentHeight / 5, width: contentWidth }} />
            <View style={{ height: contentHeight / 8, width: contentWidth, display: 'flex', justifyContent: 'center'}}><Text style={{ color: NORMAL_TEXTCOLOR, alignSelf: 'center' }}>取消>></Text></View>
          </View>
        </View>
      </Modal>
    );
  }
}
//