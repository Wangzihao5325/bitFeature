import React, { Component } from 'react';
import { View } from 'react-native';
import UsualTabBar from '../../../components/NormalTabBar';
import HoldPositionList from './holdPositionList/index';
import DealList from './dealList/index';
import DesignateList from './designateList/index';
export default class TradeCenterBottom extends Component {
  pageChange = () => {

  }
  render() {
    return (
      <View >
        <UsualTabBar tabNames={['持仓', '挂单', '委托', '成交']} tabTap={this.pageChange} />
        {/* <HoldPositionList /> */}
        {/* <DealList /> */}
        {/* <DesignateList /> */}
      </View>
    );
  }
}