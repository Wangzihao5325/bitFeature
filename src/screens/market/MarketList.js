import React, { Component } from 'react';
import { View, TouchableHighlight, Text, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';
import { action_detailMarketDidMount } from '../../store/actions/markDetailsAction';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { contractMap2Config } from '../../global/commodity_list';
import { rateStrGenerator, priceStr2Generator } from '../../global/util/index';
import { DEVICE_WIDTH, DEVICE_HEIGHT, UP_TEXT_COLOR, DOWN_TEXT_COLOR } from '../../global/config';
import CommonStyles from '../../global/common_styles';
import { classifyContractMap } from '../../global/commodity_list';
const NORMAL_TEXTCOLOR = '#7E829B';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const FONT_SIZE = 18;
const DEFAULT_DOT_SIZES = 2;
class ListHeader extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isTradeValue !== this.props.isTradeValue) {
      return true;
    }
    if (nextProps.isRate !== this.props.isRate) {
      return true;
    }
    return false;
  }
  render() {
    let volumeText = this.props.isTradeValue ? '成交量' : '持仓量';
    let rateText = this.props.isRate ? '涨跌幅' : '涨跌额';
    return (
      <View style={[styles.headerContainer, CommonStyles.innerLineCenterStyle]}>
        <View style={{ flex: 4, paddingLeft: 10 }}>
          <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: FONT_SIZE }}>名称</Text>
        </View>
        <View style={[CommonStyles.innerLineCenterStyle, { flex: 6 }]}>
          <Text style={[styles.partContainer, { color: NORMAL_TEXTCOLOR, fontSize: FONT_SIZE }]}>最新价</Text>
          <TouchableHighlight style={styles.partContainer} onPress={this.props.onChangeVolume}>
            <View style={CommonStyles.innerLineCenterStyle}>
              <Icon
                name="caret-down"
                size={16}
                color={NORMAL_TEXTCOLOR}
                style={{ position: 'absolute', bottom: -5, left: -12, transform: [{ rotate: '45deg' }] }}
              />
              <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: FONT_SIZE }}>{volumeText}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.partContainer} onPress={this.props.onChangeRate}>
            <View style={CommonStyles.innerLineCenterStyle}>
              <Icon
                name="caret-down"
                size={16}
                color={NORMAL_TEXTCOLOR}
                style={{ position: 'absolute', bottom: -5, left: -12, transform: [{ rotate: '45deg' }] }}
              />
              <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: FONT_SIZE }}>{rateText}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
class ItemComponent extends Component {
  static propTypes = {
    contractNo: PropTypes.string,
    price: PropTypes.number,
    changeRate: PropTypes.number,
    changeNum: PropTypes.number,
    tradeValue: PropTypes.number,
    holdValue: PropTypes.number,
    isRate: PropTypes.bool,
    isTradeValue: PropTypes.bool,
  }
  static defaultProps = {
    isRate: true,
    isTradeValue: true
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.price !== this.props.price) {
      return true;
    }
    if (nextProps.isTradeValue !== this.props.isTradeValue) {
      return true;
    }
    if (nextProps.isRate !== this.props.isRate) {
      return true;
    }
    if (this.props.isTradeValue) {
      if (nextProps.tradeValue !== this.props.tradeValue) {
        return true;
      }
    } else {
      if (nextProps.holdValue !== this.props.holdValue) {
        return true;
      }
    }
    return false;
  }
  render() {
    let dotSize = contractMap2Config[this.props.contractNo].dotSize;
    let contractName = contractMap2Config[this.props.contractNo].fullName;
    let priceText = priceStr2Generator(this.props.price, dotSize);
    let changeText = this.props.isRate ? rateStrGenerator(this.props.changeRate, DEFAULT_DOT_SIZES, true) : rateStrGenerator(this.props.changeNum, dotSize, false);
    let valueText = this.props.isTradeValue ? this.props.tradeValue : this.props.holdValue;
    let colorStyle = this.props.changeRate >= 0 ? { color: UP_TEXT_COLOR } : { color: DOWN_TEXT_COLOR };
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[{ height: 61, width: DEVICE_WIDTH, display: 'flex', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: 'black', borderBottomWidth: 1 }]}
      >
        <View style={[{ flex: 1 }, CommonStyles.innerLineCenterStyle]}>
          <View style={{ flex: 4, paddingLeft: 10 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>{contractName}</Text>
            <Text style={{ color: NORMAL_TEXTCOLOR }}>{this.props.contractNo}</Text>
          </View>
          <View style={[{ flex: 6 }, CommonStyles.innerLineCenterStyle]}>
            <View style={[CommonStyles.innerAbsCenterStyle, styles.partContainer]}><Text style={colorStyle}>{priceText}</Text></View>
            <View style={[CommonStyles.innerAbsCenterStyle, styles.partContainer]}><Text style={{ color: 'white' }}>{valueText}</Text></View>
            <View style={[CommonStyles.innerAbsCenterStyle, styles.partContainer]}><Text style={colorStyle}>{changeText}</Text></View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
class MarkList extends Component {
  static contextTypes = {
    marketNavigation: PropTypes.object
  }
  state = {
    isRate: true,
    isTradeValue: true
  }
  _changeVolume = () => {
    this.setState((prevState, props) => {
      return {
        isTradeValue: !prevState.isTradeValue
      }
    });
  }
  _changeRate = () => {
    this.setState((prevState, props) => {
      return {
        isRate: !prevState.isRate
      }
    });
  }
  render() {
    const { marketNavigation } = this.context;
    let { marketStore } = this.props;
    let contractList = Object.keys(marketStore);
    if (classifyContractMap[this.props.page]) {
      contractList = classifyContractMap[this.props.page];
    }
    let pickedContractList = _.pick(marketStore, contractList);//当前为冗余，后续需要筛选合约
    let data = _.values(pickedContractList);
    return (
      <View style={{ marginTop: 6, flex: 1 }}>
        <ListHeader
          onChangeVolume={this._changeVolume}
          onChangeRate={this._changeRate}
          isRate={this.state.isRate}
          isTradeValue={this.state.isTradeValue}
        />
        <FlatList
          style={{ flex: 1 }}
          alwaysBounceVertical={false}
          data={data}
          renderItem={
            ({ item }) => <ItemComponent
              key={item.contract_name}
              contractNo={item.contract_name}
              price={item.last}
              changeRate={item.change_rate}
              changeNum={item.change_value}
              tradeValue={item.volume}
              holdValue={item.position}
              onPress={() => {
                store.dispatch(action_detailMarketDidMount(item.contract_name));
                marketNavigation.navigate('MarketDetailScreen', { contract: `${item.contract_name}` });
              }}
              isRate={this.state.isRate}
              isTradeValue={this.state.isTradeValue}
            />
          }
        />
      </View>
    );
  }
}
function mapState2Props(store) {
  return {
    marketStore: store.market,
    page: store.contractClassify.page
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