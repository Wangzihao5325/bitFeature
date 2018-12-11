import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TAB_NAVI_DEFAULT_TINT_COLOR, ICON_SIZE } from '../global/config';

export default class VectorIconBtn extends Component {
  render() {
    let size = this.props.size ? this.props.size : ICON_SIZE
    return (
      <TouchableHighlight onPress={this.props.onPress} style={[styles.container, { ...this.props.style }]} underlayColor={null}>
        <Icon name={this.props.name} size={size} color={this.props.color ? this.props.color : TAB_NAVI_DEFAULT_TINT_COLOR} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: ICON_SIZE,
    width: ICON_SIZE + 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});