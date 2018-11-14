import React, { Component } from 'react';
import { View, Modal, Text, TouchableHighlight, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../../../store/index';
import { order_change_pop_unshow } from '../../../../store/actions/popAction';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../../global/config';
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
        <Icon.Button onPress={this.props.onPress} name={this.props.name} backgroundColor={NORMAL_BACKGROUNDCOLOR} size={40} borderRadius={0} color={NORMAL_TEXTCOLOR} style={this.props.style}>
          <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white' }}>{this.props.text}</Text>
        </Icon.Button>
      </View>
    );
  }
}
class ChangeOrderPop extends Component {
  _online = () => {
    // store.dispatch(action_custom_service_model_unshow());
    // if (this.props.navi) {
    //   this.props.navi.navigate('CustomerServiceScreen');
    // }
  }
  _onPhone = () => {
    Linking.openURL('tel:4008528008');
  }
  _unShow = () => {
    store.dispatch(order_change_pop_unshow());
  }
  _confirm = () => {
    store.dispatch(order_change_pop_unshow());
  }
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isShow}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <View style={{ display: 'flex', width: contentWidth, marginTop: marginV, marginLeft: marginH, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
            <View style={{ height: contentHeight / 8, width: contentWidth, display: 'flex', justifyContent: 'center', borderBottomColor: 'black', borderBottomWidth: 2 }}><Text style={{ color: NORMAL_TEXTCOLOR, alignSelf: 'center' }}>请选择客服类型</Text></View>
            <CustomServiceItem name={'user'} text='1111111111' style={{ height: contentHeight / 5, width: contentWidth }} onPress={this._onPhone} />
            <CustomServiceItem name={'user'} text='2222222222' style={{ height: contentHeight / 5, width: contentWidth }} onPress={this._online} />
            <CustomServiceItem name={'user'} text='3333333333' style={{ height: contentHeight / 5, width: contentWidth }} />
            <View style={{ height: contentHeight / 8, width: contentWidth, display: 'flex', flexDirection: 'row' }}>
              <TouchableHighlight onPress={this._unShow} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR, alignSelf: 'center' }}>确定</Text></TouchableHighlight>
              <TouchableHighlight onPress={this._unShow} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR, alignSelf: 'center' }}>取消</Text></TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
function mapState2Props(store) {
  return {
    isShow: store.pop.changeOrder
  }
}

export default connect(mapState2Props)(ChangeOrderPop);