import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { DEVICE_WIDTH, DOWN_TEXT_COLOR, UP_TEXT_COLOR } from '../../global/config';
import CommonStyles from '../../global/common_styles';
import { rateStrGenerator, priceStrGenerator } from '../../global/util/index';

const PRICE_DECIMAL_DIGITS = 2;
const CHANGE_DECIMAL_DIGITS = 2;

class ItemContent extends Component {
  render() {
    let priceText = priceStrGenerator(this.props.price, PRICE_DECIMAL_DIGITS, this.props.changeRate);
    let changeRateText = rateStrGenerator(this.props.changeRate, CHANGE_DECIMAL_DIGITS, true);
    let changeNumText = rateStrGenerator(this.props.changeNum, CHANGE_DECIMAL_DIGITS, false);
    let color = this.props.changeRate >= 0 ? { color: UP_TEXT_COLOR } : { color: DOWN_TEXT_COLOR };
    return (
      <TouchableHighlight style={styles.itemContent} onPress={this.props.onPress}>
        <View style={[styles.itemContent, CommonStyles.innerAbsCenterStyle,{backgroundColor:'transparent'}]}>
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
export default class OptionalMarket extends Component {
  render() {
    return (
      <View>
        <ItemContent title='迷你美黄金' price={1257.1234} changeRate={0.051111} changeNum={0.69454} onPress={()=>{console.log('1234')}}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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