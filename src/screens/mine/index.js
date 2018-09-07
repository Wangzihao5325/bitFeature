import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store/index';
import * as types from '../../store/actionType';
import CommonStyle from '../../global/common_styles';
import CardHeader from '../../components/CardHeader';
import LogoutSubview from './logout/index';
import LoginSubview from './login/index';
class MineScreen extends Component {

  render() {
    return (
      <View style={{flex:1}}>
        <CardHeader/>
        {this.props.isLogin ? <LoginSubview/> : <LogoutSubview/>}
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