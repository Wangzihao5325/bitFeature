import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TAB_NAVI_DEFAULT_TINT_COLOR, ICON_SIZE } from '../global/config';

export default class VectorIconBtn extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={{flex:1}}>
        <Icon name={this.props.name} size={ICON_SIZE} color={TAB_NAVI_DEFAULT_TINT_COLOR} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  
});