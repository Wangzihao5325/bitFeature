import * as types from '../../actionType';
import { processColor } from 'react-native';

const initialState = {
  core: {
    data: {
      times: [],      // times - string - 2017-09-01 10:30:00 
      dateLabels: [], // xAxix - 日K(1440)用date - string - 2017-09-01
      timeLabels: [], // xAxis - 其他都是用time   - string - 10:30
      prices: [],     // yAxis - Candlestick [{shadowH(高), shadowL(低), open(開), close(收)}]
      volumns: []     // yAxix - Bar 
    },
    klineType: Enum.kTypes.one.value, // 1, 5, 15, 30, 1440
    isLoading: true,
    xIndexSelected: null // null 時 Marker - 當touch DisplayModal時, 再將xIndexSelected設為null, Marker就消失
  },
  candleData: {},
  candleXAxis: {
    valueFormatter: [],
    granularityEnabled: true,
    granularity: 1,
    textColor: processColor('white'), // x軸的字樣

    enabled: false,
    position: 'BOTTOM',
    drawHighlightIndicators: false,
    drawGridLines: false,                   // 不畫格線
    drawAxisLine: false,                    // 不畫X Y 軸線

    axisMaximum: 45
  },
  candleYAxis: {
    left: {
      enabled: false,
    },
    right: {
      valueFormatter: ChartUtil.getValueFormatter(this.dotSize),
      textColor: processColor(Colors.white), // y軸的字樣
      position: 'INSIDE_CHART',              // y軸顯示在內側
      drawGridLines: false,
      drawAxisLine: false,
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN:
      return {
        ...state,
        isLogin: true,
      };
    case types.LOG_OUT:
      return {
        ...state,
        isLogin: false,
      };
    case types.GET_ACCOUNT_INFO:
      return {
        ...state,
        user: action.user,
        balance: action.balance,
        userVerified: action.userVerified,
        isCertification: action.isCertification,
        isSetDrawPwd: action.isSetDrawPwd,
        operateMoney: action.operateMoney,
        frozenCapital: action.frozenCapital,
        drawHandleFee: action.drawHandleFee,
        wxAccount: action.wxAccount
      };
    default: return state;
  }
};
export default reducer;