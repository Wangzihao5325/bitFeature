import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../../global/config';
import MaterialInput from '../../../../components/MaterialInput';
import NormalBtn from '../../../../components/NormalBtn';
import api from '../../../../socket/platform/api';
import ToastRoot from '../../../../components/ToastRoot';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { City, Province } from '../../../../global/city_list';
import CommonStyles from '../../../../global/common_styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARK_BGCOLOR = '#17191E';
let reg = { name: '', bankName: '', cardNum: '', province: '', city: '', bankAddress: '' };
export default class InnerCardBind extends Component {
  static navigationOptions = {
    title: "添加银行卡",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };
  state = {
    bankName: null,
    bankAbb: null,
    cityOpitions: ['', '', '', '', ''],
  }
  componentDidMount() {
    api.getSupportBanks(this._getSupportBanksSuccess);
  }
  _getSupportBanksSuccess = (e) => {
    let bankName = [];
    let bankAbb = [];
    e.forEach(element => {
      bankName.push(element.bankName);
      bankAbb.push(element.abbreviation);
    });
    this.setState({
      bankName: bankName,
      bankAbb: bankAbb
    });
    reg.bankName = bankAbb[0];
  }
  _bankSelect = (index) => {
    let selectAbb = this.state.bankAbb[index]
    reg.bankName = selectAbb;
  }
  _nameTextChanged = (text) => {
    reg.name = text;
  }
  _provinceChanged = (index) => {
    let selectedProvince = Province[index];
    reg.province = selectedProvince;
    let nowCityOpitions = City[selectedProvince];
    this.setState({
      cityOpitions: nowCityOpitions
    });
  }
  _cityChanged = (index) => {
    let city = this.state.cityOpitions[index];
    reg.city = city;
  }
  _bankAddressChanged = (text) => {
    reg.bankAddress = text;
  }
  _cardNumChanged = (text) => {
    reg.cardNum = text
  }
  _addCard = () => {
    api.addBankCards(reg.bankName, reg.cardNum, reg.province, reg.city, reg.bankAddress, reg.name, this._addCardSuccess, this._addCardFailed);
  }
  _addCardSuccess = () => {
    ToastRoot.show('绑定银行卡成功');
    this.props.navigation.popToTop();
  }
  _addCardFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  render() {
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <MaterialInput title={'开户姓名'} onChangeText={this._nameTextChanged} />
        {/*银行select*/}
        <View style={{ height: 60, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
            <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>开户银行</Text>
          </View>
          <View style={{ flex: 1, height: 40, marginLeft: 10, marginRight: 15, backgroundColor: DARK_BGCOLOR, flexDirection: 'row', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
            <View style={CommonStyles.innerLineCenterStyle}>
              <Icon
                name="caret-down"
                size={16}
                color={NORMAL_TEXTCOLOR}
                style={{ position: 'absolute', bottom: -20, left: -25, transform: [{ rotate: '45deg' }] }}
              />
            </View>
            {this.state.bankName &&
              <ModalDropdown
                onSelect={this._bankSelect}
                options={this.state.bankName}
                defaultValue={''}//this.state.bankName[0]
                style={{
                  width: 200,
                  height: 40,
                  borderWidth: 0,
                  borderRadius: 3,
                  backgroundColor: DARK_BGCOLOR,
                }}
                textStyle={{
                  marginVertical: 5,
                  marginHorizontal: 6,
                  fontSize: 18,
                  color: 'white',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}
                dropdownStyle={{
                  width: 200,
                  height: 120,
                  borderRadius: 3,
                }}
                dropdownTextHighlightStyle={{
                  color: 'white'
                }}
              />
            }
          </View>
        </View>
        {/*省份select*/}
        <View style={{ height: 60, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
            <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>开户省份</Text>
          </View>
          <View style={{ flex: 1, height: 40, marginLeft: 10, marginRight: 15, backgroundColor: DARK_BGCOLOR, flexDirection: 'row', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
            <View style={CommonStyles.innerLineCenterStyle}>
              <Icon
                name="caret-down"
                size={16}
                color={NORMAL_TEXTCOLOR}
                style={{ position: 'absolute', bottom: -20, left: -25, transform: [{ rotate: '45deg' }] }}
              />
            </View>
            {this.state.bankName &&
              <ModalDropdown
                onSelect={this._provinceChanged}
                options={Province}
                defaultValue={''}//this.state.bankName[0]
                style={{
                  width: 200,
                  height: 40,
                  borderWidth: 0,
                  borderRadius: 3,
                  backgroundColor: DARK_BGCOLOR,
                }}
                textStyle={{
                  marginVertical: 5,
                  marginHorizontal: 6,
                  fontSize: 18,
                  color: 'white',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}
                dropdownStyle={{
                  width: 200,
                  height: 120,
                  borderRadius: 3,
                }}
                dropdownTextHighlightStyle={{
                  color: 'white'
                }}
              />
            }
          </View>
        </View>
        {/* <MaterialInput title={'开户省份'} onChangeText={this._provinceChanged} /> */}
        {/*城市select*/}
        <View style={{ height: 60, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
            <Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 10, fontSize: 20 }}>开户城市</Text>
          </View>
          <View style={{ flex: 1, height: 40, marginLeft: 10, marginRight: 15, backgroundColor: DARK_BGCOLOR, flexDirection: 'row', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
            <View style={CommonStyles.innerLineCenterStyle}>
              <Icon
                name="caret-down"
                size={16}
                color={NORMAL_TEXTCOLOR}
                style={{ position: 'absolute', bottom: -20, left: -25, transform: [{ rotate: '45deg' }] }}
              />
            </View>
            {this.state.bankName &&
              <ModalDropdown
                onSelect={this._cityChanged}
                options={this.state.cityOpitions}
                defaultValue={''}
                style={{
                  width: 200,
                  height: 40,
                  borderWidth: 0,
                  borderRadius: 3,
                  backgroundColor: DARK_BGCOLOR,
                }}
                textStyle={{
                  marginVertical: 5,
                  marginHorizontal: 6,
                  fontSize: 18,
                  color: 'white',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}
                dropdownStyle={{
                  width: 200,
                  height: 120,
                  borderRadius: 3,
                }}
                dropdownTextHighlightStyle={{
                  color: 'white'
                }}
              />
            }
          </View>
        </View>
        {/* <MaterialInput title={'开户城市'} onChangeText={this._cityChanged} /> */}
        <MaterialInput title={'支行名称'} onChangeText={this._bankAddressChanged} />
        <MaterialInput title={'银行卡号'} onChangeText={this._cardNumChanged} />
        <NormalBtn
          disabled={false}
          title='确认添加'
          style={{ height: 45, width: DEVICE_WIDTH - 20, backgroundColor: HIGHLIGHT_BGCOLOR, alignSelf: 'center', marginTop: 40 }}
          titleStyle={{ color: 'black' }}
          unableStyle={{ backgroundColor: '#909090', height: 45, width: DEVICE_WIDTH - 10 }}
          onPress={this._addCard}
        />
      </KeyboardAwareScrollView>
    );
  }
}