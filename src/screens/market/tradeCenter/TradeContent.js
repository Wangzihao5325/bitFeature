import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DEVICE_WIDTH } from '../../../global/config';
import ModalDropdown from 'react-native-modal-dropdown';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const DARKER_BGCOLOR = '#17191E';
const NORMAL_TEXTCOLOR = '#7E829B';
export default class TradeContent extends Component {
  render() {
    return (
      <View style={{ height: 100, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        {/*合约选择 */}
        <View style={{ height: 40, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', borderTopColor: DARKER_BGCOLOR, borderTopWidth: 1 }}>
          <View style={{ height: 40, width: 100, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR, fontSize: 18 }}>合约代码</Text></View>
          <View style={{ flex: 1, paddingHorizontal: 15, justifyContent: 'center' }}>
            <ModalDropdown
              options={['option 1', 'option 2']}
              defaultValue='option 1'
              style={{
                alignSelf: 'center',
                width: DEVICE_WIDTH - 110,
                height: 30,
                right: 8,
                borderWidth: 0,
                borderRadius: 3,
                backgroundColor: DARKER_BGCOLOR,
              }}
              textStyle={{
                marginVertical: 5,
                marginHorizontal: 6,
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
              dropdownStyle={{
                width: DEVICE_WIDTH - 110,
                height: 150,
                borderRadius: 3,
              }}
            />
          </View>
        </View>
        {/*合约选择 */}
        <View style={{ height: 40, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', borderTopColor: DARKER_BGCOLOR, borderTopWidth: 1 }}>
          <View style={{ height: 40, width: 100, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR, fontSize: 18 }}>下单方式</Text></View>
          <View style={{ height: 40, width: 70, justifyContent: 'center' }}>
            <ModalDropdown
              options={['市价', '限价']}
              defaultValue='市价'
              style={{
                alignSelf: 'center',
                width: 60,
                height: 30,
                right: 8,
                borderWidth: 0,
                borderRadius: 3,
                backgroundColor: DARKER_BGCOLOR,
              }}
              textStyle={{
                marginVertical: 5,
                marginHorizontal: 6,
                fontSize: 18,
                color: 'white',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
              dropdownStyle={{
                width: 60,
                height: 60,
                borderRadius: 3,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}