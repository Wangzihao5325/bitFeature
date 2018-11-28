/* 用法说明
    <UsualTabBar tabNames={['商品','股指外汇','LME金属']} tabTap={(keyValue)=>{...}}/>
    通过 keyValue 判断点击的是哪个tab；keyValue是回调参数，与tabNames输入的数组下标保持一致。
*/
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const NORMAL_BTNWIDTH = 70;
const NORMAL_BTNHEIGHT = 30;
const NORMAL_BARWIDTH = ScreenWidth;
const NORMAL_MARGINHOR = 10;
const NORMAL_MARGINVER = 2;
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
const HIGHLIGHT_TEXTCOLOR = '#FED330';
const HIGHLIGHT_BORDERCOLOR = '#FED330';


class TabBtn extends Component {       //tabBar的定制btn
  constructor(props) {
    super(props);
    this.props = props;

    let isHighlightValue;
    if (this.props.highlightIndex == this.props.keyValue) {
      isHighlightValue = true;
    } else {
      isHighlightValue = false;
    }
    this.state = {
      isHighLight: isHighlightValue
    };
  }

  componentWillReceiveProps(nextProps) {
    let isHighlightValue;
    if (nextProps.highlightIndex == this.props.keyValue) {
      isHighlightValue = true;
    } else {
      isHighlightValue = false;
    }
    this.setState({ isHighLight: isHighlightValue });
  }

  /*会引发渲染不完全的问题，先注释掉
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isHighLight == this.state.isHighLight) {
      return false;
    } else {
      return true;
    }
  }
  */
  tabTap = () => {
    if (this.state.isHighLight) { return }
    this.props.tabTap(this.props.keyValue);
  }

  render() {
    let tabStyle = this.state.isHighLight ? styles.tabBtnHighlight : styles.tabBtnNormal;
    let textStyle = this.state.isHighLight ? styles.tabTextHighlight : styles.tabTextNormal;
    return (
      <TouchableHighlight style={[styles.tabBtnCommon, tabStyle]} onPress={this.tabTap} underlayColor={NORMAL_BACKGROUNDCOLOR}>
        <Text style={[styles.tabTextCommon, textStyle]}>{this.props.tabText}</Text>
      </TouchableHighlight>
    );
  }
}

export default class UsualTabBar extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    // this.tabNames = props.tabNames;
    // this.tabCount = this.tabNames.length;
    if (props.defalutHighlight) {
      this.state = {
        HighlightIndex: props.defalutHighlight
      };
    } else {
      this.state = {
        HighlightIndex: 1
      };
    }
  }
  static defaultProps = {
    isDefault: true
  }
  tabTap = (keyValue) => {
    let oldstate = this.props.tabNames[this.state.HighlightIndex];
    this.setState({ HighlightIndex: keyValue });
    this.props.tabTap(this.props.tabNames[keyValue], oldstate);
  }

  tabsGenerator = (count) => {
    let tabs = [];
    for (let i = 0; i < count; i++) {
      tabs.push(
        <TabBtn key={i} keyValue={i} highlightIndex={this.state.HighlightIndex} tabText={this.props.tabNames[i]} tabTap={this.tabTap} />
      );
    }
    return tabs;
  }

  render() {
    let tabs = this.tabsGenerator(this.props.tabNames.length);
    if (this.props.isDefault) {
      return (
        <View style={[styles.container, { width: NORMAL_BARWIDTH }]}>
          <ScrollView horizontal={true} alwaysBounceHorizontal={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {tabs}
          </ScrollView>
        </View>
      )
    } else {
      return (
        <View style={[styles.container, { width: NORMAL_BARWIDTH, justifyContent: 'space-around' }]}>
          {tabs}
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: NORMAL_BACKGROUNDCOLOR,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  tabBtnCommon: {
    height: NORMAL_BTNHEIGHT,
    backgroundColor: 'transparent',
    marginTop: NORMAL_MARGINVER,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtnNormal: {
    marginBottom: NORMAL_MARGINVER,
  },
  tabBtnHighlight: {
    marginBottom: NORMAL_MARGINVER - 2,
    borderBottomColor: HIGHLIGHT_BORDERCOLOR,
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  tabTextCommon: {
    display: 'flex',
    backgroundColor: 'transparent',
    marginHorizontal: NORMAL_MARGINHOR,
    alignSelf: 'center',
    fontSize: 15
  },
  tabTextNormal: {
    color: NORMAL_TEXTCOLOR,
  },
  tabTextHighlight: {
    color: HIGHLIGHT_TEXTCOLOR,
  }
})