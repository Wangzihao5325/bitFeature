import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import { connect } from 'react-redux';
import { CUSTOM_SERVICE_URL, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../global/config';

class CustomerServiceScreen extends Component {
  static navigationOptions = {
    title: '在线客服',
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  }
  render() {
    let { accountStore } = this.props;
    let uri = CUSTOM_SERVICE_URL;
    if (accountStore.isLogin) {
      uri = `${CUSTOM_SERVICE_URL}?phone=${18700875325}&userName=${'zihao'}`;
    }
    return (
      <WebView
        source={{ uri }}
        style={{ marginBottom: 0 }}//{ marginBottom: Layout.isIphoneX ? Layout.iphoneXPaddingButton : 0 }
        automaticallyAdjustContentInsets={true}
        scalesPageToFit={true}
        mixedContentMode={'always'}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    );
  }
}
function mapState2Props(store) {
  return {
    accountStore: store.account
  }
}
export default connect(mapState2Props)(CustomerServiceScreen);