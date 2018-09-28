import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Api from '../../../../socket/platform/api';
import VectorIconBtn from '../../../../components/IconBtn';
import store from '../../../../store/index';
import { action_custom_service_model_show } from '../../../../store/actions/customServiceAction';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../../global/config';
const NORMAL_BGCOLOR = 'black';//#17191E
const NORMAL_COMPONENT_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const NORMAL_TEXTCOLOR = '#7E829B';
const FONT_SIZE = 21;
class CapitalDetailsHeader extends Component {
  render() {
    return (
      <View style={{ backgroundColor: NORMAL_BGCOLOR }}>
        <View style={{ backgroundColor: NORMAL_COMPONENT_BACKGROUNDCOLOR, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'baseline', paddingVertical: 8 }}>
          <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: FONT_SIZE, marginLeft: 20 }}>收入:</Text><Text style={{ color: 'white', marginHorizontal: 20, fontSize: FONT_SIZE }}>{this.props.incomeNum + ' 笔'}</Text><Text style={{ color: HIGHLIGHT_TEXTCOLOR, fontSize: FONT_SIZE }}>{this.props.incomeMoney + ' 元'}</Text>
        </View>
        <View style={{ marginTop: 1, backgroundColor: NORMAL_COMPONENT_BACKGROUNDCOLOR, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', alignItems: 'baseline', paddingVertical: 8 }}>
          <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: FONT_SIZE, marginLeft: 20 }}>支出:</Text><Text style={{ color: 'white', marginHorizontal: 20, fontSize: FONT_SIZE }}>{this.props.outlayNum + ' 笔'}</Text><Text style={{ color: HIGHLIGHT_TEXTCOLOR, fontSize: FONT_SIZE }}>{this.props.outlayMoney + ' 元'}</Text>
        </View>
      </View>
    );
  }
}
export default class CapitalDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '资金明细',  //header标题
      headerRight: (<VectorIconBtn name='headphones' onPress={navigation.getParam('customService')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  componentDidMount() {
    this.props.navigation.setParams({ customService: this._customService });
    Api.getCapitalDetails(function (result) { console.log(result) });
  }
  _customService = () => {
    store.dispatch(action_custom_service_model_show());
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CapitalDetailsHeader incomeNum={3} incomeMoney={3000} outlayNum={10} outlayMoney={10000} />
      </View>
    );
  }
}