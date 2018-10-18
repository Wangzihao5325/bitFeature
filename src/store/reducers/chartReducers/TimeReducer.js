import * as types from '../../actionType';
import _ from 'lodash';
import moment from 'moment';
import { processColor } from 'react-native';

const initialState = {
  times: [],
  timeLabels: [],
  prices: [],
  volumns: [],
  isLoading: true,
  isActive: false,
  totalVolumn: null
}
let dotSize = 2;

function getVolumn(totalVolumn, storeTotal) {
  let newVolumn = 0;
  if (storeTotal === null) {
    storeTotal = totalVolumn;
    return newVolumn; //表示volumn無變化
  }
  newVolumn = totalVolumn - storeTotal;
  return newVolumn;
}
// 只取 時：分
function getHourMin(dateTimeString) {
  const dateTimeArr = dateTimeString.split(' ');
  const timeStr1 = dateTimeArr[1].split(':');
  return `${timeStr1[0]} : ${timeStr1[1]}`;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TIME_STORE_START:
      {
        let dataSent = action.dataSent;
        let times = state.times.concat();
        let timeLabels = state.timeLabels.concat();
        let prices = state.prices.concat();
        let volumns = state.volumns.concat();
        // 不取超出observableArrLimited個
        let startIndex = 0;
        if (dataSent.length >= 1000) {
          startIndex = dataSent.length - 1000;
        }
        let j = 0;
        for (let i = startIndex; i < dataSent.length; i++) {
          const dateTimeString = dataSent[i][0];
          times[j] = dateTimeString;
          timeLabels[j] = getHourMin(dateTimeString);  // 時:分 (16:22)
          // toFixed(format to string) --> _.toNumber()
          prices[j] = _.toNumber((dataSent[i][2]).toFixed(dotSize));
          volumns[j] = _.toNumber((dataSent[i][5]).toFixed(dotSize));
          j++;
        }
        let isLoading = false;
        return {
          ...state,
          times: times,
          timeLabels: timeLabels,
          prices: prices,
          volumns: volumns,
          isLoading: isLoading,
          isActive: true
        };
      }
    case types.TIME_STORE_UPDATE:
      {
        let dataSent = action.dataSent;
        let times = state.times.concat();
        let prices = state.prices.concat();
        let volumns = state.volumns.concat();
        let timeLabels = state.timeLabels.concat();
        const newDateTimeString = moment(dataSent[1]).seconds(0).milliseconds(0).format('YYYY-MM-DD HH:mm:ss');
        // 最後bar的時間
        const oldDateTimeString = times[times.length - 1];

        const lastPrice = _.toNumber(dataSent[3].toFixed(dotSize));
        if (oldDateTimeString === newDateTimeString) {
          prices[prices.length - 1] = lastPrice;
          volumns[volumns.length - 1] += getVolumn(dataSent[6], state.totalVolumn);
        } else {
          prices.push(lastPrice);
          volumns.push(getVolumn(dataSent[6], state.totalVolumn));
          times.push(newDateTimeString);
          timeLabels.push(getHourMin(newDateTimeString));
        }
        return {
          ...state,
          times: times,
          timeLabels: timeLabels,
          prices: prices,
          volumns: volumns,
          totalVolumn: dataSent[6],
          preSettlePrice: action.preSettlePrice
        };
      }
    default: return state;
  }
};
export default reducer;