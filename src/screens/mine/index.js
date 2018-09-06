import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store/index';
import * as types from '../../store/actionType';
import CommonStyle from '../../global/common_styles';
class MineScreen extends Component {

  render() {
    return (
      <View style={CommonStyle.absoluateCenterStyle}>
        <Text>{this.props.counter}</Text>
        <Button title='+' onPress={() => store.dispatch({ type: types.INCREMENT })} />
        <Button title='-' onPress={() => store.dispatch({ type: types.DECREMENT })} />
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    counter: store
  }
}

export default connect(mapState2Props)(MineScreen);