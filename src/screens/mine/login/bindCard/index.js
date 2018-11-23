import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Api from '../../../../socket/platform/api';
import Dialog from '../../../../components/ImageVerification/Dialog';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH, PLATFORM_DOMAIN } from '../../../../global/config';
import VectorIconBtn from '../../../../components/IconBtn';
import ToastRoot from '../../../../components/ToastRoot';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const HIGHLIGHT_BGCOLOR = '#FED330';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARK_BGCOLOR = '#17191E';
class Item extends Component {
  _deleteCard = () => {
    Api.deleteBankCard(this.props.item.bankId, this._deleteSuccess, this._deleteFailed);
  }
  _deleteSuccess = () => {
    ToastRoot.show('删除银行卡成功');
    this.props.update();
  }
  _deleteFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  _changeCard = () => {
    Api.setDefalutBankCard(this.props.item.bankId, this._changeSuccess, this._changeFailed);
  }
  _changeSuccess = (e, code, message) => {
    ToastRoot.show('设置默认银行卡成功');
    this.props.update();
  }
  _changeFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  render() {
    let imagePath = null;
    switch (this.props.item.abbreviation) {
      case 'abc':
        imagePath = require('../../../../image/bank/abc.png');
        break;
      case 'bjb':
        imagePath = require('../../../../image/bank/bjb.png');
        break;
      case 'boc':
        imagePath = require('../../../../image/bank/boc.png');
        break;
      case 'ccb':
        imagePath = require('../../../../image/bank/ccb.png');
        break;
      case 'ceb':
        imagePath = require('../../../../image/bank/ceb.png');
        break;
      case 'cib':
        imagePath = require('../../../../image/bank/cib.png');
        break;
      case 'citic':
        imagePath = require('../../../../image/bank/citic.png');
        break;
      case 'cmb':
        imagePath = require('../../../../image/bank/cmb.png');
        break;
      case 'cmbc':
        imagePath = require('../../../../image/bank/cmbc.png');
        break;
      case 'comm':
        imagePath = require('../../../../image/bank/comm.png');
        break;
      case 'gdb':
        imagePath = require('../../../../image/bank/gdb.png');
        break;
      case 'hxb':
        imagePath = require('../../../../image/bank/hxb.png');
        break;
      case 'icbc':
        imagePath = require('../../../../image/bank/icbc.png');
        break;
      case 'psbc':
        imagePath = require('../../../../image/bank/psbc.png');
        break;
      case 'spdb':
        imagePath = require('../../../../image/bank/spdb.png');
        break;
      default:
        imagePath = require('../../../../image/bank/spdb.png');
        break;
    }
    let cardFooterNum = this.props.item.card.split('').splice(12, 4).join('');
    let securityNum = ['****', '****', '****', cardFooterNum].join('  ');
    return (
      <View style={{ height: 120, width: DEVICE_WIDTH, padding: 5 }}>
        <TouchableHighlight onPress={this._changeCard} style={{ backgroundColor: DARK_BGCOLOR, flex: 1, borderRadius: 5 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ height: 40, width: 40, marginLeft: 20 }} source={imagePath} />
                <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: 18, marginLeft: 20 }}>{this.props.item.bankName}</Text>
              </View>
              <VectorIconBtn name='close' onPress={this._deleteCard} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: NORMAL_TEXTCOLOR, fontSize: 18, marginLeft: 80 }}>{securityNum}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
class BindCardScreen extends Component {
  static navigationOptions = {
    title: "绑定银行卡",  //header标题
    headerStyle: {
      backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
      borderBottomColor: 'black',
    },
    headerTintColor: HEADER_TINT_COLOR
  };

  state = {
    data: [],
    isShow: false
  };

  componentDidMount() {
    Api.getBindedBankCard(this._getBindedCardSuccess);
  }

  _getBindedCardSuccess = (e) => {
    this.setState({
      data: e
    });
  }
  dataUpdate = () => {
    Api.getBindedBankCard(this._getBindedCardSuccess);
  }
  _goToBindCard = () => {
    if (this.props.isCertification) {
      this.props.navigation.navigate('InnerCardBind');
    } else {
      this.setState({
        isShow: true
      });
    }
  }
  _onConfirm = () => {
    this.setState({
      isShow: false
    });
    this.props.navigation.navigate('NameCertification');
  }
  _onCancel = () => {
    this.setState({
      isShow: false
    });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ flex: 1 }} >
          {
            this.state.data.length > 0 &&
            <FlatList
              style={{ flex: 1 }}
              data={this.state.data}
              renderItem={({ item }) => <Item item={item} update={this.dataUpdate} />}
            />
          }
        </View>
        <TouchableHighlight
          style={{ height: 50, width: DEVICE_WIDTH, backgroundColor: HIGHLIGHT_BGCOLOR, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onPress={this._goToBindCard}
        >
          <Text>绑定银行卡</Text>
        </TouchableHighlight>
        <Dialog
          visible={this.state.isShow}
          header={'需要实名认证'}
          renderContent={() => <Text>请先进行实名认证操作</Text>}
          onConfirm={this._onConfirm}
          onCancel={this._onCancel}
        />
      </View>
    );
  }
}

function mapState2Props(store) {
  return {
    isCertification: store.account.isCertification
  }
}

export default connect(mapState2Props)(BindCardScreen);