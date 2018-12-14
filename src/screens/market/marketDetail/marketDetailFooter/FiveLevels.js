import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { contractMap2Config } from '../../../../global/commodity_list';
import { DEVICE_WIDTH, UP_TEXT_COLOR, DOWN_TEXT_COLOR } from '../../../../global/config';
const NORMAL_TEXTCOLOR = '#7E829B';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
class Item extends Component {
  render() {
    return (
      <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', borderBottomColor: '#17191E', borderBottomWidth: 1 }}>
        <View style={{ height: 30, width: DEVICE_WIDTH / 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ height: 15, width: 15, backgroundColor: UP_TEXT_COLOR, marginLeft: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.index}</Text></View>
          <Text style={{ color: UP_TEXT_COLOR }}>{this.props.bidPrice}</Text>
          <Text style={{ color: 'white', marginRight: 5 }}>{this.props.bidVol}</Text>
        </View>
        <View style={{ height: 30, width: DEVICE_WIDTH / 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ height: 15, width: 15, backgroundColor: DOWN_TEXT_COLOR, marginLeft: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>{this.props.index}</Text></View>
          <Text style={{ color: DOWN_TEXT_COLOR }}>{this.props.askPrice}</Text>
          <Text style={{ color: 'white', marginRight: 10 }}>{this.props.askVol}</Text>
        </View>
      </View>
    );
  }
}
class Header extends Component {
  render() {
    let ask = this.props.askSum;
    let bid = this.props.bidSum;
    let askNum = (ask * 100 / (ask + bid)).toFixed(2);
    let askStr = askNum + '%';
    let bidStr = (100 - askNum) + '%';
    return (
      <View style={{ height: 40, width: DEVICE_WIDTH, paddingHorizontal: 10, display: 'flex' }}>
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}><Text style={{ color: UP_TEXT_COLOR }}>买5档</Text><Text style={{ color: DOWN_TEXT_COLOR }}>卖5档</Text></View>
        <View style={{ flex: 1, flexDirection: 'row' }}><View style={{ flex: ask, backgroundColor: UP_TEXT_COLOR, alignItems: 'center', flexDirection: 'row' }}><Text style={{ color: 'white' }}>{askStr}</Text></View><View style={{ flex: bid, backgroundColor: DOWN_TEXT_COLOR, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: 'white' }}>{bidStr}</Text></View></View>
      </View>
    );
  }
}
class FiveLevels extends Component {
  state = {
    type: true
  }
  componentDidMount() {
    let featureType = contractMap2Config[this.props.nowDetail].structure.security_type;
    let boolType = featureType === 'FO' ? true : false;
    this.setState({
      type: boolType
    });
  }
  render() {
    let dataObj = this.props.marketStore[this.props.nowDetail];
    let ask1 = dataObj.ask1;
    let ask2 = dataObj.ask2;
    let ask3 = dataObj.ask3;
    let ask4 = dataObj.ask4;
    let ask5 = dataObj.ask5;
    let bid1 = dataObj.bid1;
    let bid2 = dataObj.bid2;
    let bid3 = dataObj.bid3;
    let bid4 = dataObj.bid4;
    let bid5 = dataObj.bid5;
    let askSum = ask1[1] + ask2[1] + ask3[1] + ask4[1] + ask5[1];
    let bidSum = bid1[1] + bid2[1] + bid3[1] + bid4[1] + bid5[1];
    return (
      <View style={{ backgroundColor: NORMAL_BACKGROUNDCOLOR, flex: 1 }}>
        <ScrollView>
          <Header askSum={bidSum} bidSum={askSum} />{/*算反了，先反着传 */}
          <Item index={1} askPrice={ask1[0]} askVol={ask1[1]} bidPrice={bid1[0]} bidVol={bid1[1]} />
          {this.state.type && <Item index={2} askPrice={ask2[0]} askVol={ask2[1]} bidPrice={bid2[0]} bidVol={bid2[1]} />}
          {this.state.type && <Item index={3} askPrice={ask3[0]} askVol={ask3[1]} bidPrice={bid3[0]} bidVol={bid3[1]} />}
          {this.state.type && <Item index={4} askPrice={ask4[0]} askVol={ask4[1]} bidPrice={bid4[0]} bidVol={bid4[1]} />}
          {this.state.type && <Item index={5} askPrice={ask5[0]} askVol={ask5[1]} bidPrice={bid5[0]} bidVol={bid5[1]} />}
        </ScrollView>
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

export default connect(mapState2Props)(FiveLevels);