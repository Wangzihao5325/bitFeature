import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import moment from 'moment';
import Api from '../../socket/platform/api';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../global/config';
import Dialog from '../../components/ImageVerification/Dialog';

const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const DARK_BGCOLOR = '#17191E';
class Item extends Component {
  _itemPress = () => {
    if (typeof this.props.seeDetail === 'function') {
      if (this.props.item.liveTitle.length > 55) {
        this.props.seeDetail(this.props.item.liveTitle);
      }
    }
  }
  render() {
    const dateTimeStringArr = moment(this.props.item.createdAt * 1000).format('YYYY-MM-DD HH:mm');
    let text = this.props.item.liveTitle;
    if (text.length > 55) {
      text = text.substring(0, 55);
      text = text.replace(/(\r\n|\n|\r)/gm, '');   // remove newline
      text = `${text}...`;
    }
    return (
      <View style={{ height: 90, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR, borderBottomColor: 'black', borderBottomWidth: 1 }}>
        <View style={{ flex: 1, borderBottomColor: DARK_BGCOLOR, borderBottomWidth: 1, justifyContent: 'center' }}><Text style={{ color: NORMAL_TEXTCOLOR, marginLeft: 15 }}>{dateTimeStringArr}</Text></View>
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'baseline' }}>
          <Text
            style={{ marginLeft: 8, height: 60, width: DEVICE_WIDTH, color: 'white' }}
            onPress={this._itemPress}
          >
            {text}
          </Text>
        </View>
      </View>
    );
  }
}
let pageIndex = 0;
export default class News extends Component {
  constructor(props) {
    super(props);
    this.keyWords = null;
  }
  state = {
    dataArr: [],
    isDialogVisible: false,
    detailText: ''
  }
  componentDidMount() {
    Api.getBusinessNews(pageIndex, 10, null, this._getNewsSuccess);
  }
  refSearch = (text) => {
    if (text === '') {
      this.keyWords = null;
    } else {
      this.keyWords = text
    }
    pageIndex = 0;
    Api.getBusinessNews(pageIndex, 10, this.keyWords, this._getNewsSuccess);
  }
  _getNewsSuccess = (rtnData) => {
    if (rtnData.data) {
      let dataArr = rtnData.data;
      this.setState({
        dataArr: dataArr
      })
    } else {
      this.setState({
        dataArr: []
      })
    }
  }
  _getOlderNewsSuccess = (rtnData) => {
    if (rtnData.data) {
      let olderDataArr = rtnData.data;
      this.setState(function (preState, props) {
        let dataArr = preState.dataArr;
        let newDataArr = dataArr.concat(olderDataArr);
        return {
          dataArr: newDataArr
        }
      });
    }
  }
  _flatListRefresh = () => {
    pageIndex = 0;
    Api.getBusinessNews(pageIndex, 10, this.keyWords, this._getNewsSuccess);
  }
  _getOlderNews = () => {
    pageIndex = pageIndex + 1;
    Api.getBusinessNews(pageIndex, 10, this.keyWords, this._getOlderNewsSuccess);
  }
  _seeDeatils = (text) => {
    this.setState({
      detailText: text,
      isDialogVisible: true
    })
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        {this.state.dataArr.length >= 1 &&
          <FlatList
            style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}
            data={this.state.dataArr}
            renderItem={({ item }) => <Item item={item} seeDetail={this._seeDeatils} />}
            onRefresh={this._flatListRefresh}
            refreshing={false}
            onEndReached={this._getOlderNews}
            onEndReachedThreshold={1}
          />}
        <Dialog
          visible={this.state.isDialogVisible}
          header={'详情'}
          content={this.state.detailText}
          height={DEVICE_HEIGHT / 2}
          isCancel={false}
          isContentScrollable={true}
          onConfirm={() => this.setState({ isDialogVisible: false, detailText: '' })}
        />
      </View>
    );
  }
}