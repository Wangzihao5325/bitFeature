import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CommonStyle from '../../global/common_styles';
import { TAB_NAVI_NAME, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../global/config';
import VectorIconBtn from '../../components/IconBtn';
import store from '../../store/index';
import { action_custom_service_model_show } from '../../store/actions/customServiceAction';
export default class TradeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: TAB_NAVI_NAME[1],
      headerLeft: (<VectorIconBtn name='question-circle-o' onPress={navigation.getParam('questionAsk')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav
      headerRight: (<VectorIconBtn name='headphones' onPress={navigation.getParam('customService')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  componentDidMount() {
    this.props.navigation.setParams({ customService: this._customService, questionAsk: this._questionAsk });
  }
  _customService = () => {
    store.dispatch(action_custom_service_model_show());
  }
  _questionAsk = () => {
    this.props.navigation.navigate('OperateDetailsScreen');
  }
  render() {
    return (
      <View style={CommonStyle.absoluateCenterStyle}>
        <Text>trade</Text>
      </View>
    );
  }
}