import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { DEVICE_WIDTH } from '../../../global/config';
import VectorIconBtn from '../../../components/IconBtn';
const lineHeight = 50;
const halfHeight = lineHeight / 2;
const doubleHeight = 2 * lineHeight;
const halfWidth = DEVICE_WIDTH / 2;
const quarterWidth = DEVICE_WIDTH / 4;
const NORMAL_TEXTCOLOR = '#7E829B';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
class MarketDetailHeader extends Component {
  state = {
    isOpen: false
  };
  render() {
    return (
      <View style={{ width: DEVICE_WIDTH, display: 'flex', backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ height: doubleHeight, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row' }}>
          <View style={{ height: doubleHeight, width: halfWidth }}>
            {/*最新价*/}
            <View style={{ height: lineHeight, width: halfWidth, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>1267.77</Text></View>
            {/*涨跌&&时间*/}
            <View style={{ height: lineHeight, width: halfWidth }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={{ color: 'white' }}>-2.2 /</Text></View>
                <View style={{ flex: 1, alignItems: 'flex-start' }}><Text style={{ color: 'white' }}>-2.2%</Text></View>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>08-29 15:50:25</Text></View>
            </View>
          </View>
          {/*买卖 买量卖量*/}
          <View style={{ height: doubleHeight, width: halfWidth, display: 'flex' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {/*卖*/}
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: NORMAL_TEXTCOLOR }}>卖</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>100123</Text>
                </View>
              </View>
              {/*卖量*/}
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: NORMAL_TEXTCOLOR }}>卖量</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>100123</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {/*买*/}
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: NORMAL_TEXTCOLOR }}>买</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>100123</Text>
                </View>
              </View>
              {/*买量*/}
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: NORMAL_TEXTCOLOR }}>买量</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>100123</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/*最高价&最低价&开盘&展开*/}
        <View style={{ height: lineHeight, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row' }}>
          {/*最高价*/}
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>最高价</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>100123</Text></View>
          </View>
          {/*最低价*/}
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>最低价</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>100123</Text></View>
          </View>
          {/*开盘*/}
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>开盘</Text></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>100123</Text></View>
          </View>
          {/*change btn*/}
          <View style={{ flex: 1 }}>
            {this.state.isOpen ? <View></View> : <VectorIconBtn name='user' />}
          </View>
        </View>
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    isLogin: store.account.isLogin
  }
}

export default connect(mapState2Props)(MarketDetailHeader);