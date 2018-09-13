import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import CardBalance from '../../../../components/CardHeader/CardBalance';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, SCREEN_BGCOLOR } from '../../../../global/config';
import { I_WILL_RECHARGE } from '../../../../global/I18n';
class RechargeScreen extends Component {
  static navigationOptions = {
    title: I_WILL_RECHARGE,
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR
    },
    headerTintColor: HEADER_TINT_COLOR
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: SCREEN_BGCOLOR }}>
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