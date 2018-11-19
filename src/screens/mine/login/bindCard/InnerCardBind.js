import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../../global/config';
import MaterialInput from '../../../../components/MaterialInput';
import NormalBtn from '../../../../components/NormalBtn';
import api from '../../../../socket/platform/api';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
let reg = { name: '', bankName: '', cardNum: '', province: '', city: '' };
export default class InnerCardBind extends Component {
  static navigationOptions = {
    title: "添加银行卡",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };

  componentDidMount() {
    api.getSupportBanks(this._getSupportBanksSuccess);
  }
  _getSupportBanksSuccess = (e) => {
    console.log(e);
  }
  _nameTextChanged = (text) => {
    reg.name = text;
  }
  _banknameChanged = (text) => {
    reg.bankName = text;
  }
  _provinceChanged = (text) => {
    reg.province = text;
  }
  _cityChanged = (text) => {
    reg.city = text;
  }
  _cardNumChanged = (text) => {
    reg.cardNum = text
  }
  _addCard = () => {
    // api.addBankCards();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <MaterialInput title={'开户姓名'} onChangeText={this._nameTextChanged} />
        <MaterialInput title={'支行全称'} onChangeText={this._banknameChanged} />
        <MaterialInput title={'开户省份'} onChangeText={this._nameTextChanged} />
        <MaterialInput title={'开户城市'} onChangeText={this._nameTextChanged} />
        <MaterialInput title={'银行卡号'} onChangeText={this._cardNumChanged} />
        <NormalBtn
          disabled={false}
          title='确认添加'
          style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
          titleStyle={{ color: 'black' }}
          unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
          onPress={this._addCard}
        />
      </View>
    );
  }
}