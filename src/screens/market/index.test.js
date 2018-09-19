import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import VectorIconBtn from '../../components/IconBtn';
import CommonStyle from '../../global/common_styles';
import { TAB_NAVI_NAME, TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../global/config';
import UsualTabBar from '../../components/NormalTabBar';
export default class MarketScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: TAB_NAVI_NAME[0],  //header标题
      headerRight: (<VectorIconBtn name='search' onPress={navigation.getParam('search')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav     
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };

  state = {
    text: 'market, btn',
    reg: 0,
  };
  componentDidMount() {
    this.props.navigation.setParams({ search: this._searchBarShow });
  }
  _searchBarShow = () => {
    this.setState({ reg: this.state.reg + 1 });
  }
  render() {
    return (
      <View style={CommonStyle.absoluateCenterStyle}>
        <View style={{height:24,width:150,justifyContent:'center',alignItems:'center'}}><Text>{this.state.text + ' click : ' + this.state.reg}</Text></View>
        <Button title='navigate to stack' onPress={() => this.props.navigation.navigate('MarketDetailScreen')} />
        <Button title='navigate to tab' onPress={() => this.props.navigation.navigate('TradeStack')} />
        <UsualTabBar tabNames={['商品','股指外汇','LME金属']} tabTap={(keyValue)=>{console.log('!!!!____' + keyValue)}}/>
      </View>
    );
  }
}