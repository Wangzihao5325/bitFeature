import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import VectorIconBtn from '../../../components/IconBtn';
import store from '../../../store/index';
import { action_custom_service_model_show } from '../../../store/actions/customServiceAction';
import { TAB_NAVI_HEADER_BGCOLOR, HEADER_TINT_COLOR, DEVICE_WIDTH } from '../../../global/config';
const NORMAL_BACKGROUNDCOLOR = '#20212A';
const NORMAL_TEXTCOLOR = '#7E829B';
export default class WSProtocol extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '期货大赛用户协议',  //header标题
      headerRight: (<VectorIconBtn name='headphones' onPress={navigation.getParam('customService')} />), //Header interaction with its screen component - https://reactnavigation.org/docs/en/header-buttons.html#docsNav 
      headerStyle: {
        backgroundColor: TAB_NAVI_HEADER_BGCOLOR,
        borderBottomColor: 'black',
      },
      headerTintColor: HEADER_TINT_COLOR
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ customService: this._customService });
  }

  _customService = () => {
    store.dispatch(action_custom_service_model_show(this.props.navigation));
  }

  render() {
    return (
      <ScrollView style={{ height: 2000, width: DEVICE_WIDTH, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
        <View style={{ flex: 1, backgroundColor: NORMAL_BACKGROUNDCOLOR }}>
          <Text style={[styles.textStyle, { alignSelf: 'center' }]}>期货大赛用户协议</Text>
          <Text style={styles.textStyle}>本合作操盘协议（下称“本协议”）由以下甲乙丙三方于 ____年__月__日签署：</Text>
          <Text style={styles.textStyle}>甲方：（以下或称“受托人”）</Text>
          <Text style={styles.textStyle}>乙方：</Text>
          <Text style={styles.textStyle}>丙方：</Text>
          <Text style={styles.textStyle}>鉴于</Text>
          <Text style={styles.textStyle}>1、甲方接受直达期货股份有限公司（以下简称“委托人”）委托，担任投资顾问，受托管理该资产。为更好管理资产，维护委托人权益，经委托人同意，甲方有意委托若干自然人提供国际期货投资策略服务；</Text>
          <Text style={styles.textStyle}>2、乙方有意接受甲方前述委托，申请提供该服务；</Text>
          <Text style={styles.textStyle}>3、丙方系本APP（下称“丙方应用”或“产品”）的运营商，丙方具有应用运营及技术服务优势，可使乙方通过丙方应用申请提供前述服务。</Text>
          <Text style={styles.textStyle}>各方根据《期货交易管理条例》、《中华人民共和国合同法》等法律法规，经友好协商，订立本合作协议（下称“本协议”），供各方遵照执行。</Text>
          <Text style={styles.textStyle}>第一条 本协议成立及生效</Text>
          <Text style={styles.textStyle}>1、乙方可以通过丙方应用相应页面申请向甲方提供国际期货投资策略服务（下称“服务”），本协议各方确认，一旦乙方在丙方应用相关页面点击确认申请，则本协议在协议各方之间成立，且本协议于乙方按照本协议规定完成相应操盘保证金支付时生效。本协议各方应本着诚实信用原则按照本协议约定全面履行。</Text>
          <Text style={styles.textStyle}>2、根据本协议，在甲方与乙方之间形成甲方委托乙方提供国际期货投资策略服务法律关系，乙方申请行为并不在乙方与甲方、丙方或任何其他第三方之间形成借贷关系。</Text>
          <Text style={styles.textStyle}>第二条 合作方式</Text>
          <Text style={styles.textStyle}>1、 乙方以保证金方式取得甲方期货交易账户的操作权限，且乙方独立承担操盘的全部风险。甲方授权给乙方操盘的期货交易账户可交易金额为乙方保证金的一定比例。具体约定如下：</Text>
          <Text style={styles.textStyle}>乙方保证金 ：</Text>
          <Text style={styles.textStyle}>甲方提供(期货账户) 初始金额：</Text>
          <Text style={styles.textStyle}>2、 乙方可以使用上述期货交易账户内资金总额购买国际期货市场主流期货品种，共计17种，具体如下：美原油（CME CL）、富时A50（SGX CN）、恒生指数期货（HKE HSI）、日经指数225（SGX NK）、迷你道琼（CME-CBOT YM）、迷你纳指（CME NQ）、迷你标普（CME ES）、德国DAX指数（EUREX FDAX）、小恒指、美黄金、H股指数、小H股指数、美铜、美白银、小原油、迷你德国DAX指数（FDXM）、天然气。盈利归乙方所有，亏损由乙方承担，即乙方对上述账户进行期货买卖等操作产生的一切风险和后果由乙方承担，与甲方无关。</Text>
          <Text style={styles.textStyle}>第三条 操盘规则</Text>
          <Text style={styles.textStyle}>1、各方确认，国际综合操盘规则（以下简称“规则”）由丙方制定并于丙方应用相应页面展示且丙方有权单方变更规则内容。规则包括但不限于操盘保证金规则、申请规则、平仓规则、交易费用规则、结算规则及其他丙方认为必要的规则。</Text>
          <Text style={styles.textStyle}>2、乙方应在提交申请前仔细阅读规则全文，清楚理解并同意接受规则内容后方可提交申请。乙方一旦提交申请，即表示乙方完全认可规则内容并同意按照规则内容执行。乙方确认修订后的规则对乙方具备约束力，如乙方对修订后的规则有异议，则乙方应立即通过丙方应用相关页面申请终止提供服务。</Text>
          <Text style={styles.textStyle}>3、乙方必须年满18周岁并具备完全民事行为能力，且乙方应确保其申请及提供服务行为并不违反法律法规等规定。</Text>
          <Text style={styles.textStyle}>4、乙方必须事先注册成为网注册用户，并同意遵守网服务协议及所有规则。</Text>
          <Text style={styles.textStyle}>5、乙方必须具备证券、期货丰富的操作经验并具备一定的风险承受能力。</Text>
          <Text style={styles.textStyle}>6、内幕信息知情人员（包括但不限于上市公司董事、高级管理人员、监事、会计、审计、律师等知情人员）不得利用内幕信息进行操作。</Text>
          <Text style={styles.textStyle}>7、申请及服务提供规则：</Text>
          <Text style={styles.textStyle}>1)交易品种：美原油（CME CL）、富时A50（SGX CN）、恒生指数期货（HKE HSI）、日经指数225（SGX NK）、迷你道琼（CME-CBOT YM）、迷你纳指（CME NQ）、迷你标普（CME ES）、德国DAX指数（EUREX FDAX）、小恒指、美黄金、H股指数、小H股指数、美铜、美白银、小原油、迷你德国DAX指数（FDXM）为当月主力合约，以平台实际公示可交易品种为准。</Text>
          <Text style={styles.textStyle}>2) 交易时段内申请并成功支付操盘保证金的，该时段内可提供商品综合投资策略服务；非交易时段内申请并成功支付操盘保证金的，在下一交易时段，可提供商品综合投资交易策略服务。</Text>
          <Text style={styles.textStyle}>3)如交易时间内乙方需对账户进行结算的，须实盘账户已清仓，才可申请结算。</Text>
          <Text style={styles.textStyle}>4)交易时长：恒生指数期货、H股指数合约时间为：09:20-11:55，13:05-16:25，17:20-23:40；富时A50合约时间为：9:05-16:30,17:05-02:00；日经指数225合约时间为：09:05-14:25，15:20-23:55；迷你道琼、迷你纳指、迷你标普合约时间为：09:05-23:55合约时间为09:05-02:00；美原油;德国DAX指数合约时间为：13:55-23:55； 小H股指数合约时间为：09:20-16:25,17:20-23:40；美铜、美白银、小原油合约时间为：06:05-04:55；迷你德国DAX指数合约时间为：13:55-23:55； 申请人在交易日该时间段届满前应对账户中所有交易进行平仓，未能按时平仓的所有仓单系统将强制平仓。交易实行T+1日结算制度。 根据风控需求，在各品种停止交易的5分钟内，所有品种只能平仓，不能开仓，即11:55-12:00,14:25-14:30,16:25-16:30,16:30-16:35,11:40-11:45,11:55-12:00六个时段，所有品种只能平仓，不能开仓，</Text>
          <Text style={styles.textStyle}>申请人在交易日该时间段届满前应对账户中所有交易进行平仓，未能按时平仓的所有仓单系统将强制平仓。</Text>
          <Text style={styles.textStyle}>根据风控需求，在各品种停止交易的5分钟内，所有品种只能平仓，不能开仓，具体时间段以平台公示为主。</Text>
          <Text style={styles.textStyle}>5)当乙方操盘账户内的总操盘金少于或等于亏损平仓线时，系统将触发强制平仓指令，自动对账户内所有合约按照市价平仓，强平单的最终成交价以实际成交价为准，强平完成后，账户将被限制进行新的开仓交易。</Text>
          <Text style={styles.textStyle}>6)乙方应遵循下列交易限制：</Text>
          <Text style={styles.textStyle}>a）不得参与集合竞价买入和卖出；</Text>
          <Text style={styles.textStyle}>b）可持仓最大手数由申请并成功支付的操盘保证金决定；一天之内可多次开仓，次数不限。</Text>
          <Text style={styles.textStyle}>c）乙方自行设定的与交易有关的各项规则如与丙方在系统中设置的规则冲突时，乙方设置内容无效。</Text>
          <Text style={styles.textStyle}>7)结算规则：操盘盈亏=账户所有持仓平仓结算后账户余额-操盘初始资金；如操盘盈利，则盈利作为报酬归乙方所有，如操盘亏损且亏损额度小于或等于操盘保证金金额的，则亏损由乙方承担，直接从操盘保证金中扣除；超出操盘保证金部分丙方保留追讨权利；乙方同意结算金额以交易系统后台清算数据为准。</Text>
          <Text style={styles.textStyle}>第四条 丙方的服务</Text>
          <Text style={styles.textStyle}>1、丙方在丙方应用相应页面（具体位置由丙方决定），推出“国际综合” 操盘项目（以下简称“项目”），相应具有国际期货操作经验的乙方注册成为丙方应用注册用户后可通过该页面申请提供国际期货投资策略服务。</Text>
          <Text style={styles.textStyle}>2、项目名称由丙方单方决定且丙方独立享有该名称商标申请权。</Text>
          <Text style={styles.textStyle}>3、丙方负责应用相应页面的开发及维护。</Text>
          <Text style={styles.textStyle}>第五条 费用</Text>
          <Text style={styles.textStyle}>1.丙方提供本协议下的服务，按照本条约定收取技术服务费，收费标准以页面展示为准。</Text>
          <Text style={styles.textStyle}>2.期货合约交易时，交易系统自动扣除每手技术服务费，其中含代缴期货公司手续费。</Text>
          <Text style={styles.textStyle}>3. 丙方有权单方调整技术服务费，对此乙方表示理解与同意。</Text>
          <Text style={styles.textStyle}>第六条 期货账户</Text>
          <Text style={styles.textStyle}>1、乙方的操盘账户按照操盘规则进行分配，乙方应妥善保管账户名及密码，通过该账户名及密码产生的责任由乙方自行承担。</Text>
          <Text style={styles.textStyle}>2、账户使用原则上无期限限制。乙方申请停止向甲方提供服务后，其操盘账户将被收回。</Text>
          <Text style={styles.textStyle}>第七条 操盘保证金</Text>
          <Text style={styles.textStyle}>1、乙方在支付操盘保证金后可向甲方提供相应的国际期货投资策略服务。</Text>
          <Text style={styles.textStyle}>2、乙方按照约定支付操盘保证金，金额以丙方应用展示为准。</Text>
          <Text style={styles.textStyle}>3、交易资金按美元计价，人民币兑换美元，汇率按照中国银行当天第一开市时间来算，出入金按照现钞卖出价。</Text>
          <Text style={styles.textStyle}>4、乙方同意如交易发生亏损，则亏损从操盘保证金中扣除，如有剩余保证金可退还乙方。</Text>
          <Text style={styles.textStyle}>第八条 争议解决</Text>
          <Text style={styles.textStyle}>与本协议有关的争议，各方友好协商解决。协商不成，任何一方应向丙方实际经营地人民法院提起诉讼。</Text>
          <Text style={styles.textStyle}>第九条 本协议终止</Text>
          <Text style={styles.textStyle}>本协议出现下列情形时终止</Text>
          <Text style={styles.textStyle}>1、乙方违反规则的，丙方有权单方解除本协议，通知到达甲方、乙方或通知发出之日起5个自然日届满时，本协议解除。</Text>
          <Text style={styles.textStyle}>2、无论出于任何原因，乙方多日未使用期货账户进行交易，甲方和丙方都有权单方面终止本协议。</Text>
          <Text style={styles.textStyle}>3、各方协商一致终止本协议。</Text>
          <Text style={styles.textStyle}>4、其他法定情形</Text>
          <Text style={styles.textStyle}>第十条 其他约定</Text>
          <Text style={styles.textStyle}>1、如乙方盈利，盈利归属于乙方。丙方按照规则配合与乙方进行结算，且丙方据此受让乙方该笔盈利的债权，丙方有权要求资产管理产品的受托人支付该笔盈利。</Text>
          <Text style={styles.textStyle}>2、乙方同意接受包括但不限于以下所列风险并同意自行承担因此产生的损害：</Text>
          <Text style={styles.textStyle}>1）不可抗力风险：例如地震、火灾、水灾、战争等不可抗力因素可能导致的系统瘫痪，证券营业部、服 务器托管机房和网络运营商等无法预测及控制的系统故障、设备故障、通讯故障、电力故障等导致提供服务。</Text>
          <Text style={styles.textStyle}>2）技术风险：网络及软件等技术存在被黑客或计算机病毒攻击等可能造成的损害；以及应用故障、系统维护可能造成的损害。</Text>
          <Text style={styles.textStyle}>3）政策风险：证券及期货市场的法律、法规及相关政策发生变化以及政府行为，可能引起的证券市场价格波动而产生的亏损可能。</Text>
          <Text style={styles.textStyle}>4）宏观经济风险：国家宏观经济形势的变化以及周边国家、地区经济环境和周边证券市场的变化，可能引起证券市场的波动而产生的亏损可能。</Text>
          <Text style={styles.textStyle}>3、经各方确认以下为其准确、合法通讯方式：</Text>
          <Text style={styles.textStyle}>甲方通讯地址：ROOM 603E, 6/F, HANG PONT COMMERCIAL BUILDING 31 TOKIN STREET, CHEUNG SHA WAN KOWLOON, HONGKONG</Text>
          <Text style={styles.textStyle}>甲方邮箱：</Text>
          <Text style={styles.textStyle}>乙方通讯地址：</Text>
          <Text style={styles.textStyle}>乙方邮箱：</Text>
          <Text style={styles.textStyle}>丙方邮箱：contract@vs.com</Text>
          <Text style={styles.textStyle}>任何乙方改变上述地址的，需提前三个工作日以书面（包括但不限于电子邮件等）形式向其余相对方告知，未履行告知义务的，任何相对方向上述地址寄送文书材料的，视为送达。</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: NORMAL_TEXTCOLOR,
    marginTop: 5
  }
});