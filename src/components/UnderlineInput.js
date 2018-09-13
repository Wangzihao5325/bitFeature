import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RNTextInput from 'react-native-text-input-enhance';
import VectorIconBtn from './IconBtn';
import { DEVICE_WIDTH } from '../global/config';
import CommonStyles from '../global/common_styles';
export default class UnderlineInput extends Component {
  constructor() {
    super();
    this._clear = this._clear.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
  }
  static propTypes = {
    fitMode: PropTypes.bool,
    title: PropTypes.string,
    onChangeText: PropTypes.func,
  }
  static defaultProps = {
    fitMode: false
  }
  _clear() {
    this.textInputRef.clear();
  }
  _onChangeText(text) {
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  }
  render() {
    return (
      <View style={this.props.fitMode ? styles.fitContainer : styles.unfitContainer}>
        <View style={[CommonStyles.innerLineCenterStyle, styles.inputView, { borderBottomColor: '#2C5387', borderBottomWidth: 1 }]}>
          <View style={[CommonStyles.innerAbsCenterStyle, styles.headerTitleContainer]}>
            <Text style={{ fontSize: 20, color: '#909090', fontWeight: 'bold' }}>{this.props.title}</Text>
          </View>
          <RNTextInput hasRef={ref => (this.textInputRef = ref)} onChangeText={this._onChangeText} maxLength={11} style={{ height: 36, width: 200, color: 'white' }} />
          <VectorIconBtn name='close' onPress={this._clear} />
        </View>
        {this.props.fitMode ? <View style={styles.fitView} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fitContainer: {
    width: DEVICE_WIDTH,
    height: 50 + 20,
    paddingHorizontal: 10,
  },
  unfitContainer: {
    width: DEVICE_WIDTH,
    height: 50,
    paddingHorizontal: 10,
  },
  inputView: {
    flex: 5,
    justifyContent: 'space-between',
  },
  headerTitleContainer: {
    height: 24,
    width: 90
  },
  fitView: {
    flex: 2
  }
});