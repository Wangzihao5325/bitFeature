import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Drawer from 'react-native-drawer';
import VectorIconBtn from '../../../components/IconBtn';
import HeaderTitle from './HeaderTitle';
import CommonStyle from '../../../global/common_styles';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR } from '../../../global/config';
import MarketSocket from '../../../socket/marketSocket/index';
import MarketDetailHeader from './MarkDetailHeader';

export default class MarketDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <HeaderTitle onPress={navigation.getParam('showDrawer')} />,
      headerRight: (<VectorIconBtn name={'list'} onPress={navigation.getParam('showDrawer')} />),
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };
  componentDidMount() {
    this.props.navigation.setParams({ showDrawer: this._openDrawer });
    const name = this.props.navigation.getParam('contract', 'undefine_contract');
    MarketSocket.otherContractPause(name, true);
  }
  componentWillUnmount() {
    //恢复之前暂停的行情推送
    MarketSocket.contractGoingOn();
  }
  shouldComponentUpdate() {
    return false            //发现navi至页面render了2次，先禁止了 ... to do
  }
  constructor() {
    super();
    this.isDrawerShow = false;
  }
  _openDrawer = () => {
    if (this._drawer._open) { //react-native-drawer 未开放属性
      this._drawer.close();
    } else {
      this._drawer.open();
    }
  };
  render() {
    const drawerStyles = {
      drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
      main: { paddingLeft: 0 },
    }
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        side='right'
        type="overlay"
        content={<View style={{ flex: 1, backgroundColor: TAB_NAVI_HEADER_BGCOLOR }}><Text>MarketDetail</Text></View>}
        acceptPan={false}
        tapToClose={true}
        openDrawerOffset={0.6} // 40% gap on the right side of drawer
        panCloseMask={0.6}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (5 - ratio) / 5 }
        })}
      >
        <View style={{ flex: 1 }}>
          <MarketDetailHeader />
        </View>
      </Drawer>
    );
  }
}