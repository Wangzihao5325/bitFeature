import React, { Component } from 'react';
import { View, TouchableHighlight, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { rateStrGenerator, priceStrGenerator } from '../../global/util/index';
import { DEVICE_WIDTH, HEADER_TITLE_BGCOLOR } from '../../global/config';
import CommonStyles from '../../global/common_styles';
const NORMAL_TEXTCOLOR = '#7E829B';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const FONT_SIZE = 18;
class ListHeader extends Component {
  render() {
    return (
      <View style={[styles.headerContainer, CommonStyles.innerLineCenterStyle]}>
        <View style={{ flex: 4, paddingLeft: 10 }}>
          <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: FONT_SIZE }}>名称</Text>
        </View>
        <View style={[CommonStyles.innerLineCenterStyle, { flex: 6 }]}>
          <Text style={[styles.partContainer, { color: NORMAL_TEXTCOLOR, fontSize: FONT_SIZE }]}>最新价</Text>
          <TouchableHighlight style={styles.partContainer}>
            <View style={CommonStyles.innerLineCenterStyle}>
              <Icon
                name="caret-down"
                size={16}
                color={NORMAL_TEXTCOLOR}
                style={{ position: 'absolute', bottom: -5, left: -12, transform: [{ rotate: '45deg' }] }}
              />
              <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: FONT_SIZE }}>成交量</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.partContainer}>
            <View style={CommonStyles.innerLineCenterStyle}>
              <Icon
                name="caret-down"
                size={16}
                color={NORMAL_TEXTCOLOR}
                style={{ position: 'absolute', bottom: -5, left: -12, transform: [{ rotate: '45deg' }] }}
              />
              <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: FONT_SIZE }}>涨跌幅</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
class ItemComponent extends Component {
  render() {
    // let priceText = priceStrGenerator(this.props.price, dotSize, this.props.changeRate);
    // let changeText = this.props.isRate ? rateStrGenerator(this.props.changeRate, DEFAULT_DOT_SIZES, true) : rateStrGenerator(this.props.changeNum, dotSize, false);
    // let valueText = this.props.isTradeValue ? this.props.tradeValue : this.props.holdValue;
    return (
      <View style={[{ height: 61, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth }, CommonStyles.innerLineCenterStyle]}>
        <View style={{ flex: 4, paddingLeft: 10 }}>
          <Text style={{ color: 'white' }}>{/*this.props.contractName*/'黄金1808'}</Text>
          <Text style={{ color: NORMAL_TEXTCOLOR }}>{/*this.props.contractNo*/'GC1808'}</Text>
        </View>
        <View style={[{ flex: 6 }, CommonStyles.innerLineCenterStyle]}>
          <View style={CommonStyles.absoluateCenterStyle}><Text style={{ color: 'white' }}>{/*priceText*/3120}</Text></View>
          <View style={CommonStyles.absoluateCenterStyle}><Text style={{ color: 'white' }}>{/*changeText*/6766}</Text></View>
          <View style={CommonStyles.absoluateCenterStyle}><Text style={{ color: 'white' }}>{/*valueText*/1.05}</Text></View>
        </View>
      </View>
    );
  }
}
class MarkList extends Component {
  render() {
    let { marketStore } = this.props;
    let contractList = Object.keys(marketStore);// ... to do 在订阅两条的情况下，把订阅的作为推荐合约
    let pickedContractList = _.pick(marketStore, contractList);//当前为冗余，后续需要筛选合约
    let data = _.values(pickedContractList);
    return (
      <View style={{ marginTop: 6 }}>
        <ListHeader />
        <FlatList
          data={data}
          renderItem={({ item }) => <ItemComponent key={item.contract_name} />}
        />
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    marketStore: store.market
  }
}
export default connect(mapState2Props)(MarkList);
const styles = StyleSheet.create({
  headerContainer: {
    height: 40,
    width: DEVICE_WIDTH,
    backgroundColor: NORMAL_BACKGROUNDCOLOR,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  partContainer: {
    flex: 1
  }
});