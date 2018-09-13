import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import CardBalance from '../../../../components/CardHeader/CardBalance';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../../global/config';
class RechargeScreen extends Component {
  static navigationOptions = {
    title: '我要充值',
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR
    },
    headerTintColor: HEADER_TINT_COLOR
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CardBalance />
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    balance: store.account.balance
  }
}

export default connect(mapState2Props)(RechargeScreen);