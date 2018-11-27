import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { DEVICE_WIDTH } from '../global/config';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARK_BGCOLOR = '#17191E';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
class Item extends Component {
  _daySelect = () => {
    if (typeof this.props.itemPress === 'function') {
      this.props.itemPress(this.props.item.data);
    }
  }

  render() {
    let week = this.props.item.data.getDay();
    let weekText = '';
    switch (week) {
      case 1:
        weekText = '一';
        break;
      case 2:
        weekText = '二';
        break;
      case 3:
        weekText = '三';
        break;
      case 4:
        weekText = '四';
        break;
      case 5:
        weekText = '五';
        break;
      case 6:
        weekText = '六';
        break;
      case 0:
        weekText = '日';
        break;
    }
    let day = this.props.item.data.getDate();
    let color = NORMAL_TEXTCOLOR;
    if (this.props.item.key === 3) {
      color = HIGHLIGHT_TEXTCOLOR;
    }
    return (
      <TouchableHighlight style={{ height: 40, width: DEVICE_WIDTH / 7 }} onPress={this._daySelect}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: color }}>{weekText}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: color }}>{day}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
export default class Calender extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let date1 = new Date(date.getTime() + 24 * 3600 * 1000);
    let date2 = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
    let date3 = new Date(date.getTime() + 3 * 24 * 3600 * 1000);
    let date01 = new Date(date.getTime() - 24 * 3600 * 1000);
    let date02 = new Date(date.getTime() - 2 * 24 * 3600 * 1000);
    let date03 = new Date(date.getTime() - 3 * 24 * 3600 * 1000);
    let dateArr = [{ data: date03, key: 0 }, { data: date02, key: 1 }, { data: date01, key: 2 }, { data: date, key: 3 }, { data: date1, key: 4 }, { data: date2, key: 5 }, { data: date3, key: 6 }];
    this.state = { dateArr: dateArr };
  }
  dayChange = (date) => {
    let date1 = new Date(date.getTime() + 24 * 3600 * 1000);
    let date2 = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
    let date3 = new Date(date.getTime() + 3 * 24 * 3600 * 1000);
    let date01 = new Date(date.getTime() - 24 * 3600 * 1000);
    let date02 = new Date(date.getTime() - 2 * 24 * 3600 * 1000);
    let date03 = new Date(date.getTime() - 3 * 24 * 3600 * 1000);
    let dateArr = [{ data: date03, key: 0 }, { data: date02, key: 1 }, { data: date01, key: 2 }, { data: date, key: 3 }, { data: date1, key: 4 }, { data: date2, key: 5 }, { data: date3, key: 6 }];
    this.setState({
      dateArr: dateArr
    });
    if (typeof this.props.dayChange === 'function') {
      this.props.dayChange(date);
    }
  }
  render() {
    let nowDate = this.state.dateArr[3].data;
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    return (
      <View style={{ height: 70, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: 'black', borderBottomWidth: 1 }}>
        <View style={{ height: 30, width: DEVICE_WIDTH, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR }}>{`- ${year}年${month}月 -`}</Text></View>
        <View style={{ height: 40, width: DEVICE_WIDTH }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            data={this.state.dateArr}
            renderItem={({ item }) => <Item item={item} itemPress={this.dayChange} />}
          />
        </View>
      </View>
    )
  }
}