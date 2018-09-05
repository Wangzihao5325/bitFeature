import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HEADER_TITLE_BGCOLOR } from '../../../global/config';

export default class HeaderTitle extends Component {
  render(){
    return(
      <View style={{height:24,width:200,backgroundColor:'transparents',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <TouchableHighlight style={{height:24,width:100,backgroundColor:HEADER_TITLE_BGCOLOR,display:'flex',justifyContent:'center',alignItems:'center',marginLeft:5,marginRight:5}} backgroundColor={HEADER_TITLE_BGCOLOR} onPress={this.props.onPress}><Text style={{color:'white'}}>IF1808</Text></TouchableHighlight>
        <Icon name={'info'} size={20} color={'#909090'} />
      </View>
    );
  }
}