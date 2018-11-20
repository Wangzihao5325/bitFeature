import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';
import { action_detailMarketDidMount } from '../../store/actions/markDetailsAction';
import { DEVICE_WIDTH, DOWN_TEXT_COLOR, UP_TEXT_COLOR } from '../../global/config';
import CommonStyles from '../../global/common_styles';
import { rateStrGenerator, priceStrGenerator } from '../../global/util/index';
import { contractMap2Config, recommendContractMap } from '../../global/commodity_list';

const DEFAULT_DOT_SIZES = 2;

class ItemContent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.price === nextProps.price &&
      this.props.changeRate === nextProps.changeRate &&
      this.props.changeNum === nextProps.changeNum &&
      this.props.title === nextProps.title) {
      return false;
    }
    return true;
  }
  render() {
    let dotSize = this.props.dotSize;
    let priceText = priceStrGenerator(this.props.price, dotSize, this.props.changeRate);
    let changeRateText = rateStrGenerator(this.props.changeRate, DEFAULT_DOT_SIZES, true);
    let changeNumText = rateStrGenerator(this.props.changeNum, dotSize, false);
    let color = this.props.changeRate >= 0 ? { color: UP_TEXT_COLOR } : { color: DOWN_TEXT_COLOR };
    return (
      <TouchableHighlight style={[styles.itemContent, { borderLeftWidth: 1, borderRightWidth: 1, borderLeftColor: 'black', borderRightColor: 'black' }]} onPress={this.props.onPress}>
        <View style={[styles.itemContent, CommonStyles.innerAbsCenterStyle, { backgroundColor: 'transparent' }]}>
          <Text style={styles.titleText}>{this.props.title}</Text>
          <Text style={[styles.priceText, color]}>{priceText}</Text>
          <View style={[styles.changeContent, CommonStyles.innerLineCenterStyle]}>
            <Text style={[styles.changeText, color]}>{changeRateText}</Text>
            <Text style={[styles.changeText, color]}>{changeNumText}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
class OptionalMarket extends Component {
  static contextTypes = {
    marketNavigation: PropTypes.object
  }
  render() {
    const { marketNavigation } = this.context;
    let { marketStore } = this.props;
    let contractList = Object.keys(marketStore);// ... to do 在订阅两条的情况下，把订阅的作为推荐合约
    if (recommendContractMap[this.props.page] && contractList.length > 3) {
      contractList = recommendContractMap[this.props.page];
    }
    //let contractList = ['CD1812','CU3M','ZN3M'];
    if (contractList.length > 3) {
      contractList = contractList.slice(0, 3);
    }
    return (
      <View style={[styles.optionalContainer, CommonStyles.innerLineCenterStyle]}>
        {contractList.map(function (item) {
          let contractStore = marketStore[item];
          return (
            <ItemContent
              key={item}
              title={contractMap2Config[item].fullName}
              dotSize={contractMap2Config[item].dotSize}
              price={contractStore.last}
              changeRate={contractStore.change_rate}
              changeNum={contractStore.change_value}
              onPress={() => {
                store.dispatch(action_detailMarketDidMount(item));
                marketNavigation.navigate('MarketDetailScreen', { contract: `${item}` })
              }}
            />
          )
        })}
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
export default connect(mapState2Props)(OptionalMarket);
const styles = StyleSheet.create({
  optionalContainer: {
    width: DEVICE_WIDTH,
    height: 100,
    backgroundColor: '#20212A'
  },
  itemContent: {
    width: DEVICE_WIDTH / 3,
    height: 100,
    backgroundColor: '#20212A'
  },
  titleText: {
    color: 'white',
    fontSize: 16,
  },
  priceText: {
    fontSize: 20,
    marginVertical: 5
  },
  changeContent: {
    width: DEVICE_WIDTH / 3,
    justifyContent: 'space-around',
  },
  changeText: {
    fontSize: 14,
  }
});