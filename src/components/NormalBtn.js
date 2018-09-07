import React, { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import CommonStyles from '../global/common_styles';
export default class NormalBtn extends Component {
  static propTypes = {
    style: PropTypes.object,
    onPress: PropTypes.func,
    titleStyle: PropTypes.object,
    title: PropTypes.string
  }
  render() {
    return (
      <TouchableHighlight style={{ ...CommonStyles.innerAbsCenterStyle, ...this.props.style }} onPress={this.props.onPress}>
        <Text style={{ color: 'black', ...this.props.titleStyle }}>{this.props.title}</Text>
      </TouchableHighlight>
    );
  }
}