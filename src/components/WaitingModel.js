import React, { Component } from 'react';
import { View, Modal, Text } from 'react-native';
import { connect } from 'react-redux';
import store from '../store/index';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../global/config';

const marginH = 50;
const marginV = 150;
const contentHeight = DEVICE_HEIGHT - 2 * marginV;
const contentWidth = DEVICE_WIDTH - 2 * marginH;
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
class WaitingModel extends Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isMarketRestart || this.props.isTradeRestart}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: contentWidth, height: 50, marginTop: DEVICE_HEIGHT / 2, marginLeft: marginH, backgroundColor: 'white' }}>
            <Text style={{ color: NORMAL_TEXTCOLOR }}>正在重连，请稍候...</Text>
          </View>
        </View>
      </Modal>
    );
  }
}
function mapState2Props(store) {
  return {
    isMarketRestart: store.customService.isMarketRestart,
    isTradeRestart: store.customService.isTradeRestart,
  }
}

export default connect(mapState2Props)(WaitingModel);