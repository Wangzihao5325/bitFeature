import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import CardHeader from '../../components/CardHeader/index';
import LogoutSubview from './logout/index';
import LoginSubview from './login/index';
import { SCREEN_BGCOLOR } from '../../global/config';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, TAB_NAVI_NAME } from '../../global/config';
class MineScreen extends Component {
  static navigationOptions = {
    title: TAB_NAVI_NAME[3],
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR
    },
    headerTintColor: HEADER_TINT_COLOR
  }

  _login = () => {
    this.props.navigation.navigate('AccountLogScreen');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: SCREEN_BGCOLOR }}>
        <CardHeader showAccountLogin={this._login} />
        {this.props.isLogin ? <LoginSubview /> : <LogoutSubview />}
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    isLogin: store.account.isLogin
  }
}

export default connect(mapState2Props)(MineScreen);