import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../../../global/config';
import DetailView from './DetailView';
import TradedDetailView from './TradedDetailView';

export default class InnerDeatil extends Component {
  static navigationOptions = {
    title: "详情",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  state = {
    accountData: null
  }
  static childContextTypes = {
    mineNavigation: PropTypes.object
  }
  getChildContext() {
    return {
      mineNavigation: this.props.navigation
    }
  }
  componentDidMount() {
    const accountInfoJsonStr = this.props.navigation.getParam('tranAccount', 'undefine_tranAccount');
    let accountInfoObj = JSON.parse(accountInfoJsonStr);
    console.log(accountInfoObj);
    this.setState({
      accountData: accountInfoObj
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.accountData && this.state.accountData.stateType === 4 && <DetailView data={this.state.accountData} />}
        {this.state.accountData && this.state.accountData.stateType !== 4 && <TradedDetailView data={this.state.accountData} />}
      </View>
    );
  }
}