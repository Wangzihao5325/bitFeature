import React, { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import CommonStyles from '../global/common_styles';
export default class NormalBtn extends Component {
  static propTypes = {
    style: PropTypes.object,
    onPress: PropTypes.func,
    titleStyle: PropTypes.object,
    title: PropTypes.string,
    unableStyle: PropTypes.object,
    unableTitleStyle: PropTypes.object,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    disabled: false,
    unableStyle: { backgroundColor: '#909090' },
    unableTitleStyle: { color: 'white' }
  }
  render() {
    let buttonStyle = this.props.disabled ? this.props.unableStyle : this.props.style;
    let titleStyle = this.props.disabled ? this.props.unableTitleStyle : this.props.titleStyle;
    return (
      <TouchableHighlight disabled={this.props.disabled} onPress={this.props.onPress} style={[CommonStyles.innerAbsCenterStyle, buttonStyle]}>
        <Text style={[{ color: 'black'},titleStyle]}>{this.props.title}</Text>
      </TouchableHighlight>
    );
  }
}