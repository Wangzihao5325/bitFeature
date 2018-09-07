import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import CardHeader from '../../components/CardHeader/index';
import LogoutSubview from './logout/index';
import LoginSubview from './login/index';
import { SCREEN_BGCOLOR } from '../../global/config';
class MineScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: SCREEN_BGCOLOR }}>
        <CardHeader />
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