import React, { Component } from 'react';
import { View, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import store from '../../../store/index';
import MarketSocket from '../../../socket/marketSocket/index';
import { classifyContractMap, aliveContractList, aliveContractSnapShot } from '../../../global/commodity_list';
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

  constructor(props) {
    super(props);
    if (aliveContractList.length === 1) {
      this.defalutContract = aliveContractList[0];
    } else {
      this.defalutContract = classifyContractMap[(this.props.classifyPage === '自选' ? '商品' : this.props.classifyPage)][0];
    }
  }
  componentDidMount() {
    MarketSocket.holdPositionMarketSocketStart();
  }
  componentWillUnmount() {
    MarketSocket.holdPositionMarketSocketStop();
  }
  render() {
    return (
      <ScrollView style={{ height: DEVICE_HEIGHT, width: DEVICE_WIDTH }} >
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <TradeCenterHeader contractCode={this.defalutContract} />
          <TradeContent contractCode={this.defalutContract} />
          <TradeCenterBottom />
        </View>
      </ScrollView>
    );
  }
}
function mapState2Props(store) {
  return {
    classifyPage: store.contractClassify.page,
    holdPositions: store.nowTradeAccount.holdPositions
  }
}

export default connect(mapState2Props)(TradeCenter);