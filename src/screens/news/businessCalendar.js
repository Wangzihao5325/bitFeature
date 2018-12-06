import React, { Component } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Api from '../../socket/platform/api';
import moment from 'moment';
import { DEVICE_WIDTH } from '../../global/config';
import Calender from '../../components/Calender';
import ImportantLabel from '../../components/ImportantLabel';
import VectorIconBtn from '../../components/IconBtn';
import ToastRoot from '../../components/ToastRoot';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARK_BGCOLOR = '#17191E';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
class ItemHeader extends Component {
  static contextTypes = {
    item: PropTypes.object
  }
  state = {
    isSub: this.context.item.remark
  }
  _subscibeCalendar = () => {
    const { item } = this.context;
    let id = item.calendarId;
    let subKey = 'true';
    if (this.state.isSub === 'true') {
      subKey = 'false';
    }
    Api.subscibeCalendar(id, subKey, this._subSuccess, this._subFailed);
  }
  _subSuccess = (data) => {
    let text = '退订成功'
    if (data.currStatus === 'true') {
      text = '订阅成功'
    }
    ToastRoot.show(text);
    this.setState(function (preState, props) {
      return {
        isSub: data.currStatus
      }
    });
  }
  _subFailed = (e, code, message) => {
    ToastRoot.show(message);
  }
  render() {
    const { item } = this.context;
    let time = item.timestamp;
    let flagUrl = item.flagUrl;
    let country = item.country;
    let importance = item.importance;
    const dateTimeStringArr = moment(time * 1000).format('YYYY-MM-DD HH:mm').split(' ');
    const timeString = dateTimeStringArr[1];
    let BtnColor = this.state.isSub === 'true' ? HIGHLIGHT_TEXTCOLOR : '#909090';
    return (
      <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <VectorIconBtn name='bell' color={BtnColor} onPress={this._subscibeCalendar} size={18} />
          <Text style={{ color: NORMAL_TEXTCOLOR }}>{timeString}</Text>
          <Image style={{ height: 26, width: 30, marginHorizontal: 20 }} source={{ uri: flagUrl }} />
          <Text style={{ color: NORMAL_TEXTCOLOR }}>{country}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <ImportantLabel important={importance} />
        </View>
      </View>
    );
  }
}
class ItemContent extends Component {
  static contextTypes = {
    item: PropTypes.object
  }
  render() {
    const { item } = this.context;
    let importance = item.importance;
    let textColor = importance === '3' ? 'red' : 'white';
    return (
      <View style={{ height: 60, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomColor: DARK_BGCOLOR, borderTopColor: DARK_BGCOLOR, borderBottomWidth: 1, borderTopWidth: 1 }}>
        <Text style={{ color: textColor, marginLeft: 5 }}>{item.title}</Text>
      </View>
    );
  }
}
class ItemBottom extends Component {
  static contextTypes = {
    item: PropTypes.object
  }
  render() {
    const { item } = this.context;
    let now = item.actual === '' ? '--' : item.actual;
    let previous = item.previous === '' ? '--' : item.previous;
    let forecast = item.forecast === '' ? '--' : item.forecast;
    return (
      <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: 'black', borderBottomWidth: 1 }}>
        <Text style={{ marginLeft: 10, color: HIGHLIGHT_TEXTCOLOR }}>{`今值 ${now}`}</Text>
        <Text style={{ color: NORMAL_TEXTCOLOR }}>{`预期 ${forecast}`}</Text>
        <Text style={{ marginRight: 10, color: NORMAL_TEXTCOLOR }}>{`前值 ${previous}`}</Text>
      </View>
    );
  }
}
class Item extends Component {
  static childContextTypes = {
    item: PropTypes.object
  }
  getChildContext() {
    return {
      item: this.props.item
    }
  }
  render() {
    return (
      <View>
        <ItemHeader />
        <ItemContent />
        <ItemBottom />
      </View>
    );
  }
}
export default class BusinessCalender extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    let date = new Date();
    let tomorrow = new Date(date.getTime() + 24 * 3600 * 1000);
    let formDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let tomorrowFormDate = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;
    Api.getCrawlerCalendar(0, 10, formDate, tomorrowFormDate, this._getCalenderSuccess);
  }
  _getCalenderSuccess = (e) => {
    console.log('111');
    console.log(e);
    let data = e.data;
    this.setState({
      data: data
    })
  }
  _refresh = (date) => {
    let tomorrow = new Date(date.getTime() + 24 * 3600 * 1000);
    let formDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let tomorrowFormDate = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;
    Api.getCrawlerCalendar(0, 10, formDate, tomorrowFormDate, this._getCalenderSuccess);
  }
  render() {
    return (
      <View style={{ backgroundColor: NORMAL_BACKGROUNDCOLOR, flex: 1 }}>
        <Calender dayChange={this._refresh} />
        {this.state.data &&
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => <Item item={item} />}
          />}
      </View>
    );
  }
}