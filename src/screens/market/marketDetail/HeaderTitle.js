import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
class HeaderTitle extends Component {
  render() {
    return (
      <View style={{ height: 24, width: 200, backgroundColor: 'transparents', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableHighlight style={{ height: 24, width: 100, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 5, marginRight: 5 }} backgroundColor={NORMAL_BACKGROUNDCOLOR} onPress={this.props.onPress}>
          <Text style={{ color: 'white' }}>{this.props.nowDetail}</Text>
        </TouchableHighlight>
        <Icon name={'info'} size={20} color={'#909090'} />
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    marketStore: store.market,
    nowDetail: store.marketDetail.nowContract
  }
}

export default connect(mapState2Props)(HeaderTitle);