import React, { Component } from 'react';
import { WebView, Linking, Platform } from 'react-native';
import { RECHARGE_URL, } from '../../../../global/config';
import Variables from '../../../../global/Variables';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../../global/config';
const ali = 'alipay';
export default class AccountDepositWebView extends Component {
  static navigationOptions = {
    title: "充值",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  _navigateToAli = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url).then(() => {
          // 加入才不會在 開啟支付寶時，將支付寶往上推．
          setTimeout(() => {
            this.props.navigation.pop();
          }, 1000);
        });
      } else {
        this.props.navigation.pop();
      }
    }).catch(err => console.log('An error occurred', err));
  }
  // iOS http://leonhwa.com/blog/0014905236320002ebb3db97fe64fb3bb6f047eafb1c5de000
  _onShouldStartLoadWithRequest = (e) => {
    if (e.url.indexOf(ali) !== -1) {
      this._navigateToAli(e.url);
      return false;
    }
    return true;
  }
  // android
  _onNavigationStateChange = (e) => {
    if (Platform.OS === 'android') {
      if (e.url.indexOf(ali) !== -1) {
        this._webview.stopLoading();
        this._navigateToAli(e.url);
      }
    }
  }
  // const uri = 'alipayqr://platformapi/startapp?saId=10000007&qrcode=HTTPS%3a%2f%2fQR.ALIPAY.COM%2fFKX09099VQZDCJ1QFGXA9F';
  render() {
    const money = this.props.navigation.getParam('money', 0);
    const uri = `${RECHARGE_URL}/app/appPayinfo?mobile=${Variables.account.mobileAccount}&money=${money}`;
    return (
      <WebView
        ref={el => this._webview = el}
        source={{ uri }}
        style={{ marginBottom: 0 }}
        automaticallyAdjustContentInsets={true}
        scalesPageToFit={true}
        mixedContentMode={'always'}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onNavigationStateChange={this._onNavigationStateChange}
        onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
        renderError={(e) => {
          if (e === 'WebKitErrorDomain') {
            return;
          }
        }
        }
      />
    );
  }
}