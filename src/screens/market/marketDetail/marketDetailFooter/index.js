import React, { Component } from 'react';
import { View } from 'react-native';
import UsualTabBar from '../../../../components/NormalTabBar';
import FiveLevels from './FiveLevels';
export default class MarketDetailFooter extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UsualTabBar tabNames={['五档行情', '逐笔明细', '合约规则']} tabTap={(keyValue) => { console.log(keyValue) }} />
        <FiveLevels/>
      </View>
    );
  }
}