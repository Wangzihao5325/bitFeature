import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import VectorIconBtn from './IconBtn';
import { DEVICE_WIDTH } from '../global/config';
import CommonStyles from '../global/common_styles';
export default class NormalInput extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[CommonStyles.innerLineCenterStyle, styles.inputContainer]}>
          <View style={[CommonStyles.innerAbsCenterStyle, styles.headerTitleContainer]}>
            <Text>{this.props.headerTitle}</Text>
          </View>
          <TextInput />
          <VectorIconBtn name='close' onPress={() => { console.log('1234') }} />
        </View>
        <View style={[CommonStyles.innerAbsCenterStyle, styles.tipsContainer]}><Text style={{color:'red'}}>{this.props.tips}</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 45 + 15,
    width: DEVICE_WIDTH
  },
  inputContainer: {
    flex: 2,
  },
  headerTitleContainer: {
    height: 24,
    width: 90
  },
  tipsContainer: {
    flex: 1
  },
});