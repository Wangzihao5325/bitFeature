import React, { Component } from 'react';
import { View, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import { classifyContractMap } from '../../../global/commodity_list';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH, DEVICE_HEIGHT } from '../../../global/config';
import TradeCenterHeader from './TradeCenterHeader';
import TradeCenterBottom from './TradeCenterBottom';
import TradeContent from './TradeContent';
class TradeCenter extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '交易中心',  //header标题
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  render() {
    let defalutContract = classifyContractMap[(this.props.classifyPage === '自选' ? '商品' : this.props.classifyPage)][0];
    return (
      <ScrollView style={{ height: DEVICE_HEIGHT, width: DEVICE_WIDTH }} >
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <TradeCenterHeader contractCode={defalutContract} />
          <TradeContent contractCode={defalutContract} />
          <TradeCenterBottom />
        </View>
      </ScrollView>
    );
  }
}
function mapState2Props(store) {
  return {
    classifyPage: store.contractClassify.page
  }
}

export default connect(mapState2Props)(TradeCenter);